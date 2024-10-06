import AWS from 'aws-sdk'
import { insertEntry } from '../dbOps/insertEntry.mjs'
import { s3Config } from '../config.mjs'

// Configure AWS SDK with your credentials and region
const s3 = new AWS.S3(s3Config)

// AWS S3 upload function for a single file
export const uploadToS3 = (session, file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Your bucket name
        Key: `sessions/${session}/origFiles/${file.originalname}`, // Specify the folder path in the Key
        Body: file.buffer, // File buffer from multer
        ContentType: file.mimetype // File MIME type
    }

    insertEntry({
        session: session,
        origName: file.originalname,
        origFileTempUrl: params.Key,
    })

    // Upload to S3
    return s3.upload(params).promise()
}