
const footerStyles = {
  // title: {
  //   color: "#0F2137",
  //   fontSize: "16px",
  //   fontWeight: 500,
  //   letterSpacing: "-0.5px",
  //   mb: "0",
  //   fontFamily: "Poppins",
  // },
  // link: {
  //   color: "#02073E",
  //   fontSize: "14px",
  //   fontFamily: "Poppins",
  //   lineHeight: 2.5,
  //   display: "block",
  //   opacity: 0.8,
  //   transition: "all 500ms ease",
  //   "&:hover": {
  //     opacity: 1,
  //   },
  // },
  container:{
    mx:"10%",
    py: "32px",
    flexDirection:["column","column","column","column","row","row"]
    // flex:1,
    // mx:["8px","8px","8px","8px","148px","148px"],
  },
  logo:{
    mx:"20px"
  },
  copyrightText: {
    // my:["8px","8px","8px","8px","24px","24px"],
    color: "#0F2137",
    opacity: 0.6,
    fontSize: "14px",
    ml: ["8px"],
    fontFamily: "Poppins",
  },
  copyright: {
    justifyContent:"center",
    alignItems:"center"
  },
  bottomMenu: {
    display: "flex",
    marginLeft: [0, null, null, null, "auto"],
    mt: ["8px", null, null, null, 0],
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    a: {
      color: "#02073E",
      fontSize: "16px",
      "+a": {
        ml: ["8px", "24px"],
      },
    },
  },
};

export default footerStyles;