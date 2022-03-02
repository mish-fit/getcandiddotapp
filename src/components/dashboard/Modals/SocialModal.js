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
  useToast,
  InputGroup,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import { BsCheckCircleFill, BsCheckLg, BsPlusCircleFill } from "react-icons/bs";
import React, { useContext, useEffect } from "react";
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
import { authapi, s3url } from "lib/api";
import { UserContext } from "lib/UserDataProvider";
import axios from "axios";
import { UploadImageToS3WithNativeSdk, uploadToS3 } from "lib/aws";

const SocialCategory = ({ category, data, onClickItem, currentSocials }) => {
  React.useEffect(() => {}, []);

  const socialClick = (item) => {
    onClickItem(item);
  };

  return (
    <Flex
      sx={{
        mt: "16px",
        mr: "16px",
        flexDirection: "column",
      }}
    >
      <Flex
        sx={{
          width: "100%",
          borderBottomWidth: 2,
          borderBottomColor: "#D7354A",
        }}
      >
        <Text sx={style.subHeader1}>{category}</Text>
      </Flex>
      <Flex sx={{ flexDirection: "row", mt: "16px", flexWrap: "wrap" }}>
        {data.map((item, index) => {
          return (
            <Flex
              key={index}
              sx={merge(style.socialView, {})}
              onClick={() => socialClick(item)}
            >
              <Flex
                sx={{
                  position: "relative",
                }}
              >
                <Image src={item.social_logo} alt="img" sx={style.social} />
                <Flex sx={{ position: "absolute", top: "-4px", right: "-4px" }}>
                  {currentSocials.filter(
                    (item1, index1) => item1.social_id === item.social_id
                  ).length ? (
                    <BsCheckLg size={10} color="green" />
                  ) : null}
                </Flex>
              </Flex>

              <Text sx={style.socialText}>{item.social_name}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

// Add a custom Link
export function SocialModal({
  closeParent,
  isOpen,
  buckets,
  user,
  maxSortId,
  cookie,
  masterSocials,
  data,
}) {
  const toast = useToast();
  const [imageName, setImageName] = React.useState(nanoid());
  const [sortId, setSortId] = React.useState(maxSortId + 1);
  const [signedURL, setSignedURL] = React.useState("");
  const [inputActive, setInputActive] = React.useState(false);
  const [newInput, setNewInput] = React.useState(false);
  const [inputPlaceholder, setInputPlaceholder] = React.useState("username");
  const [inputLink, setInputLink] = React.useState("cndd.in/");
  const [socialId, setSocialId] = React.useState(0);
  const [userName, setUserName] = React.useState("");
  const [activeItem, setActiveItem] = React.useState({});

  const uniqueCategories = [
    ...new Set(masterSocials.map((item) => item.social_cat)),
  ];

  const [values, setValues] = React.useState([]);

  useEffect(() => {
    data.map((item, index) => {
      setValues((values) => [
        ...values,
        {
          id: item.id,
          u_id: user[0].u_id,
          u_name: item.u_name,
          social_id: item.social_id,
          social_name: item.social_name,
          social_logo: item.social_logo,
          social_ulink: item.social_ulink,
          sort_id: item.sort_id,
          others: {},
        },
      ]);
    });
  }, []);

  React.useEffect(() => {
    const a = [];

    console.log("data", data);

    axios
      .get(`${authapi}image`, { params: { id: imageName } }, { timeout: 3000 })
      .then((res) => {
        console.log(res.data);
        setSignedURL(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imageName, data, user]);

  const closeModal = () => {
    closeParent(true);
  };

  const savenclose = () => {
    console.log("values", values);
    const options = {
      headers: {
        Authorization: `bearer ${cookie}`,
        Origin: "localhost:3000",
      },
    };

    axios(
      {
        method: "post",
        url: `${authapi}socials`,
        data: { socials_array: JSON.stringify(values) },
        options: options,
      },
      { timeout: 1000 }
    )
      .then((res) => {
        console.log("Sucess", res.data);
        setSortId((id) => id + 1);
        toast({
          title: "Socials Updated",
          description: "",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        closeModal();
      })
      .catch((e) => console.log(e));
  };

  const onClickSocialItem = (socialItem) => {
    console.log(values);
    // console.log(socialItem);
    setActiveItem(socialItem);
    setInputActive(true);
    setSocialId(socialItem.social_id);
    setInputLink(
      masterSocials.filter(
        (item, index) => item.social_id === socialItem.social_id
      )[0].social_ulink
    );
    setInputPlaceholder(
      masterSocials.filter(
        (item, index) => item.social_id === socialItem.social_id
      )[0].social_ulink_format
    );
    setUserName(
      values.filter((item, index) => item.social_id === socialItem.social_id)
        .length
        ? values.filter(
            (item, index) => item.social_id === socialItem.social_id
          )[0].u_name
        : ""
    );
  };

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    let currentSocialIds = [...new Set(values.map((item) => item.social_id))];
    let arrayIndex = values.findIndex(
      (item, index) => item.social_id === socialId
    );
    let newArray = [...values];
    if (currentSocialIds.includes(socialId) && e.target.value.length > 0) {
      newArray[arrayIndex] = {
        id: newArray[arrayIndex].id,
        u_id: user[0].u_id,
        u_name: e.target.value,
        social_id: newArray[arrayIndex].social_id,
        social_name: newArray[arrayIndex].social_name,
        social_logo: newArray[arrayIndex].social_logo,
        social_ulink: newArray[arrayIndex].social_ulink,
        sort_id: newArray[arrayIndex].sort_id,
        others: {},
      };
      setValues(newArray);
    } else if (e.target.value.length > 0) {
      setValues([
        ...values,
        {
          id: "",
          u_id: user[0].u_id,
          u_name: e.target.value,
          social_id: activeItem.social_id,
          social_name: activeItem.social_name,
          social_logo: activeItem.social_logo,
          social_ulink: activeItem.social_ulink,
          sort_id: sortId,
          others: {},
        },
      ]);
      setSortId(sortId + 1);
    }
  };

  // const addSocial = () => {
  //   setNewInput(true);
  // };

  return (
    <Modal onClose={closeModal} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"1000px"}>
        <Container sx={style.container}>
          <Flex sx={style.row1}>
            <Text sx={style.subHeader}>Add Social Handles </Text>
            <Flex sx={style.saveContainer} onClick={savenclose}>
              <Text sx={style.save}>Save </Text>
              <BsCheckCircleFill color="#D7354A" size={15} sx={{ ml: "6px" }} />
            </Flex>
          </Flex>

          <Flex sx={style.row3}>
            <Flex sx={style.lottie}>
              <Lottie animationData={smm} />
            </Flex>
            <Flex sx={style.linkView}>
              <Flex
                sx={{
                  flexDirection: "row",
                  flex: 1,
                  flexWrap: "wrap",
                  mb: "32px",
                  maxHeight: "300px",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: "0px",
                    borderRadius: "8px",
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },
                }}
              >
                {uniqueCategories.map((category, index) => {
                  return (
                    <SocialCategory
                      key={index}
                      category={category}
                      data={masterSocials.filter(
                        (item, i) => item.social_cat === uniqueCategories[index]
                      )}
                      onClickItem={(socialItem) =>
                        onClickSocialItem(socialItem)
                      }
                      currentSocials={data}
                    />
                  );
                })}
              </Flex>
              {inputActive && !newInput ? (
                <Flex sx={merge(style.addlink, { flexDirection: "column" })}>
                  <Text
                    sx={{
                      mb: "8px",
                      fontStyle: "Poppins",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#D7354A",
                    }}
                  >
                    Enter Username
                  </Text>
                  <InputGroup size="lg">
                    <InputLeftAddon>{inputLink}</InputLeftAddon>
                    <Input
                      placeholder={inputPlaceholder}
                      value={userName}
                      onChange={onChangeUserName}
                    />
                  </InputGroup>
                </Flex>
              ) : null}
            </Flex>
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
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#D7354A",
  },
  subHeader: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "24px",
  },
  subHeader1: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "18px",
  },
  linkView: {
    pl: "16px",
    pr: "16px",
    flex: 1,
    flexDirection: "column",
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
  socialView: {
    textAlign: "center",
    cursor: "pointer",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    px: "8px",
  },
  social: {
    width: "32px",
    height: "32px",
  },
  socialText: {
    fontFamily: "Poppins",
    fontSize: "12px",
    color: "#646464",
    textAlign: "center",
  },
  addbutton: {
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  addContainer: {
    textAlign: "center",
  },
  addbuttonText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#FFFFFF",
  },
};
