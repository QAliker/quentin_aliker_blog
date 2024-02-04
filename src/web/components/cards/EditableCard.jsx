const EditableCard = ({ title, content, created_at, user, goUpdate, handleClickDelete }) => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-black m-2">
        <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{content.substring(0, 200)}</p>
        <div className="pt-4">
        <span className="text-sm font-semibold text-gray-700 mr-3">
        Created: {created_at.slice(0, 10)}
        </span>
        <span className="text-end text-sm font-semibold text-gray-700">By: {user.username}</span>
        <div className="border border-gray-300 mb-2"></div>
        <div className="flex justify-evenly">
        <span>
        <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-3"
        onClick={goUpdate}
        >
        Edit
        </button>
        </span>
        <span>
        <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-3"
        onClick={handleClickDelete}
        >
        Delete
        </button>
        </span>
        </div>
        </div>
        </div>
        </div>
        )
    
    export default EditableCard
    