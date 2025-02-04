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
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';

import TransactionProgress from 'components/Transaction';
import { getUserPendingDeposit, withdrawPendingDeposit } from 'helpers/Pod';
import Dai from 'images/Dai';
import { green, purple, red } from 'styles/colors';
import { size as fontSize } from 'styles/fonts';
import { spacingUnit } from 'styles/variables';

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
    min-height: ${rem(198)};
`;

const SubmitButtonContainer = styled.div`
    align-items: flex-end;
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-top: ${spacingUnit(3)};
`;

const Withdraw: React.FC = (): any => {
    const { account, chainId, library } = useWeb3React<Web3Provider>();

    const dispatch = useDispatch();

    const [podBalance, setPodBalance] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);

    interface FormValues {
        withdraw: string;
    }

    const formInitialValues: FormValues = {
        withdraw: '',
    };

    const daiInputValidationSchema = Yup.object({
        withdraw: Yup.number()
            .min(1, 'The value must be superior to 0')
            .max(podBalance, "You don't have enough tickets")
            .required('Enter the amount of tickets you wish to withdraw'),
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
            form.setFieldValue(fieldName, podBalance);
        };

        const fieldHasErrors = form.errors[fieldName as keyof FormikErrors<FormValues>];

        return (
            <React.Fragment>
                <StyledLabelContainer>
                    <label htmlFor={fieldName}>{title}</label>
                    <StyledBalance
                        onClick={handleMaxBalance}
                    >{`Max - Balance: ${podBalance}`}</StyledBalance>
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
            <Field
                component={RenderDaiInput}
                type="number"
                name="withdraw"
                title="How many tickets do you wish to withdraw?"
            />
            <SubmitButtonContainer>
                <Button htmlType="submit" type="primary" size="large">
                    {`Withdraw ${values.withdraw} Pod ${pluralize(
                        'ticket',
                        Number(values.withdraw),
                    )}`}
                </Button>
            </SubmitButtonContainer>
        </StyledForm>
    );

    const handleSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        // TODO: find a way to widraw commited deposits too
        withdrawPendingDeposit(
            values.withdraw,
            account as string,
            chainId as number,
            library,
            dispatch,
        );
        setFormSubmitted(true);
    };

    const getAsyncValues = async () => {
        // const userPodBalance = await getUserPodBalance(
        //     account as string,
        //     chainId as number,
        //     library,
        // );

        const userPendingDeposit = await getUserPendingDeposit(
            account as string,
            chainId as number,
            library,
        );

        // TODO: use this value once we find a way to withdraw commited deposits
        // const formattedUserPodBalance = Number(utils.formatUnits(userPodBalance.toString(), 18));
        const formattedUserPendingDeposit = Number(
            utils.formatUnits(userPendingDeposit.toString(), 18),
        );

        const totalPodBalance = formattedUserPendingDeposit;

        setPodBalance(totalPodBalance);
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
                    !formSubmitted ? <RenderForm values={values} /> : <TransactionProgress />
                }
            </Formik>
        </React.Fragment>
    );
};

export default Withdraw;
