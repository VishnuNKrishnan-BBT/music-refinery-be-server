import { uploadToS3 } from "../utils/uploadToS3.mjs"

export const uploadForProcessing = async (req, res) => {
    const session = req.headers.session

    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.')
        }

        // Upload each file to S3 and get its URL
        const uploadPromises = req.files.map(file => uploadToS3(session, file))
        const uploadResults = await Promise.all(uploadPromises)

        // Create an array of objects with original file names and their corresponding S3 URLs
        const fileUrls = uploadResults.map((result, index) => ({
            originalName: decodeURIComponent(req.files[index].originalname), // Original file name
            url: result.Location // Corresponding S3 URL
        }))

        // Log the result of the S3 upload and send the response
        console.log('Files uploaded successfully to S3:')
        console.log(uploadResults)

        res.send({
            status: 200,
            message: 'Files uploaded successfully',
            fileUrls: fileUrls // Return the array of objects
        })
    } catch (error) {
        console.error('Error uploading files to S3:', error)
        res.status(500).send({
            status: 500,
            message: 'Error uploading files',
            error: error.message
        })
    }
}