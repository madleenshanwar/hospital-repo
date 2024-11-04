import { axiosInstance } from "../../axiosInstance";

export const FetchTest=async()=>{
    try{
        const result= await axiosInstance.get('/test')
        if (result) {
            console.log('Fetched Tests:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in fetch Tests",error);
        return null;
    }
}