import { axiosInstance } from "../../axiosInstance";

export const DeletePatientTest=async(id)=>{
    console.log(id)
    try{
        const result=await axiosInstance.delete(`/patientTest/${parseInt(id)}`)
        if (result) {
            console.log('Delete patientTest Done', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    } 
    catch(error){
        console.log('error in delete patientTest ',error)
    }
}