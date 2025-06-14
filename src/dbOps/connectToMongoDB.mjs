import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Function to connect to MongoDB and return the client
export const connectToMongoDB = async () => {
    try {
        // Connect to MongoDB
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('MongoDB connected successfully')

        // Return the connection (client)
        return connection.connection.getClient() // This returns the MongoDB client instance

    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw new Error('MongoDB connection failed')
    }
}
