import * as React from "react";
import {BOOLEAN, CheckFieldSet, CheckResult, ChecksActionTypes} from "app/store/checks/types";
import CheckBlock from "app/components/core/CheckBlock/CheckBlock";
import {Dispatch} from "react";
import {postCheckResults} from "app/store/checks/actions";
import {connect} from "react-redux";
import useKeyEvents from "app/hooks/keyEvents";

interface IPropsFromDispatch {
    saveCheckResults: (checkResults: CheckResult[]) => void;
}

interface IChecksListViewProps {
    checks: CheckFieldSet[];
}

type ChecksListViewProps = IPropsFromDispatch & IChecksListViewProps;

const packForSave = (checks: CheckFieldSet[]): CheckResult[] | undefined => {
    const negativeResultCheck: CheckFieldSet | undefined = checks.find((check: CheckFieldSet) =>
        check.value === BOOLEAN.NO);
    if (!!negativeResultCheck?.value) {
        return [{
            checkId: negativeResultCheck.id,
            result: negativeResultCheck.value.toLowerCase()
        } as CheckResult];
    }
    return checks.filter((c: CheckFieldSet) => !!c.value).map((check: CheckFieldSet) => {
        return {
            checkId: check.id,
            result: check.value?.toLowerCase()
        } as CheckResult
    });
}

const renderCheck = (index: number, check: CheckFieldSet, setFocusedIndex: (i: number) => void,
                     setValueById: (id: string) => void, focusedIndex?: number) => {
    return <CheckBlock key={check.id}
                       index={index}
                       isFocused={focusedIndex === index}
                       check={check}
                       setValueById={setValueById}
                       setFocusedIndex={setFocusedIndex}/>;
}

const getPageContent = (checks: CheckFieldSet[], saveCheckResults: (checkResults: CheckResult[]) => void,
                        setFocus: (i: number) => void, setValueById: (id: string) => void, focusedIndex?: number) => {
    const content = checks.map((check: CheckFieldSet, index: number) =>
        renderCheck(index, check, setFocus, setValueById, focusedIndex)
    );
    const isBtnActive = checks.some((check: CheckFieldSet) => check.value === BOOLEAN.NO && !check.disabled) ||
        checks.every((check: CheckFieldSet) => check.value === BOOLEAN.YES && !check.disabled);

    return <React.Fragment>
        <div className={"checks-list"}>
            {content}
        </div>
        <div className={"content-buttons"}>
            <button type="button"
                    disabled={!isBtnActive}
                    className={"btn btn-success"}
                    onClick={() => {
                        const checkResults: CheckResult[]|undefined = packForSave(checks);
                        if (!!checkResults) {
                            saveCheckResults(checkResults);
                        }
                    }}>Submit</button>
        </div>
    </React.Fragment>;
}

const ChecksListView = (props: ChecksListViewProps) => {
    const { checks, saveCheckResults } = props;
    const [focusedIndex, setFocusedIndex, setValueById] = useKeyEvents(checks ?? []);
    const content = getPageContent(checks, saveCheckResults, setFocusedIndex, setValueById, focusedIndex);

    return (
        <div className={"container"}>
            <div className={"content"}>
                {content}
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<ChecksActionTypes>) => {
    return {
        saveCheckResults: (checkResults: CheckResult[]) => dispatch(postCheckResults(checkResults)),
    }
}

export default connect(
    undefined,
    mapDispatchToProps,
)(ChecksListView);
