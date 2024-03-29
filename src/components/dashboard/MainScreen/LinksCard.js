import {
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { event } from "analytics/ga";
import axios from "axios";
import { authapi } from "lib/api";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import linksCardStyles from "styles/LinksCard";
import { ReactShare } from "../ReactShare";

// Add a custom Link
export function LinksCard({ item, deleteItem, editLinkModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [share, setShare] = useState(false);

  const onClickLink = () => {
    event("SIGNED_IN_USER_CLICK_LINK", item);
    if (item.link.substring(0, 8) !== "https://") {
      window.open("https://" + item.link, "_blank");
    } else {
      window.open(item.link, "_blank");
    }
  };

  useEffect(() => {
    // console.log(item.photo + "?" + new Date().getTime());
  }, []);
  const deleteLink = () => {
    deleteItem(item.id);
    axios(
      {
        method: "post",
        url: `${authapi}links/delete`,
        data: {
          id: item.id,
        },
        options: origin,
      },
      { timeout: 1000 }
    )
      .then((res) => {
        // console.log(res);
        toast({
          title: "Link deleted",
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

  const editLink = () => {
    editLinkModal(item);
  };

  const shareHandler = () => {
    setShare(!share);
  };


  return (
    <Flex sx={linksCardStyles.button}>
      <Flex
        sx={{
          flexDirection: "row",
          p: "8px",
          py: "16px",
          backgroundColor: "white",
          mx: "16px",
          width:["sm","md","2xl","2xl","2xl","2xl"],
          height: "72px",
          my: "16px",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 1px 1px " + item.shadow_color,
          "&:hover": {
            p: {
              color: "#fff",
            },
            backgroundColor: item.shadow_color,
          },
        }}
      >
        {item.photo && item.photo != "" ? (
          <Image
            src={item.photo + "?" + new Date().getTime()}
            alt="img"
            sx={linksCardStyles.image}
          />
        ) : null}
        <Flex sx={linksCardStyles.editButton} onClick={onClickLink}>
          <Text
            as="p"
            sx={{
              // fontWeight: "medium",
              fontSize: "16px",
              color: "#D7354A",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              color: item.font_color,
            }}
          >
            {item.title}
          </Text>
        </Flex>
        <Menu isOpen={isOpen}>
          <MenuButton
            sx={{
              width: "fit-content",
            }}
            boxShadow= {"none !important"}
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            variant="outline"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          />
          <ReactShare
          openProp = {!share}
          title={item.title +  + " from Candid Reviews"}
          url={item.link}
          hashtags={["cndd", "candidreviews"]}/
          >
          <MenuList
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            minWidth="148px"
          >
            <MenuItem onClick={shareHandler}>Share</MenuItem>
            <MenuItem onClick={editLink}> Edit </MenuItem>
            <MenuItem onClick={deleteLink}> Delete </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
