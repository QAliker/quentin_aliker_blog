import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import config from "@/web/config"
import jsonwebtoken from "jsonwebtoken"


export const useAuth = () => {
    const router = useRouter()
    const [session, setSession] = useState(null)
    useEffect(() => {
        const checkAuthentication = () => {
            const jwt = localStorage.getItem(config.security.session.storageKey)
            
            if (!jwt) {
                router.push("/sign-up")
                
                
                return
            }
            
            const { payload } = jsonwebtoken.decode(jwt)
            
            if(payload.role === 404) {
                router.push("/")
            }
            
            setSession(payload)
        }
        
        checkAuthentication()
    }, [router])
    
    return session
}

