import { axiosInstance } from "../../axiosInstance";

export const AddTestApi=async(test)=>{
    try{
        const result= await axiosInstance.post('/test',test,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Add Test:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in add Test",error);
        return null;
    }
}