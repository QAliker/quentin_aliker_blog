const Post = ({ onePost, username }) => (
    <div className="bg-gray-200 p-6 rounded-md shadow-md">
    <h1 className="text-3xl font-bold mb-4">{onePost.title}</h1>
    <p className="text-gray-700 mb-4">{onePost.content}</p>
    <div className="flex justify-between items-center">
    <p className="text-gray-500">{onePost.created_at}</p>
    <p className="text-blue-500 font-bold">{username}</p>
    </div>
    </div>
    )
    
    export default Post
    