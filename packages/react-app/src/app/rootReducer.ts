import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
