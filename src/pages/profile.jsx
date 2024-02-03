import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import Loader from "@/web/components/UI/Loader"
import { Formik, Field, ErrorMessage } from "formik"
import Form from "@/web/components/UI/Form"
import * as yup from "yup"
import { emailValidators, usernameValidators } from "@/utils/validators"
import ProfileStats from "@/web/components/UI/ProfileStats"
import { useAuth } from "@/web/components/useAuth"
export const getServerSideProps = async () => {
  const data = await apiClient("/posts")
  
  return {
      props: { initialData: data},
  }
  // Demander pq toujours faire un getserverside props pour le token
}
const initialValues = {
  username: "",
  email: "",
} 
const validationSchema = yup.object({
  username: usernameValidators.label("username"),
  email: emailValidators.label("email"),
})
const Profile = ({initialData}) => {
  useAuth()
    const { isFetching, data: {result: user }, refetch, } = useQuery({ queryKey: ["user"], queryFn: () => apiClient("/user"), initialData, })

  if(user.email && user.username) {
    initialValues.username = user.username
    initialValues.email = user.email
  }

  const { mutateAsync } = useMutation({
    mutationFn: (values) => 
    apiClient.patch("/user", values).then(({ data }) => data)
})
const handleSubmit = async (values) => {
    await mutateAsync(values)
    await refetch()
}

  
return (
    <div className="relative">
        {isFetching && <Loader />}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
        <Form className="flex items-center flex-col gap-4" noValidate>
        <label htmlFor="username">Username</label>
        <Field name="username" type="text" className="border-2 p-2" placeholder="Enter a username" />
        <ErrorMessage name="username" component="p" className="text-red-500" />
        <label htmlFor="email">Email</label>
        <Field name="email" type="email" className="border-2 p-2" placeholder="Enter your email" />
        <ErrorMessage name="email" component="p" className="text-red-500" />
        <button type="submit" className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"> Update </button>
        </Form>
        </Formik>
        <ProfileStats initialData={initialData}/>
        </div>
  )
}

export default Profile
