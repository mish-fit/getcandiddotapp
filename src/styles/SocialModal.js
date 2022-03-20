const  socialModalStyles= {
  container: {
    flexDirection: "column",
    p: "16px",
    backgroundColor: "white",
    borderRadius: "6px",
  },
  innerFlex: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    mb: "32px",
    maxHeight: "300px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0px",
      borderRadius: "8px",
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
  },
  row1: {
    justifyContent: "space-between",
    mt: "8px",
  },
  row2: { mt: "16px" },
  row3: { mt: "16px" },
  row4: {
    justifyContent: "center",
    alignItems: "center",
    mb: "24px",
    mt: "16px",
    ml: ["50px", "50px", "50px", "250px", "250px", "250px"],
  },
  addNew: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#D7354A",
    borderRadius: "48px",
    borderColor: "#D7354A",
    width: "48px",
    height: "48px",
  },
  addNewText: {
    color: "white",
    fontWeight: "medium",
    fontFamily: "Poppins",
    fontSize: "32px",
    textAlign: "center",
  },
  lottie: {
    width: ["0px", "0px", "0px", "200px", "200px", "300px"],
    height: ["0px", "0px", "0px", "200px", "200px", "300px"],
  },
  topHeader: {
    fontFamily: "Poppins",
    color: "#D7354A",
    fontWeight: "Bold",
    fontSize: "16px",
  },
  saveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  save: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "16px",
  },
  subHeaderContainer: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#D7354A",
  },
  subHeader: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "24px",
  },
  subHeader1: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "18px",
  },
  linkView: {
    pl: "16px",
    pr: "16px",
    flex: 1,
    flexDirection: "column",
  },

  addlink: {
    flexDirection: "row",
    width: "100%",
  },
  leftContainer: {
    flexDirection: "column",
    width: "64px",
    height: "64px",
    mx: "8px",
  },
  middleContainer: {
    flex: 1,
    flexDirection: "column",
    borderRadius: "8px",
  },
  rightContainer: {
    flexDirection: "column",
    ml: "8px",
  },
  imageContainer: {},
  addImage: {},
  titleContainer: {
    flexDirection: "row",
  },

  dragIcon: {
    cursor: "grab",
    p: "8px",
    backgroundColor: "gray",
  },
  link: {},
  bucket: {},
  delete: {
    cursor: "pointer",
    mt: "8px",
    p: "2px",
  },
  pickerContainer: {
    flexDirection: "row",
    mx: "32px",
    py: "8px",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    height: "48px",
    mt: "8px",
    pr: "8px",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
    borderWidth: 1,
    position: "relative",
    cursor: "pointer",
  },
  socialView: {
    textAlign: "center",
    cursor: "pointer",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    px: "8px",
  },
  social: {
    width: "32px",
    height: "32px",
  },
  socialText: {
    fontFamily: "Poppins",
    fontSize: "12px",
    color: "#646464",
    textAlign: "center",
  },
  addbutton: {
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  addContainer: {
    textAlign: "center",
  },
  addbuttonText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#FFFFFF",
  },
  username: {
    mb: "8px",
    fontStyle: "Poppins",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#D7354A",
  }
}

export default socialModalStyles;