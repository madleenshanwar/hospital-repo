import { axiosInstance } from "../axiosInstance"

export const UpdateDepartments=async(department,id)=>{
    console.log(id)
    try{
        const result=await axiosInstance.put(`departments/${parseInt(id)}`,department,{
            headers: {
                'Content-Type': 'application/json'
              }
        })
        if(result){
            console.log('updated departments done',result)
            return result
        }
        else{
            console.error('no departments found')
            return null
        }
    }
    catch(error){
        console.log('error in update departments',error)
    }
}