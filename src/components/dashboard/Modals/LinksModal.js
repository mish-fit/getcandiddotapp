/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid, Box, merge } from "theme-ui";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
import React from "react";
import Lottie from "lottie-react";
import smm from "../../../../public/lottie/smm.json";
import { TextColorPicker } from "../AddElement/TextColorPicker";
import { ShadowPicker } from "../AddElement/ShadowPicker";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import { Input } from "@chakra-ui/react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { BucketsModal } from "./BucketModal";
import { nanoid } from "nanoid";
import { s3url } from "lib/api";

// Add a custom Link
export function LinksModal({ closeParent, isOpen, buckets }) {
  const router = useRouter();
  const [refreshScreen, setRefreshScreen] = React.useState(false);
  const [a, setA] = React.useState(JSON.parse(buckets[0].u_buckets));
  const [input, setInput] = React.useState(false);
  const [image, setImage] = React.useState({ preview: "", raw: "" });
  const [imageName, setImageName] = React.useState(nanoid());
  const [imageSelected, setImageSelected] = React.useState(false);

  let hiddenInput = null;

  const [values, setValues] = React.useState({
    u_id: "",
    u_name: "",
    title: "",
    link: "",
    bucket: "Select your bucket",
    photo: imageSelected ? s3url + imageName + ".png" : "",
    font_color: "black",
    shadow_color: "rgba(0,0,0,.5)",
    sort_id: 1,
    others: {},
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    if (e.target.files.length) {
      setImageSelected(true);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      handleUpdate({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      e.target.value = null;
    }
  };

  const handleUpdate = (image) => {
    console.log(image);
    const formData = new FormData();
    formData.append("image", image.raw);

    //     await fetch("YOUR_URL", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "multipart/form-data"
    //       },
    //       body: formData
    //     });
    //   };
  };

  const onCancelImage = () => {
    setImageSelected(false);
    setImage({ preview: "", raw: "" });
  };

  const onAddBucket = () => {
    setInput(true);
  };

  const onCancelBucket = () => {
    setInput(false);
  };
  const onSaveBucket = (item) => {
    setValues({ ...values, bucket: item });
    setA([...a, item]);
    setInput(false);
  };

  const onSelectItem = (item) => {
    setValues({ ...values, bucket: item });
  };

  React.useEffect(() => {
    console.log("bUCKETR STRING", JSON.parse(buckets[0].u_buckets));
  }, []);

  const closeModal = () => {
    closeParent(true);
  };

  const savenadd = () => {
    console.log(values);
    setRefreshScreen(!refreshScreen);
  };

  const savenclose = () => {
    console.log(values);
    setRefreshScreen(!refreshScreen);
  };

  const onRefresh = () => {
    setValues({
      u_id: "",
      u_name: "",
      title: "",
      link: "",
      bucket: "",
      photo: s3url + nanoid() + ".png",
      font_color: "black",
      shadow_color: "rgba(0,0,0,.5)",
      sort_id: 1,
      others: {},
    });
  };

  const fontColor = (color) => {
    setValues({ ...values, font_color: color });
  };

  const borderShadowColor = (color) => {
    setValues({ ...values, shadow_color: color });
  };

  return (
    <Modal onClose={closeModal} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"1000px"}>
        <Container sx={style.container}>
          <Flex sx={style.row1}>
            <Text sx={style.topHeader}>Add Link</Text>
            <Flex sx={style.saveContainer} onClick={savenclose}>
              <Text sx={style.save}>Save </Text>
              <BsCheckCircleFill color="#D7354A" size={15} sx={{ ml: "6px" }} />
            </Flex>
          </Flex>
          <Flex sx={style.row2}>
            <Box sx={style.subHeaderContainer}>
              <Text sx={style.subHeader}>Custom Links</Text>
            </Box>
          </Flex>
          <Flex sx={style.row3}>
            <Flex sx={style.lottie}>
              <Lottie animationData={smm} />
            </Flex>
            <Flex sx={style.linkView}>
              <Flex sx={style.addlink}>
                <Flex sx={style.leftContainer}>
                  <Flex sx={style.imageContainer}>
                    {image.preview ? (
                      <Flex
                        sx={{
                          position: "relative",
                          flex: 1,
                        }}
                      >
                        <Flex
                          onClick={() => hiddenInput.click()}
                          sx={{ flex: 1 }}
                        >
                          <Image
                            src={image.preview}
                            alt="dummy"
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "100%",
                            }}
                          />
                        </Flex>
                        <Flex
                          sx={{
                            position: "absolute",
                            top: "-5%",
                            right: "-5%",
                            zIndex: 101,
                            cursor: "pointer",
                          }}
                          onClick={onCancelImage}
                        >
                          <IoCloseCircle size={20} color="gray" />
                        </Flex>
                      </Flex>
                    ) : (
                      <Flex
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          flex: 1,
                        }}
                        onClick={() => hiddenInput.click()}
                      >
                        <Text sx={{ fontSize: "12px" }}>Upload Image</Text>
                      </Flex>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={handleChange}
                      ref={(el) => (hiddenInput = el)}
                    />
                  </Flex>
                </Flex>
                <Flex
                  sx={merge(style.middleContainer, {
                    boxShadow: `1px 1px 2px 2px ${values.shadow_color}`,
                  })}
                >
                  <Flex sx={style.titleContainer}>
                    <Flex sx={{ flex: 1 }}>
                      <Flex
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          p: "8px",
                        }}
                      >
                        <MdOutlineDriveFileRenameOutline size={20} />
                      </Flex>

                      <Input
                        sx={{ color: values.font_color }}
                        placeholder="Enter Custom Link Title"
                        variant="flushed"
                        onChange={(e) =>
                          setValues({ ...values, title: e.target.value })
                        }
                        value={values.title}
                      />
                    </Flex>
                    <Flex sx={{ p: "8px", px: "16px" }}>
                      <TextColorPicker
                        textColor={(color) => fontColor(color)}
                      />
                    </Flex>
                  </Flex>
                  <Flex sx={style.titleContainer}>
                    <Flex sx={{ flex: 1 }}>
                      <Flex
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          p: "8px",
                        }}
                      >
                        <BiLink size={20} />
                      </Flex>

                      <Input
                        sx={{ color: "black" }}
                        placeholder="Enter Custom Link Address"
                        variant="flushed"
                        onChange={(e) =>
                          setValues({ ...values, link: e.target.value })
                        }
                        value={values.link}
                      />
                    </Flex>
                  </Flex>
                  <Flex sx={style.pickerContainer}>
                    <Flex sx={{ flex: 2, mr: "16px" }}>
                      <Menu>
                        <BucketsModal
                          isOpen={input}
                          onClose={onCancelBucket}
                          onSave={(item) => onSaveBucket(item)}
                        />
                        <MenuButton
                          px={4}
                          py={2}
                          transition="all 0.2s"
                          borderRadius="md"
                          borderWidth="1px"
                          _hover={{ bg: "gray.400" }}
                          _expanded={{ bg: "blue.400" }}
                          _focus={{ boxShadow: "outline" }}
                        >
                          <Text>{values.bucket}</Text>
                        </MenuButton>
                        <MenuList>
                          {a.map((item, index) => {
                            return (
                              <MenuItem key={index.toString()}>
                                <Flex onClick={() => onSelectItem(item)}>
                                  <Text>{item}</Text>
                                </Flex>
                              </MenuItem>
                            );
                          })}
                          <MenuItem>
                            <Flex onClick={() => onAddBucket()}>
                              <Text sx={{ color: "red" }}>+ Add a Bucket</Text>
                            </Flex>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                    <Flex sx={{ flex: 1, justifyContent: "flex-end" }}>
                      <ShadowPicker
                        borderShadowColor={(color) => borderShadowColor(color)}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex sx={style.rightContainer}>
                  <Flex sx={style.delete} onClick={onRefresh}>
                    <IoCloseCircleOutline size={20} />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex sx={style.row4} onClick={savenadd}>
            <BsPlusCircleFill color="#D7354A" size="32px" sx={{}} />
          </Flex>
        </Container>
      </ModalContent>
    </Modal>
  );
}

const style = {
  container: {
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
    ml: "250px",
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
};
