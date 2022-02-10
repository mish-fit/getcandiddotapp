/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Button } from "theme-ui";
import { Link } from "components/link";
import { Link as ScrollLink } from "react-scroll";
import Logo from "components/logo";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import lock from "assets/lock.svg";
import MobileDrawer from "./mobile-drawer";
import menuItems from "./header.data";
import Link1 from "next/link";
import { useRouter } from "next/router";
import { translation } from "translation";
import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

export default function Header({ menu, menuActive }) {
  const { locale } = useRouter();
  const lang = translation[locale].HeaderSection.Header;
  const [active, setActive] = React.useState(menuActive);

  const onClickIcon = () => {
    setActive(!active);
    menu(!active);
  };

  const editProfile = () => {};

  const signout = () => {};

  return (
    <DrawerProvider>
      <header sx={styles.header}>
        <Container sx={styles.container}>
          <Flex as="logo" sx={styles.logoContainer}>
            <Logo />
          </Flex>

          <Flex as="nav" sx={styles.nav}>
            <Text sx={styles.nav.navLink}>cndd.in/kandurisv</Text>
          </Flex>
          {/* <Flex as="signout" sx={styles.signout}>
            <Button sx={styles.signoutBtn} onClick={onClickIcon}>
              <Image sx={styles.userImage} src={"/user/profile.png"} />
            </Button>
          </Flex> */}
          <Menu>
            <MenuButton as={Button}>
              <Image sx={styles.userImage} src={"/user/profile.png"} />
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
    height: "50px",
    width: "50px",
    borderRadius: "50px",
  },
  signout: {
    backgroundColor: "white",
    mr: "20px",
  },
  signoutBtn: {
    backgroundColor: "white",
    cursor: "pointer",
  },
  headerBtn: {
    backgroundColor: "#f29183",
    fontSize: "15px",
    fontWeight: "normal",
    letterSpacing: "-0.16px",
    borderRadius: "5px",
    color: "#ffffff",
    borderWidth: "4px",
    borderColor: "black",
    padding: "4.0px 16px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["0", null, null, "20px", "0"],
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
    borderRadius: "5px",
    color: "#ffffff",
    padding: "6.5px 24px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["20px", "20px", "20px", "20px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: "20px",
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
      py: "15px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    maxWidth: ["100%", null, null, null, null, "1170px", "1280px"],
  },
  nav: {
    flex: 1,
    mx: "auto",
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
      fontWeight: "normal",
      cursor: "pointer",
      lineHeight: "1.2",
      mr: "48px",
      transition: "500ms",
      "@media(max-width:1024px)": {
        mr: "30px",
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
