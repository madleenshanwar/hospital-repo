import { axiosInstance } from "../../axiosInstance";

export const FetchPatientsTests=async()=>{
    try{
        const result= await axiosInstance.get('/patientTest')
        if (result) {
            console.log('Fetched PatientTest:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch PatientTest",error);
        return null;
    }
}