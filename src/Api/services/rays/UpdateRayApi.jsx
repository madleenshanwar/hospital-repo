import { axiosInstance } from "../../axiosInstance"

export const UpdateRayApi=async(ray,id)=>{
    console.log(id)
    try{
        const result=await axiosInstance.patch(`ray/${parseInt(id)}`,ray,{
            headers: {
                'Content-Type': 'application/json'
              }
        })
        if(result){
            console.log('updated ray done',result)
            return result
        }
        else{
            console.error('no ray found')
            return null
        }
    }
    catch(error){
        console.log('error in update ray',error)
    }
}