// styles for productsmodal and editproductsmodal

const analyticsModalStyles = {
  container: {
    flexDirection: "column",
    p: "16px",
    backgroundColor: "white",
    borderRadius: "6px",
    flexGrow: 1,
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
    backgroundColor: "#4B0082",
    borderRadius: "48px",
    borderColor: "#4B0082",
    width: "48px",
    height: "48px",
  },
  addNewText: {
    color: "white",
    fontWeight: "medium",
    fontSize: "32px",
    textAlign: "center",
  },
  lottie: {
    width: ["0px", "0px", "0px", "200px", "200px", "300px"],
    height: ["0px", "0px", "0px", "200px", "200px", "300px"],
  },
  topHeader: {
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
    fontWeight: "bold",
    fontSize: "16px",
    color: "#D7354A",
    mr: 2,
  },
  subHeaderContainer: {
    width: "50%",
    borderBottomWidth: 2,
    borderBottomColor: "#4B0082",
  },
  subHeader: {
    fontWeight: "bold",
    fontSize: "24px",
    color: "#4B0082",
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
    justifyContent: "space-between",
    py: "8px",
    justifyContent: [null, null, "center"],
    alignItems: [null, null, "center"],
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
  icon: {
    ml: "16px",
    color: "#4B0082",
  },
  analyticsElement: {
    flexDirection: "column",
    m: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  analyticsElementTitleView: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0066b2",
    ml: 2,
  },
  analyticsElementTitleClick: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2AAA8A",
    ml: 2,
  },
  analyticsElementTitleCtr: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E3963E",
    ml: 2,
  },
  analyticsElementValueView: {
    fontWeight: "bold",
    fontSize: 24,
    mt: 3,
    color: "#0066b2",
  },
  analyticsElementValueClick: {
    fontWeight: "bold",
    fontSize: 24,
    mt: 3,
    color: "#2AAA8A",
  },
  analyticsElementValueCtr: {
    fontWeight: "bold",
    fontSize: 24,
    mt: 3,
    color: "#E3963E",
  },
  analyticsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",

    flex: 1,
  },
  row3: {},
  bucketTitle: {},
};

export default analyticsModalStyles;
