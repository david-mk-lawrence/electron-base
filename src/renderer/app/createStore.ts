import {
    createStore,
    applyMiddleware,
    compose,
    Store,
    Action,
    CombinedState,
} from "redux"
import thunk from "redux-thunk"

import {
    createIpcInvokeThunkMiddleware,
    createIpcReceiveThunkMiddleware,
} from "@/renderer/lib/ipc"

import {
    RootState,
    ipcInvokeListeners,
    ipcReceiveListeners,
    rootReducer,
} from "@/renderer/store"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const ipcInvoke = createIpcInvokeThunkMiddleware<RootState, Action>(ipcInvokeListeners)
const ipcReceieve = createIpcReceiveThunkMiddleware<RootState, Action>(
    ipcReceiveListeners,
)

const initialState = {}
const middlewares = [thunk, ipcInvoke, ipcReceieve]

export default (): Store<CombinedState<RootState>, Action> =>
    createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares)),
    )
