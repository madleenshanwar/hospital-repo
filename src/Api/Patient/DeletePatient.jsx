import { axiosInstance } from "../axiosInstance"

export const DeletePatient=async(id)=>{
    try{
        const result =await axiosInstance.delete(`patient/${parseInt(id)}`)
        if(result){
            console.log('delete patient done',result)
            return result
        }
        else{
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.log('error in delete patient',error)
    }
}