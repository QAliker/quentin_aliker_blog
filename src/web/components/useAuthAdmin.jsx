import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import config from "@/web/config"
import jsonwebtoken from "jsonwebtoken"


export const useAuthAdmin = () => {
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
    }, [router])
    
    return session
}