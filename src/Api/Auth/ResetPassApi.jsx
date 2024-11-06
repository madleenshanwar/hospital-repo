import { axiosInstance } from "../axiosInstance";

export const ResetPassApi=async(info)=>{
    try{
        const result= await axiosInstance.post('/reset-password',info,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Change Password Is Done:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in change password",error);
        return null;
    }
}