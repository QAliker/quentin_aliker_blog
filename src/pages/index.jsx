import apiClient from "@/web/services/apiClient"
import Pagination from "@/web/components/UI/Pagination"
import { useQuery, useMutation } from "@tanstack/react-query"
import Loader from "@/web/components/UI/Loader"
import { useRouter } from "next/router"
import Card from "@/web/components/cards/Card"

export const getServerSideProps = async ({query: { page } }) => {
  const data = await apiClient("/posts", { params: { page } })
  
  return {
    props: { initialData: data},
  }
}
const Home = ({ initialData }) => {
  const { query } = useRouter()
  const router = useRouter()
  const page = Number.parseInt(query.page || "1", 10)
  const {
    isFetching,
    data: 
    {result: posts, meta: { count } },
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient("/posts", { params: { page } }),
    initialData,
  })
  const { mutateAsync } = useMutation({
    mutationFn: (postId) => 
    apiClient.patch(`posts/views/${postId}`)
  })
  const goToPost = (id) => {
    router.push({
      pathname: `/posts/${id}`
    })
    mutateAsync(id)
  }
  
  return (
    <div className="relative">
    {isFetching && <Loader />}
    <div className="flex justify-around p-2 flex-wrap">
    {posts.map(({ id, title, content, createdAt, user, views}) => (
      <Card
      key={id}
      title={title}
      content={content}
      createdAt={createdAt}
      user={user}
      views = {views}
      onClick={() => goToPost(title)}
      />
      )
      )}
      
      </div>
      <Pagination count={count} page={page} className="mt-8 mb-5" />
      </div>
      )
    }
    
    export default Home