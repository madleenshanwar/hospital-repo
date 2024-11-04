import { axiosInstance } from "../axiosInstance"

export const DeleteSchedule=async(id)=>{
    try{
        const result =await axiosInstance.delete(`deleteShift/${parseInt(id)}`)
        if(result){
            console.log('delete schedule done',result)
            return result
        }
        else{
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.log('error in schedule doctor',error)
    }
}