import { axiosInstance } from "../axiosInstance";

export const FetchAllInfoPatient=async(id)=>{
    try{
        const result= await axiosInstance.get(`/patientMovement/${parseInt(id)}`)
        if (result) {
            console.log('Fetched All Information About Patient:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch all info about patient",error);
        return null;
    }
}