import { deleteCookie } from "cookies-next"
import { create } from "zustand"

type AuthStore = {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
  logoutFn: () => void
}

const useAuth = create<AuthStore>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
  logoutFn: () => {
    set({ isAuth: false })
    deleteCookie("authToken")
    window.location.href = "/login"
  },
}))

export default useAuth
