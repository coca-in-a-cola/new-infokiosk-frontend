import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { result } from "lodash";
import { sendCardCode, sendConfirmNumber } from "../api/session.api";

export const Stage = {
    UNAUTHORIZED: 0,
    READ_CARD: 1,
    CONFIRM_NUMBER: 2,
    SUCCESS: 3,
}

const initialState = {
    session: {},
    loading: false,
    error: null,
    stage: Stage.UNAUTHORIZED,
    showModal: false,
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
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        showModal: (state) => {
            state.showModal = true
        },

        hideModal: (state) => {
            state.showModal = false
        },

        startLogin: (state) => {
            state.showModal = true
            state.stage = Stage.READ_CARD
        },

        setCardCode: (state, action) => {
            state.session = action.payload
            state.stage = Stage.CONFIRM_NUMBER
            state.loading = false
        },

        setConfirmNumber: (state, action) => {
            state.session = action.payload
            state.stage = Stage.SUCCESS
            state.loading = false
            state.showModal = false
        },

        logout: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state = initialState
        }
    },
    
    /**extraReducers: (builder) => {
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
            state.loginStage = Stage.CONFIRM_NUMBER
            state.loading = false;
        })
    },*/
})

export const { logout, setLoading, setError, showModal, hideModal,
    startLogin, setCardCode, setConfirmNumber } = sessionSlice.actions


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const submitCardCode = (ssid) => (dispatch) => {
    dispatch(setLoading(true))
    
    sendCardCode(ssid).then(result => {
        dispatch(setCardCode(result))
    })
    .catch(error => {
        dispatch(setError(error))
    })
}

export const sumbitConfirmNumber = (confirmNumber) => (dispatch, getState) => {
    dispatch(setLoading(true))
    const authToken = selectAuthToken(getState())

    sendConfirmNumber(authToken, confirmNumber).then(result => {
        dispatch(setConfirmNumber(result))
    })
    .catch(error => {
        dispatch(setError(error))
    })
}



export const selectUserName = (state) => state.session?.user?.fullname
export const selectUserPhoneNumber = (state) => state.session?.user?.phoneNumber
export const selectAuthToken = (state) => state.session?.authToken;
export const selectStage = (state) => state.stage
export const selectLoading = (state) => state.loading
export const selectError = (state) => state.error
export const selectShowModal = (state) => state.showModal

export default sessionSlice.reducer