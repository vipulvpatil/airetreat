import {Button, Stack, Typography} from "@mui/material"
import {signIn, signOut, useSession} from "next-auth/react"
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
  let profileButton
  const {data: session, status} = useSession()
  if (status === "authenticated") {
    const {user} = session
    console.log(session)
    profileButton = (
      <Button onClick={signOut} className={styles.profileIcon}>
        <Typography variant="link">
          <Image
            src={user.image}
            alt="user profile image"
            width={24} height={24}
            style={{borderRadius: "50%", display: "block"}}
          />
        </Typography>
      </Button>
    )
  } else {
    profileButton = (
      <Button onClick={() => signIn("google")} className={styles.profileIcon}>
        <Typography variant="link">?</Typography>
      </Button>
    )
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
      {profileButton}
    </div>
  )
}

export default Header
