import { axiosInstance } from "../axiosInstance";

export const FetchTeamDoctors=async(month)=>{
    try{
        const result= await axiosInstance.get(`/activeDoctors/${parseInt(month)}`)
        if (result) {
            console.log('Fetched Team Of Doctors For Shift schedule:', result);
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