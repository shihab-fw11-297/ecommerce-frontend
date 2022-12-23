import { loginFailure, loginStart, loginSuccess } from "./userReducer";
import axios from 'axios';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://ecommerce-service.onrender.com/api/auth/login", user);
            dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};