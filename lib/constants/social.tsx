import { SocialLinks } from "@/types/socialLinks_type";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const socialLinks: SocialLinks[] = [
  {
    name: "facebook",
    href: "/",
    icon: <FaFacebookF />,
  },
  {
    name: "instagram",
    href: "/",
    icon: <FaInstagram />,
  },
  {
    name: "twitter",
    href: "/",
    icon: <FaXTwitter />,
  },
];
