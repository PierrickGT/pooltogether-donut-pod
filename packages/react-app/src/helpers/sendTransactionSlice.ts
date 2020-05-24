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
        sendTransactionSuccess(state, action: PayloadAction<{ hash: string }>) {
            const { hash } = action.payload;

            state.hash = hash;
            state.sent = true;
        },
        sendTransactionCompleted(state) {
            state.completed = true;
        },
        sendTransactionFailure(state) {
            // TODO check that this flow is correct
            state.hash = null;
            state.inWallet = false;
            state.sent = false;
            state.completed = false;
            state.error = true;
        },
    },
});

export const {
    sendTransactionStart,
    sendTransactionSuccess,
    sendTransactionCompleted,
    sendTransactionFailure,
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
