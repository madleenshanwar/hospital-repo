import { axiosInstance } from "../../axiosInstance";

export const AddPatientTest=async(test)=>{
    try{
        const result= await axiosInstance.post('/patientTest',test,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Add Patient Test:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in add patient test",error);
        return null;
    }
}