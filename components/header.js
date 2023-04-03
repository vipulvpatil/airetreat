import {Stack, Typography} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import styles from "@/styles/Home.module.css"

const MenuLink = ({children, href}) => {
  if(href) {
    return (
      <Link className={styles.menuLink} href={href}>
        <Typography variant="link">{children}</Typography>
      </Link>
    )
  } else {
    return
  }
}

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/" className={styles.headerLogo}>
        <Image
          src="/ai-retreat-logo.png"
          alt="Ai Retreat"
          width={38} height={24}
          blurDataURL="/ai-retreat-logo.png"
        />
      </Link>
      <Stack className={styles.headerMenuLinks} direction="row">
        <MenuLink href="/">Home</MenuLink>
        <MenuLink href="/rules">Rules</MenuLink>
        <MenuLink href="/background">About</MenuLink>
      </Stack>
      <Link href="/" className={styles.profileIcon}>
        <Typography variant="link">G</Typography>
      </Link>
    </div>
  )
}

export default Header
