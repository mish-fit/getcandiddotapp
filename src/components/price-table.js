/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Button, Heading, Text } from "theme-ui";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { rgba } from "polished";
import { useRouter } from "next/router";

const PriceTable = ({ price }) => {
  const router = useRouter();
  const signup = () => {
    router.push("/signup.html");
  };

  return (
    <Box
      sx={styles.priceTable}
      className={`${price.isRecommended ? "recommended" : ""}`}
    >
      {/* {price.isRecommended && (
        <Text as="span" sx={styles.recomLabel}>
          Highly Recommended
        </Text>
      )} */}
      <Box sx={styles.header} className="priceHeader">
        <Heading as="h3" sx={styles.title}>
          {price.title}
        </Heading>
        <Text as="p" sx={styles.subtitle}>
          {price.subtitle}
        </Text>
        <Text as="p" sx={styles.priceAmount}>
          {price?.price}
        </Text>
        <Button sx={styles.button} variant="text" onClick={signup}>
          {price.buttonText}
        </Button>
      </Box>
      <Box as="ul" sx={styles.list}>
        {price?.features?.map((feat) => (
          <li key={feat.id} className={!feat.isAvailable ? "unavailable" : ""}>
            {feat.isAvailable ? (
              <span>
                <IoMdCheckmarkCircle sx={{ color: "#3cc68a" }} />
              </span>
            ) : (
              <span>
                <IoIosCloseCircle color="#CED7E1" />
              </span>
            )}
            <span>{feat.title}</span>
          </li>
        ))}
      </Box>
    </Box>
  );
};

export default PriceTable;

const styles = {
  priceTable: {
    background: "white",
    borderRadius: 10,
    position: "relative",
    padding: [
      "16px 16px",
      null,
      null,
      "24px 24px",
      "24px 24px 32px 24px",
      "48px 60px 72px 48px",
    ],
    boxShadow: ["0px 16px 48px rgba(91, 132, 193, 0.1)", null, null, "none"],
    "&.recommended": {
      boxShadow: [null, null, null, "0px 16px 48px rgba(91, 132, 193, 0.1)"],
      button: {
        backgroundColor: "#d95f76",
        color: "white",
        fontFamily: "Poppins",
        transition: "all 500ms ease",
        "&:hover": {
          backgroundColor: "black",
          color: "white",
        },
      },
    },
  },
  recomLabel: {
    fontWeight: 700,
    fontFamily: "Poppins",
    fontSize: [0, 1],
    lineHeight: 1.29,
    backgroundColor: "#52ACFF",
    borderRadius: "8px 8px 0px 0px",
    position: "absolute",
    left: 0,
    top: "-32px",
    right: 0,
    minHeight: [30, 35],
    textTransform: "uppercase",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 700,
    fontFamily: "Poppins",
    fontSize: [1, 2, 3],
    lineHeight: 1.31,
    letterSpacing: "-0.60px",
  },
  subtitle: {
    color: rgba("#343D48", 0.65),
    fontSize: [1, null, 1, 2],
    fontFamily: "Poppins",
    lineHeight: 1.62,
    mt: "8px",
  },
  priceAmount: {
    color: "#0F2137",
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: [1, 2, null, 4, "24px"],
    lineHeight: 1.3,
    letterSpacing: "heading",
    mt: ["12px", null, null, "24px"],
  },
  list: {
    listStyle: "none",
    padding: 0,
    mt: [6, null, null, null, 10],
    maxWidth: 340,
    li: {
      display: "flex",
      alignItems: "flex-start",
      fontSize: [1, null, 2],
      lineHeight: 1.62,
      "+ li ": {
        mt: [3, null, null, null, 6],
      },
      svg: {
        height: [17, null, null, null, 23],
        width: [17, null, null, null, 23],
      },
      "span:first-of-type": {
        mr: "12px",
        mt: "6px",
      },
    },
    ".unavailable": {
      opacity: 0.5,
    },
  },
  button: {
    border: `1.5px solid ${rgba("#d95f76", 0.15)}`,
    color: "#d95f76",
    cursor: "pointer",
    fontWeight: 700,
    fontFamily: "Poppins",
    minHeight: [40, null, null, null, 50],
    padding: ["0 24px", null, "0 32px"],
    fontSize: [1, null, null, null, 2],
    mt: [3, null, null, 6],
    ":hover": {
      borderColor: "#d95f76",
    },
  },
};
