import { usernameValidators, passwordValidators } from "@/utils/validators";
import apiClient from "@/web/services/apiClient";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import ErrorMessage from "@/web/components/UI/ErrorMessage";
import { useRouter } from "next/router";
import { object } from "yup";
import { useSession } from "@/web/components/SessionContext";

const initialValues = {
    username: "",
    password: ""
}

const validationSchema = object({
    username: usernameValidators.label("Username"),
    password: passwordValidators.label("Password")
})

const SignInPage = () => {
    const router = useRouter()
    const { saveSessionToken } = useSession()
    const { mutateAsync, error } = useMutation({
        mutationFn: (values) => apiClient.post("/sessions", values),
    })
    const handleSubmit = async (values) => {
        const { result: jwt } = await mutateAsync(values)
        saveSessionToken(jwt)
        router.push("/")
    }

    return(
        <div className="flex flex-col gap-4">
            <ErrorMessage error={error} />
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
            <label htmlFor="password">Password</label>
            <Field
            name="password"
            type="password"
            className="border-2 p-2"
            placeholder="Enter your password" />
            <button
            type="submit"
            className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white">
            Sign In
            </button>
            </Form>
            </Formik>
            </div>
    )
}

export default SignInPage