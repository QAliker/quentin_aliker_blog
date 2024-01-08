import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from "@/web/components/SessionContext"
import Nav from '@/web/components/Nav'
const client = new QueryClient() 
const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={client}>
  <SessionProvider>
      <div className="flex flex-col">
        <Nav />
        <section className="p-4">
          <div className="md:max-w-3xl p-4 mx-auto">
            <Component {...pageProps} />
          </div>
        </section>
      </div>
    </SessionProvider>
  </QueryClientProvider>
)


export default App
