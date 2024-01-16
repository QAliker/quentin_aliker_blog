import { emailValidators, passwordValidators, usernameValidators } from "@/utils/validators"
import Form from "@/web/components/ui/Form"
import { Formik, Field, ErrorMessage } from "formik"
import { object } from "yup"
import { useMutation } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import  Alert from "@/web/components/UI/Alert" 
import Link from "@/web/components/UI/Link"

const initialValues = {
    email: "",
    password: "",
    username: ""
}
const validationSchema = object({
    email: emailValidators.label("E-mail"),
    password: passwordValidators.label("Password"),
    username: usernameValidators.label("username")
})
const SignUpPage = () => {
    const { isSuccess, error,  mutateAsync } = useMutation({
        mutationFn: (values) =>
        apiClient.post("/user", values).then(({ data }) => data),
    })
    const handleSubmit = async (values) => {
        await mutateAsync(values)
        
        return true
    }
    
    if (isSuccess) {
        return (
            <div className="flex flex-col gap-4"><Alert>
            Connected
            </Alert>
            <p>
            <Link href="/sign-in">Go to sign-in page.</Link>
            </p>
            </div>
            )
        }
        return (
            <>
            <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            >
            <Form
            className="flex items-center flex-col gap-4" noValidate>
            <label htmlFor="email">Username</label>
            <Field
            name="username"
            type="text"
            className="border-2 p-2"
            placeholder="Enter a username" />
            <ErrorMessage name="username" component="p" className="text-red-500" />
            <label htmlFor="email">Email</label>
            <Field
            name="email"
            type="email"
            className="border-2 p-2"
            placeholder="Enter a Email" />
            <ErrorMessage name="email" component="p" className="text-red-500" />
            <label htmlFor="password">Password</label>
            <Field
            name="password"
            type="text"
            className="border-2 p-2"
            placeholder="Enter your password" />
            <ErrorMessage name="password" component="p" className="text-red-500" />
            <button
            type="submit"
            className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white">
            Sign Up
            </button>
            </Form>
            </Formik>
            </>
            )
        }
        
        export default SignUpPage