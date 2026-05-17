import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SalaData } from '../../../Shared/Components/CardSala/Mocks/SalaMocks';

export const useLobby = (salasIniciais: SalaData[]) => {
  const navigate = useNavigate();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomTheme, setNewRoomTheme] = useState('1'); // Padrão DISNEY

  const openModalCreate = () => {
    setNewRoomName('');
    setNewRoomTheme('1');
    setIsModalCreateOpen(true);
  };

  const closeModalCreate = () => setIsModalCreateOpen(false);

  const navigateToGame = (id: string) => {
    console.log(`Navegando para o jogo: ${id}`);
    navigate(`/game?room=${id}`);
  };

  return {
    isModalCreateOpen,
    newRoomName,
    setNewRoomName,
    newRoomTheme,
    setNewRoomTheme,
    openModalCreate,
    closeModalCreate,
    navigateToGame,
    salas: salasIniciais
  };
};
