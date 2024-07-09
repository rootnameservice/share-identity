import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Address } from "viem";

export interface RootProps {
    futurePassAddress?: string,
    eoaAddress?: string,
    chain?: string,
    chainId?: string,
    nodeName?: string,
    nodeVersion?: string,
    isFpActive?: boolean,

    /**
     * Active address
     * When isFpActive = true, 
     * this address will be FpAddress
     * otherwise, wallet address
     */
    address?: Address
}

export interface RootNetworkState {
    data: RootProps
}

const initialState: RootNetworkState = {
    data: {
        futurePassAddress: "",
        eoaAddress: "",
        isFpActive: false
    }
}

export const rootNetworkState = createSlice({
    name: "therootnetwork",
    initialState,
    reducers: {
        updateRootDetails: (state, { payload }: { payload: RootProps }): RootNetworkState => {
            state.data = payload
            return state
        },
    }
})

export const useRootNetworkState = () => {
    const dispatch = useDispatch()
    const { actions } = rootNetworkState

    return {
        updateRootDetails: (props: RootProps) => {
            dispatch(actions.updateRootDetails(props))
        },

        useRootNetwork: () => {
            return useSelector((state: RootState) => {
                return state.rootNetworkSate
            })
        }
    }
}