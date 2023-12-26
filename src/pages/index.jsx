import apiClient from "@/web/services/apiClient";
import Pagination from "@/web/components/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@/web/components/Loader";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  const data = await apiClient("/posts").then(({data: result }) => result)

  return {
    props: data,
  }
}

const Home = (props) => {
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
    queryFn: () => 

    apiClient("/posts", { params: { page } }).then(({data}) => data),
    initialData: props,
  })
  // mutation et requete pour le update a faire

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: (post) => apiClient.delete(`/posts/${post}`),
  })
  const handleClickDelete = async (event) => {
    const postId = Number.parseInt(event.target.getAttribute("data-id"), 10)
    console.log(postId)
    await deletePost(postId)
    await refetch()
  }

  // if (isLoading) {
  //   return (
  //     <Loader />
  //   )
  // }

  return (
    <div className="relative">
      {isFetching && <Loader />}
    <div className="flex justify-around p-2 flex-wrap">
    {posts.map(({ id, title, content, created_at}) => (
      <div className="max-w-sm rounded overflow-hidden shadow-lg  border-2 border-black m-2">
        {/* Ajouter une key au dessus */}
      {/* <img ClassName="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
      <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base" >
      {content.substring(0, 200)}
      </p>
      {/* REMPLACER LE substring et faire une beau slice puis join */}
      <div class="pt-4">
      <span class="text-sm font-semibold text-gray-700 mr-3 ">{created_at.slice(0, 10 )}</span>
      <span class="text-end text-sm font-semibold text-gray-700">By: </span>
      <span><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3" data-id={id} onClick={handleClickDelete}>Delete</button></span>
      {/* Convertir la date et ajouter les auteurs*/}
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
    
    export default Home