import { axiosInstance } from "../../axiosInstance";

export const AddPatientRay=async(ray)=>{
    try{
        const result= await axiosInstance.post('/patientRay',ray,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Add Patient Ray:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in add patient ray",error);
        return null;
    }
}