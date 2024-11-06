import { axiosInstance } from "../../axiosInstance";

export const FetchOnePatientTest=async(id)=>{
    try{
        const result= await axiosInstance.get(`/patientTest/${parseInt(id)}`)
        if (result) {
            console.log('Fetched One Patient Test:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch one patient test",error);
        return null;
    }
}