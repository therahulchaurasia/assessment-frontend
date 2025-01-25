import React, { useEffect } from "react"
import jwt from "jsonwebtoken"
import { deleteCookie, getCookie } from "cookies-next"
import { AuthToken } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { axiosClient } from "@/services/axios.service"
import endpoints from "@/apis/endpoints"

type Props = { children: React.ReactNode }

export default function AuthWrapper({ children }: Props) {
  const authToken = getCookie("authToken")
  const { mutate: getUser } = useMutation({
    mutationKey: ["GET_USER"],
    mutationFn: async () => axiosClient.get(endpoints.my.index),
    onSuccess: async (res) => {
      if (res?.status === 200) {
        console.log(res.data)
      }
    },
    onError: () => {
      deleteCookie("authToken")
    },
  })

  useEffect(() => {
    const decoded = jwt.decode(authToken as string) as AuthToken
    if (decoded) {
      getUser()
    }
  }, [authToken, getUser])

  return <>{children}</>
}
