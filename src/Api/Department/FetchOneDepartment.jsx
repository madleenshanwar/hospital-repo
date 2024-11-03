import { axiosInstance } from "../axiosInstance";

export const FetchOneDepartment=async(id)=>{
    try{
        const result= await axiosInstance.get(`/departments/${parseInt(id)}`)
        if (result) {
            console.log('Fetched Department:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error",error);
        return null;
    }
}