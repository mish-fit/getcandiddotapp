import {
  Box,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import Head from "next/head";
import React from "react";

import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";

import analyticsModalStyles from "styles/AnalyticsModal";

// Add a custom Link
export function AnalyticsModal({
  closeParent,
  isOpen,

  user,
  linkAnalytics,
  prodAnalytics,
}) {
  const closeModal = () => {
    closeParent(true);
  };

  return (
    <Flex>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=0.75, width=device-width"
        />
      </Head>
      <Modal onClose={closeModal} isOpen={isOpen} size="full">
        <ModalOverlay />
        <ModalContent maxW={"1000px"}>
          <Flex sx={analyticsModalStyles.container}>
            <Flex sx={analyticsModalStyles.row1}>
              <Text sx={analyticsModalStyles.topHeader}>
                See your profile insights
              </Text>
              <Flex
                sx={analyticsModalStyles.saveContainer}
                onClick={closeModal}
              >
                <Text sx={analyticsModalStyles.save}>Close </Text>
                <BsCheckCircleFill
                  color="#4B0082"
                  size={15}
                  sx={{ ml: "6px" }}
                />
              </Flex>
            </Flex>
            <Flex sx={analyticsModalStyles.row2}>
              <Box sx={analyticsModalStyles.subHeaderContainer}>
                <Text sx={analyticsModalStyles.subHeader}>Analytics</Text>
              </Box>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
