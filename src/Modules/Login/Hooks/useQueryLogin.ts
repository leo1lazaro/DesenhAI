import { useMutation } from "@tanstack/react-query"
import type { LoginReq } from "../../../Shared/Types/Request/LoginReq"
import { endpoints } from "../../../App/Config/Endpoints"

export function useQueryLogin() {

  return useMutation({
    mutationFn: async (credentials: LoginReq) => {
      console.log('MUTATION EXECUTOU')
      const response = await endpoints.login.autenticar(credentials)
      console.log('RESPONSE', response)
      return response.data
    },

    meta: {
      showError: true,
      showEmptyNotify: true
    }
  })
}