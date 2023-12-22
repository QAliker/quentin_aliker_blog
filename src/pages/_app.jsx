import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient() 
const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={client}>
  <Component {...pageProps} />
  </QueryClientProvider>
)


export default App
