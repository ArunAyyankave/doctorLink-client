import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { signinThunk } from '../thunk/user';

export const checkIfUserLoggedIn = () => {

    const token = localStorage.getItem('user');
    if (!token) return false;
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('user');
        return false;
    }
    return true;
};

const initialState = {
    isLoggedIn: checkIfUserLoggedIn(),
    mobile: '',
    name: '',
    signin: {
        isLoading: false,
        isErr: false,
        errMsg: ""
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            //the passing object will comes in action.
            state.name = action.payload.name;
            state.mobile = action.payload.mobile;
            state.isLoggedIn = true;
        },
        userLogin: (state, action) => {
            state.isLoggedIn = true;
        },
        clearError: (state, action) => {
            state.signin.errMsg = ''
        },
        userLogout: (state, action) => {
            state.isLoggedIn = false;
            state.mobile = '';
            state.name = '';
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signinThunk.pending, (state) => {
            state.signin.isLoading = true;
        });

        builder.addCase(signinThunk.fulfilled, (state, action) => {
            state.signin.isLoading = false;
            state.signin.errMsg = '';
            state.mobile = action.payload.mobile;
            state.name = action.payload.name
            localStorage.setItem('user', action.payload.accessToken);
            state.isLoggedIn = true;
        });

        builder.addCase(signinThunk.rejected, (state, action) => {
            state.signin.isLoading = false;
            state.signin.errMsg = action.payload.message
        });
    },
})

export const { setUserDetails, userLogout, userLogin, clearError } = userSlice.actions;
export default userSlice.reducer;