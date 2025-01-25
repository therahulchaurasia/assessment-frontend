import React, { useEffect } from "react"
import jwt from "jsonwebtoken"
import { deleteCookie, getCookie } from "cookies-next"
import { AuthToken, CustomError } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { axiosClient } from "@/services/axios.service"
import endpoints from "@/apis/endpoints"
import useAuth from "@/hooks/useAuth"
import useTask from "@/hooks/useTask"
import { useToast } from "@chakra-ui/react"
import { toastValues } from "@/utils"

type Props = { children: React.ReactNode }

export default function AuthWrapper({ children }: Props) {
  const toast = useToast()
  const { setUser } = useAuth()
  const { setTasks } = useTask()
  const authToken = getCookie("authToken")

  const { mutate: getTasks } = useMutation({
    mutationKey: ["GET_TASKS"],
    mutationFn: async () => axiosClient.get(endpoints.tasks.index),
    onSuccess: async (res) => {
      if (res?.status === 200) {
        setTasks(res.data.tasks)
      }
    },
    onError: (error: CustomError) => {
      const message = error?.response?.data?.message || error.message
      return toast({
        title: "Error occurred",
        description: message,
        status: "error",
        ...toastValues,
      })
    },
  })

  const { mutate: getUser } = useMutation({
    mutationKey: ["GET_USER"],
    mutationFn: async () => axiosClient.get(endpoints.my.index),
    onSuccess: async (res) => {
      if (res?.status === 200) {
        setUser(res.data)
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
      getTasks()
    }
  }, [authToken, getUser, getTasks])

  return <>{children}</>
}
