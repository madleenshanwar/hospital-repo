import { axiosInstance } from "../../axiosInstance";

export const AddRayApi=async(ray)=>{
    try{
        const result= await axiosInstance.post('/ray',ray,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Add Ray:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in add Ray",error);
        return null;
    }
}