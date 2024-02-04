import apiClient from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import Loader from "@/web/components/UI/Loader"
import AdminUserTable from "@/web/components/Admin/AdminUserTable"
export const getServerSideProps = async () => {
    const data = await apiClient("/posts")
    
    return {
        props: { initialData: data},
    }
}
const Users = ({initialData}) => {
    const display = 10
    const {
        isFetching,
        data: 
        {result: users},
    } = useQuery({
        queryKey: ["users", display],
        queryFn: () => apiClient("/admin", { params: { display } }),
        initialData,
    })
    
    
    return (
        <div className="relative">
        {isFetching && <Loader />}
        <AdminUserTable users={users}/>
                </div>
                )
            }
            
            export default Users
            