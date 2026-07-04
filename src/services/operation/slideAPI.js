import { setLoading } from "../../slices/slideSlice"
import { apiconnector } from "../apiconnector"
import { SERVER_API } from "../api"
import toast from "react-hot-toast"

export const addSlide=(formData)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            const response=await apiconnector("post",`${SERVER_API.MAIN_SERVER}/api/v1/slide/add-slide`,formData)
            console.log(response.data)
            toast.success('slide added successfully')
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)            
        }
        dispatch(setLoading(false))
    }
}