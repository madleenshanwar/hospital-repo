import { axiosInstance } from "../axiosInstance";

export const ForgetPassApi=async(email)=>{
    try{
        const result= await axiosInstance.post('/forgot-password',{email},{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Your Email Matches:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in email",error);
        return null;
    }
}