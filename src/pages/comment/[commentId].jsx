import { contentValidators } from "@/utils/validators"
import { Formik, Field, ErrorMessage } from "formik"
import Form from "@/web/components/UI/Form"
import * as yup from "yup"
import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"
import { useQuery, useMutation  } from "@tanstack/react-query"
import Loader from "@/web/components/UI/Loader"
import { useAuth } from "@/web/components/useAuth"

export const getServerSideProps = async () => {
    const data = await apiClient(`/posts`)

    
return {
        props: { initialData: data},
    }
}
const initialValues = {
    content: "",
}
const validationSchema = yup.object({
    content: contentValidators.label("comment"),
})
const CommentsUpdate = ({initialData}) => {
    useAuth()
    const router = useRouter()
    const id = router.query.commentId
    const { isFetching, data:  {result: comment}, } = useQuery({ queryKey: ["comment"], queryFn: () => apiClient(`/comment/${id}`), initialData })
    initialValues.content = comment.content
    const { mutateAsync } = useMutation({ mutationFn: (values) => apiClient.patch(`/comment/${id}`, values).then(({ data }) => data) })
    const handleSubmit = async (values, { resetForm }) => {
        await mutateAsync(values)
        resetForm()
        router.push("/")
    }
    
    return (
        <div className="relative">
        {isFetching && <Loader />}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="flex items-center flex-col gap-4" noValidate>
        <label htmlFor="content">Comment</label>
        <Field name="content" component="textarea" className="border-2 p-4 w-full" placeholder="Enter your comment here." />
        <ErrorMessage name="title" component="p" className="text-red-500" />
        <button type="submit" className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"> Update </button>
        </Form>
        </Formik>
        </div>
        )}
        
        export default CommentsUpdate