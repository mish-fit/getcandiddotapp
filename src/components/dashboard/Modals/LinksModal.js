/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid, Box } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { AddLink } from "../AddElement/AddLink";
// Add a custom Link
export function LinksModal({ closeParent, isOpen }) {
  const router = useRouter();

  const closeModal = () => {
    closeParent(true);
  };

  const save = () => {
    console.log("save");
  };

  return (
    <Modal onClose={closeModal} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"1000px"}>
        <Container sx={style.container}>
          <Flex sx={style.row1}>
            <Text sx={style.topHeader}>Add Link</Text>
            <Flex sx={style.saveContainer} onClick={save}>
              <Text sx={style.save}>Save </Text>
              <BsCheckCircleFill color="#D7354A" size={15} sx={{ ml: "5px" }} />
            </Flex>
          </Flex>
          <Flex sx={style.row2}>
            <Box sx={style.subHeaderContainer}>
              <Text sx={style.subHeader}>Custom Links</Text>
            </Box>
          </Flex>
          <Flex sx={style.row3}>
            <Flex sx={style.lottie}>
              <Text>Lottie</Text>
            </Flex>
            <Flex sx={style.linkView}>
              <AddLink />
            </Flex>
          </Flex>
          <Flex sx={style.row4}>
            <BsPlusCircleFill color="#D7354A" size="40px" sx={{}} />
          </Flex>
        </Container>
      </ModalContent>
    </Modal>
  );
}

const style = {
  container: {
    p: "20px",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  row1: {
    justifyContent: "space-between",
    mt: "10px",
  },
  row2: { mt: "20px" },
  row3: { mt: "20px" },
  row4: {
    justifyContent: "center",
    alignItems: "center",
    mb: "30px",
    mt: "20px",
  },
  addNew: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#D7354A",
    borderRadius: "50px",
    borderColor: "#D7354A",
    width: "50px",
    height: "50px",
  },
  addNewText: {
    color: "white",
    fontWeight: "medium",
    fontFamily: "Poppins",
    fontSize: "40px",
    textAlign: "center",
  },
  lottie: {
    backgroundColor: "red",
    width: ["0px", "0px", "0px", "200px", "300px", "300px"],
    height: ["0px", "0px", "0px", "200px", "300px", "300px"],
  },
  topHeader: {
    fontFamily: "Poppins",
    color: "#D7354A",
    fontWeight: "Bold",
    fontSize: "18px",
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
    fontSize: "15px",
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
    pl: "20px",
    pr: "20px",
    flex: 1,
  },
};
