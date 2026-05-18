import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

interface Appsettings {
    "apiBaseUrl": string;
    "nomeJogo": string;
}

interface AppSettingsContextData {
    settings: Appsettings | null;
    loading: boolean;
}

export const AppSettingsContext =
    createContext<AppSettingsContextData>(
        {} as AppSettingsContextData
    );

interface Props {
    children: ReactNode;
}

export function AppSettingsProvider({
    children,
}: Props) {
    const [settings, setSettings] =
        useState<Appsettings | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function loadSettings() {
            try {
                const response = await fetch(
                    "/appsettings.json"
                );

                const data: Appsettings =
                    await response.json();

                setSettings(data);
            } catch (error) {
                console.error(
                    "Erro ao carregar appsettings:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadSettings();
    }, []);

    return (
        <AppSettingsContext.Provider value={{settings,loading}}>
            {children}
        </AppSettingsContext.Provider>
    )
}