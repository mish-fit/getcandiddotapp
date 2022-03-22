/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { authapi, s3url } from "lib/api";
import { UploadImageToS3WithNativeSdk } from "lib/aws";
import debounce from "lodash.debounce";
import Lottie from "lottie-react";
import { nanoid } from "nanoid";
import Head from "next/head";
import React from "react";
import { BiCategoryAlt, BiLink } from "react-icons/bi";
import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineRecommend } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import { Box, Container, Flex, Image, jsx, merge, Text } from "theme-ui";
import smm from "../../../../public/lottie/smm.json";
import { BucketsModal } from "./BucketModal";

// Add a custom Link
export function AnalyticsModal({
  closeParent,
  isOpen,
  user,
  linkAnalytics,
  prodAnalytics,
}) {
  const toast = useToast();

  React.useEffect(() => {}, []);

  const close = () => {
    closeParent(true);
  };

  return (
    <Flex>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Modal onClose={close} isOpen={isOpen} size="full">
        <ModalOverlay />
        <ModalContent maxW={"1000px"}>
          <Container sx={style.container}>
            <Flex sx={style.row1}>
              <Text sx={style.topHeader}>See your Profile Insights</Text>
              <Flex sx={style.saveContainer} onClick={close}>
                <Text sx={style.save}>Close</Text>
                <BsCheckCircleFill
                  color="#D7354A"
                  size={15}
                  sx={{ ml: "6px" }}
                />
              </Flex>
            </Flex>
            <Flex sx={style.row2}>
              <Box sx={style.subHeaderContainer}>
                <Text sx={style.subHeader}>Analytics</Text>
              </Box>
            </Flex>
          </Container>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

const style = {
  container: {
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
    width: ["0px", "0px", "0px", "200px", "300px", "300px"],
    height: ["0px", "0px", "0px", "200px", "300px", "300px"],
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
  middleContainer: {
    flex: 1,
    flexGrow: 1,
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
};
