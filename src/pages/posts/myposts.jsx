import apiClient from "@/web/services/apiClient";
import Pagination from "@/web/components/UI/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@/web/components/UI/Loader";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import { useState } from 'react'
import jsonwebtoken from 'jsonwebtoken'
import config from "@/web/config"
import Link from "next/link";
import Update from "@/pages/posts/update"


export const getServerSideProps = async ({query: { page } }) => {
    const data = await apiClient("/posts", { params: { page } })
    
    return {
        props: { initialData: data},
    }
}
const myposts = ( { initialData }) => {
    const router = useRouter()
    const [session, setSession] = useState(null)
    useEffect(() => {
        const jwt = localStorage.getItem(config.security.session.storageKey)
        
        if (!jwt) {
            router.push("/");
            return
        }
        
        const { payload } = jsonwebtoken.decode(jwt)
        
        setSession(payload)
    }, [])
    const { query } = useRouter()
    const page = Number.parseInt(query.page || "1", 10)
    const {
        isFetching,
        data: 
        {result: posts,
            meta: { count },
        },
        refetch,
    } = useQuery({
        queryKey: ["posts", page],
        queryFn: () => apiClient("/posts/myposts", { params: { page } }),
        initialData,
    })
    
    const { mutateAsync: deletePost } = useMutation({
        mutationFn: (post) => apiClient.delete(`/posts/${post}`),
    })
    const handleClickDelete = async (event) => {
        const postId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        await deletePost(postId)
        await refetch()
    }

    const goUpdate = async (event) => {
        const postId = Number.parseInt(event.target.getAttribute("data-id"), 10)
        router.push({
            pathname: '/posts/update',
            query: { id: postId },
        });
        };
    
    
    return (
        <div className="relative">
        {isFetching && <Loader />}
        <div className="flex justify-around p-2 flex-wrap">
        {posts.map(({ id, title, content, created_at, user}) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg  border-2 border-black m-2">
            {/* Ajouter une key au dessus */}
            {/* <img ClassName="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base" >
            {content.substring(0, 200)}
            </p>
            {/* REMPLACER LE substring et faire une beau slice puis join */}
            <div className="pt-4">
            <span className="text-sm font-semibold text-gray-700 mr-3 ">Created :{created_at.slice(0, 10 )}</span>
            <span className="text-end text-sm font-semibold text-gray-700">By : {user.username}</span>
            <div className=" border border-gray-300 mb-2"></div> 
            <div className="flex justify-evenly">
            <span><button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={goUpdate} data-id={id}>Update</button></span>
            <span><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3" data-id={id} onClick={handleClickDelete}>Delete</button></span>
            </div>
            {/* Convertir la date*/}
            </div>
            </div>
            </div>
            )
            )}
            
            </div>
            <Pagination count={count} page={page} className="mt-8 mb-5" />
            </div>
            )
            }
        
        export default myposts
        