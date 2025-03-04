import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "../entities/User";

const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string, password: string}, { rejectWithValue }) => {

        try {

            const { data } = await axios.post("http://localhost:3001/login", {
                email: email,
                password: password,
            });

            return data;

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                } else {
                    return rejectWithValue(error.message);
                }
            }
        }

    }
);

const registerUser = createAsyncThunk(
    'auth/register',
    async (user: Omit<User, 'id'>, { rejectWithValue}) => {

        try {

            await axios.post("http://localhost:3001/register", user);

        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message);
                } else {
                    return rejectWithValue(error.message);
                }
            }
        }

    }
);

export { loginUser, registerUser };