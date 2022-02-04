/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Heading, Box, Text, Container } from "theme-ui";
import { Link } from "components/link";
import Logo from "components/logo";
import menuItems from "./footer.data";
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
          pt: ['30px', null, null, null, '70px'],
          pb: ['60px', null, null, null, '90px'],
          borderBottom: '1px solid #D9E0E7',
        }}
      >
        {menuItems.map(({ header, items }, i) => (
          <Box
            sx={{
              flex: ['1 1 50%', null, null, '0 0 33.33%', '1'],
              mt: ['30px'],
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
          py: "40px",
        }}
      >
        <Logo />
        <Text sx={styles.copyright}>
          &copy; Copyright by {new Date().getFullYear()} Mish Tech Inc.
        </Text>
        <Box sx={styles.bottomMenu}>
          <Link path="/" label={lang[0]} />
          <Link path="/pp" label={lang[1]} />
          <Link path="/tnc" label={lang[2]} />
        </Box>
      </Container>
    </footer>
  );
}

const styles = {
  title: {
    color: "#0F2137",
    fontSize: "18px",
    fontWeight: 500,
    letterSpacing: "-0.5px",
    mb: "0",
  },
  link: {
    color: "#02073E",
    fontSize: "14px",
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
    ml: ["10px"],
  },
  bottomMenu: {
    display: "flex",
    marginLeft: [0, null, null, null, "auto"],
    mt: ["10px", null, null, null, 0],
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    a: {
      color: "#02073E",
      fontSize: "15px",
      "+a": {
        ml: ["10px", "30px"],
      },
    },
  },
};
