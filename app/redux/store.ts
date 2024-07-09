import { configureStore } from '@reduxjs/toolkit'
import { api } from './baseApi'
import { themeState } from './theme/themeSlice'
import { modalState } from './modal/modalSlice'
import { shareState } from './share/shareSlice'
import { rootNetworkState } from './rootNetwork/rootNetworkSlice'

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        themeState: themeState.reducer,
        modalState: modalState.reducer,
        shareState: shareState.reducer,
        rootNetworkSate: rootNetworkState.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({}).concat([api.middleware])
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
