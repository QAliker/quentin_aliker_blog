import { titleValidators, contentValidators } from "@/utils/validators";
import { ErrorMessage, Field, Form, Formik, For } from "formik";
import * as yup from "yup"

const initialValues = {
    title: "",
    content: "",
}

const validationSchema = yup.object({
    title: titleValidators.label("title"),
    content: titleValidators.label("content"),
})

const createPosts = () => {
    const handleSubmit = (values) => {
        console.log(values)
    }
    return (
        <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
            <Form
            className="flex items-center flex-col gap-4" noValidate>
                <Field
                name="title"
                type="text"
                className="border-2 p-2"
                placeholder="Enter a title" />
                <ErrorMessage name="title" component="p" className="text-red-500" />
                <Field
                name="content"
                component="textarea"
                rows="2"
                className="border-2 px-[25rem]"
                placeholder="Enter your content"/>
                <ErrorMessage name="content" component="p" className="text-red-500" />
                <button
                type="submit"
                className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white">
                    Submit
                    </button>
            </Form>
        </Formik>
        )}

export default createPosts