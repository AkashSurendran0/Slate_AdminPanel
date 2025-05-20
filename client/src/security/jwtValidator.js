export const isTokenExpired = (token) =>{
    if(!token) return true
    try {
        const jwt_token=token.token
        const payload=JSON.parse(atob(jwt_token.split('.')[1]))
        const expiry=payload.exp
        const now=Math.floor(Date.now()/1000)
        return expiry<now
    } catch (error) {
        console.log(error)
        return false
    }
}