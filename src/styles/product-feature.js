
const productFeatureStyles = {
  section: {
    pt: ["72px", null, null, null, "96px", null, "148px"],
    pb: ["32px", null, null, null, "72px", null, "96px"],
    backgroundColor: "#F9FAFC",
  },
  container: {
    mx:"10%",
    flexDirection:"column"
  },
  flex: {
    flexDirection: ["column","column","row","row","row","row"]
    // display: "flex",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
  },
  items: {
    p:"8px",
    display: "flex",
    mb: ["24px", null, null, null, null, null, "60px"],
    ".image": {
      flexShrink: "0",
      width: "72px",
      height: "72px",
      mr: ["16px", null, null, "24px"],
    },
  },
  itemContent: {
    h3: {
      fontSize: ["17px", null, null, null, "16px"],
      color: "#0F2137",
      fontWeight: 700,
      lineHeight: 1,
      alignItems: "center",
      display: "inline-flex",
      flexWrap: "wrap",
      span: {
        backgroundColor: "#28A5FF",
        fontSize: "12px",
        color: "#fff",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        lineHeight: "24px",
        borderRadius: "24px",
        letterSpacing: "-0.5px",
        px: "8px",
        ml: ["8px", null, "8px", "8px"],
        mt: ["0", null, "6px", "0"],
      },
    },
    p: {
      color: "#343D48",
      fontSize: ["16px", null, null, "16px"],
      lineHeight: 1.87,
      mt: "6px",
      mb: "8px",
    },
    a: {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "16px",
      color: "#3183FF",
      fontWeight: 500,
      transition: "all 500ms ease",
      "&:hover": {
        color: "black",
      },
      svg: {
        fontSize: "16px",
        ml: "6px",
      },
    },
  },
};

export default productFeatureStyles;