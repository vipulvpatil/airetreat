import {Stack, Typography} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import ProfileMenu from "@/components/profile_menu"
import styles from "@/styles/Home.module.css"
import {useSession} from "next-auth/react"

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
  const {data: session, status} = useSession()
  let loggedInUser
  if (status === "authenticated") {
    loggedInUser = session.user
  }

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
        <MenuLink href="/about">About</MenuLink>
      </Stack>
      <ProfileMenu user={loggedInUser}/>
    </div>
  )
}

export default Header
