import toast from "react-hot-toast"
import { setLoading } from "../../slices/blogSlice"
import { SERVER_API } from "../api"
import { apiconnector } from "../apiconnector"

export const addBlog=(blog)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            const response=await apiconnector('post',`${SERVER_API.MAIN_SERVER}/api/v1/blog/add-blog`,blog)
            return response           
        } catch (error) {
           throw error
        }
       
    }
}