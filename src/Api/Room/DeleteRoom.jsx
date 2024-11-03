import { axiosInstance } from "../axiosInstance"

export const DeleteRoom=async(id)=>{
    console.log(id)
    try{
        const result=await axiosInstance.delete(`/room/${parseInt(id)}`)
        if (result) {
            console.log('Delete Room Done', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    } 
    catch(error){
        console.log('error in delete room ',error)
    }
}