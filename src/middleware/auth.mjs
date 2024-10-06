import { TaskResponse } from "../constructors/taskResponse.mjs"

export const auth = (req, res, next) => {
    return new Promise((resolve, reject) => {
        const response = true

        if (response) {
            resolve(new TaskResponse(req.body, 'AUTH').success('Session authenticated successfully.', true))
        } else {
            reject(new TaskResponse(req.body, 'AUTH').success('Session authentication failed.', false))
        }
    })
}