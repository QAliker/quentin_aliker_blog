import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"

const Comments = ({ comments, userIsAuthor,  handleComments }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const handleEdit = (event) => {
        const commentId = Number.parseInt(event.target.dataset.id, 10)
        router.push({
            pathname: `/comment/${commentId}`,
        })
    }
    const { mutateAsync: deleteComment } = useMutation({ mutationFn: (commentId) => apiClient.delete(`/comment/${commentId}`), onSuccess: () => { queryClient.invalidateQueries("comments") }, })
    const handleDelete = async (event) => {
        const commentId = Number.parseInt(event.target.dataset.id, 10)
        await deleteComment(commentId)
    }
    
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <div className="space-y-4">
        {comments.map(({ id, user, content, createdAt }) => (
            <div className="comments" key={id}>
            <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
            <p className="font-bold text-blue-500">{user.username}</p>
            <p className="text-gray-600">{content}</p>
            <p className="text-xs text-gray-600">{createdAt.slice(0, 10)}</p>
            </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
            {userIsAuthor(user) && (
                <>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md" data-id={id} onClick={handleEdit}>Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" data-id={id} onClick={handleDelete}>Delete</button>
                </>
                )}
                </div>
                <hr className="my-2 border-gray-300" />
                </div>
                ))}
                </div>
                <div className="flex items-center space-x-2">
                <input type="text" placeholder="Add a comment" className="border p-2 rounded-md flex-grow" id="comment" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleComments}> Send </button>
                </div>
                </div>
                )
            }
            export default Comments
            