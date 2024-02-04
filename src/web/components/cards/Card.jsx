const Card = ({ title, content, createdAt, user, onClick, views }) => (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-black m-2">
    <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{title}</div>
    <p className="text-gray-700 text-base">
    {content.substring(0, 200)}
    </p>
    <div className="pt-4">
    <span className="text-sm font-semibold text-gray-700 mr-3">
    Created: {createdAt.slice(0, 10)}
    </span>
    <span className="text-end text-sm font-semibold text-gray-700">
    By: {user.username}
    </span>
    <span className="text-end text-sm font-semibold text-gray-700">
    &nbsp; Views: {views}
    </span>
    <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
    onClick={onClick}
    >
    View
    </button>
    </div>
    </div>
    </div>
    )
    
    export default Card
    