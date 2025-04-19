import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import {getAllQuestion} from "../../services/forumServices"
const fetchPosts = createAsyncThunk (
    'forum/fetchPosts',
    async (currentPage  ) => {
        try {
        const response = await getAllQuestion(currentPage, 10)
        return response;
        } catch (error) {
            console.error("Error fetching posts:", error);
            
        }
        
    }
)
const forumSlice = createSlice({
    name:'forum',
    initialState:{
        posts:[],
        currentPage:1,
        totalPages:1,
        isLoading:false,
        error:null,
        isSuccess:false,
    },
    reducers:{
        addPost : (state, action) => {
            state.posts.unshift(action.payload);

        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchPosts.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(fetchPosts.fulfilled , (state , action) => {
            state.posts = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(fetchPosts.rejected , (state , action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})
export default forumSlice.reducer;
export const  {addPost} = forumSlice.actions
export {fetchPosts}