import endpoints from "@/apis/endpoints"
import AuthLayout from "@/components/wrapper/AuthLayout"
import { axiosClient } from "@/services/axios.service"
import { emailRegex, generateDays, toastValues } from "@/utils/index"
import {
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { setCookie } from "cookies-next"
import { useFormik } from "formik"
import { Dispatch, SetStateAction, useState } from "react"
import { PiEye, PiEyeClosedLight } from "react-icons/pi"
import { object, string } from "yup"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { registrationData, CustomError } from "@/types"
import useAuth from "@/hooks/useAuth"

const validationSchema = object().shape({
  name: string()
    .required()
    .min(2)
    .test(
      "len",
      "Name be at least 2 characters",
      (val) => val.trim().length >= 2,
    )
    .label("Name"),
  email: string()
    .email()
    .matches(emailRegex, "Invalid Email")
    .required()
    .label("Email"),
  password: string()
    .min(6)
    .required()
    .test(
      "len",
      "Password must be at least 6 characters",
      (val) => val.trim().length >= 6,
    )
    .label("Password"),
  confirmPassword: string()
    .required()
    .test("password-match", "Passwords must match", function (value) {
      return this.parent.password === value
    }),
})

export default function RegisterPage() {
  const { setIsAuth } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const handleClick = (
    setter: Dispatch<SetStateAction<boolean>>,
    value: boolean,
  ) => setter(!value)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { mutateAsync: registerMn } = useMutation({
    mutationFn: async (data: registrationData) =>
      await axiosClient.post(endpoints.auth.register, data),
    onSuccess: async (res) => {
      const cookieAge = generateDays(31)
      const data = res.data
      if (res.status === 201) {
        setCookie("authToken", data.token, { maxAge: cookieAge })
        toast({
          title: "Account created.",
          description: "Welcome to our platform.",
          status: "success",
          ...toastValues,
        })
        setIsAuth(true)
        router.push("/")
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

  const { isSubmitting, setSubmitting, ...formik } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true)
      await registerMn({
        name: values.name,
        email: values.email,
        password: values.password,
      })
      setSubmitting(false)
    },
  })
  return (
    <AuthLayout>
      <Card p={6} gap={5} shadow={"md"} variant={"outline"}>
        <Stack spacing={2}>
          <Heading variant={"h4"}>Register</Heading>
          <Text>Enter your information to create an account</Text>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
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
                placeholder="Jhon Doe"
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
                formik.touched.email && formik.errors.email ? true : false
              }
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                placeholder="jhondoe@gmail.com"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                formik.touched.password && formik.errors.password ? true : false
              }
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    icon={showPassword ? <PiEyeClosedLight /> : <PiEye />}
                    aria-label="show/hide btn"
                    variant={"outline"}
                    h="1.75rem"
                    size="sm"
                    onClick={() => handleClick(setShowPassword, showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? true
                  : false
              }
            >
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  pr="4.5rem"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat password again"
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    icon={
                      showConfirmPassword ? <PiEyeClosedLight /> : <PiEye />
                    }
                    variant={"outline"}
                    aria-label="show/hide btn"
                    h="1.75rem"
                    size="sm"
                    onClick={() =>
                      handleClick(setShowConfirmPassword, showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {formik.errors.confirmPassword}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
            <Flex justifyContent={"center"}>
              <Text>Alread have an account?</Text>
              <Link href="/login" textDecor={"underline"} ml={1}>
                Log in
              </Link>
            </Flex>
          </Flex>
        </form>
      </Card>
    </AuthLayout>
  )
}
