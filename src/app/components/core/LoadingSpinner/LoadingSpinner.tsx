import * as React from "react";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
    return (
        <div className={"container"}>
            <div className={"content"}>
                <div data-testid={"loading-spinner"} className={"spinner spinner-border"} role="status">
                    <span className={"visually-hidden"}>Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
