import { axiosInstance } from "../axiosInstance";

export const AddRoom=async(room)=>{
    try{
        const result= await axiosInstance.post('/room',room,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Add Room:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in add room",error);
        return null;
    }
}