import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,    
}

const slideSlice=createSlice({
    initialState:initialState,
    name:'slice',
    reducers:{        
        setLoading(state,action){
            state.loading=action.payload
        },
             
    }
})

export const {setLoading} = slideSlice.actions
export default slideSlice.reducer;