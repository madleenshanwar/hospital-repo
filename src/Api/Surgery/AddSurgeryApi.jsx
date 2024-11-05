import { axiosInstance } from "../axiosInstance";

export const AddSurgeryApi=async(surgery)=>{
    try{
        const result= await axiosInstance.post('/surgery',surgery,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Add Surgery:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in add surgery",error);
        return null;
    }
}