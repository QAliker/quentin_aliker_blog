import { titleValidators, contentValidators } from "@/utils/validators";
import { Formik, Field, ErrorMessage } from "formik";
import Form from "@/web/components/UI/Form";
import FormField from "@/web/components/UI/FormField";
import * as yup from "yup"
import axios from "axios";

const initialValues = {
    title: "",
    content: "",
}

const validationSchema = yup.object({
    title: titleValidators.label("title"),
    content: contentValidators.label("content"),
})

const createPosts = () => {
    const handleSubmit = async (values, { resetForm }) => {
        const { data } = await axios.post("http://localhost:3000/api/posts", values)
        console.log(values, data)
        
        resetForm()
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            <Form
                className="flex items-center flex-col gap-4" noValidate>
                <label htmlFor="title">Title</label>
                <Field
                    name="title"
                    type="text"
                    className="border-2 p-2"
                    placeholder="Enter a title" />
                <ErrorMessage name="title" component="p" className="text-red-500" />
                <label htmlFor="content">Content</label>
                <Field
                    name="content"
                    component="textarea"
                    cols="85"
                    rows="10"
                    className="border-2"
                    placeholder="Enter your content" />
                <ErrorMessage name="content" component="p" className="text-red-500" />
                <button
                    type="submit"
                    className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white">
                    Submit
                </button>
            </Form>
            {/* Component pour le Formik(formulaire voir commit showcase axios) */}
        </Formik>
        )}
    
    export default createPosts