import Link from "./UI/Link"
import { useSession } from "./SessionContext"
const MenuItem = ({ children, href, ...otherProps }) => (
    <li {...otherProps}>
    <Link styless href={href}>
    {children}
    </Link>
    </li>
    )
    const Nav = () => {
        const { session, signOut } = useSession()
        
        return (
            <div className="bg-gray-800 p-4">
            <ul className="flex items-center justify-center space-x-4">
            {session ? (
            <>
            <MenuItem href="/" className="text-white">Home</MenuItem>
            <MenuItem href="/posts/create" className="text-white">Create</MenuItem>
            <MenuItem href="/profile" className="text-white">Profile</MenuItem>
            <MenuItem href="/posts/myposts" className="text-white">My Posts</MenuItem>
            <button onClick={signOut} className="text-white flex items-end justify-end">Sign-Out</button>
            </>) : (<>
                <MenuItem href="/sign-up" className="text-white">Sign-up</MenuItem>
                <MenuItem href="/sign-in" className="text-white">Sign-in</MenuItem>
                </>)}
                </ul>
            </div>
                )
            }
            
            export default Nav
            