import { axiosInstance } from "../axiosInstance";

export const Logout=async(login)=>{
    console.log(login)
    try{
        const response= await axiosInstance.post('/employee/logout', {},
            { headers:{
                "Content-Type":'application/json',
            }}
        )
        return response
    }
    catch(error){
        console.error("Error",error)
    }
}