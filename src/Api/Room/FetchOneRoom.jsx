import { axiosInstance } from "../axiosInstance";

export const FetchOneRoom=async(id)=>{
    try{
        const result= await axiosInstance.get(`/room/${parseInt(id)}`)
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