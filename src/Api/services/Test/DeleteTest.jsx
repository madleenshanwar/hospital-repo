import { axiosInstance } from "../../axiosInstance";

export const DeleteTest=async(id)=>{
    try{
        const result =await axiosInstance.delete(`test/${parseInt(id)}`)
        if(result){
            console.log('delete test done',result)
            return result
        }
        else{
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.log('error in delete test',error)
    }
}