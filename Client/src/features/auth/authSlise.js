
import {createSlice  , createAsyncThunk} from '@reduxjs/toolkit';
import{getUserbyToken}  from "../../services/authServices"
 const fetchUserbyToken = createAsyncThunk (
    'auth/fettchUserbyToken',
    async () => {
        const response = await getUserbyToken();
        return response.user;
    }
 )
 const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        isLoading:false,
        error:null,
        isSuccess:false,
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchUserbyToken.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(fetchUserbyToken.fulfilled , (state , action) => {
    
            state.user = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(fetchUserbyToken.rejected , (state , action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
 })
export default authSlice.reducer;
export {fetchUserbyToken}