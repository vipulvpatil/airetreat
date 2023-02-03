import "@/styles/globals.css"
import {Experimental_CssVarsProvider as CssVarsProvider} from "@mui/material/styles"
import Layout from "@/components/layout"
import {theme} from "@/common/theme"

export default function App({Component, pageProps}) {
  return (
    <CssVarsProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CssVarsProvider>
    )
}
