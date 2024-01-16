import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import config from "@/web/config"
import jsonwebtoken from "jsonwebtoken"
import Link from "@/web/components/UI/Link"

const index = () => {
    const router = useRouter()
    const [session, setSession] = useState(null)
    useEffect(() => {
        const jwt = localStorage.getItem(config.security.session.storageKey)
        const { payload } = jsonwebtoken.decode(jwt)
        
        if (!jwt || payload.role === 0) {
            router.push("/")
            return
        }
        
        
        setSession(payload)
    }, [])
    return (
        <div>
        {!session || session.role === 0 ? (
            <p>Vous n'êtes pas autorisé ici.</p>
            ) : (
                <div>
                    <Link href="/admin/users">Users</Link>
                    <Link href="/admin/posts">Posts</Link>
                </div>
                )}
                </div>
                )
            }
            
            export default index
            