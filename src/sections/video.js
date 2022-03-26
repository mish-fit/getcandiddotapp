import { Flex, Input, Modal, ModalContent, ModalOverlay, Text, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { nonauthapi } from "lib/api";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

// Add a custom Link
export function ContactUsModal({ closeParent, isOpen }) {
  const toast = useToast();

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    question: "",
  });

  const closeModal = () => {
    closeParent(true);
  };

  const savenclose = () => {
    if (values.name && values.email) {
      const options = {
        headers: {
          Origin: "localhost:3000",
        },
      };
      axios(
        {
          method: "post",
          url: `${nonauthapi}contactus`,
          data: values,
          options: options,
        },
        { timeout: 1000 }
      )
        .then((res) => {
          toast({
            title: "Thanks for contacting us. We will get back to you.",
            description: "",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setValues({ name: "", email: "", question: "" });
          closeModal();
        })
        .catch((e) => {
          // console.log(e)
        });
    } else {
      toast({
        title: "Please provide your name and email",
        description: "",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal onClose={closeModal} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"1000px"}>
        <Flex sx={style.container}>
          <Flex sx={style.row1}>
            <Text sx={style.topHeader}>Contact us</Text>
            <Flex sx={style.saveContainer} onClick={savenclose}>
              <Text sx={style.save}>Send </Text>
              <BsCheckCircleFill color="#D7354A" size={15} sx={{ ml: "6px" }} />
            </Flex>
          </Flex>
          <Flex
            sx={{
              flex: 1,
              flexDirection: "column",
              borderRadius: "8px",
              boxShadow: `0 0 4px 1px ${values.shadow_color}`,
              mt: "16px",
            }}
          >
            <Flex sx={style.titleContainer}>
              <Flex sx={{ flex: 1 }}>
                <Input
                  required
                  name="name"
                  bg="white"
                  display="inline"
                  focusBorderColor="#E78692"
                  _hover={{ borderColor: "#E78592" }}
                  borderColor="#E78592"
                  height={50}
                  width={"full"}
                  fontSize={"lg"}
                  marginBottom="24px"
                  value={values.name}
                  type="text"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  placeholder="Your Name"
                />
              </Flex>
            </Flex>
            <Flex sx={style.titleContainer}>
              <Flex sx={{ flex: 1 }}>
                <Input
                  required
                  name="name"
                  bg="white"
                  display="inline"
                  focusBorderColor="#E78692"
                  _hover={{ borderColor: "#E78592" }}
                  borderColor="#E78592"
                  height={50}
                  width={"full"}
                  fontSize={"lg"}
                  marginBottom="24px"
                  value={values.email}
                  type="text"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  placeholder="Your Email Address"
                />
              </Flex>
            </Flex>
            <Flex sx={style.titleContainer}>
              <Flex sx={{ flex: 1 }}>
                <Textarea
                  name="about"
                  type="text"
                  bg="white"
                  display="inline"
                  focusBorderColor="#E78692"
                  _hover={{ borderColor: "#E78592" }}
                  borderColor="#E78592"
                  fontSize={"lg"}
                  width={"full"}
                  height={100}
                  placeholder="Your Question"
                  marginBottom="24px"
                  onChange={(e) =>
                    setValues({ ...values, question: e.target.value })
                  }
                  value={values.question}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

const style = {
  container: {
    flexDirection:"column",
    pb: "16px",
    backgroundColor: "white",
    borderRadius: "6px",
    height: "300px",
    ml:["0px","0px","8px","8px","8px","8px"],
  },
  row1: {
    marginRight: ["0px","0px","16px","16px","16px","16px"],
    justifyContent: "space-between",
    mt: "8px",
  },
  row2: { mt: "16px", },
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
    mt:"8px",
    fontFamily: "Poppins",
    color: "#D7354A",
    fontWeight: "Bold",
    fontSize: "20px",
  },
  saveContainer: {
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
};
