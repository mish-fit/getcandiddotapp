/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import Logo from "components/logo";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import { auth } from "lib/firebase";
import { useRouter } from "next/router";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillCopy } from "react-icons/ai";
import { Button, Container, Flex, Image, jsx, Text } from "theme-ui";
import { translation } from "translation";
import MobileDrawer from "./mobile-drawer";
import { Link } from "components/link";
import logo from "assets/CaNDiD_B.png";

export default function Header({ menu, menuActive, data }) {
  const { locale } = useRouter();
  const router = useRouter();
  const lang = translation[locale].HeaderSection.Header;
  const [active, setActive] = React.useState(menuActive);
  const toast = useToast();

  const onClickIcon = () => {
    setActive(!active);
    menu(!active);
  };

  const editProfile = () => {
    router.push("/edit");
  };

  const signout = () => {
    auth.signOut();
    router.push("/auth");
  };

  const linkClick = () => {
    window.open("https://www.cndd.in/" + data[0].u_uuid, "_blank");
    toast({
      title: "Link Copied & Redirecting",
      // description: "Add you Candid link to Instagram Bio",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const linkCopy = () => {
    toast({
      title: "Link Copied",
      description: "Add you Candid link to Instagram Bio",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <DrawerProvider>
      <header sx={styles.header}>
        <Container sx={styles.container}>
          <Flex as="logo" sx={styles.logoStyles}>
            <Link
              path="/"
              sx={{
                variant: "links.logo",
              }}
            >
              <Image
                src={logo}
                width="120"
                height="40"
                sx={styles.logoStyles}
                alt="startup landing logo"
              />
            </Link>
          </Flex>
          <Flex as="nav" sx={styles.nav}>
            <CopyToClipboard text={"cndd.in/" + data[0].u_uuid}>
              <Flex onClick={linkClick}>
                <Text sx={{ fontSize: "18px" }}>
                  {"cndd.in/" + data[0].u_uuid}
                </Text>
              </Flex>
            </CopyToClipboard>
            <CopyToClipboard text={"cndd.in/" + data[0].u_uuid}>
              <Flex onClick={linkCopy}>
                <AiFillCopy
                  sx={{ fontSize: "24px", ml: "8px" }}
                  color={"gray"}
                />
              </Flex>
            </CopyToClipboard>
          </Flex>
          <Menu>
            <MenuButton as={Button}>
              <Image
                sx={styles.userImage}
                alt={"profile img"}
                src={
                  data[0].u_profile_image && data[0].u_profile_image != ""
                    ? data[0].u_profile_image
                    : "/user/profile.png"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={editProfile}>Edit Profile</MenuItem>
              <MenuItem onClick={signout}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
          <MobileDrawer />
        </Container>
      </header>
    </DrawerProvider>
  );
}

const styles = {
  userImage: {
    display: ["none", "none", "none", "inline", "inline", "inline"],
    height: "32px",
    width: "32px",
    borderRadius: "32px",
  },
  signout: {
    backgroundColor: "white",
    mr: "16px",
  },
  signoutBtn: {
    backgroundColor: "white",
    cursor: "pointer",
  },
  headerBtn: {
    backgroundColor: "#f29183",
    fontSize: "16px",
    fontWeight: "normal",
    letterSpacing: "-0.16px",
    borderRadius: "6px",
    color: "#ffffff",
    borderWidth: "4px",
    borderColor: "black",
    padding: "4.0px 16px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["0", null, null, "16px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },
  blogBtn: {
    backgroundColor: "#d95f76",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "-0.16px",
    borderRadius: "6px",
    color: "#ffffff",
    padding: "8px 24px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["16px", "16px", "16px", "16px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: ["0px", "0px", "0px", "0px", "0px", "0px"],
    width: "100%",
    backgroundColor: "#fff",
    transition: "all 0.4s ease",
    borderBottom: "1px solid #E9EDF5",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,

    "&.sticky": {
      backgroundColor: "background",
      color: "text",
      py: "16px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    maxWidth: ["100%", null, null, null, null, "1172px", "1280px"],
  },
  nav: {
    cursor: "pointer",
    flex: 1,
    mr: "148px",
    px: "auto",
    justifyContent: "center",
    "@media screen and (max-width: 960px)": {
      display: "none",
    },
    alignItems: "center",

    navLink: {
      fontFamily: "Poppins",
      fontSize: "24px",
      color: "#323232",
      fontWeight: "bold",
      cursor: "pointer",
      lineHeight: "1.2",
      mr: "48px",
      transition: "500ms",
      "@media(max-width:1024px)": {
        mr: "24px",
      },
      ":last-child": {
        mr: "0",
      },
      "&:hover, &.active": {
        color: "primary",
      },
    },
  },
  logoStyles: {
    mr: ["200px", "350px", "350px", "50px", "50px", "50px", "50px"],
    ml: [null, null, null, "16px", "16px", "16px", "16px"],
  },
};
