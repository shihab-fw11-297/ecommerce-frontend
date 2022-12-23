import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser: null,
    isFetching: false,
    isLogin:false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isLogin = true;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.isLogin = false;
            state.error = false;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, signOut } = userSlice.actions;
export default userSlice.reducer;