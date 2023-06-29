import * as React from "react";
import "./MessageScreenView.scss";

interface IMessageScreenViewProps {
    buttonLabel?: string;
    className?: string;
    message: string;
    title: string;
    onButtonClick?: () => void;
}

const renderButton = (buttonLabel: string, onButtonClick?: () => void) => {
    return (
        <div className={"content-buttons"}>
            <button type={"button"} className={"btn"} onClick={onButtonClick}>
                {buttonLabel}
            </button>
        </div>
    );
}

const MessageScreenView = (props: IMessageScreenViewProps) => {
    const { buttonLabel, className, message, title, onButtonClick } = props;
    const cls = className ?? "";
    return (
        <div className={"container"}>
            <div className={`content ${cls}`}>
                <div className={"content-title"}>
                    <h1>{title}</h1>
                </div>
                <p className={"content-message"}>{message}</p>
                {!!buttonLabel && renderButton(buttonLabel, onButtonClick)}
            </div>
        </div>
    );
};

export default MessageScreenView;
