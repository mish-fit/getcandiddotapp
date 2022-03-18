import { Box, Text } from "@chakra-ui/react";

const ServiceCard = ({ service }) => {
  return (
    <Box sx={styles.service}>
      <Text as="p">{service.title}</Text>
      <Text as="span">${service.price}/mo</Text>
    </Box>
  );
};

export default ServiceCard;

const styles = {
  service: {
    border: (theme) => `1px solid #EDEFF6`,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: [107, null, null, 130],
    textAlign: "center",
    fontFamily: "Poppins",
    transition: "all 0.3s ease-in-out 0s",
    ":hover": {
      boxShadow: "0px 12px 24px rgba(51, 83, 145, 0.07)",
      borderColor: "transparent",
    },
    p: {
      fontWeight: 500,
      fontSize: [1, null, null, "16px"],
      lineHeight: 1.77,
      color: "heading",
      fontFamily: "Poppins",
    },
    span: {
      color: "#3183FF",
      fontWeight: 700,
      fontSize: [1, null, null, "16px"],
      lineHeight: 2,
      fontFamily: "Poppins",
    },
  },
};
