import { axiosInstance } from "../axiosInstance";

export const FetchOneSchedule=async(id)=>{
    try{
        const result= await axiosInstance.get(`/showShift/${parseInt(id)}`)
        if (result) {
            console.log('Fetched one Shift Schedule:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch one shift schedule",error);
        return null;
    }
}