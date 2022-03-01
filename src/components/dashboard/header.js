/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Button } from "theme-ui";
import { Link } from "components/link";
import { Link as ScrollLink } from "react-scroll";
import Logo from "components/logo";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import lock from "assets/lock.svg";
import MobileDrawer from "./mobile-drawer";
import headerData from "./header.data";
import Link1 from "next/link";
import { useRouter } from "next/router";
import { translation } from "translation";
import React from "react";
import { auth } from "lib/firebase";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

  const editProfile = () => {};

  const signout = () => {
    auth.signOut();
    router.push("/auth");
  };

  const linkClick = () => {
    router.push(data[0].u_uuid);
    // toast({
    //   title: "Link Copied",
    //   description: "Add you Candid link to Instagram Bio",
    //   status: "success",
    //   duration: 5000,
    //   isClosable: true,
    // });
  };

  return (
    <DrawerProvider>
      <header sx={styles.header}>
        <Container sx={styles.container}>
          <Flex as="logo" sx={styles.logoContainer}>
            <Logo />
          </Flex>
          <CopyToClipboard text={"cndd.in/" + data[0].u_uuid} >
            <Flex as="nav" sx={styles.nav} onClick={linkClick}>
              <Text fontWeight={'100px'}>{"cndd.in/" + data[0].u_uuid}</Text>
            </Flex>
          </CopyToClipboard>
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
              {/* <MenuItem onClick={editProfile}>Edit Profile</MenuItem> */}
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
    height: "48px",
    width: "48px",
    borderRadius: "48px",
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
    py: ["0px", "0px", "16px", "16px", "16px", "16px"],
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
    cursor: 'pointer',
    flex: 1,
    mr: "200px",
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
  logoContainer: {},
};
