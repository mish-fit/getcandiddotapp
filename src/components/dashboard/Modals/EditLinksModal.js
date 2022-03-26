import { Box, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalContent, ModalOverlay, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import axios from "axios";
import { authapi, s3url } from "lib/api";
import { UploadImageToS3WithNativeSdk } from "lib/aws";
import { UserContext } from "lib/UserDataProvider";
import Lottie from "lottie-react";
import { nanoid } from "nanoid";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { BiLink } from "react-icons/bi";
import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import linksModalStyles from "styles/LinksModal";
import smm from "../../../../public/lottie/smm.json";
import { ShadowPicker } from "../AddElement/ShadowPicker";
import { TextColorPicker } from "../AddElement/TextColorPicker";
import { BucketsModal } from "./BucketModal";
// Add a custom Link
export function EditLinksModal({
  closeParent,
  isOpen,
  buckets,
  user,
  maxSortId,
  cookie,
  editLinkItem,
  editLinkSave,
}) {
  const ctx = useContext(UserContext);
  const router = useRouter();
  const toast = useToast();
  const [refreshScreen, setRefreshScreen] = React.useState(false);
  const [a, setA] = React.useState(buckets.links);
  const [input, setInput] = React.useState(false);
  const [image, setImage] = React.useState({ preview: "", raw: "" });
  const [imageName, setImageName] = React.useState(nanoid());
  const [imageSelected, setImageSelected] = React.useState(false);
  const [imageChanged, setImageChanged] = React.useState(false);
  const [sortId, setSortId] = React.useState(maxSortId + 1);
  const [signedURL, setSignedURL] = React.useState("");
  let hiddenInput = null;

  const [values, setValues] = React.useState(editLinkItem);

  React.useEffect(() => {
    // console.log("UFX",editLinkItem)
    // console.log(editLinkItem.photo+'?'+new Date())
    setValues((prev)=>editLinkItem);
    if(editLinkItem.photo){
      setImage({
        preview: editLinkItem.photo,
      });
      setImageSelected(true);
    }


    axios
      .get(`${authapi}image`, { params: { id: imageName } }, { timeout: 3000 })
      .then((res) => {
        // console.log(res.data);
        setSignedURL(res.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [imageName, editLinkItem]);

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.files[0]);
    setImageChanged(true);

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
    // console.log(image);
    const formData = new FormData();
    formData.append("image", image.raw);

    UploadImageToS3WithNativeSdk(image.raw, imageName);
  };

  const onCancelImage = () => {
    setImageSelected(false);
    setImageChanged(true);
    setImage({ preview: "", raw: "" });
  };

  const onAddBucket = () => {
    setInput(true);
  };

  const onCancelBucket = () => {
    setInput(false);
  };
  const onSaveBucket = (item) => {
    setValues({ ...values, bucket: item.name });
    setA([...a, item]);
    setInput(false);
    const options = {
      headers: {
        Authorization: `bearer ${cookie}`,
        Origin: "localhost:3000",
      },
    };

    const newBuckets = { ...buckets, links: [...a, item] };

    axios(
      {
        method: "post",
        url: `${authapi}buckets`,
        data: {
          u_id: user[0].u_id,
          u_buckets: newBuckets,
        },
        options: options,
      },
      { timeout: 5000 }
    )
      .then((res) => {
        toast({
          title: "New Bucket Added",
          description: "",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const onSelectItem = (item) => {
    setValues({ ...values, bucket: item.name });
  };

  const closeModal = () => {
    onRefresh();
    closeParent(true);
  };

  const savenadd = () => {
    if (values.title && values.link) {
      const body = {
        ...values,
        others:{},
        photo: imageChanged ? imageSelected ? s3url + imageName + ".png" : "" : editLinkItem.photo,
      };
      // console.log("SAVENADD",values);
      const options = {
        headers: {
          Authorization: `bearer ${cookie}`,
          Origin: "localhost:3000",
        },
      };

      axios(
        {
          method: "post",
          url: `${authapi}links`,
          data: { links_array: JSON.stringify([body]) },
          options: options,
        },
        { timeout: 5000 }
      )
        .then((res) => {
          //   console.log("Sucess", res.data);
          setSortId((id) => id + 1);
          toast({
            title: "New Link Added",
            description: "",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          onRefresh();
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      toast({
        title: "Title and Link are mandatory",
        description: "Add a catchy title to grab eyeballs",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    editLinkSave(values);
    // editLinkSave((prev)=>values);
  };

  const savenclose = () => {
    // console.log("SAVENCLOSE", values.others);
    if (values.title && values.link) {
      const body = {
        ...values,
        others:{},
        photo: imageChanged ? imageSelected ? s3url + imageName + ".png" : "" : editLinkItem.photo,
      };

      const options = {
        headers: {
          Authorization: `bearer ${cookie}`,
          Origin: "localhost:3000",
        },
      };

      axios(
        {
          method: "post",
          url: `${authapi}links`,
          data: { links_array: JSON.stringify([body]) },
          options: options,
        },
        { timeout: 1000 }
      )
        .then((res) => {
          //     console.log("Sucess", res.data);
          setSortId((id) => id + 1);
          toast({
            title: "New Link Added",
            description: "",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          closeModal();
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      toast({
        title: "Title and Link are mandatory",
        description: "Add a catchy title to grab eyeballs",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }

    editLinkSave(values);
    // editLinkSave((prev)=>values);
  };

  const onRefresh = () => {
    setImageName(nanoid());
    setImage({ preview: "", raw: "" });
    setImageSelected(false);
    setValues({
      id: "",
      u_id: user[0].u_id,
      u_name: user[0].u_name,
      title: "",
      link: "",
      bucket: "My Links",
      photo: "",
      font_color: "black",
      shadow_color: "rgba(0,0,0,.5)",
      sort_id: sortId,
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
    <Flex>
      {/* <Head>
        <meta
          name="viewport"
          content="initial-scale=0.75, width=device-width"
        />
      </Head> */}
      <Modal onClose={closeModal} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"1000px"}>
          <Flex sx={linksModalStyles.container}>
            <Flex sx={linksModalStyles.row1}>
              <Text sx={linksModalStyles.topHeader}>Edit Link</Text>
              <Flex sx={linksModalStyles.saveContainer} onClick={savenclose}>
                <Text sx={linksModalStyles.save}>Save</Text>
                <BsCheckCircleFill
                  color="#D7354A"
                />
              </Flex>
            </Flex>
            <Flex sx={linksModalStyles.row2}>
              <Box sx={linksModalStyles.subHeaderContainer}>
                <Text sx={linksModalStyles.subHeader}>Links</Text>
              </Box>
            </Flex>
            <Flex sx={linksModalStyles.row3}>
              <Flex sx={linksModalStyles.lottie}>
                <Lottie animationData={smm} />
              </Flex>
              <Flex sx={linksModalStyles.linkView}>
                <Flex sx={linksModalStyles.addlink}>
                  <Flex sx={linksModalStyles.leftContainer}>
                    <Flex sx={linksModalStyles.imageContainer}>
                      {image.preview || editLinkItem.photo ? (
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
                              src={ imageChanged ? image.preview : editLinkItem.photo }
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
                        accept="image/png, image/jpeg, image/jpg"
                        type="file"
                        hidden
                        onChange={handleChange}
                        ref={(el) => (hiddenInput = el)}
                      />
                    </Flex>
                  </Flex>
                  <Flex
                    sx={{
                      flex: 1,
                      flexDirection: "column",
                      borderRadius: "8px",
                      boxShadow: `0 0 4px 1px ${values.shadow_color}`,
                    }}
                  >
                    <Flex sx={linksModalStyles.titleContainer}>
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
                          defaultValue={values.title}
                          placeholder="Enter Custom Link Title"
                          variant="flushed"
                          onChange={(e) =>
                            setValues({ ...values, title: e.target.value })
                          }
                          // value={values.title}
                        />
                      </Flex>
                      <Flex sx={{ p: "8px", px: "16px" }}>
                        <TextColorPicker
                          textColor={(color) => fontColor(color)}
                        />
                      </Flex>
                    </Flex>
                    <Flex sx={linksModalStyles.titleContainer}>
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
                          defaultValue={values.link}
                          variant="flushed"
                          onChange={(e) =>
                            setValues({ ...values, link: e.target.value })
                          }
                          // value={values.link}
                        />
                      </Flex>
                    </Flex>
                    <Flex sx={linksModalStyles.pickerContainer}>
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
                                <MenuItem key={index.toString()} onClick={() => onSelectItem(item)}>
                                  <Flex>
                                    <Text>{item.name}</Text>
                                  </Flex>
                                </MenuItem>
                              );
                            })}
                            <MenuItem>
                              <Flex onClick={() => onAddBucket()}>
                                <Text sx={{ color: "red" }}>
                                  + Add a Bucket
                                </Text>
                              </Flex>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                      <Flex
                        sx={{
                          flex: 1,
                          justifyContent: "flex-end",
                          mt: ["16px", "16px", null],
                        }}
                      >
                        <ShadowPicker
                          borderShadowColor={(color) =>
                            borderShadowColor(color)
                          }
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex sx={linksModalStyles.rightContainer}>
                    <Flex sx={linksModalStyles.delete} onClick={onRefresh}>
                      <IoCloseCircleOutline size={20} />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex sx={linksModalStyles.row4}>
              <Flex onClick={savenadd} sx={{ cursor: "pointer" }}>
                <BsPlusCircleFill color="#D7354A" size="32px" sx={{}} />
              </Flex>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
