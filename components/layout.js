import {Button, Divider, Link, Typography} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import FeedbackIcon from "@mui/icons-material/Feedback"
import Header from "@/components/header"
import TwitterIcon from "@mui/icons-material/Twitter"
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
        <Link href="mailto:vipulvpatil@gmail.com" sx={{display: "flex"}}>
          <EmailIcon className={styles.footerIcon} />
        </Link>
        <Link href="https://twitter.com/vipulvpatil" sx={{display: "flex"}}>
          <TwitterIcon className={styles.footerIcon}/>
        </Link>
        <Link href={process.env.NEXT_PUBLIC_FEEDBACK_LINK} sx={{display: "flex"}}>
          <FeedbackIcon className={styles.footerIcon}/>
        </Link>
      </footer>
    </div>
  )
}

export default Layout
