import "@/styles/globals.css"
import {Experimental_CssVarsProvider as CssVarsProvider} from "@mui/material/styles"
import Layout from "@/components/layout"
import {SessionProvider} from "next-auth/react"
import {theme} from "@/common/theme"

export default function App({Component, pageProps: {session, ...pageProps}}) {
  return (
    <SessionProvider session={session}>
      <CssVarsProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CssVarsProvider>
    </SessionProvider>
  )
}
