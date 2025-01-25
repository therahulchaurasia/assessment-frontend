import endpoints from "@/apis/endpoints"
import useTask from "@/hooks/useTask"
import { axiosClient } from "@/services/axios.service"
import { CustomError, TaskData } from "@/types"
import { toastValues } from "@/utils"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { object, string } from "yup"

const validationSchema = object().shape({
  name: string()
    .required()
    .min(2)
    .test(
      "len",
      "Name must be at least 2 characters",
      (val) => val.trim().length >= 2,
    )
    .label("Name"),
  description: string()
    .required()
    .min(2)
    .test(
      "len",
      "Description must be at least 2 characters",
      (val) => val.trim().length >= 2,
    )
    .label("Description"),
  status: string().required().label("Status"),
})

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateTaskModal({
  isOpen,
  onClose,
}: CreateTaskModalProps) {
  const toast = useToast()
  const { createTask } = useTask()
  const { mutateAsync: createTaskMn } = useMutation({
    mutationFn: async (task: TaskData) =>
      await axiosClient.post(endpoints.tasks.index, task),
    onSuccess: async (res) => {
      createTask(res.data.task)
      toast({
        title: "Task Created.",
        description: "Your Task has been created successfully.",
        status: "success",
        ...toastValues,
      })
      resetForm()
      onClose()
    },
    onError: (error: CustomError) => {
      toast({
        title: "Task Creation Failed.",
        description: error.message,
        status: "error",
        ...toastValues,
      })
    },
  })

  const { isSubmitting, setSubmitting, resetForm, ...formik } = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "pending",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true)
      await createTaskMn({
        name: values.name,
        description: values.description,
        status: values.status,
      })
      setSubmitting(false)
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm()
        onClose()
      }}
      isCentered={true}
      motionPreset="slideInBottom"
    >
      <form onSubmit={formik.handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={4} flexDirection={"column"}>
              <FormControl
                isRequired
                isInvalid={
                  formik.touched.name && formik.errors.name ? true : false
                }
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="Defrost the fridge"
                  type="text"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  formik.touched.description && formik.errors.description
                    ? true
                    : false
                }
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="The fridge needs to be defrosted before it gets too icy"
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
              </FormControl>
              <RadioGroup
                mb={6}
                value={formik.values.status}
                onChange={(value) => {
                  formik.setFieldValue("status", value)
                }}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="pending">Pending</Radio>
                  <Radio value="ongoing">On Going</Radio>
                  <Radio value="completed">Completed</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              disabled={isSubmitting}
              onClick={() => {
                resetForm()
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
