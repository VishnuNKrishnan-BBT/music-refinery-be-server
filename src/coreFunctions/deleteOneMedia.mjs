import AWS from 'aws-sdk'
import { TaskResponse } from '../constructors/taskResponse.mjs'
import { s3Config } from '../config.mjs'
import { deleteAllEntries } from '../dbOps/deleteAllEntries.mjs'

// Configure AWS SDK with your credentials and region
const s3 = new AWS.S3(s3Config)

// Function to delete one object in a specific folder within a bucket
export const deleteOneFromFolder = async (req, res, folder) => {

    const folderName = `sessions/${req.headers.session}/${folder}`

    const params = {
        Bucket: bucketName,   // The name of your S3 bucket
        Prefix: folderName,
        Key: req.body.mediaName       // The key (filename) of the object you want to delete
    }

    try {
        const data = await s3.deleteObject(params).promise()
        console.log(`Successfully deleted ${objectKey} from ${bucketName}.`)
        res.send(new TaskResponse(null, `DELETE ONE`).success(`${req.body.mediaName} deleted successfully.`, null))
        // console.log(data)
    } catch (error) {
        console.error(`Error deleting ${objectKey} from ${bucketName}:`, error)
        res.send(new TaskResponse(null, `DELETE ONE`).success(`${req.body.mediaName} deleted successfully.`, null))
    }
}