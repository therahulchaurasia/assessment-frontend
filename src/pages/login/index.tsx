import endpoints from "@/apis/endpoints"
import AuthLayout from "@/components/wrapper/AuthLayout"
import useAuth from "@/hooks/useAuth"
import { axiosClient } from "@/services/axios.service"
import { loginData, CustomError } from "@/types"
import { generateDays } from "@/utils"
import { emailRegex, toastValues } from "@/utils/default.util"
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
  useToast,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { setCookie } from "cookies-next"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useState } from "react"
import { PiEye, PiEyeClosedLight } from "react-icons/pi"
import { object, string } from "yup"

const validationSchema = object().shape({
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
})

export default function LoginPage() {
  const { setIsAuth } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const handleClick = (
    setter: Dispatch<SetStateAction<boolean>>,
    value: boolean,
  ) => setter(!value)
  const [showPassword, setShowPassword] = useState(false)

  const { mutateAsync: loginMn } = useMutation({
    mutationFn: async (data: loginData) =>
      await axiosClient.post(endpoints.auth.login, data),
    onSuccess: async (res) => {
      const cookieAge = generateDays(31)
      const data = res.data
      if (res.status === 200) {
        setCookie("authToken",  data.token, { maxAge: cookieAge })
        toast({
          title: "Successful Login",
          description: "Welcome back to our platform.",
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
        title: "Error occured",
        description: message,
        status: "error",
        ...toastValues,
      })
    },
  })

  const { isSubmitting, setSubmitting, ...formik } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true)
      await loginMn(values)
      setSubmitting(false)
    },
  })
  return (
    <AuthLayout>
      <Card p={6} gap={5} shadow={"md"} variant={"outline"}>
        <Stack spacing={2}>
          <Heading variant={"h4"}>Login</Heading>
          <Text>Enter your information to login to your account</Text>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Flex gap={4} flexDirection={"column"}>
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
                placeholder="jhonDoe@gmail.com	"
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
                  placeholder="*******"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    icon={showPassword ? <PiEyeClosedLight /> : <PiEye />}
                    aria-label="show/hide btn"
                    h="1.75rem"
                    variant={"outline"}
                    size="sm"
                    onClick={() => handleClick(setShowPassword, showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
            <Flex justifyContent={"center"}>
              <Text>Don't have an account?</Text>
              <Link href="/register" textDecor={"underline"} ml={1}>
                Register
              </Link>
            </Flex>
          </Flex>
        </form>
      </Card>
    </AuthLayout>
  )
}
