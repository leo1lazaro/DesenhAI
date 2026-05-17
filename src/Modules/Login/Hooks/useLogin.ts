import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryLogin } from "./useQueryLogin"
import { useNotification } from "../../../Shared/Contexts/Notification/Hooks/useNotification"
import { NotificationType } from "../../../Shared/Constants/NotificationEnum"

export const useLogin = () => {

    const {notify} = useNotification()

    const [nomeRegistrado, setNomeRegistrado] = useState<string>('')
    const loginMutation = useQueryLogin()
    const navigate = useNavigate()
    const handleJoin = () => {

        console.log("CLICOU")
        console.log("VALOR:", nomeRegistrado)

        if (!nomeRegistrado.trim() || nomeRegistrado.length === 0) {
            console.log("NOME VAZIO")
            notify(NotificationType.ERROR ,"Erro",'Por favor, insira um nome válido.')
            return
        }

        console.log("ANTES MUTATE")

        loginMutation.mutate(
            { name: nomeRegistrado },
            {
                onSuccess: (response) => {
                    console.log("SUCCESS:", response)
                    localStorage.setItem('nome', nomeRegistrado)
                    notify(NotificationType.SUCCESS, 'Seja bem-vindo', `Divirta-se ${nomeRegistrado}`)   
                    navigate('/lobby')
                },
                onError: (error) => {
                    console.log("ERRO:", error)
                }
            }
        )
    }

    return {
        nomeRegistrado,
        setNomeRegistrado,
        handleJoin,
        isPending: loginMutation.isPending,
        data: loginMutation.data
    }
}