import { axiosInstance } from "../../axiosInstance";

export const DeleteRays=async(id)=>{
    try{
        const result =await axiosInstance.delete(`ray/${parseInt(id)}`)
        if(result){
            console.log('delete ray done',result)
            return result
        }
        else{
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.log('error in delete ray',error)
    }
}