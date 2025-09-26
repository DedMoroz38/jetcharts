import { useEffect, useState } from "react";
import type { ErrorT } from "../types";

export const useError = (error: ErrorT) => {
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        if (error) {
            setShowErrorPopup(true);
        }
    }, [error]);

    return { showErrorPopup, setShowErrorPopup };
}