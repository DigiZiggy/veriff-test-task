import {useCallback, useEffect, useState} from "react";
import {BOOLEAN, CheckFieldSet} from "app/store/checks/types";
import {useDispatch} from "react-redux";
import {updateCheckValueById} from "app/store/checks/actions";

function useKeyEvents(checks: CheckFieldSet[]) {
    const [focusIndex, setFocusIndex] = useState<number|undefined>(undefined);
    const [checkId, setCheckId] = useState<string|undefined>(undefined);
    const dispatch = useDispatch();

    const handleKeyDown = useCallback((event: any) => {
        const checkIdIndex = checks.findIndex((check) => check.id === checkId);

        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                if (focusIndex !== undefined) {
                    setFocusIndex(focusIndex === 0 ? checks.length - 1 : focusIndex - 1);
                }
                break;
            case "ArrowDown":
                event.preventDefault();
                if (focusIndex !== undefined) {
                    setFocusIndex(focusIndex === checks.length - 1 ? 0 : focusIndex + 1);
                }
                break;
            case "1":
                event.preventDefault();
                if (!!checkId && checkIdIndex === focusIndex) {
                    dispatch(updateCheckValueById({
                        id: checkId,
                        value: BOOLEAN.YES
                    }));
                }
                break;
            case "2":
                event.preventDefault();
                if (!!checkId && checkIdIndex === focusIndex) {
                    dispatch(updateCheckValueById({
                        id: checkId,
                        value: BOOLEAN.NO
                    }));
                }
                break;
        }
    }, [checks.length, focusIndex, setFocusIndex, checkId]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        // cleanup
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return [focusIndex, setFocusIndex, setCheckId] as const;
}

export default useKeyEvents;
