import "./CheckButton.scss";
import {useEffect, useState} from "react";
import {BOOLEAN} from "app/store/checks/types";

interface CheckButtonProps {
    disabled?: boolean;
    setValue: (value?: BOOLEAN) => void;
    value?: BOOLEAN;
}

const BUTTONS = [
    {name: BOOLEAN.YES, index: 0},
    {name: BOOLEAN.NO, index: 1}
]

const CheckButton = (props: CheckButtonProps) => {
    const { disabled, setValue , value} = props;
    const [selected, setSelected] = useState<BOOLEAN|undefined>(value);

    // Set selected if value changes
    useEffect(() => {
        setSelected(value);
    }, [value]);

    const buttons = BUTTONS.map((button) => {
        const selectedCls = selected === button.name ? "selected" : "";
        return <button data-testid={"check-button"}
                       key={button.index}
                       disabled={disabled}
                       type="button"
                       className={`btn btn-outline-secondary ${selectedCls}`}
                       onClick={() => {
                           if (selected === button.name) {
                               setValue(undefined);
                               setSelected(undefined);
                           } else {
                               setValue(button.name);
                               setSelected(button.name);
                           }
                       }}>
            {button.name}
        </button>;
    })
    return (
        <div className={"btn-group"} role="group">
            {buttons}
        </div>
    );
};

export default CheckButton;
