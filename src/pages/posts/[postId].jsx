import apiClient from "@/web/services/apiClient"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import config from "@/web/config";
import jsonwebtoken from "jsonwebtoken"

export const getServerSideProps = async () => {
    const data = await apiClient("/posts")
    
    return {
        props: { initialData: data},
    }
}

const postsView = ({initialData}) => {
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
    const post = Object.entries(onePost)
    const username = post[post.length - 1][1].username;
    
    return (
        <><div className="bg-gray-200 p-6 rounded-md shadow-md">
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
                    {/* Single Comment */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="font-bold text-blue-500">Commenter Name</p>
                            <p className="text-gray-600">This is a comment text. It can be longer and more detailed.</p>
                        </div>
                    </div>

                    {/* Another Comment */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="font-bold text-blue-500">Another Commenter</p>
                            <p className="text-gray-600">Another comment goes here. Feel free to add more comments as needed.</p>
                        </div>
                    </div>
                </div>
            </div></>
        
        )
    }
    
    export default postsView