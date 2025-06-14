import { Media } from './schemas/media.mjs'
import { TaskResponse } from '../constructors/taskResponse.mjs'

export const updateMetadata = async (req, res) => {

    const session = req.headers.session

    try { //<TODO>
        const updatedMetadata = await Media.updateOne(
            { session: session },
            {
                $set: {
                    title: req.body.formattedAudio.title
                }
            }
        )
        // console.log('MongoDB Response:')
        // console.log(retrievedList)
        if (retrievedList.length > 0) {
            res.send(new TaskResponse(null, 'RETRIEVE ALL (MONGODB)').success(`${retrievedList.length} entries retrieved successfully for session ${session}.`, retrievedList))
        } else {
            res.send(new TaskResponse(null, 'RETRIEVE ALL (MONGODB)').failure(`No entries found for session ${session}.`, []))
        }
    } catch (error) {
        console.error('Error retrieving media entries:', error)
        res.send(new TaskResponse(null, 'RETRIEVE ALL (MONGODB)').failure('Retrieving failed.', error))
    }
}
