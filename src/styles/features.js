
const featuresStyles = {
  section: {
    overflow: "hidden",
    pt: ["72px", null, null, "96px"],
    pb: ["32px", null, null, "72px"],
  },
  container: {
    mx:"10%",
    flexDirection:"column"
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionTitle: {
    textAlign: "center",
    mb: ["32px", null, null, "72px"],
    h2: {
      color: "#0F2137",
      fontWeight: 500,
      fontSize: ["22px", null, null, "24px"],
      lineHeight: 1,
      letterSpacing: "-0.5px",
      mt: "16px",
    },
    p: {
      color: "secondary",
      fontSize: "16px",
      lineHeight: 1.87,
    },
  },
  post: {
    mb: "24px",
    mx: ["0", null, null, null, null, "8px"],
    display: "flex",
    flex: ["0 0 100%", null, null, "0 0 calc(33.333% - 24px)"],
    flexDirection: ["column", null, null, null, "row"],
    justifyContent: ["center", null, "flex-start"],
    textAlign: ["center", null, null, "left"],
    ">.image": {
      flexShrink: 0,
      width: "72px",
      height: "72px",
      mx: ["auto", null, null, "0"],
    },
  },
  postContent: {
    ml: ["0", null, null, null, "24px"],
    mt: ["16px", null, null, null, "0"],
    h3: {
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: 1,
      color: "#0F2137",
      mb: "16px",
    },
    p: {
      color: "#343D48",
      lineHeight: 1.87,
      fontSize: ["14px", null, null, "16px"],
      maxWidth: ["100%", "300px", null, "100%"],
      mx: [null, "auto", null],
    },
  },
};

export default featuresStyles;