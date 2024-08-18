export default function authHeader(){
    const token = JSON.parse(sessionStorage.getItem('token'));

    if(token){
        console.log(token);
        return { Authorization: 'Bearer ' + token };
    }
    else{
        return {};
    }
}