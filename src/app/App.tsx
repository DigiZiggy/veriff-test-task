import * as React from 'react';
import {Dispatch, useEffect, useState} from 'react';
import {CheckFieldSet, ChecksActionTypes, CheckError} from "app/store/checks/types";
import {connect} from "react-redux";
import {getChecksRequest} from "app/store/checks/actions";
import {IRootState} from "app/store/root.types";
import "./App.scss";
import LoadingSpinner from "app/components/core/LoadingSpinner/LoadingSpinner";
import MessageScreenView from "app/components/views/MessageScreenView/MessageScreenView";
import ChecksListView from "app/components/views/ChecksListView/ChecksListView";

interface IPropsFromDispatch {
    loadChecks: () => void;
}

interface IPropsFromState {
    checkFieldSets?: CheckFieldSet[];
    error?: CheckError;
    loaded: boolean;
    showSuccess: boolean;
}

type AppProps = IPropsFromDispatch & IPropsFromState;

function App(props: AppProps) {
    const {checkFieldSets, error, loaded, loadChecks, showSuccess} = props;
    const [checks, setChecks] =
        useState<CheckFieldSet[]|undefined>(undefined);
    const [errorMessage, setErrorMessage] =
        useState<string|undefined>(undefined);
    const [successMessage, setSuccessMessage] =
        useState<string|undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(!loaded);

    // Load checks
    useEffect(() => {
        loadChecks();
    }, []);

    // Set checks, error and success message when loaded
    useEffect(() => {
        if (!loaded) {
            setIsLoading(true);
        }
        if (loaded && !!checkFieldSets) {
            setErrorMessage(undefined);
            setChecks(checkFieldSets);
            setIsLoading(false);
            setSuccessMessage(undefined);
        }
        if (loaded && !!error) {
            setErrorMessage(error.message);
            setChecks(undefined);
            setIsLoading(false);
            setSuccessMessage(undefined);
        }
        if (loaded && showSuccess) {
            setErrorMessage(undefined);
            setChecks(undefined);
            setIsLoading(false);
            setSuccessMessage("Your verification data has been successfully submitted.");
        }
    }, [checkFieldSets, error, loaded, loadChecks, showSuccess]);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (!!errorMessage) {
        return <MessageScreenView buttonLabel={"Try again"}
                                  className={"error-content"}
                                  message={errorMessage}
                                  title={"Oops!"}
                                  onButtonClick={loadChecks}/>
    }
    if (!!successMessage) {
        return <MessageScreenView buttonLabel={"Continue"}
                                  className={"success-content"}
                                  message={successMessage}
                                  title={"Thank you!"}/>
    }
    return (
        <ChecksListView checks={checks || []}/>
    );
}

function mapStateToProps({checksState}: IRootState) {
    return {
        checkFieldSets: checksState?.data,
        error: checksState?.error,
        loaded: checksState?.loaded,
        showSuccess: checksState?.showSuccess
    };
}

const mapDispatchToProps = (dispatch: Dispatch<ChecksActionTypes>) => {
    return {
        loadChecks: () => dispatch(getChecksRequest()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
