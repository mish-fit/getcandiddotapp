
const headerStyles = {
  headerBtn: {
    backgroundColor: "#f29183",
    fontSize: "16px",
    fontFamily: "Poppins",
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
    fontFamily: "Poppins",
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
  loginBtn: {
    ml: "auto",
    display: "inline-flex",
    fontFamily: "Poppins",
    alignItems: "center",
    fontSize: "16px",
    color: "#0F2137",
    fontWeight: 500,
    mr: "16px",
    img: {
      mr: "8px",
    },
  },
  header: {
    color: "text_white",
    fontFamily: "Poppins",
    fontWeight: "normal",
    py: "16px",
    width: "100%",
    backgroundColor: "#fff",
    transition: "all 0.4s ease",
    borderBottom: "1px solid #E9EDF5",
    // position: "fixed",
    top: 0,
    left: 0,

    "&.sticky": {
      // backgroundColor: "background",
      color: "text",
      py: "16px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },
  container: {
    mx:"10%",
    // mx:["8px","8px","8px","8px","148px","148px"],
    // my:"16px",
    display: "flex",
    flex:1,
    alignContent: "center",
    justifyContent:"center",
    alignItems: "center",
  },
  nav: {
    flex: 1,
    ml: "48px",
    "@media screen and (max-width: 960px)": {
      display: "none",
    },
    navLink: {
      fontSize: "16px",
      color: "#02073E",
      fontWeight: "400",
      cursor: "pointer",
      lineHeight: "1.2",
      mr:"48px",
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
  signupButton: {
    display: ["none", "none", "none", "none", "inline-block", "inline-block"],
    borderRadius: ["16px", "16px", "16px", "32px", "32px", "32px"],
    backgroundColor: "#D7354A",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d42a40",
    },
    px: ["2px", "4px", "8px", "16px", "32px", "32px"],
    py: ["2px", "2px", "4px", "8px", "8px", "8px"],
    justifyContent: "center",
    alignItems: "center",
  },
  signupButtonText: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: ["12px", null, null, "16px", null, null],
    color: "white",
  },
  sections:{
    mr:"48px", 
    cursor:"pointer",
    "&:hover": {color:"#D7354A"}
  }
};

export default headerStyles;
