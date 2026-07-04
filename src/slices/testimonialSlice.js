import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,    
}

const testimonialSlice=createSlice({
    initialState:initialState,
    name:'testimonial',
    reducers:{        
        setLoading(state,action){
            state.loading=action.payload
        },
             
    }
})

export const {setLoading} = testimonialSlice.actions
export default testimonialSlice.reducer;