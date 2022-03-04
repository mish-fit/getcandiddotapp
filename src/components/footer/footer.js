/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Heading, Box, Text, Container } from "theme-ui";
import { Link } from "components/link";
import Logo from "components/logo";
import footerData from "./footer.data";
import { useRouter } from "next/router";
import { translation } from "translation";
export default function Footer() {
  const { locale } = useRouter();
  const lang = translation[locale].footerSection.footer;

  return (
    <footer
      id="footer"
      sx={{
        variant: "layout.footer",
      }}
    >
      {/* <Container
        sx={{
          variant: 'layout.toolbar',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          pt: ['24px', null, null, null, '72px'],
          pb: ['60px', null, null, null, '96px'],
          borderBottom: '1px solid #D9E0E7',
        }}
      >
        {menuItems.map(({ header, items }, i) => (
          <Box
            sx={{
              flex: ['1 1 50%', null, null, '0 0 33.33%', '1'],
              mt: ['24px'],
            }}
            key={i}
          >
            <Heading sx={styles.title}>{header}</Heading>
            {items.map(({ path, label }, i) => (
              <Link
                sx={styles.link}
                path={path}
                key={i}
                label={label}
                variant="footer"
              />
            ))}
          </Box>
        ))}
      </Container> */}
      <Container
        sx={{
          variant: "layout.toolbar",
          flexDirection: ["column", null, null, null, "row"],
          py: "32px",
        }}
      >
        <Logo />
        <Text sx={styles.copyright}>
          &copy; Copyright by {new Date().getFullYear()} Mish Tech Inc.
        </Text>
        <Box sx={styles.bottomMenu}>
          <Link path="/" label={lang[0]} />
          <Link path="/privacy" label={lang[1]} />
          <Link path="/terms" label={lang[2]} />
        </Box>
      </Container>
    </footer>
  );
}

const styles = {
  title: {
    color: "#0F2137",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "-0.5px",
    mb: "0",
    fontFamily: "Poppins",
  },
  link: {
    color: "#02073E",
    fontSize: "14px",
    fontFamily: "Poppins",
    lineHeight: 2.5,
    display: "block",
    opacity: 0.8,
    transition: "all 500ms ease",
    "&:hover": {
      opacity: 1,
    },
  },
  copyright: {
    color: "#0F2137",
    opacity: 0.6,
    fontSize: "14px",
    ml: ["8px"],
    fontFamily: "Poppins",
  },
  bottomMenu: {
    display: "flex",
    marginLeft: [0, null, null, null, "auto"],
    mt: ["8px", null, null, null, 0],
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    a: {
      color: "#02073E",
      fontSize: "16px",
      "+a": {
        ml: ["8px", "24px"],
      },
    },
  },
};
