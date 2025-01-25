import { Task } from "@/types/db"
import { create } from "zustand"

type TaskStore = {
  tasks: Task[]
  setTasks: (task: Task[]) => void
  createTask: (task: Task) => void
  moveTask: (
    taskId: string,
    newStatus: "pending" | "ongoing" | "completed",
  ) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
}
const useTask = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  createTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  moveTask: (taskId, newStatus) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task,
      ),
    }))
  },
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) })),
}))

export default useTask
