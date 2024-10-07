import AWS from 'aws-sdk'
import { TaskResponse } from '../constructors/taskResponse.mjs'
import { s3Config } from '../config.mjs'
import { deleteAllEntries } from '../dbOps/deleteAllEntries.mjs'

// Configure AWS SDK with your credentials and region
const s3 = new AWS.S3(s3Config)

// Function to delete all objects in a specific folder within a bucket
export const deleteAllObjectsFromFolder = async (req, res) => {

    const folderName = `sessions/${req.headers.session}/`

    try {
        // List all objects in the specified folder
        const listedObjects = await s3.listObjectsV2({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `${folderName}` // Specify the folder path as the prefix
        }).promise()

        if (listedObjects.Contents.length === 0) {
            console.log(`No files to delete in folder ${folderName}.`)
            res.send(new TaskResponse(null, 'AWS: DELETE ALL FROM FOLDER').failure('No files to delete in your session.', null))
        }

        // Create delete parameters
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Delete: {
                Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
            },
        }

        // Push each object to deleteParams
        listedObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key })
        })

        // Delete the objects
        await s3.deleteObjects(deleteParams).promise()

        deleteAllEntries(req.headers.session)

        console.log(`Successfully deleted ${listedObjects.Contents.length} objects.`)
        res.send(new TaskResponse(null, 'AWS: DELETE ALL FROM FOLDER').success(`Successfully deleted ${listedObjects.Contents.length} objects.`, null))

    } catch (error) {
        console.error('Error deleting objects:', error)
        res.send(new TaskResponse(null, 'AWS: DELETE ALL FROM FOLDER').failure('Error deleting objects:', error))
    }
}
