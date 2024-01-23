import apiClient from "@/web/services/apiClient";
import Pagination from "@/web/components/UI/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@/web/components/UI/Loader";
import { useRouter } from "next/router";
import Router from "next/router";
// revenir sur ce commit fix: prevent refetch on page load
// Lorsque on efface un post faut effacer le comm

export const getServerSideProps = async ({query: { page } }) => {
  const data = await apiClient("/posts", { params: { page } })

  return {
    props: { initialData: data},
  }
}

const Home = ({ initialData }) => {
  const { query } = useRouter()
  const page = Number.parseInt(query.page || "1", 10)
  const {
    isFetching,
    data: 
    {result: posts,
    meta: { count },
  },
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient("/posts", { params: { page } }),
    initialData,
  })
  
  const goToPost = (id) => {
        Router.push({
            pathname: `/posts/${id}`
        });
        };
  
  return (
    <div className="relative">
      {isFetching && <Loader />}
    <div className="flex justify-around p-2 flex-wrap">
    {posts.map(({ id, title, content, created_at, user}) => (
      <div key={id} className="max-w-sm rounded overflow-hidden shadow-lg  border-2 border-black m-2">
        {/* <img ClassName="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">
            {content.substring(0, 200)}
          </p>
          {/* REMPLACER LE substring et faire une beau slice puis join */}
          <div className="pt-4">
            <span className="text-sm font-semibold text-gray-700 mr-3 ">Created: {created_at.slice(0, 10)}</span>
            <span className="text-end text-sm font-semibold text-gray-700">By : {user.username}</span>
            {/* <span><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3" data-id={id} onClick={handleClickDelete}>Delete</button></span> */}
            {/* Convertir la date et ajouter les auteurs*/}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
              data-id={id}
              onClick={(e) => goToPost(id)}
            >View</button>
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

    // check everything error numbers if you can do a component of something else mor cleanly check everything 