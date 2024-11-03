import axios from "axios";
import { axiosInstance } from "../axiosInstance";

export const AddDoctors=async(doctor)=>{
    try{
        const result= await axiosInstance.post('/doctors',doctor,{
            headers:{
                "Content-Type":'application/json'
            }
        })
        if (result) {
            console.log('Add Doctor:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in add Doctor",error);
        return null;
    }
}