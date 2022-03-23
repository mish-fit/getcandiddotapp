const userStyles= {
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
    // backgroundColor: "blue",
  },
  sidebar: {
    mt:["148px","148px","0px","0px","0px","0px"],
    p: "10px",
    width: "full",
    flex: 1,
    pl: "8px",
    pt: "16px",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    bottom: "8px",
    alignSelf: "flex-end",
    // backgroundColor: "red",
  },

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: ["0px", "0px", "0px", "0px", "0px", "0px"],
    width: "100%",
    backgroundColor: "#fff",
    transition: "all 0.4s ease",
    borderBottom: [
      null,
      null,
      "1px solid #E9EDF5",
      "1px solid #E9EDF5",
      "1px solid #E9EDF5",
      "1px solid #E9EDF5",
    ],
    position: ["relative", "relative", "fixed", "fixed", "fixed", "fixed"],
    top: 0,
    left: 0,
    zIndex: 100,
    "&.sticky": {
      backgroundColor: "background",
      color: "text",
      py: "16px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },

  headerContainer: {
    mb: [-124, -124, 0, 0, 0, 0],
    display: "flex",
    alignItems: "center",
    flexDirection: ["column", "column", "row", "row", "row", "row"],
    justifyContent: [
      "center",
      "center",
      "space-between",
      "space-between",
      "space-between",
      "space-between",
    ],
    maxWidth: ["100%", "100%", null, null, null, "1172px", "1280px"],
  },
  logouserStyles: {

  },
  button: {
    mx: 2,
    bg: "#D7354A",
    ":hover": {
      bg: "#C23043",
    },
    borderRadius: [0, 0, 0, 0, 0, 0, 0],
    color: "white",
    fontSize: "12px",
    width: "200px",
    height: [30, 30, 30, 30, 30, 30, 30],
    mt: [4, 4, 0, 0, 0, 0],
    justifyContent: "center",
    alignItems: "center",
    p: "2px",
    px: "8px",
    // my:"64px",
    // display:"none",
  },
  logoStyles: {
    mr: ["200px", "350px", "350px", "50px", "50px", "50px", "50px"],
    ml: [null, null, null, "16px", "16px", "16px", "16px"],
  },
  lottieFlex: {
    height: ["400px", "400px", "400px", "700px", "800px", "900px"],
    justifyContent: "center",
    flex: 1,
  }
};

export default userStyles;