import { titleValidators, contentValidators } from "@/utils/validators";
import { Formik, Field, ErrorMessage } from "formik";
import Form from "@/web/components/UI/Form";
import FormField from "@/web/components/UI/FormField";
import * as yup from "yup"
import apiClient from "@/web/services/apiClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import config from "@/web/config";
import { useQuery } from "@tanstack/react-query";
import jsonwebtoken from "jsonwebtoken"
import { useMutation } from "@tanstack/react-query";
import Loader from "@/web/components/UI/Loader";

export const getServerSideProps = async () => {
    const data = await apiClient("/posts")
    return {
        props: { initialData: data},
    }
}
// Demander a avetis pour opti le code 
const initialValues = {
    title: "",
    content: "",
}

const validationSchema = yup.object({
    title: titleValidators.label("title"),
    content: contentValidators.label("content"),
})

const update = ({initialData}) => {
    const router = useRouter();
    const id = router.query.id
    
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
    const {
        isFetching,
        data: 
        {result: posts,
        },
    } = useQuery({
        queryKey: ["posts"],
        queryFn: () => apiClient("/posts/myposts"),
        initialData,
    })
    for (let i = 0; i < posts.length; i++) {
        if(posts[i].id === parseInt(id)){
            initialValues.title = posts[i].title
            initialValues.content = posts[i].content
        }
    }
    const { mutateAsync } = useMutation({
        mutationFn: (values) => 
        apiClient.patch(`/posts/${id}`, values).then(({ data }) => data)
        
    })
    const handleSubmit = async (values, { resetForm }) => {
        await mutateAsync(values)
        router.push("/posts/myposts")
        
        resetForm()
    }
    
    return (
        <div className="relative">
        {isFetching && <Loader />}
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
        placeholder="Enter a title"
        />
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
        Update
        </button>
        </Form>
        {/* Component pour le Formik(formulaire voir commit showcase axios) */}
        </Formik>
        </div>
        )}
        
        export default update