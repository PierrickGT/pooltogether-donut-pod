import React, { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button, Input } from 'antd';
import { utils } from 'ethers';
import {
    ErrorMessage,
    Field,
    FieldInputProps,
    Form,
    Formik,
    FormikErrors,
    FormikHelpers,
    FormikProps,
} from 'formik';
import pluralize from 'pluralize';
import { rem } from 'polished';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';

import { RootState } from 'app/rootReducer';
import { ModalProps } from 'components/Modal';
import { ModalContent, ModalHeader, ModalTitle } from 'components/Modal/style';
import Throbber from 'components/Throbber';
import { getUserDaiBalance } from 'helpers/Dai';
import { getEtherscanUrl } from 'helpers/Network';
import { checkDaiAllowance, depositDaiToDonutPod, unlockDai } from 'helpers/Pod';
import { getNextAwardDate } from 'helpers/Pool';
import Dai from 'images/Dai';
import Donut from 'images/Donut.png';
import Lock from 'images/Lock';
import Ticket from 'images/Ticket';
import { green, purple, red } from 'styles/colors';
import { lineHeight, size as fontSize } from 'styles/fonts';
import { spacingUnit } from 'styles/variables';

const LockContainer = styled.div`
    align-items: center;
    background-color: ${purple[4]};
    border-radius: 50%;
    display: flex;
    height: ${rem(96)};
    justify-content: center;
    margin: 0 auto ${spacingUnit(3)};
    width: ${rem(96)};
`;

const TicketContainer = styled.div`
    align-items: center;
    background-color: ${purple[4]};
    border-radius: 50%;
    display: flex;
    height: ${rem(96)};
    justify-content: center;
    margin: 0 auto ${spacingUnit(3)};
    width: ${rem(96)};
`;

const StyledDonut = styled.img`
    height: ${rem(48)};
    margin: 0 auto ${spacingUnit(3)};
    width: ${rem(48)};
`;

const StyledText = styled.p`
    font-size: ${fontSize.large};
    letter-spacing: ${rem(2)};
    line-height: ${lineHeight.large};
    margin: 0 auto ${spacingUnit(3)};
    max-width: ${rem(410)};
    width: 100%;
`;

const StyledTextLarge = styled.p`
    font-size: ${fontSize.large};
    letter-spacing: ${rem(2)};
    line-height: ${lineHeight.large};
    width: 100%;
`;

const StyledHref = styled.a`
    color: ${purple[4]};
    display: inline-block;
    font-size: ${fontSize.large};
    margin-top: ${spacingUnit(2)};
    max-width: ${rem(520)};

    &:hover {
        color: ${green[0]};
    }
`;

const StyledNexDrawDate = styled.p`
    font-size: ${fontSize.large};
    margin-bottom: ${spacingUnit(4)};
`;

const StyledCurrency = styled.p`
    display: inline;
    font-size: ${fontSize.medium};
    font-weight: bold;
    margin-left: ${spacingUnit()};
    vertical-align: middle;
`;

const StyledLabelContainer = styled.span`
    color: #fff;
    display: flex;
    font-size: ${fontSize.medium};
    justify-content: space-between;
    padding: ${spacingUnit()} ${spacingUnit(2)};
`;

const StyledBalance = styled.span`
    cursor: pointer;

    &:hover {
        color: ${green[0]};
    }
`;

const StyledInput = styled(Input as any)`
    background-color: ${purple[4]};
    border-radius: 16px;
    color: #fff;
    font-size: ${fontSize.extraLarge};
    height: ${rem(62)};
    line-height: ${rem(42)};
    padding: ${spacingUnit()} ${spacingUnit(2)};
    width: 100%;

    input {
        background-color: ${purple[4]};
        border-color: transparent;
        color: #fff;
        font-size: ${fontSize.extraLarge};
    }

    &:hover,
    &:focus {
        border-color: ${green[0]};
    }
`;

const StyledErrorMessage = styled(ErrorMessage)`
    color: ${red[0]};
    margin: ${spacingUnit()} 0 0 ${spacingUnit(2)};
    text-align: left;
`;

const InputDaiSuffix: React.FC = () => {
    return (
        <React.Fragment>
            <Dai width={20} />
            <StyledCurrency>DAI</StyledCurrency>
        </React.Fragment>
    );
};

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    min-height: ${rem(254)};
`;

const SubmitButtonContainer = styled.div`
    align-items: flex-end;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-top: ${spacingUnit(3)};
`;

interface RenderUnlockDaiProps {
    handleUnlockDai: () => void;
}

const RenderUnlockDai: React.FC<RenderUnlockDaiProps> = ({ handleUnlockDai }) => {
    return (
        <React.Fragment>
            <LockContainer>
                <Lock />
            </LockContainer>
            <StyledText>
                PoolTogether requires your approval to transact DAI with the Pool
            </StyledText>
            <Button type="primary" size="large" onClick={handleUnlockDai}>
                Allow DAI
            </Button>
        </React.Fragment>
    );
};

const RenderPurchaseTickets: React.FC = (): any => {
    const { account, chainId, library } = useWeb3React<Web3Provider>();

    const dispatch = useDispatch();

    const [daiBalance, setDaiBalance] = useState(0);
    const [nextAwardDate, setNextAwardDate] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    interface FormValues {
        purchase: string;
    }

    const formInitialValues: FormValues = {
        purchase: '',
    };

    const daiInputValidationSchema = Yup.object({
        purchase: Yup.number()
            .min(1, 'The value must be superior to 0')
            .max(daiBalance, "You don't have enough DAI")
            .required('Enter the amount of tickets you wish to purchase'),
    });

    type DaInput = {
        field: FieldInputProps<string>;
        form: FormikProps<FormValues>;
        title: string;
        type: string;
    };

    const RenderDaiInput: React.FC<DaInput> = ({
        field: { name: fieldName, ...fieldRest },
        form,
        title,
        type,
    }) => {
        const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            // User can only input round numbers
            event.target.value = event.target.value.slice(0, Infinity);
        };

        const handleMaxBalance = () => {
            form.setFieldValue(fieldName, daiBalance);
        };

        const fieldHasErrors = form.errors[fieldName as keyof FormikErrors<FormValues>];

        return (
            <React.Fragment>
                <StyledLabelContainer>
                    <label htmlFor={fieldName}>{title}</label>
                    <StyledBalance
                        onClick={handleMaxBalance}
                    >{`Max - Balance: ${daiBalance}`}</StyledBalance>
                </StyledLabelContainer>
                <StyledInput
                    {...fieldRest}
                    type={type}
                    id={fieldName}
                    name={fieldName}
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(event as React.ChangeEvent<HTMLInputElement>)
                    }
                    size="large"
                    style={fieldHasErrors && { borderColor: `${red[0]}` }}
                    suffix={<InputDaiSuffix />}
                />
                <StyledErrorMessage name={fieldName} component="div" />
            </React.Fragment>
        );
    };

    const RenderForm: React.FC<{ values: FormValues }> = ({ values }) => (
        <StyledForm>
            <StyledNexDrawDate>{`Tickets purchased are eligible for all prizes after
                        ${nextAwardDate}`}</StyledNexDrawDate>
            <Field
                component={RenderDaiInput}
                type="number"
                name="purchase"
                title="How many tickets do you wish to purchase?"
            />
            <SubmitButtonContainer>
                <Button htmlType="submit" type="primary" size="large">
                    {`Buy ${values.purchase} Pod ${pluralize('ticket', Number(values.purchase))}`}
                </Button>
            </SubmitButtonContainer>
        </StyledForm>
    );

    const RenderTransactionProggress: React.FC<{ values: FormValues }> = ({ values }): any => {
        const {
            hash: transactionHash,
            sent: transactionSent,
            completed: transactionCompleted,
            error: transactionError,
        } = useSelector((state: RootState) => state.transaction);

        if (transactionHash && transactionSent) {
            return (
                <React.Fragment>
                    <Button type="link" size="large" style={{ color: purple[4] }}></Button>
                    <StyledTextLarge>Transaction in progress...</StyledTextLarge>
                    <div>
                        <Throbber />
                    </div>
                    <StyledHref
                        className="ellipsis"
                        target="_blank"
                        href={getEtherscanUrl(chainId as number, 'tx', transactionHash as string)}
                    >
                        {transactionHash}
                    </StyledHref>
                </React.Fragment>
            );
        }

        if (transactionCompleted) {
            return (
                <React.Fragment>
                    <StyledDonut src={Donut} />
                    <StyledTextLarge>
                        <span>You've sucessfully purchased </span>
                        <span>
                            {values.purchase}&nbsp;DONUT&nbsp;Pod&nbsp;
                            {pluralize('ticket!', Number(values.purchase))}
                        </span>
                    </StyledTextLarge>
                    <StyledHref
                        className="ellipsis"
                        href={getEtherscanUrl(chainId as number, 'tx', transactionHash as string)}
                    >
                        {transactionHash}
                    </StyledHref>
                </React.Fragment>
            );
        }

        if (!transactionSent && !transactionCompleted && transactionError) {
            return (
                <React.Fragment>
                    <StyledTextLarge> An error occurred, please retry</StyledTextLarge>
                    <StyledHref
                        href={getEtherscanUrl(chainId as number, 'tx', transactionHash as string)}
                    >
                        {transactionHash}
                    </StyledHref>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <TicketContainer>
                    <Ticket />
                </TicketContainer>
                <StyledTextLarge>Please, approve the transaction in your wallet</StyledTextLarge>
            </React.Fragment>
        );
    };

    const handleSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        depositDaiToDonutPod(
            values.purchase,
            account as string,
            chainId as number,
            library,
            dispatch,
        );
        setFormSubmitted(true);
    };

    const getAsyncValues = async () => {
        const userDaiBalance = await getUserDaiBalance(
            account as string,
            chainId as number,
            library,
        );

        setDaiBalance(Number(utils.formatUnits(userDaiBalance.toString(), 18)));
        setNextAwardDate(getNextAwardDate().format('MMM Do, YYYY'));
    };

    // We only get these values when the modal open or if the account changes
    useEffect(() => {
        getAsyncValues();
    }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <Formik
                initialValues={formInitialValues}
                onSubmit={handleSubmit}
                validationSchema={daiInputValidationSchema}
                validateOnBlur
            >
                {({ values }) =>
                    !formSubmitted ? (
                        <RenderForm values={values} />
                    ) : (
                        <RenderTransactionProggress values={values} />
                    )
                }
            </Formik>
        </React.Fragment>
    );
};

const StyledModalContent = styled(ModalContent)`
    min-height: ${rem(326)};
`;

const WithdrawModal: React.FC<ModalProps> = ({ title, toggleModal }) => {
    const { account, chainId, library } = useWeb3React<Web3Provider>();

    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <ModalHeader>
                <ModalTitle>DONUT Pod: Withdraw</ModalTitle>
            </ModalHeader>
            <StyledModalContent>
                <RenderPurchaseTickets />
            </StyledModalContent>
        </React.Fragment>
    );
};

export default WithdrawModal;
