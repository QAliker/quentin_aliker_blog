import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Loader from "@/web/components/UI/Loader"
import jsonwebtoken from "jsonwebtoken"
import config from "@/web/config"
import Post from "@/web/components/Posts/Posts"
import Comments from "@/web/components/comments/Comments"

const InitialValues = {
    content: ""
}
export const getServerSideProps = async () => {
    const data = await apiClient("/posts")
    
    
    return {
        props: { initialData: data},
    }
}
const PostsView = ({initialData}) => {
    const [session, setSession] = useState({user: 0, role: 0})
    const router = useRouter()
    useEffect(() => {
        const jwt = localStorage.getItem(config.security.session.storageKey)
        
        if (!jwt) {
            router.push("/sign-up")
            
            return
        }

        const { payload } = jsonwebtoken.decode(jwt)
        setSession(payload)
    }, [router])
    const queryId = router.query.postId
    const { isFetching, data: {result: onePost }, } = useQuery({ queryKey: ["onePost"], queryFn: () => apiClient(`/posts/${queryId}`), initialData, })
    const { data:  {result: comments}, refetch, } = useQuery({ queryKey: ["comments"], queryFn: () => apiClient(`/comments/${queryId}`), initialData, })
    const {mutateAsync} = useMutation({ mutationFn: (values) => apiClient.post(`/comments/${queryId}`, values).then(({data}) => data), })
    const handleComments = async () => { 
        const oneComments = document.querySelector("#comment")
        const comment = oneComments.value
        InitialValues.content = comment
        await mutateAsync(InitialValues)
        comments.value = ""
        await refetch()
    }
    const userIsAuthor = (user) => session.id === user.id

    return (
        <div className="relative">
        {isFetching && <Loader />}
        <Post onePost={onePost} username="somebody" />
        <Comments comments={comments} userIsAuthor={userIsAuthor} handleComments={handleComments}
        />
        </div>
        )
    }
    
    export default PostsView