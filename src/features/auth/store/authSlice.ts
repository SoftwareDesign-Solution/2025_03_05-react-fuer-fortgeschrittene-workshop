import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../entities/User";
import { loginUser, registerUser } from "./authActions";

interface AuthState {
    user: User | null;
    authenticated: boolean;
    token: string | null;
    error: unknown,
    success: boolean
};

const initialState: AuthState = {
    user: null,
    authenticated: false,
    token: null,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.authenticated = false;
            state.token = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ accessToken: string, user: User }>) => {
            state.authenticated = true;
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            state.success = true;
        });

        builder.addCase(loginUser.rejected, (state, action: PayloadAction<string | unknown>) => {
            state.success = true;
            state.error = action.payload;
        });

        builder.addCase(registerUser.fulfilled, (state) => {
            state.success = true;
        });

        builder.addCase(registerUser.rejected, (state, action: PayloadAction<string | unknown>) => {
            state.success = true;
            state.error = action.payload;
        });

    },
    selectors: {
        selectAuthenticated: (state) => state.authenticated,
        selectToken: (state) => state.token,
        selectUser: (state) => state.user,
    }
});

export const { logoutUser } = authSlice.actions;

export const { selectAuthenticated, selectToken, selectUser } = authSlice.selectors;

export default authSlice.reducer;