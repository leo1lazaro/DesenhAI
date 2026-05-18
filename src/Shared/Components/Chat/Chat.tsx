import "./Chat.css";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface ChatMessage {
    id: string;
    name: string;
    message: string;
    createdAt?: string;
}

interface Props {
    messages: ChatMessage[];
    onlineUsers: number;
    isConnected: boolean;
    typingUser?: string | null;
    onSendMessage: (message: string) => void;
    onTyping?: () => void;
}

const Chat = ({messages,onlineUsers,isConnected,typingUser,onSendMessage,onTyping}: Props) => {

    const [message, setMessage] = useState("");
    const handleSend = () => {
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage("");
    };

    return (
        <div className="Chat">
            <header className="Chat-header">
                <div className="Chat-status">
                    <div
                        className={
                            isConnected
                                ? "Chat-status-dot online"
                                : "Chat-status-dot offline"
                        }
                    />

                    <span>
                        {
                            isConnected
                                ? "Online"
                                : "Offline"
                        }
                    </span>

                </div>

                <span className="Chat-online-users">
                    {onlineUsers} online
                </span>

            </header>

            {/* MESSAGES */}

            <div className="Chat-messages">
                <AnimatePresence initial={false}>
                    {messages.map(message => {
                        const isMe = message.name === localStorage.getItem("nome");
                        return (
                            <motion.div
                                key={message.id}
                                className={`Chat-message ${isMe ? 'is-me' : ''}`}
                                initial={{ opacity: 0, x: isMe ? 20 : -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <span className="Chat-message-name">
                                    {isMe ? "Você" : message.name}
                                </span>

                                <span className="Chat-message-text">
                                    {message.message}
                                </span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* TYPING */}

            <div className="Chat-typing">
                <AnimatePresence>
                    {typingUser && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                        >
                            {typingUser} está digitando...
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* INPUT */}

            <div className="Chat-input-container">

                <input
                    className="Chat-input"
                    value={message}
                    placeholder="Digite uma mensagem..."
                    onChange={(e) => {

                        setMessage(e.target.value);

                        onTyping?.();

                    }}
                    onKeyDown={(e) => {

                        if (e.key === "Enter") {
                            handleSend();
                        }

                    }}
                />

                <button
                    className="Chat-button"
                    onClick={handleSend}
                >
                    Enviar
                </button>

            </div>

        </div>
    );
};

export default Chat;