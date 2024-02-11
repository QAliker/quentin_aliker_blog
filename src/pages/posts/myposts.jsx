import apiClient from "@/web/services/apiClient"
import Pagination from "@/web/components/UI/Pagination"
import { useMutation, useQuery } from "@tanstack/react-query"
import Loader from "@/web/components/UI/Loader"
import { useRouter } from "next/router"
import { useAuth } from "@/web/components/useAuth"
import EditableCard from "@/web/components/cards/EditableCard"

export const getServerSideProps = async ({query: { page } }) => {
    const data = await apiClient("/posts", { params: { page } })
    
    return {
        props: { initialData: data},
    }
}
const Myposts = ({ initialData }) => {
    useAuth()
    const router = useRouter()
    const { query } = useRouter()
    const page = Number.parseInt(query.page || "1", 10)
    const {isFetching, data: {result: posts, meta: { count } }, refetch } = useQuery({ queryKey: ["posts", page], queryFn: () => apiClient("/posts/myposts", { params: { page } }), initialData, })
    const { mutateAsync: deletePost } = useMutation({ mutationFn: (post) => apiClient.delete(`/posts/${post}`) })
    const handleClickDelete = async (id) => {
        const postId = Number.parseInt(id, 10)
        await deletePost(postId)
        await refetch()
    }
    const goUpdate = (title) => {
        router.push({
            pathname: `/posts/update/${title}`,
        })
        }

    return (
        <div className="relative">
        {isFetching && <Loader />}
        <div className="flex justify-around p-2 flex-wrap">
        {posts.map(({ id, title, content, createdAt, user}) => (
            <EditableCard
            key={id}
            title={title}
            content={content}
            createdAt={createdAt}
            user={user}
            goUpdate={() => goUpdate(title)}
            handleClickDelete={() => handleClickDelete(id)}/>
            )
            )}
            
            </div>
            <Pagination count={count} page={page} className="mt-8 mb-5" />
            </div>
            )
            }
        
        export default Myposts
        