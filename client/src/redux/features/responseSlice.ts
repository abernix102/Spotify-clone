import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface AuthState {
    isAuthenticated: boolean;
    status: 'loading' | 'idle' | 'succeeded' | 'failed';
    error: string | null;
    dataMe: any | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    status: 'idle',
    error: null,
    dataMe: null
};

export const initiateAuth = createAsyncThunk(
    'auth/initiateAuth',
    async () => {
        window.location.href = 'http://localhost:5000/auth';
    }
);

export const axiosAuthenticated = createAsyncThunk(
    'auth/axiosAuthenticated',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/auth/callback', { withCredentials: true });
            if (response.status === 200) {
                return "Authentication successful";
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosUser = createAsyncThunk(
    'user/axiosUser',
    async (_) => {
        try {
            const response = await axios.get('http://localhost:5000/me', { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const responseSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initiateAuth.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(initiateAuth.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(initiateAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(axiosAuthenticated.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(axiosAuthenticated.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
            })
            .addCase(axiosAuthenticated.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Unknown error';
            })
            // .addCase(axiosUser.pending, (state) => {
            //     state.status = 'loading';
            // })
            .addCase(axiosUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dataMe = action.payload;
            })
            // .addCase(axiosUser.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.payload as string || 'Unknown error';
            // });
    },
});

export default responseSlice.reducer;
