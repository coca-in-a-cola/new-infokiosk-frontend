import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { object } from "prop-types";
import { sendCardCode } from "../api/session.api";

const LoginStage = {
    READ_CARD: 0,
    CONFIRM_NUMBER: 1,
    SUCCESS: 2,
}

const initialState = {
    session: {},
    loading: false,
    error: null,
    loginStage: LoginStage.READ_CARD
}

const inputCardCode = createAsyncThunk(
'users/inputCardCodeStatus',
    async (cardCode, { rejectWithValue }) => {
        try {
            const response = await sendCardCode(cardCode)
            return response
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {

        logout: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state = initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(inputCardCode.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(inputCardCode.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(inputCardCode.fulfilled, (state, action) => {
            // Add user to the state array
            Object.assign(state.session, action.payload)
            state.loginStage = LoginStage.CONFIRM_NUMBER
            state.loading = false;
        })

        
    },
})

export const selectSession = (state) => state.session?.session;
export const selectUser = (state) => state.session?.user
export const selectUserName = (state) => state.session?.user
    ? state.session.user.firstName + " " + state.session.user.lastName
    : undefined


export const { logout } = sessionSlice.actions

export default sessionSlice.reducer