import { titleValidators, contentValidators } from "@/utils/validators"
import { Formik, Field, ErrorMessage } from "formik"
import Form from "@/web/components/UI/Form"
import * as yup from "yup"
import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@tanstack/react-query"
import Loader from "@/web/components/UI/Loader"
import { useAuth } from "@/web/components/useAuth"

export const getServerSideProps = async () => {
    const data = await apiClient(`/posts`)

    
return {
        props: { initialData: data},
    }
}
const initialValues = {
    title: "",
    content: "",
}
const validationSchema = yup.object({
    title: titleValidators.label("title"),
    content: contentValidators.label("content"),
})
const UpdatePost = ({initialData}) => {
    const router = useRouter()
    const {id} = router.query
    useAuth()
    const { isFetching, data: {result: posts}, } = useQuery({ queryKey: ["posts"], queryFn: () => apiClient(`/posts/myposts`), initialData, })
    for (let i = 0; i < posts.length; i+=1) {
        if(posts[i].id === parseInt(id, 10)) {
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="flex items-center flex-col gap-4" noValidate>
        <label htmlFor="title">Title</label>
        <Field name="title" type="text" className="border-2 p-2" placeholder="Enter a title"/>
        <ErrorMessage name="title" component="p" className="text-red-500" />
        <label htmlFor="content">Content</label>
        <Field name="content" component="textarea" cols="85" rows="10" className="border-2" placeholder="Enter your content" />
        <ErrorMessage name="content" component="p" className="text-red-500" />
        <button type="submit" className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white">Update</button>
        </Form>
        </Formik>
        </div>
        )}
        
        export default UpdatePost