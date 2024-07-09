import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"

export interface ShareStatus {
    isLoading?: boolean,
    isSuccess?: boolean,
    isError?: boolean
}

export interface ShareState {
    verification: {
        status: ShareStatus
    },
    share: {
        status: ShareStatus
    }
}

const initialState: ShareState = {
    verification: {
        status: {
            isLoading: false,
            isSuccess: false,
            isError: false
        }
    },
    share: {
        status: {
            isLoading: false,
            isSuccess: false,
            isError: false
        }
    }
}

export const shareState = createSlice({
    name: "share-registration",
    initialState,
    reducers: {
        updateShareStatus: (state, { payload }: { payload: ShareStatus }): ShareState => {
            state.share.status = payload
            return state
        },
        updateVerificationStatus: (state, { payload }: { payload: ShareStatus }): ShareState => {
            state.verification.status = payload
            return state
        },
    }
})

export const useShareState = () => {
    const dispatch = useDispatch()
    const { actions } = shareState

    return {
        // dispatcher
        updateShareStatus: (props: ShareStatus) => {
            dispatch(actions.updateShareStatus(props))
        },
        updateVerificationStatus: (props: ShareStatus) => {
            dispatch(actions.updateVerificationStatus(props))
        },

        // selector
        useShareStatus: () => {
            return useSelector((state: RootState) => {
                return state.shareState.share.status
            })
        },
        useVerificationStatus: () => {
            return useSelector((state: RootState) => {
                return state.shareState.verification.status
            })
        }
    }
}