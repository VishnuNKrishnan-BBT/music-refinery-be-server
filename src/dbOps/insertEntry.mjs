import { Media } from './schemas/media.mjs'
import { TaskResponse } from '../constructors/taskResponse.mjs'

export const insertEntry = data => {
    return new Promise(async (resolve, reject) => {

        const newMedia = new Media({
            uid: Date.now(),
            session: data.session,
            origName: data.origName,
            origFileTempUrl: data.origFileTempUrl,
            updatedName: null,
            updatedFileTempUrl: null,
            autoAlbumArtUrl: null,
            userAlbumArtUrl: null,
            albumArtPreference: 'auto',
            autoMetadata: {},
            metadataPreference: 'auto',
            finalMetadata: {},
        })

        try {
            const savedMedia = await newMedia.save()
            console.log('MongoDB Response:')
            console.log(savedMedia)
            resolve(new TaskResponse(null, 'INSERT ENTRY (MONGODB)').success('Entry created successfully.', savedMedia))
        } catch (error) {
            console.error('Error saving media:', error)
            reject(new TaskResponse(null, 'INSERT ENTRY (MONGODB)').failure('Entry failed.', error))
        }
    })
}