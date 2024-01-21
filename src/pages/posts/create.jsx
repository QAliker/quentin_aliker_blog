import { titleValidators, contentValidators } from "@/utils/validators";
import { Formik, Field, ErrorMessage } from "formik";
import Form from "@/web/components/UI/Form";
import FormField from "@/web/components/UI/FormField";
import * as yup from "yup"
import apiClient from "@/web/services/apiClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import config from "@/web/config";
import jsonwebtoken from "jsonwebtoken"
import { useMutation } from "@tanstack/react-query";
const initialValues = {
    title: "",
    content: "",
}

const validationSchema = yup.object({
    title: titleValidators.label("title"),
    content: contentValidators.label("content"),
})

const CreatePosts = () => {
    const router = useRouter()
    const [session, setSession] = useState(null)
    useEffect(() => {
        const jwt = localStorage.getItem(config.security.session.storageKey)
        
        if (!jwt) {
            router.push("/");
            return
        }
        
        const { payload } = jsonwebtoken.decode(jwt)
        
        setSession(payload)
    }, [])
    const { mutateAsync } = useMutation({
        mutationFn: (values) => 
            apiClient.post("/posts", values).then(({ data }) => data)
        
    })
    const handleSubmit = async (values, { resetForm }) => {
        await mutateAsync(values)
        router.push("/")
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
                    Create
                </button>
            </Form>
            {/* Component pour le Formik(formulaire voir commit showcase axios) */}
        </Formik>
        )}
    
    export default CreatePosts