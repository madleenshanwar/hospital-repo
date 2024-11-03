import { axiosInstance } from "../axiosInstance";

export const ShowRoom=async()=>{
    try{
        const result= await axiosInstance.get('/room')
        if (result) {
            console.log('Fetched Room:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error",error);
        return null;
    }
}