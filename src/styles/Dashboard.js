const dashboardStyles = {
  container: {
    mt:["16px","16px","0px","0px","0px","0px"],
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: ["column", "column", "row", "row", "row", "row"],
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  mainscreen: {
    flex: [1, 1, 1, 2, 3, 3],
  },
  sidebar: {
    p: "4px",
    width: "full",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    bottom: "8px",
    alignSelf: "flex-end",
  },
  headerBtn: {
    backgroundColor: "#f29183",
    fontSize: "16px",
    fontWeight: "normal",
    letterSpacing: "-0.16px",
    borderRadius: "6px",
    color: "#ffffff",
    borderWidth: "4px",
    borderColor: "black",
    padding: "4.0px 16px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["0", null, null, "16px", "0"],
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
    borderRadius: "8px",
    color: "#ffffff",
    padding: "8px 24px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["16px", "16px", "16px", "16px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: "16px",
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
      py: "16px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },
  signoutContainer: {
    loginBtn: {
      ml: "auto",
      display: "inline-flex",
      alignItems: "center",
      fontSize: "16px",
      color: "#0F2137",
      fontWeight: 500,
      mr: "16px",
      img: {
        mr: "8px",
      },
      text: {
        color: "green",
      },
    },
  },
};

export default dashboardStyles;