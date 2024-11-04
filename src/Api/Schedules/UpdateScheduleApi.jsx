import { axiosInstance } from "../axiosInstance"

export const UpdateScheduleApi=async(schedule,id)=>{
    console.log(id)
    try{
        const result=await axiosInstance.put(`updateShift/${parseInt(id)}`,schedule,{
            headers: {
                'Content-Type': 'application/json'
              }
        })
        if(result){
            console.log('updated schedule done',result)
            return result
        }
        else{
            console.error('no doctor found')
            return null
        }
    }
    catch(error){
        console.log('error in update schedule',error)
    }
}