"use client"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button, Grid, Box, useDisclosure } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

import Column from "./Column"
import CreateTaskModal from "./CreateTaskModal"
import useTask from "@/hooks/useTask"
import { useMutation } from "@tanstack/react-query"
import { axiosClient } from "@/services/axios.service"
import endpoints from "@/apis/endpoints"

export interface Task {
  id: string
  title: string
  status: "pending" | "ongoing" | "completed"
}

export default function TaskBoard() {
  const { tasks, moveTask } = useTask()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutateAsync: updateTaskMn } = useMutation({
    mutationFn: (data: { taskId: string; newStatus: string }) =>
      axiosClient.patch(endpoints.tasks.index + "/" + data.taskId, data),
    onSuccess: (res) => {
      if (res.status === 200) {
        const task = res.data.task
        moveTask(task._id, task.status)
      }
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const moveTaskFn = async (taskId: string, newStatus: string) => {
    await updateTaskMn({ taskId, newStatus })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box p={4}>
        <Button
          onClick={onOpen}
          leftIcon={<FaPlus size={18} />}
          variant={"solid"}
          colorScheme="blue"
          mb={4}
        >
          Create New Task
        </Button>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          <Column
            title="Pending"
            status="pending"
            tasks={tasks.filter((task) => task.status === "pending")}
            moveTask={moveTaskFn}
          />
          <Column
            title="On Going"
            status="ongoing"
            tasks={tasks.filter((task) => task.status === "ongoing")}
            moveTask={moveTaskFn}
          />
          <Column
            title="Completed"
            status="completed"
            tasks={tasks.filter((task) => task.status === "completed")}
            moveTask={moveTaskFn}
          />
        </Grid>
        <CreateTaskModal
          isOpen={isOpen}
          onClose={onClose}
          // onCreateTask={addTask}
        />
      </Box>
    </DndProvider>
  )
}
