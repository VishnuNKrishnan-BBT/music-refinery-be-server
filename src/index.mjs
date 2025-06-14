import express from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import cors from 'cors'
import { uploadForProcessing } from './coreFunctions/uploadForProcessing.mjs'
import { connectToMongoDB } from './dbOps/connectToMongoDB.mjs'
import { deleteAllObjectsFromFolder } from './coreFunctions/deleteAllMedia.mjs'
import { retrieveAllRecords } from './dbOps/retrieveAllRecords.mjs'

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 4341

// Enable CORS for all origins
app.use(cors()) // Use the cors middleware

let mongoClient
// Use the client to interact with the database
let db
// Example usage of the function
connectToMongoDB()
    .then((client) => {
        mongoClient = client
        db = mongoClient.db('prod')
    })
    .catch((error) => {
        console.error(error)
    })

// Set up multer to handle multiple files (in memory, not stored on disk)
const storage = multer.memoryStorage() // Store file in memory
const upload = multer({ storage: storage })

// Route for handling multiple file uploads to S3
app.post('/uploadForProcessing', upload.array('files[]'), async (req, res) => {
    uploadForProcessing(req, res, db)
})

app.post('/deleteAll', async (req, res) => {
    deleteAllObjectsFromFolder(req, res)
})

app.post('/retrieveAll', async (req, res) => {
    console.log(req.headers.session);
    retrieveAllRecords(req, res)
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})