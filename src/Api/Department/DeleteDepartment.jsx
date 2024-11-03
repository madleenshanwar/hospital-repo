import { axiosInstance } from "../axiosInstance"

export const DeleteDepartment=async(id)=>{
    console.log(id)
    try{
        const result=await axiosInstance.delete(`/departments/${parseInt(id)}`)
        if (result) {
            console.log('Delete Department Done', result);
            return result
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    } 
    catch(error){
        console.log('error in delete department ',error)
    }
}