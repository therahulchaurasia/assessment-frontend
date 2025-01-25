import { Box, Heading } from "@chakra-ui/react"
import { useDrop } from "react-dnd"
import SingleTask from "./SingleTask"
import { Task } from "@/types/db"
import { useEffect, useRef } from "react"

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
  const boxRef = useRef<HTMLDivElement>(null)

  // Combine refs: Chakra's `Box` with `react-dnd`'s `drop` ref
  useEffect(() => {
    if (boxRef.current) {
      drop(boxRef.current)
    }
  }, [drop])
  return (
    <Box
      ref={boxRef}
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
