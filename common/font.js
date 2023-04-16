import {Graduate, Inter, Josefin_Sans, Tomorrow} from "@next/font/google"

export const headerFont = Josefin_Sans({
  subsets: ["latin"],
})

export const bodyFont = Inter({
  subsets: ["latin"],
})

export const font1 = Graduate({
  weight: "400",
  subsets: ["latin"],
})

export const font2 = Tomorrow({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})
