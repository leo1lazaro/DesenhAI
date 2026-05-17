import {
    createContext,
    type ReactNode,
    useState,
} from "react";

import { NotificationType }
    from "../../../Shared/Constants/NotificationEnum"

interface Notification {
    id: number;

    type: NotificationType;

    title: string;

    message: string;
}

interface NotificationContextData {

    notify: (
        type: NotificationType,
        title: string,
        message: string
    ) => void;

}

export const NotificationContext =
    createContext(
        {} as NotificationContextData
    );

interface Props {
    children: ReactNode;
}

export function NotificationProvider({
    children,
}: Props) {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    function notify(type: NotificationType, title: string, message: string) {

        const id = Date.now();

        setNotifications(old => [...old, { id, type, title, message }]);

        setTimeout(() => {

            setNotifications(old =>
                old.filter(
                    x => x.id !== id
                )
            );

        }, 3000);
    }

    return (

        <NotificationContext.Provider
            value={{
                notify,
            }}
        >
            {children}

            <div
                style={{
                    position: "fixed",
                    top: 20,
                    right: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    zIndex: 9999,
                }}
            >

                {notifications.map(notification => (

                    <div
                        key={notification.id}
                        style={{
                            background:
                                notification.type === NotificationType.ERROR
                                    ? "#ff4d4f"
                                    : notification.type === NotificationType.SUCCESS
                                        ? "#52c41a"
                                        : "#1677ff",
                            color: "#fff",
                            padding: "12px 18px",
                            borderRadius: 8,
                            minWidth: 250,
                        }}>
                        <strong>{notification.title}</strong>
                        <div>{notification.message}</div>

                    </div>

                ))}

            </div>

        </NotificationContext.Provider>

    );
}