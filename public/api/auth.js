const tokenKey = "authToken";

export function getAuthToken(){
    const token = localStorage.getItem(tokenKey)
    return token;
}

export function isAuthentificated(){
    const token = getAuthToken()
    return token != null;
}

export async function authAsync(login, password){
    console.log(login)
    console.log(password)
}