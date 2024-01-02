import Link from "./UI/Link"

const Nav = () => {
    const session = false
    
    return (
        <nav className="bg-gray-800 p-4">
        <ul className="flex items-center justify-center space-x-4">
        {session ? (<><li><Link href="/" className="text-white">Home</Link></li>
        <li><Link href="/posts/create" className="text-white">Create</Link></li>
        <li><Link href="/blog" className="text-white">Profile</Link></li></>) : (<>
            <li>
            <Link href="/sign-up" className="text-white">Sign Up</Link>
            </li>
            <li>
            <Link href="/sign-in" className="text-white">Sign In</Link>
            </li>
            </>)}
            
            </ul>
            </nav>
            )
        }
        
        export default Nav
        