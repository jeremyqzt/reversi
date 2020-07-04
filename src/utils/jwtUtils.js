const tokenKey = "token";
const refreshKey = "refreshToken";

class JwtUtils{
    static storeToken(data){
        localStorage.setItem(tokenKey, data.access);
        localStorage.setItem(refreshKey, data.refresh);
    }

    static deleteToken(){
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshKey);
    }

    static checkTokenPresent(){
        if (localStorage.getItem(tokenKey) === null || localStorage.getItem(refreshKey) === null) {
            window.location.href = '/';
        }
    }
}

export default JwtUtils;