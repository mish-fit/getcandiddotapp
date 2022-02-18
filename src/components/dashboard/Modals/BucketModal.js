/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid, Box } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
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
import { BiLink } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import React from "react";
// Add a custom Link
export function BucketsModal({ isOpen, onSave, onClose }) {
  const [name, setName] = React.useState("");
  const handleChange = (event) => setName(event.target.value);

  const closeModal = () => {
    onClose();
  };

  const saveBucket = () => {
    onSave(name);
  };

  return (
    <Modal isOpen={isOpen} isCentered>
      <ModalOverlay bg="rgba(255,255,255)" />
      <ModalContent>
        <Flex sx={{ pt: "16px", pl: "16px", justifyContent: "space-between" }}>
          <Box sx={style.subHeaderContainer}>
            <Text sx={style.subHeader}>New Bucket</Text>
          </Box>
          <Flex sx={{ flexDirection: "row" }}>
            <Flex sx={{ cursor: "pointer" }} onClick={closeModal}>
              <Text
                sx={{
                  color: "#878787",
                  fontFamily: "Poppins",
                  fontWeight: "medium",
                }}
              >
                Cancel
              </Text>
            </Flex>
            <Flex
              sx={{ cursor: "pointer", ml: "8px", mr: "8px" }}
              onClick={saveBucket}
            >
              <Text
                sx={{
                  color: "#D7354A",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
              >
                Save
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex sx={style.titleContainer}>
          <Flex sx={{ flex: 1 }}>
            <Flex
              sx={{ justifyContent: "center", alignItems: "center", p: "8px" }}
            >
              <MdOutlineCategory size={25} />
            </Flex>

            <Input
              sx={{
                color: "black",
                fontSize: "24px",
                fontFamily: "Poppins",
                fontWeight: "bold",
              }}
              placeholder="Name"
              variant="flushed"
              onChange={handleChange}
            />
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

const style = {
  titleContainer: {
    width: "100%",
    height: "48px",
    mt: "24px",
    pr: "8px",
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
};
