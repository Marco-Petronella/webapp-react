import { useState } from "react";
import GlobalLoaderContext from "../assets/context/GlobalLoaderContext";

export default function GlobalLoaderProvider({ children }) {
    const [loader, setLoader] = useState(false);

    return (
        <GlobalLoaderContext.Provider
        value={{ 
            loader, 
            setLoader 
        }}>
            {children}
        </GlobalLoaderContext.Provider>
    );
}

