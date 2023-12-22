
import { useState, useEffect } from "react";
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query";
const Home = () => {
  const {
    isLoading,
    data: posts,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => 
    axios("http://localhost:3000/api/posts").then(({data}) => data),
  })
  // mutation et requete pour le update a faire

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: (post) => axios.delete(`http://localhost:3000/api/posts/${post.id}`),
  })
  const handleClickDelete = async (event) => {
    const id = Number.parseInt(event.target.getAttribute("data-id"), 10)
    await deletePost(posts.find((post) => post.id === id))
    await refetch()
  }

  if (isLoading) {
    return "Loading..."
  }

  return (
    
    <div className="flex justify-around p-2">
    {posts.map(({ id, title, content, created_at}) => (
      <div className="max-w-sm rounded overflow-hidden shadow-lg  border-2 border-black">
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
      )
    }
    
    export default Home