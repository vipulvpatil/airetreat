import {Divider, Typography} from "@mui/material"
import Header from "@/components/header"
import styles from "@/styles/Home.module.css"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <Header />
      <Divider variant="middle" />
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Typography variant="footer">
          &#169; 2022-2023 Vipul Vinod Patil
        </Typography>
      </footer>
    </div>
  )
}

export default Layout
