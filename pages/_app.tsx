import '../styles/globals.css'
import '../styles/bootstrap.min.css'
import '../static/common/axios/axios_config'

import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App