/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Heading, Image, jsx, Text } from "theme-ui";

const SectionHeading = ({ title, slogan, description, emoji, ...props }) => {
  return (
    <Box sx={styles.heading} {...props}>
      {slogan && (
        <Text as="p" sx={styles.slogan}>
          {slogan}
        </Text>
      )}
      <Heading as="h3" sx={styles.title}>
        {emoji ? <span>{title}</span> : title}
        {emoji && <Image src={emoji} alt="emoji" />}
      </Heading>
      {description && (
        <Text as="p" sx={styles.description}>
          {description}
        </Text>
      )}
    </Box>
  );
};

export default SectionHeading;

const styles = {
  heading: {
    textAlign: "center",
    fontFamily: "Poppins",
    maxWidth: 660,
    margin: "0 auto 48px",
  },
  slogan: {
    color: "#d7354a",
    fontWeight: 500,
    fontSize: 2,
    lineHeight: 2.5,
    fontFamily: "Poppins",
  },
  title: {
    color: "heading",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: [4, null, null, 6],
    lineHeight: [1.33, 1.33, 1.5],
    letterSpacing: [null, null, null, "heading"],
    img: {
      ml: ["16px"],
      position: "relative",
      top: "8px",
      maxWidth: [25, null, null, "100%"],
    },
  },
  description: {
    color: "heading",
    fontFamily: "Poppins",
    fontSize: ["16px", null, "16px"],
    lineHeight: [1.86, null, 2.2],
    mt: [5],
    maxWidth: 610,
    m: ["8px auto 0"],
  },
};
