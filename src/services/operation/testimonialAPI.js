import toast from "react-hot-toast"
import { setLoading } from "../../slices/testimonialSlice"
import { SERVER_API } from "../api"
import { apiconnector } from "../apiconnector"

export const addTestimonial=(videoId)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            const response=await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/testimonial/add-testimonial`,{videoId})
            console.log('hello')
            toast.success('testimonial addedd successfully')
            console.log(response.data)
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        dispatch(setLoading(false))
    }
}

export const deleteVideo=(id,setDeleteShow)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            await apiconnector("delete",`${SERVER_API.MAIN_SERVER}/api/v1/testimonial/delete-video?id=${id}`)
            toast.success('video deleted successfully')
            setDeleteShow(false)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
          dispatch(setLoading(false))
    }
   
}