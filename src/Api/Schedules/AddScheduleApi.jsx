import { axiosInstance } from "../axiosInstance";

export const AddScheduleApi=async(schedule)=>{
    try{
        const result= await axiosInstance.post('/storeShift',schedule,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Add Schedule:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in add schedule",error);
        return null;
    }
}