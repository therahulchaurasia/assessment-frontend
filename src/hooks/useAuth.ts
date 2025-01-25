import { User } from "@/types/db"
import { deleteCookie } from "cookies-next"
import { create } from "zustand"

type AuthStore = {
  user: User
  setUser: (user: User) => void
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
  logoutFn: () => void
}

const useAuth = create<AuthStore>((set) => ({
  user: {} as User,
  setUser: (user) => set({ user }),
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
  logoutFn: () => {
    set({ isAuth: false })
    deleteCookie("authToken")
    window.location.href = "/login"
  },
}))

export default useAuth
