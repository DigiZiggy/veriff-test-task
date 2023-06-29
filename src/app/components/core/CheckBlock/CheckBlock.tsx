import CheckButton from "app/components/core/CheckButton/CheckButton";
import "./CheckBlock.scss";
import {Dispatch, useCallback, useEffect, useRef} from "react";
import {updateCheckValueById} from "app/store/checks/actions";
import {connect} from "react-redux";
import {BOOLEAN, CheckFieldSet, ChecksActionTypes} from "app/store/checks/types";

interface IPropsFromDispatch {
    updateCheckValueById: (id: string, value?: BOOLEAN) => void;
}

interface ICheckBlockProps {
    check: CheckFieldSet;
    index: number;
    isFocused: boolean;
    setFocusedIndex: (index: number) => void;
    setValueById: (id: string) => void
}

type CheckBlockProps = IPropsFromDispatch & ICheckBlockProps;

const CheckBlock = (props: CheckBlockProps) => {
    const { check, isFocused, index, setFocusedIndex, setValueById, updateCheckValueById } = props;
    const disabledCls = check.disabled ? "disabled" : "";
    const focusedCls = isFocused ? "focused" : "";
    const ref = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
        if (isFocused && ref.current) {
            ref.current.focus();
        }
    }, [isFocused]);

    const handleSelect = useCallback(() => {
        setFocusedIndex(index);
        if (!check.disabled) {
            setValueById(check.id);
        }
    }, [index, check.disabled, setFocusedIndex, setValueById]);

    return (
        <div data-testid={"check-block"}
             className={`block ${disabledCls} ${focusedCls}`}
             tabIndex={isFocused ? 0 : -1}
             onKeyUp={handleSelect}
             onClick={handleSelect}
             ref={ref}>
            <div className={"block-title"}>{check.description}</div>
            <CheckButton disabled={check.disabled}
                         setValue={(value?: BOOLEAN) => {
                             setFocusedIndex(index);
                             updateCheckValueById(check.id, value);
                         }}
                         value={check.value}/>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<ChecksActionTypes>) => {
    return {
        updateCheckValueById: (id: string, value?: BOOLEAN) => dispatch(updateCheckValueById({id, value})),
    }
}

export default connect(
    undefined,
    mapDispatchToProps,
)(CheckBlock);
