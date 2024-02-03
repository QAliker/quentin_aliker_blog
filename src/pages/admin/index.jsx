import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import config from "@/web/config"
import jsonwebtoken from "jsonwebtoken"
import Link from "@/web/components/UI/Link"

const IndexAdmin = () => {
    const router = useRouter()
    const [session, setSession] = useState(null)
    useEffect(() => {
        const jwt = localStorage.getItem(config.security.session.storageKey)
        const { payload } = jsonwebtoken.decode(jwt)
        
        if (!jwt || payload.role !== 1) {
            router.push("/")

            
return
        }
        
        
        setSession(payload)
    }, [router])

    
return (
        <div className="flex items-center justify-center">
        {!session || session.role !== 1 ? (
            <p className="text-red-500">Vous n'êtes pas autorisé ici.</p>
            ) : (
                <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Bienvenue!</h1>
                <div className="flex justify-center space-x-4">
                <Link href="/admin/users" className="text-blue-500 hover:underline">Gérer les utilisateurs</Link>
                <Link href="/admin/posts" className="text-blue-500 hover:underline">Gérer les publications</Link>
                </div>
                </div>
                )}
                </div>
                )
            }
            
            export default IndexAdmin
            