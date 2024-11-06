import { axiosInstance } from "../../axiosInstance";

export const FetchPatientsRays=async()=>{
    try{
        const result= await axiosInstance.get('/patientRay')
        if (result) {
            console.log('Fetched patientRay:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch patientRay",error);
        return null;
    }
}