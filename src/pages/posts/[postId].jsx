import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Loader from "@/web/components/UI/Loader"
import jsonwebtoken from 'jsonwebtoken'
import config from "@/web/config"

const values = {
    content: ""
}
export const getServerSideProps = async () => {
    const data = await apiClient("/posts")
    return {
        props: { initialData: data},
    }
}

const postsView = ({initialData}) => {
    const [session, setSession] = useState({user: 0, role: 0});
    useEffect(() => {
        const jwt = localStorage.getItem(config.security.session.storageKey);
        
        if (!jwt) {
            router.push("/");
            return;
        }
        const { payload } = jsonwebtoken.decode(jwt);
        setSession(payload);
    }, []);
    const router = useRouter();
    const id = router.query.postId
    const {
        isFetching,
        data: 
        {result: onePost,
        },
    } = useQuery({
        queryKey: ["onePost"],
        queryFn: () => apiClient(`/posts/${id}`),
        initialData,
    })
    const {
        data: 
        {result: comments},
        refetch,
    } = useQuery({
        queryKey: ["comments"],
        queryFn: () => apiClient(`/comments/${id}`),
        initialData,
    })
    const post = Object.entries(onePost)
    const username = post[post.length - 1][1].username
    const {isSuccess, error, mutateAsync} = useMutation({
        mutationFn: (values) =>
        apiClient.post(`/comments/${id}`, values).then(({data}) => data),
    })
    const handleComments = async () => {
        const comments = document.querySelector('#comment')
        const comment = comments.value
        values.content = comment
        await mutateAsync(values)
        comments.value = ""
        await refetch()
    }
    const { mutateAsync: deleteComment } = useMutation({
        mutationFn: (id) => apiClient.delete(`/comment/${id}`),
    })
    const handleEdit = async (event) => {
        const commentId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        router.push({
            pathname: `/comment/${commentId}`,
        });
    }
    const handleDelete = async (event) => {
        const commentId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        await deleteComment(commentId)
        await refetch()
    }
    const userIsAuthor = (user) => {
        return session.id === user.id
    }
    
    return (
        <div className="relative">
        {isFetching && <Loader />}
        <div className="bg-gray-200 p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">{onePost.title}</h1>
        <p className="text-gray-700 mb-4">{onePost.content}</p>
        <div className="flex justify-between items-center">
        <p className="text-gray-500">{onePost.created_at}</p>
        <p className="text-blue-500 font-bold">{username}</p>
        </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <div className="space-y-4">
        {comments.map(({ id, user, content, created_at }) => (
            <div className="comments" key={id}>
            <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
            <p className="font-bold text-blue-500">{user.username}</p>
            <p className="text-gray-600">{content}</p>
            <p className="text-xs text-gray-600">{created_at.slice(0, 10)}</p>
            </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
            {userIsAuthor(user) && (
                <>
                <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleEdit}
                data-id={id}
                >
                Edit
                </button>
                <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
                data-id={id}
                >
                Delete
                </button>
                </>
                )}
                </div>
                <hr className="my-2 border-gray-300" />
                </div>
                ))}
                
                <div className="flex items-center space-x-2">
                <input
                type="text"
                placeholder="Ajouter un commentaire"
                className="border p-2 rounded-md flex-grow"
                id="comment"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleComments}>
                Envoyer
                </button>
                </div>
                </div>
                </div>
                </div>
                )
            }
            
            export default postsView