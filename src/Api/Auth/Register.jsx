import {axiosInstance} from '../axiosInstance'
export const Register=async(register)=>{
    console.log(register)
    try{
        const result= await axiosInstance.post('/employee/register', register,
            { headers:{
                "Content-Type":'application/json',
            }}
        )
        if (result) {
            console.log('Register Is Done:', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    }
    catch(error){
        console.error("Error in register",error)
    }
}