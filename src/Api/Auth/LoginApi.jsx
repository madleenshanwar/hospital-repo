import axios from "axios";
import { axiosInstance } from "../axiosInstance";

const BASE_URL='http://4.jamous-tech.com/api';
export const LoginApi=async(login)=>{
    console.log(login)
    try{
        const response= await axios.post('http://4.jamous-tech.com/api/employee/login', login,
            { headers:{
                "Content-Type":'application/json',
            }}
        )
        return response
    }
    catch(error){
        console.error("Error",error)
    }
}