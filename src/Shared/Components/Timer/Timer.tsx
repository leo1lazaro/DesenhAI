import "./Timer.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock } from "lucide-react";

interface TimerProps {
    duration: number;
    resetKey: string | number | null;
}

const Timer = ({ duration, resetKey }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration, resetKey]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const isLowTime = timeLeft <= 10;

    return (
        <div className={`Timer-container ${isLowTime ? 'low-time' : ''}`}>
            <Clock size={20} color={isLowTime ? '#ef4444' : '#000'} strokeWidth={3} />
            <div className="Timer-value-wrapper">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={timeLeft}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="Timer-value"
                    >
                        {timeLeft}s
                    </motion.span>
                </AnimatePresence>
            </div>
            <div className="Timer-progress-bg">
                <motion.div 
                    className="Timer-progress-bar"
                    initial={{ width: "100%" }}
                    animate={{ width: `${(timeLeft / duration) * 100}%` }}
                    transition={{ duration: 1, ease: "linear" }}
                />
            </div>
        </div>
    );
};

export default Timer;
