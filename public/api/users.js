import { getAuthToken } from "./auth.js"

export async function getUsersAsync(){
    const response = await fetch("./api/users", {
        method: 'GET',
        headers: {
            'Authorization': getAuthToken()
        }
    })

    return response.json()
}