import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate()

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate('/')
    }, 3000)

    return () => clearTimeout(timer)

  }, [navigate])

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>404</h1>

      <h2 style={styles.subtitle}>Página não encontrada</h2>

      <p style={styles.text}>
        A rota que você tentou acessar não existe ou foi movida.
      </p>

      <p style={styles.redirect}>
        Você será redirecionado para o login em 3 segundos...
      </p>

    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
    textAlign: "center",
    padding: "20px"
  },

  title: {
    fontSize: "6rem",
    margin: 0,
    fontWeight: "bold",
    color: "#38bdf8"
  },

  subtitle: {
    fontSize: "2rem",
    margin: "10px 0",
    fontWeight: 600
  },

  text: {
    fontSize: "1rem",
    opacity: 0.8,
    maxWidth: "400px"
  },

  redirect: {
    marginTop: "20px",
    fontSize: "0.9rem",
    opacity: 0.6
  }
}

export default NotFound