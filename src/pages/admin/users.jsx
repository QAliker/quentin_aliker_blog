import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import Loader from "@/web/components/UI/Loader"
import { useRouter } from "next/router"
import { useMutation } from "@tanstack/react-query"
export const getServerSideProps = async () => {
    const data = await apiClient("/posts")
    
    return {
        props: { initialData: data},
    }
    // demander pq toujours faire un getserverside props pour le token
}
const users = ({initialData}) => {
    const router = useRouter()
    const display = 10
    const {
        isFetching,
        data: 
        {result: users},
        refetch
    } = useQuery({
        queryKey: ["users", display],
        queryFn: () => apiClient("/admin", { params: { display } }),
        initialData,
    })
    const { mutateAsync: deleteUser } = useMutation({
        mutationFn: (id) => apiClient.delete(`/admin/${id}`),
    })
    const handleClickDelete = async (event) => {
        const userId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        await deleteUser(userId)
        await refetch()
    }
    
    const goUpdate = async (event) => {
        const userId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        router.push({
            pathname: `/admin/update_user/${userId}`,
        });
    };
    
    return (
        <div className="relative">
        {isFetching && <Loader />}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white shadow-md rounded-md overflow-hidden">
        <thead>
        <tr>
        {[
            "Username",
            "Email",
            "Actions"
        ].map((label) => (
            <td
            key={label}
            className="p-4 bg-slate-300 text-center font-semibold">
            {label}
            </td>
            ))}
            </tr>
            </thead>
            <tbody>
            {users.map(({ id, username, email }) => (
                <tr key={id} className="even:bg-slate-100">
                <td className="p-3 text-center">{username}</td>
                <td className="p-3 text-center">{email}</td>
                <td>
                <span>
                    <span><button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={goUpdate} data-id={id}>Edit</button></span>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3" data-id={id} onClick={handleClickDelete}>Delete</button></span>
                    </td>
                </tr>
                )
                )}
                </tbody>
                {/* Disable */}
                </table>
                </div>
                )
            }
            
            export default users
            