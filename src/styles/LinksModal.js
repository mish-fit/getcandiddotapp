// styles for linksmodal and editlinks modal
const linksModalStyles = {
  container: {
    flexDirection: "column",
    p: "16px",
    backgroundColor: "white",
    borderRadius: "6px",
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
    mx: "4px",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  save: {
    mr:"4px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "16px",
  },
  subHeaderContainer: {
    width: "50%",
    borderBottomWidth: 2,
    borderBottomColor: "#D7354A",
  },
  subHeader: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "24px",
  },
  linkView: {
    pl: "16px",
    pr: "16px",
    flex: 1,
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
    flexDirection: ["column", "column", "row", "row", "row", "row"],

    mx: ["8px", "8px", "32px", "32px", "32px", "32px"],
    py: ["2px", "2px", "8px", "8px", "8px", "8px"],
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // justifyContent: ["flex-start","flex-start","center","center","center","center"],
    // alignItems: ["flex-start","flex-start","center","center","center","center"],
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
};


export default linksModalStyles;