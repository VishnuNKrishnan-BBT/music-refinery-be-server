import mongoose from "mongoose"

// Define a schema for your collection (e.g., Users)
const mediaSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    session: {
        type: String,
        required: true,
    },
    origName: {
        type: String,
        required: true,
    },
    origFileTempUrl: {
        type: String,
        required: true,
    },
    updatedName: {
        type: String,
        required: false,
    },
    updatedFileTempUrl: {
        type: String,
        required: false,
    },
    autoAlbumArtUrl: {
        type: String,
        required: false,
    },
    userAlbumArtUrl: {
        type: String,
        required: false,
    },
    albumArtPreference: {
        type: String,
        required: true,
    },
    autoMetadata: {
        type: Object,
        required: false,
    },
    metadataPreference: {
        type: String,
        required: true,
    },
    finalMetadata: {
        type: Object,
        required: true,
    }
})

// Create a model from the schema
export const Media = mongoose.model('Media', mediaSchema)