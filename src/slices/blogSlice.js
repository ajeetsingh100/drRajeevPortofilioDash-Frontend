import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,    
}

const blogSlice=createSlice({
    initialState:initialState,
    name:'blog',
    reducers:{        
        setLoading(state,action){
            state.loading=action.payload
        },
             
    }
})

export const {setLoading} = blogSlice.actions
export default blogSlice.reducer;