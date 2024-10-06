import AWS from 'aws-sdk'
import { TaskResponse } from '../constructors/taskResponse.mjs'
import { s3Config } from '../config.mjs'

// Load environment variables
// dotenv.config()

// Configure AWS SDK with your credentials and region
const s3 = new AWS.S3(s3Config)

// Function to delete all objects in a specific folder within a bucket
export const deleteAllObjectsFromFolder = async (req, res) => {

    const folderName = `sessions/${req.headers.session}/`
    console.log(`===========`);
    console.log(req.headers);



    try {
        // List all objects in the specified folder
        const listedObjects = await s3.listObjectsV2({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `${folderName}` // Specify the folder path as the prefix
        }).promise()

        if (listedObjects.Contents.length === 0) {
            console.log('No files to delete in the specified folder.')
            res.send(new TaskResponse(null, 'AWS: DELETE ALL FROM FOLDER').failure('No files to delete in the specified folder.', null))
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
        console.log(`Successfully deleted ${listedObjects.Contents.length} objects.`)

        // Check if there are more objects to delete
        // if (listedObjects.IsTruncated) {
        //     // If there are more objects, call the function again recursively
        //     await deleteAllObjectsFromFolder(folderName)
        // }
        res.send(new TaskResponse(null, 'AWS: DELETE ALL FROM FOLDER').success(`Successfully deleted ${listedObjects.Contents.length} objects.`, null))

    } catch (error) {
        console.error('Error deleting objects:', error)
        res.send(new TaskResponse(null, 'AWS: DELETE ALL FROM FOLDER').failure('Error deleting objects:', error))
    }
}

// Call the function to delete all files from a specific folder in your bucket
// const bucketName = process.env.AWS_BUCKET_NAME // Your bucket name
// const folderName = 'SES_1029100/origFiles/' // Specify the folder path here
