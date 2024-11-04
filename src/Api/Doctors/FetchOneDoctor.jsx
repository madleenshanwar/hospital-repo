import { axiosInstance } from "../axiosInstance";

export const FetchOneDoctor=async(id)=>{
    try{
        const result= await axiosInstance.get(`/doctors/${parseInt(id)}`)
        if (result) {
            console.log('Fetched One Doctors:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch one doctor",error);
        return null;
    }
}