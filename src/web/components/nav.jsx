const Nav = () => {
    return (
        <nav className="bg-gray-800 p-4">
        <ul className="flex items-center justify-center space-x-4">
        <li><a href="/" className="text-white">Home</a></li>
        <li><a href="/posts/create" className="text-white">Create</a></li>
        <li><a href="/blog" className="text-white">Profile</a></li>
        </ul>
        </nav>
        )
    }
    
    export default Nav
    