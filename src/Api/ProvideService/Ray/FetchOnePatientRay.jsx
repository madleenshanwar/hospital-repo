import { axiosInstance } from "../../axiosInstance";

export const FetchOnePatientRay=async(id)=>{
    try{
        const result= await axiosInstance.get(`/patientRay/${parseInt(id)}`)
        if (result) {
            console.log('Fetched One Patient Ray:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch one patient ray",error);
        return null;
    }
}