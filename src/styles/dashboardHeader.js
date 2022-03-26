
const dashboardHeaderStyles = {
  userImage: {
    height: "40px",
    width: "40px",
    borderRadius: "32px",
  },
  signout: {
    backgroundColor: "white",
    mr: "16px",
  },
  signoutBtn: {
    backgroundColor: "white",
    cursor: "pointer",
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
    borderRadius: "6px",
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
    width: "100%",
    backgroundColor: "#fff",
    transition: "all 0.4s ease",
    borderBottom: "1px solid #E9EDF5",
    position: "fixed",
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
  container: {
    // backgroundColor: "red",
    mx:"8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    cursor: "pointer",
    flex: 1,
    // mr: "148px",
    px: "auto",
    justifyContent: "center",
    "@media screen and (max-width: 960px)": {
      display: "none",
    },
    alignItems: "center",

    navLink: {
      fontFamily: "Poppins",
      fontSize: "24px",
      color: "#323232",
      fontWeight: "bold",
      cursor: "pointer",
      lineHeight: "1.2",
      mr: "48px",
      transition: "500ms",
      "@media(max-width:1024px)": {
        mr: "24px",
      },
      ":last-child": {
        mr: "0",
      },
      "&:hover, &.active": {
        color: "primary",
      },
    },
  },
  logoStyles: {
    mr: ["200px", "350px", "350px", "50px", "50px", "50px", "50px"],
    ml: [null, null, null, "16px", "16px", "16px", "16px"],
  },
  menuButton:{
    display: ["none", "none", "none", "none", "inline", "inline"],
  }
};

export default dashboardHeaderStyles;