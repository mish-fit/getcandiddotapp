import support from "assets/support.png";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";

const list = [
  "Medical and vision",
  "Life insurance",
  "HSAs and FSAs",
  "Commuter benefits",
];

const CustomerSupport = () => {
  return (
    <Box as="section" id="support" sx={styles.section}>
      <Flex>
        <Box sx={styles.grid}>
          <Box sx={styles.illustration}>
            <Image width="675" height="706" src={support} alt="support" />
          </Box>
          <Box sx={styles.content}>
            <Text as="span" sx={styles.slogan}>
              24 hours customer support
            </Text>
            <Heading sx={styles.title}>
              Customer support is our main priority with their hundred percent
              satisfaction.
            </Heading>
            <Text as="p" sx={styles.summary}>
              Get your tests delivered at let home collect sample from the
              victory of the managements that supplies best design system
              guidelines ever.
            </Text>

            <Grid sx={styles.list} as="ul">
              {list.map((item, i) => (
                <Text as="li" key={i}>
                  <IoIosCheckmarkCircle
                    sx={{ color: "#d95f76", mr: 2 }}
                    size="16px"
                  />
                  {item}
                </Text>
              ))}
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CustomerSupport;

const styles = {
  section: {
    pt: "0",
  },
  grid: {
    gap: [null, null, null, null, "0 8px"],
    display: ["flex", null, null, "grid"],
    flexDirection: ["column-reverse", null, null, "unset"],
    alignItems: "center",
    gridTemplateColumns: [
      "1fr",
      null,
      null,
      "1fr",
      "472px 1fr",
      "600px 1fr",
      "680px 1fr",
    ],
  },
  illustration: {
    textAlign: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    right: "24px",
    mt: [2, null, null, 0, 4, 0],
    maxWidth: ["100%", null, null, "80%", "none"],
    ml: ["auto", null, null, "auto", "0"],
    mr: ["auto", null, null, "auto", "0"],
  },
  content: {
    marginTop: [null, null, null, null, null, -16],
    maxWidth: [null, null, null, 560, "none"],
    m: [null, null, null, "0 auto", "unset"],
  },
  slogan: {
    color: "#d7354a",
    fontSize: "16px",
    textAlign: ["center", null, null, null, "left"],
    fontWeight: 500,
    display: "block",
  },
  title: {
    color: "heading",
    fontWeight: 500,
    fontSize: [5, null, null, 10, null, null, 11],
    lineHeight: 1.53,
    letterSpacing: ["-0.5px", null, null, "-1px"],
    mb: "16px",
    textAlign: ["center", null, null, null, "left"],
    span: {
      backgroundSize: "cover",
      px: 2,
    },
  },
  summary: {
    color: "textSecondary",
    fontSize: [1, null, null, 2, "16px", 2],
    lineHeight: [1.86, null, null, null, 1.86, 2.25],
    maxWidth: 470,
    m: [null, null, null, "16px auto 0", "16px 0 0", null, "unset"],
    textAlign: ["center", null, null, null, "left"],
  },
  list: {
    gap: "0 16px",
    gridTemplateColumns: ["repeat(2, 160px)", null, null, "repeat(2, 200px)"],
    justifyContent: [null, null, null, "center", "unset"],
    listStyle: "none",
    mt: [4, null, null, 5, 4, 5],
    p: 0,
    li: {
      fontSize: [0, 1, null, 2, "16px", 2],
      fontWeight: 500,
      alignItems: "center",
      color: "textSecondary",
      display: "flex",
      lineHeight: [2.81, null, null, null, 2.2, 2.81],
    },
  },
};
