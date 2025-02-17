import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ForgotPasswordState {
    loading: boolean;
    message: string | null;
    error: string | null;
}

const initialState: ForgotPasswordState = {
    loading: false,
    message: null,
    error: null,
};

// Request OTP
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const requestOtp = createAsyncThunk("forgotPassword/requestOtp", async (email: string, { rejectWithValue }) => {
    try {
        const res = await fetch("/api/auth/forgot-password/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to send OTP");
        }

        return await res.json();
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});


// Verify OTP & Reset Password
export const verifyOtp = createAsyncThunk(
    "forgotPassword/verifyOtp",
    async ({ email, otp, newPassword }: { email: string; otp: string; newPassword: string }, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/auth/forgot-password/verify", {
                method: "POST",
                body: JSON.stringify({ email, otp, newPassword }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            return data.message;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(requestOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default forgotPasswordSlice.reducer;
