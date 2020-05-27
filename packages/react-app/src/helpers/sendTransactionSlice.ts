import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from 'ethers';

import { AppThunk } from 'app/store';

export interface TransactionState {
    completed: boolean;
    error: boolean;
    hash: string | null;
    inWallet: boolean;
    sent: boolean;
}

export const initialState: TransactionState = {
    completed: false,
    error: false,
    hash: null,
    inWallet: false,
    sent: false,
};

const transaction = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        sendTransactionStart(state) {
            state.inWallet = true;
        },
        sendTransactionSuccess(state, action: PayloadAction<string>) {
            state.hash = action.payload;
            state.sent = true;
        },
        sendTransactionCompleted(state) {
            state.sent = false;
            state.completed = true;
        },
        sendTransactionFailure(state) {
            state.completed = false;
            state.error = true;
            state.hash = null;
            state.inWallet = false;
            state.sent = false;
        },
        resetTransaction(state) {
            state.completed = false;
            state.error = false;
            state.hash = null;
            state.inWallet = false;
            state.sent = false;
        },
    },
});

export const {
    sendTransactionStart,
    sendTransactionSuccess,
    sendTransactionCompleted,
    sendTransactionFailure,
    resetTransaction,
} = transaction.actions;

export const sendTransaction = (
    contract: Contract,
    methodName: string,
    params: any[] = [],
): AppThunk => async (dispatch) => {
    dispatch(sendTransactionStart());

    try {
        const newTransaction = await contract[methodName].apply(null, params);

        dispatch(sendTransactionSuccess(newTransaction.hash));

        await newTransaction.wait();

        dispatch(sendTransactionCompleted());
    } catch (error) {
        console.error(error);

        dispatch(sendTransactionFailure());

        console.error(error.message);
    }
};

export default transaction.reducer;
