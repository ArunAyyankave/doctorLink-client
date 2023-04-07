import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const checkIfDocLoggedIn = () => {
    const token = localStorage.getItem('doc');
    if (!token) return false;
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('doc');
        return false;
    }
    return true;
};

const initialState = {
    isLoggedIn: checkIfDocLoggedIn(),
    docDetails: {},
    status: '',
    reason: ''
}

const docSlice = createSlice({
    name: 'doc',
    initialState,
    reducers: {
        setDocDetails: (state, action) => {
            state.isLoggedIn = true,
                state.docDetails = { name: action.payload.name, mobile: action.payload.mobile, document: action.payload.image }
            state.status = action.payload.status
            state.reason = action.payload.reason
        },
        removeDocDetails: (state, action) => {
            state.isLoggedIn = false,
                state.mobile = ''
            state.name = ''
            state.status = ''
            localStorage.removeItem('doc')
        }
    }
})

export const { setDocDetails, removeDocDetails } = docSlice.actions;
export default docSlice.reducer;