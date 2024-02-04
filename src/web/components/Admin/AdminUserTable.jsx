import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"
const AdminUserTable = ({users}) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { mutateAsync: deleteUser } = useMutation({
        mutationFn: (id) => apiClient.delete(`/admin/${id}`), onSuccess: () => { queryClient.invalidateQueries("users") },
    })
    const { mutateAsync: disableUser } = useMutation({
        mutationFn: (id) => apiClient.patch(`/admin/disable/${id}`), onSuccess: () => { queryClient.invalidateQueries("users") },
    })
    const handleClickDelete = async (event) => {
        const userId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        await deleteUser(userId)
    }
    const goUpdate = (event) => {
        const userId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        router.push({
            pathname: `/admin/update_user/${userId}`,
        })
    }
    const handleClickDisable = async (event) => {
        const userId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        await disableUser(userId)
    }

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white shadow-md rounded-md overflow-hidden">
        <thead>
        <tr>
        {["Username","Email","Actions"].map((label) => ( <td key={label} className="p-4 bg-slate-300 text-center font-semibold">{label}</td> ))}
            </tr>
            </thead>
            <tbody>
            {users.map(({ id, username, email }) => (
                <tr key={id} className="even:bg-slate-100">
                <td className="p-3 text-center">{username}</td>
                <td className="p-3 text-center">{email}</td>
                <td>
                <span>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={goUpdate} data-id={id}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3" data-id={id} onClick={handleClickDelete}>Delete</button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-3" data-id={id} onClick={handleClickDisable}>Disable</button>
                </span>
                </td>
                </tr>
                )
                )}
                </tbody>
                </table>
        )
    }
    
    export default AdminUserTable
    