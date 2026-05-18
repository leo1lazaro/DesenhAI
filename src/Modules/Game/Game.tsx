import './Game.css';

import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Pencil, Brush, Sparkles, Play } from 'lucide-react';
import Chat from '../../Shared/Components/Chat/Chat';
import Canvas from '../../Shared/Components/Canvas/Canvas';
import Carta from '../../Shared/Components/Carta/Carta';
import Timer from '../../Shared/Components/Timer/Timer';

import { useCanvas } from '../../Shared/Components/Canvas/Hooks/useCanvas';
import { useCanvasWS } from './Hooks/useCanvasWs';
import { useChatWS } from './Hooks/useChatWS';
import { useRoomWS } from './Hooks/useRoomWS';
import { socket } from '../../App/WebSocket/Socket';

const Game = () => {
  const location = useLocation();
  const roomId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('room');
  }, [location.search]);

  const { room, startGame } = useRoomWS(roomId);

  useEffect(() => {
    if (room) {
      console.log("[GAME] Room State Updated:", room);
    }
  }, [room]);

  const [showNotification, setShowNotification] = useState(false);

  const me = useMemo(() => {
    const myName = localStorage.getItem("nome");
    return room?.players.find(p => p.id === socket.id) || room?.players.find(p => p.name === myName);
  }, [room?.players, socket.id]);

  const isDrawingPlayer = useMemo(() => {
    return me?.id === room?.currentPlayerId;
  }, [me?.id, room?.currentPlayerId]);

  const canStart = me?.isHost || false;

  const {
    sendDraw,
    sendClear,
    onDraw,
    onClear
  } = useCanvasWS(roomId);

  const {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas
  } = useCanvas({
    width: 600,
    height: 400,
    emitter: sendDraw
  });

  const {
    messages,
    isConnected,
    onlineUsers,
    typingUser,
    sendMessage,
    emitTyping
  } = useChatWS(roomId);

  /*
  |--------------------------------------------------------------------------
  | LOGICA DE RODADAS
  |--------------------------------------------------------------------------
  */
  // Limpar quadro ao trocar de jogador
  useEffect(() => {
    if (room?.currentPlayerId) {
      clearCanvas();
    }
  }, [room?.currentPlayerId, clearCanvas]);

  // Notificação de turno
  useEffect(() => {
    if (isDrawingPlayer && room?.started && room?.currentPlayerId) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowNotification(false);
    }
  }, [isDrawingPlayer, room?.currentPlayerId, room?.started]);

  /*
  |--------------------------------------------------------------------------
  | DRAW REMOTO
  |--------------------------------------------------------------------------
  */
  useEffect(() => {

    const off = onDraw((data) => {

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      if (data.type === "start") {
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
      }

      if (data.type === "move") {
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
      }

      if (data.type === "end") {
        ctx.closePath();
      }
    });

    return off;
  }, []);

  /*
  |--------------------------------------------------------------------------
  | CLEAR GLOBAL
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const off = onClear(clearCanvas);
    return off;
  }, [clearCanvas, onClear]);

  return (
    <section className='Game-container'>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="Turn-notification"
            initial={{ scale: 0, opacity: 0, rotate: -20, x: '-50%', y: '-50%' }}
            animate={{ scale: 1, opacity: 1, rotate: 0, x: '-50%', y: '-50%' }}
            exit={{ scale: 1.5, opacity: 0, rotate: 20, x: '-50%', y: '-50%' }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="Turn-notification-content">
              <Sparkles size={48} className="Turn-notification-icon" />
              <span>SUA VEZ DE DESENHAR!</span>
              <Sparkles size={48} className="Turn-notification-icon" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative floating elements */}
      <motion.div 
        className="Game-decoration" 
        style={{ top: '15%', left: '5%' }}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Pencil size={60} color="#facc15" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Game-decoration" 
        style={{ bottom: '15%', left: '5%' }}
        animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Palette size={70} color="#f472b6" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Game-decoration" 
        style={{ top: '20%', right: '5%' }}
        animate={{ y: [0, -30, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Brush size={65} color="#60a5fa" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Game-decoration" 
        style={{ bottom: '20%', right: '8%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={80} color="#fbbf24" strokeWidth={3} />
      </motion.div>

      <motion.header 
        className="Game-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="Game-header-content">
          <h1 className="Game-logo-title">DESENHAI</h1>
          <div className="Game-logo-subtitle">Adivinhe o que estão desenhando!</div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {room?.started && (
            <Timer duration={60} resetKey={room?.currentPlayerId} />
          )}

          <button 
            className="Game-btn-start" 
            onClick={startGame}
            disabled={!canStart || room?.started}
          >
            <Play size={20} fill={(!canStart || room?.started) ? "#cbd5e1" : "white"} />
            {room?.started ? "PARTIDA EM ANDAMENTO" : "INICIAR PARTIDA"}
          </button>
        </div>
      </motion.header>

      <motion.main 
        className="Game-main"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
      >
        <Canvas
          width={750}
          height={500}
          limpar={sendClear}
          canvasRef={canvasRef}
          startDrawing={startDrawing}
          draw={draw}
          stopDrawing={stopDrawing}
          disabled={!isDrawingPlayer}
        />
      </motion.main>

      <motion.aside 
        className="Game-card-section"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Carta 
          nome={room?.currentCard?.nome || (isDrawingPlayer ? "Sorteando..." : "Aguardando...")}
          tema={room?.currentCard?.tema || room?.theme || "..."}
          src={room?.currentCard?.src || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"}
          delay={0.1}
          oculta={!isDrawingPlayer}
        />
      </motion.aside>

      <motion.section 
        className="Game-chat-section"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Chat
          isConnected={isConnected}
          onlineUsers={onlineUsers}
          messages={messages}
          onSendMessage={sendMessage}
          typingUser={typingUser}
          onTyping={emitTyping}
        />
      </motion.section>
    </section>
  );
};

export default Game;