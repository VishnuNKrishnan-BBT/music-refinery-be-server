import { Media } from './schemas/media.mjs'
import { TaskResponse } from '../constructors/taskResponse.mjs'

export const deleteAllEntries = sessionId => {
    return new Promise(async (resolve, reject) => {

        try {
            const deleteResult = await Media.deleteMany({ session: sessionId })
            console.log('MongoDB Response:')
            console.log(deleteResult)
            if (deleteResult.deletedCount > 0) {
                resolve(new TaskResponse(null, 'DELETE ENTRIES (MONGODB)').success(`${deleteResult.deletedCount} entries deleted successfully for session ${sessionId}.`))
            } else {
                resolve(new TaskResponse(null, 'DELETE ENTRIES (MONGODB)').failure(`No entries found for session ${sessionId}.`))
            }
        } catch (error) {
            console.error('Error deleting media entries:', error)
            reject(new TaskResponse(null, 'DELETE ENTRIES (MONGODB)').failure('Entry deletion failed.', error))
        }
    })
}

