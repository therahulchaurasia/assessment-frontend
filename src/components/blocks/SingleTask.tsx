import endpoints from "@/apis/endpoints"
import useTask from "@/hooks/useTask"
import { axiosClient } from "@/services/axios.service"
import { CustomError } from "@/types"
import { Task } from "@/types/db"
import { toastValues } from "@/utils"
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useDrag } from "react-dnd"
import { FaRegTrashCan } from "react-icons/fa6"
export interface TaskProps {
  id: string
  task: Task
}

export default function SingleTask({ id, task }: TaskProps) {
  const { deleteTask } = useTask()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutateAsync: deleteTaskMn } = useMutation({
    mutationFn: async () =>
      await axiosClient.delete(endpoints.tasks.index + "/" + id),
    onSuccess: async (res) => {
      if (res.status === 200) {
        toast({
          title: "Task Deleted",
          description: "Task has been deleted successfully",
          status: "success",
          ...toastValues,
        })
        deleteTask(id)
      }
    },
    onError(error: CustomError) {
      const message = error?.response?.data?.message || error.message
      return toast({
        title: "Error occurred",
        description: message,
        status: "error",
        ...toastValues,
      })
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const bgColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <>
      <Box
        ref={drag}
        as={Flex}
        justifyContent={"space-between"}
        alignItems={"start"}
        opacity={isDragging ? 0.5 : 1}
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        p={4}
        mb={2}
        shadow="sm"
        _hover={{ shadow: "md" }}
      >
        <Stack spacing={4}>
          <Heading fontSize={"xl"}>{task?.name}</Heading>
          <Text>{task?.description}</Text>
        </Stack>
        <IconButton
          aria-label="delete"
          icon={<FaRegTrashCan />}
          variant={"ghost"}
          colorScheme="red"
          onClick={onOpen}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this task?</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                await deleteTaskMn()
                onClose()
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
