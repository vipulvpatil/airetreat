
import {authOptions} from "@/pages/api/auth/[...nextauth]"
import {getServerSession} from "next-auth"

const getLoggedInUserEmail = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  if (session && session.user && session.user.email) {
    return session.user.email
  }
  return null
}

export default getLoggedInUserEmail
