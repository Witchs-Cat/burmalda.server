import { getAuthToken } from "./auth.js"
import { baseUrl } from "./config.js"

export async function getUsersAsync(){
    const response = await fetch(baseUrl+"api/users", {
        method: 'GET',
        headers: {
            'Authorization': getAuthToken()
        }
    })

    return response.json()
}