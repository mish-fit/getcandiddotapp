const userCardStyles = {
  container: {
    flexDirection: "column",
    width: "full",
    mt: ["48px", "48px", "0px", "0px", "0px", "0px"],
    // mr:["-10%","-10%","0%","0%","0%","0%"],
    borderTopRadius: "0px",
  },
  coverPhotoView: {
    flexDirection: "column", 
    backgroundColor: "white",
    width: "full",
    // width: ["0px","0px","0px","448px","448px","448px"],
    // width: ["0px","448px","448px","448px","448px","448px"],
    // height: ["48rem", "248rem","248px","160px","248px","248px"],
    justifyContent: "flex-start",
  },
  userPhotoView: {
    justifyContent: "center",
    // mt: ["24px", "24px", "-48px", "-48px", "0px", "0px"],
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  userNameView: {
    flexDirection: "column",
    mt: "12px",
    justifyContent: "center",
    alignItems: "center",
    px: "auto",
  },
  aboutMeView: {
    alignItems:"center",
    flexDirection: "column",
    mt: "4px",
  },
  aboutMe: {
    textAlign: "center",
    color: "#868686",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: "400",
  },
  coverPhoto: {
    display: ["none", "inline", "inline", "inline", "inline", "inline"],
    // mt: ["-150px" ,"0px","0px","0px","0px","0px"],
    textAlign: "center",
    borderRadius: "0px",
  },
  userImage: {
    mt: "-36px",
    width: "120px",
    height: "120px",
    backgroundColor: "yellow",
    textAlign: "center",
    borderRadius: "200px",
  },
  userName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
    fontFamily: "Poppins",
    color: "#323232",
  },

  nav: {
    cursor: "pointer",
    display: ["", "", "none", "none", "none", "none"],
    justifyContent: "center",
    navLink: {
      // textDecoration:"underline",
      fontFamily: "Poppins",
      fontSize: "16px",
      color: "#323232",
      fontWeight: "bold",
      cursor: "pointer",
      lineHeight: "1.2",
      mt: "-64px",
      "&:hover, &.active": {
        color: "primary",
      },
    },
  },
  
}

export default userCardStyles;