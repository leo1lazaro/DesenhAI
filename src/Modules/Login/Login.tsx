import './Login.css'
import Stack from '../../Shared/Components/Stack/Stack'
import Card from '../../Shared/Components/Card/Card'
import Label from '../../Shared/Components/Label/Label'
import Input from '../../Shared/Components/Input/Input'
import Button from '../../Shared/Components/Button/Button'
import { useLogin } from './Hooks/useLogin'
import { motion } from 'motion/react'
import { Palette, Pencil, Brush, Sparkles } from 'lucide-react'

const Login = () => {

  const {
    nomeRegistrado,
    setNomeRegistrado,
    handleJoin,
    isPending
  } = useLogin()

  return (
    <section className='Login-container'>
      {/* Decorative floating elements */}
      <motion.div 
        className="Login-decoration" 
        style={{ top: '15%', left: '10%' }}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Pencil size={80} color="#facc15" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Login-decoration" 
        style={{ top: '65%', left: '15%' }}
        animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Palette size={100} color="#f472b6" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Login-decoration" 
        style={{ top: '20%', right: '12%' }}
        animate={{ y: [0, -30, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Brush size={90} color="#60a5fa" strokeWidth={3} />
      </motion.div>
      <motion.div 
        className="Login-decoration" 
        style={{ bottom: '20%', right: '15%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={110} color="#fbbf24" strokeWidth={3} />
      </motion.div>

      <motion.div 
        className="Login-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <div className="Login-logo-area">
          <h1 className="Login-logo-title">DESENHAÍ</h1>
          <div className="Login-logo-subtitle">O jogo de desenhos mais divertido!</div>
        </div>

        <div className="Login-card-wrapper">
          <Card
            alignTitle='center'
            title='Login'
          >
            <div className="Login-stack">
              <Label
                modelo='up'
                text='Como quer ser chamado?'
              >
                <Input
                  tipo='text'
                  value={nomeRegistrado}
                  fn={setNomeRegistrado}
                  placeHolder='Ex: Mestre das Cores...'
                />
              </Label>

              <Button
                text={isPending ? 'Entrando...' : 'COMEÇAR DESENHO!'}
                fn={handleJoin}
              />
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  )
}

export default Login