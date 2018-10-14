import { LOGIN_USER,SIGN_OUT_USER } from './AuthConstants'

export const login=(creds)=>{
    return{
        type:LOGIN_USER,
        payload:{
              creds
        }
    }
}
export const signout=()=>{
    return{
        type:SIGN_OUT_USER
    }
}