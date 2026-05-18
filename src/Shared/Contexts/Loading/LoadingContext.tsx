import {createContext,type ReactNode,useState} from "react";

interface LoadingContextData {
    showLoading: () => void;
    hideLoading: () => void;
}

export const LoadingContext = createContext({} as LoadingContextData);

interface Props {children: ReactNode}

export function LoadingProvider({
    children,
}: Props) {

    const [loading, setLoading] =
        useState(false);

    function showLoading() {
        setLoading(true);
    }

    function hideLoading() {
        setLoading(false);
    }

    return (
        <LoadingContext.Provider
            value={{
                showLoading,
                hideLoading,
            }}
        >
            {children}

            {loading && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        fontSize: 24,
                        zIndex: 9999,
                    }}
                >
                    Loading...
                </div>
            )}
        </LoadingContext.Provider>
    );
}