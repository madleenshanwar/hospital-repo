import { axiosInstance } from "../axiosInstance"

export const UpdateDoctors=async(doctor,id)=>{
    console.log(id)
    try{
        const result=await axiosInstance.put(`doctors/${parseInt(id)}`,doctor,{
            headers: {
                'Content-Type': 'application/json'
              }
        })
        if(result){
            console.log('updated doctor done',result)
            return result
        }
        else{
            console.error('no doctor found')
            return null
        }
    }
    catch(error){
        console.log('error in update doctor',error)
    }
}