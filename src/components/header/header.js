/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image } from "theme-ui";
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

export default function Header({ className }) {
  const { locale } = useRouter();
  const lang = translation[locale].HeaderSection.Header;
  return (
    <DrawerProvider>
      <header sx={styles.header} className={className}>
        <Container sx={styles.container}>
          <Logo />

          <Flex as="nav" sx={styles.nav}>
            {menuItems.map(({ path, label, offset }, i) => (
              <ScrollLink
                activeClass="active"
                sx={styles.nav.navLink}
                to={path}
                spy={true}
                smooth={true}
                offset={offset}
                duration={500}
                key={i}
              >
                {lang[i]}
              </ScrollLink>
            ))}
          </Flex>
          <Link path="/" sx={styles.loginBtn}>
            {/* <Image src={lock} alt="" />
            Login */}
          </Link>

          <Link
            sx={styles.loginBtn}
            path="https://blog.getcandid.app/"
            label={translation[locale].HeaderSection.Blog}
            sx={styles.headerBtn}
          />

          <MobileDrawer />
        </Container>
      </header>
    </DrawerProvider>
  );
}

const styles = {
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
  loginBtn: {
    ml: "auto",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "15px",
    color: "#0F2137",
    fontWeight: 500,
    mr: "20px",
    img: {
      mr: "9px",
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
    ml: "50px",
    "@media screen and (max-width: 960px)": {
      display: "none",
    },
    navLink: {
      fontSize: "16px",
      color: "#02073E",
      fontWeight: "400",
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
};
