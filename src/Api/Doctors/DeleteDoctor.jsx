import { axiosInstance } from "../axiosInstance"

export const DeleteDoctor=async(id)=>{
    try{
        const result =await axiosInstance.delete(`doctors/${parseInt(id)}`)
        if(result){
            console.log('delete doctor done',result)
            return result
        }
        else{
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.log('error in delete doctor',error)
    }
}