import React from 'react';
import './Carta.css';
import { motion } from 'motion/react';

import { Temas } from '../../Constants/Temas';

interface CartaProps {
  nome: string;
  tema: Temas | string;
  src: string;
  delay?: number;
  oculta?: boolean;
}

const getTemaLabel = (tema: Temas | string) => {
  if (typeof tema === 'string') return tema;
  
  switch (tema) {
    case Temas.DISNEY: return 'Disney';
    case Temas.ANIMAIS: return 'Animais';
    case Temas.FAMILIA: return 'Família';
    default: return 'Desconhecido';
  }
};

const Carta: React.FC<CartaProps> = ({ nome, tema, src, delay = 0, oculta = false }) => {
  const temaLabel = getTemaLabel(tema);

  const resolveSrc = (path: string) => {
    if (path.startsWith('..') || path.startsWith('imagensDisney')) {
      const finalPath = path.startsWith('imagensDisney') ? `../../../assets/${path}` : path;
      try {
        return new URL(finalPath, import.meta.url).href;
      } catch (e) {
        return path;
      }
    }
    return path;
  };

  const [imageUrl, setImageUrl] = React.useState(resolveSrc(src));
  const [hasFallback, setHasFallback] = React.useState(false);

  React.useEffect(() => {
    setImageUrl(resolveSrc(src));
    setHasFallback(false);
  }, [src]);

  const handleImageError = () => {
    if (!hasFallback) {
      if (imageUrl.includes('.png')) {
        setImageUrl(imageUrl.replace('.png', '.jpg'));
      } else if (imageUrl.includes('.jpg')) {
        setImageUrl(imageUrl.replace('.jpg', '.png'));
      }
      setHasFallback(true);
    }
  };

  return (
    <motion.article 
      className={`Carta-container ${oculta ? 'oculta' : ''}`}
      initial={{ opacity: 0, y: 30, rotateY: 90 }}
      animate={{ opacity: 1, y: 0, rotateY: oculta ? 0 : 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="Carta-shine" />
      
      {oculta ? (
        <div className="Carta-back">
          <div className="Carta-back-logo">?</div>
          <div className="Carta-back-pattern" />
          <div className="Carta-back-text">ADIVINHE!</div>
        </div>
      ) : (
        <>
          {/* Decoração superior com o Título */}
          <header className="Carta-header">
            <div className="Carta-banner-top">
              <h3 className="Carta-title">{nome}</h3>
            </div>
          </header>
          
          {/* Área Central da Imagem */}
          <main className="Carta-image-wrapper">
            <img 
              src={imageUrl} 
              onError={handleImageError}
              alt={nome} 
              className="Carta-image" 
              referrerPolicy="no-referrer"
            />
          </main>
          
          {/* Rodapé com Tema */}
          <footer className="Carta-footer">
            <span className="Carta-tema-label">Tema</span>
            <span className="Carta-tema-valor">{temaLabel}</span>
          </footer>
        </>
      )}

      {/* Detalhes Decorativos Laterais */}
      <div className="Carta-decor-left" />
      <div className="Carta-decor-right" />
    </motion.article>
  );
};

export default Carta;
