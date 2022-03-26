import { Flex, Image, Input, InputGroup, InputLeftAddon, Modal, ModalContent, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { authapi } from "lib/api";
import Lottie from "lottie-react";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { BsCheckCircleFill, BsCheckLg } from "react-icons/bs";
import socialModalStyles from "styles/SocialModal";
import smm from "../../../../public/lottie/smm.json";

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
        <Text sx={socialModalStyles.subHeader1}>{category}</Text>
      </Flex>
      <Flex sx={{ flexDirection: "row", mt: "16px", flexWrap: "wrap" }}>
        {data.map((item, index) => {
          return (
            <Flex
              key={index}
              sx={socialModalStyles.socialView}
              onClick={() => socialClick(item)}
            >
              <Flex
                sx={{
                  position: "relative",
                }}
              >
                <Image src={item.social_logo} alt="img" sx={socialModalStyles.social} />
                <Flex sx={{ position: "absolute", top: "-4px", right: "40px" }}>
                  {currentSocials.filter(
                    (item1, index1) => item1.social_id === item.social_id
                  ).length ? (
                    <BsCheckLg size={10} color="green" />
                  ) : null}
                </Flex>
              </Flex>

              <Text sx={socialModalStyles.socialText}>{item.social_name}</Text>
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
    // console.log("data in social modal", data);
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
  }, [data, user]);

  React.useEffect(() => {
    const a = [];

    // console.log("data", data);

    axios
      .get(`${authapi}image`, { params: { id: imageName } }, { timeout: 3000 })
      .then((res) => {
        // console.log(res.data);
        setSignedURL(res.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [imageName, data, user]);

  const closeModal = () => {
    closeParent(true);
  };

  const savenclose = () => {
    // console.log("values", values);
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
        // console.log("Sucess", res.data);
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
      .catch((e) => {
        // console.log(e);
      });
  };

  const onClickSocialItem = (socialItem) => {
    // console.log(values);
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
        <Flex sx={socialModalStyles.container}>
          <Flex sx={socialModalStyles.row1}>
            <Text sx={socialModalStyles.subHeader}>Add Social Handles </Text>
            <Flex sx={socialModalStyles.saveContainer} onClick={savenclose}>
              <Text sx={socialModalStyles.save}>Save </Text>
              <BsCheckCircleFill color="#D7354A" size={15} sx={{ ml: "6px" }} />
            </Flex>
          </Flex>

          <Flex sx={socialModalStyles.row3}>
            <Flex sx={socialModalStyles.lottie}>
              <Lottie animationData={smm} />
            </Flex>
            <Flex sx={socialModalStyles.linkView}>
              <Flex
                sx={socialModalStyles.innerFlex}
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
                <Flex sx={socialModalStyles.addlink}>
                  <Text
                    sx={socialModalStyles.username}
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
        </Flex>
      </ModalContent>
    </Modal>
  );
}