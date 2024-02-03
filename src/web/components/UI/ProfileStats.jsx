import { useQuery } from "@tanstack/react-query"
import apiClient from "../../services/apiClient"
const ProfileStats = ({initialData}) => {
    const {
        data: 
        { result: countComments},
    } = useQuery({
        queryKey: ["countComments"],
        queryFn: () => apiClient("/comments/commentsStats"),
        initialData
    })
    const {
        data: 
        { result: countPosts},
    } = useQuery({
        queryKey: ["countPosts"],
        queryFn: () => apiClient("/posts/postsStats"),
        initialData,
    })

    return (
        <div>
        <div className="mt-4">
        <div className="mt-4 flex flex-col gap-2">
        <div>
        <strong>Number of Posts:</strong> <p>{countPosts[0].totalPosts}</p>
        </div>
        <div>
        <strong>Number of Comments:</strong> <p>{countComments[0].totalComments}</p>
        </div>
        </div>
        </div>
        </div>
        )
    }
    
    export default ProfileStats
    