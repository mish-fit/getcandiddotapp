import { Box, Flex, Input, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineCategory } from "react-icons/md";
import bucketModalStyles from "styles/BucketModal";

// Add a custom Link
export function BucketsModal({ isOpen, onSave, onClose }) {
  const [name, setName] = React.useState({ name: "", link: "" });
  const handleChangeName = (event) =>
    setName({ ...name, name: event.target.value });
  const handleChangeLink = (event) =>
    setName({ ...name, link: event.target.value });

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
        <Flex sx={bucketModalStyles.saveFlex}>
          <Box sx={bucketModalStyles.subHeaderContainer}>
            <Text sx={bucketModalStyles.subHeader}>New Bucket</Text>
          </Box>
          <Flex sx={{ flexDirection: "row" }}>
            <Flex sx={{ cursor: "pointer" }} onClick={closeModal}>
              <Text
                sx={bucketModalStyles.cancelText}
              >
                Cancel
              </Text>
            </Flex>
            <Flex
              sx={{ cursor: "pointer", ml: "8px", mr: "8px" }}
              onClick={saveBucket}
            >
              <Text
                sx={bucketModalStyles.saveText}
              >
                Save
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex sx={bucketModalStyles.titleContainer}>
          <Flex sx={{ flex: 1 }}>
            <Flex
              sx={bucketModalStyles.inputFlex}
            >
              <MdOutlineCategory size={25} />
            </Flex>

            <Input
              sx={bucketModalStyles.inputText}
              placeholder="Bucket Title ( Your blog name, page name etc.)"
              variant="flushed"
              onChange={handleChangeName}
            />
          </Flex>
        </Flex>
        <Flex sx={bucketModalStyles.titleContainer}>
          <Flex sx={{ flex: 1 }}>
            <Flex
              sx={bucketModalStyles.inputFlex}
            >
              <MdOutlineCategory size={25} />
            </Flex>

            <Input
              sx={bucketModalStyles.inputText}
              placeholder="Associated link for this title"
              variant="flushed"
              onChange={handleChangeLink}
            />
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
}