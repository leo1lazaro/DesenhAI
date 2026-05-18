import React from 'react';
import './Lobby.css';
import CardSala from '../../Shared/Components/CardSala/CardSala';
import Modal from '../../Shared/Components/Modal/Modal';
import { useLobby } from './Hooks/useLobby';
import { useLobbyWS } from './Hooks/useLobbyWS';
import { Plus, Search, Palette, Pencil, Brush, Sparkles } from 'lucide-react';
import { Temas } from '../../Shared/Constants/Temas';
import { motion } from 'motion/react';

const Lobby: React.FC = () => {
  const { salas, joinRoom, createRoom, error, setError, isJoining, pendingRoomId, setPendingRoomId } = useLobbyWS();
  
  const {
    isModalCreateOpen,
    newRoomName,
    setNewRoomName,
    newRoomTheme,
    setNewRoomTheme,
    openModalCreate,
    closeModalCreate,
    navigateToGame,
    salas: roomsToRender
  } = useLobby(salas);

  // Efeito para navegar se o join for bem sucedido
  React.useEffect(() => {
    if (isJoining && pendingRoomId && !error) {
        // Se após 500ms não houver erro, assumimos sucesso
        const timer = setTimeout(() => {
            if (!error) {
                navigateToGame(pendingRoomId);
                setPendingRoomId(null);
            }
        }, 500);
        return () => clearTimeout(timer);
    }
    
    // Se o isJoining ficou false e não tem erro, mas ainda temos um pendingRoomId
    // Provavelmente o servidor confirmou o sucesso
    if (!isJoining && pendingRoomId && !error) {
        navigateToGame(pendingRoomId);
        setPendingRoomId(null);
    }
  }, [isJoining, pendingRoomId, error, navigateToGame, setPendingRoomId]);

  const handleJoinSala = (id: string) => {
    // Apenas iniciamos o processo de entrar
    joinRoom(id);
  };

  const handleCreateRoom = () => {
    createRoom({ 
      name: newRoomName, 
      theme: newRoomTheme 
    });
    closeModalCreate();
  };

  return (
    <div className="Lobby-container" id="lobby-page">
      {/* Decorative floating elements */}
      <motion.div 
        className="Lobby-decoration" 
        style={{ top: '10%', left: '5%' }}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Pencil size={60} color="#facc15" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Lobby-decoration" 
        style={{ top: '40%', right: '5%' }}
        animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Palette size={70} color="#f472b6" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Lobby-decoration" 
        style={{ bottom: '10%', left: '8%' }}
        animate={{ y: [0, -30, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Brush size={65} color="#60a5fa" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Lobby-decoration" 
        style={{ bottom: '20%', right: '10%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={80} color="#fbbf24" strokeWidth={3} />
      </motion.div>

      {error && (
        <Modal
          isOpen={!!error}
          onClose={() => setError(null)}
          title="Erro ao entrar"
          actionLabel="Entendi"
          onAction={() => setError(null)}
        >
          <div className="Lobby-error-message">
            <p>{error}</p>
          </div>
        </Modal>
      )}

      {isJoining && (
        <div className="Lobby-loading-overlay">
          <div className="Lobby-loader"></div>
          <p>Entrando na sala...</p>
        </div>
      )}

      <motion.header 
        className="Lobby-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="Lobby-header-content">
          <h1 className="Lobby-title">ESCOLHA UMA SALA</h1>
          <p className="Lobby-subtitle">Encontre uma partida ou crie a sua própria!</p>
        </div>
        
        <div className="Lobby-actions">
          <button className="Lobby-btn-create" onClick={openModalCreate}>
            <Plus size={20} />
            Criar Sala
          </button>
        </div>
      </motion.header>

      <motion.main 
        className="Lobby-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {roomsToRender.map((sala, index) => (
          <motion.div
            key={sala.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <CardSala
              id={sala.id}
              name={sala.name}
              theme={sala.theme}
              players={sala.players}
              maxPlayers={sala.maxPlayers}
              onJoin={() => handleJoinSala(sala.id)}
            />
          </motion.div>
        ))}
      </motion.main>

      <Modal
        isOpen={isModalCreateOpen}
        onClose={closeModalCreate}
        title="Criar Nova Sala"
        actionLabel="Criar Sala"
        onAction={handleCreateRoom}
        actionDisabled={!newRoomName.trim()}
      >
        <div className="Lobby-modal-form">
          <div className="Lobby-form-group">
            <label htmlFor="room-name">Nome da Sala</label>
            <input 
              id="room-name"
              type="text" 
              placeholder="Ex: Sala do Gartis" 
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
          </div>

          <div className="Lobby-form-group">
            <label htmlFor="room-theme">Tema da Sala</label>
            <select 
              id="room-theme"
              value={newRoomTheme}
              onChange={(e) => setNewRoomTheme(e.target.value)}
            >
              <option value={Temas.ANIMAIS}>Animais</option>
              <option value={Temas.DISNEY}>Disney</option>
              <option value={Temas.FAMILIA}>Família</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Lobby;
