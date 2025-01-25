import { Box, Heading } from "@chakra-ui/react"
import { useDrop } from "react-dnd"
import SingleTask from "./SingleTask"
import { Task } from "@/types/db"

interface ColumnProps {
  title: string
  status: string
  tasks: Task[]
  moveTask: (taskId: string, status: string) => void
}

export default function Column({
  title,
  status,
  tasks,
  moveTask,
}: ColumnProps) {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item: { id: string }) => moveTask(item.id, status),
  })
  return (
    <Box
      ref={drop}
      bg="gray.100"
      p={4}
      borderRadius="lg"
      shadow="md"
      minW="300px"
    >
      <Heading as="h2" size="md" mb={4}>
        {title}
      </Heading>
      {tasks.map((task) => {
        return <SingleTask key={task._id} id={task._id} task={task} />
      })}
    </Box>
  )
}
