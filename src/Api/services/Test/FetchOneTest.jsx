import { axiosInstance } from "../../axiosInstance";

export const FetchOneTest=async(id)=>{
    try{
        const result= await axiosInstance.get(`/test/${parseInt(id)}`)
        if (result) {
            console.log('Fetched One Test:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch one test",error);
        return null;
    }
}