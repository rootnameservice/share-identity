import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { RootState } from "../store"

export type Theme = "dark" | "light"

export interface ThemeProps {
    theme: Theme
}

export interface ThemeState {
    /**
     * Default theme will always be Dark
     */
    theme: Theme

    /**
     * Allow accepting theme param
     * in case we will have more than 2 themes in the future;
     * 
     * Default to "Dark"
     * @returns 
     */
    toggleTheme?: () => void

    updateTheme?: (theme: Theme) => void
}

const initialState: ThemeState = {
    theme: "dark"
}


export const themeState = createSlice({
    name: 'theme',
    initialState,

    reducers: {
        toggleTheme: (state): void => {
            state.theme = state.theme === "dark" ? "light" : "dark"
        },

        updateTheme: (state, { payload }: { payload: ThemeProps }): void => {
            state.theme = payload.theme
        }
    }
})

export const useThemeState = () => {
    const dispatch = useDispatch()
    const { actions } = themeState

    return {
        toggleTheme: () => {
            dispatch(actions.toggleTheme())
        },

        updateTheme: (props: ThemeProps) => {
            dispatch(actions.updateTheme({ ...props }))
        },

        useTheme: () => {
            return useSelector((state: RootState) => {
                return state.themeState
            })
        }
    }
}