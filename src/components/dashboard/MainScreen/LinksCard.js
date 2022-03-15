import { Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import axios from "axios";
import { authapi } from "lib/api";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

// Add a custom Link
export function LinksCard({ item, deleteItem, editLinkModal }) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickLink = () => {
    if(item.link.substring(0, 8)!=="https://"){
      window.open("https://"+item.link, "_blank");
    }
    else{
      window.open(item.link, "_blank");
    }
  };

  useEffect(()=>{
    console.log(item.photo+'?'+new Date().getTime())
  },[])
  const deleteLink = ()=>{
    deleteItem(item.id)
    console.log('linkscard', item.id);
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
      console.log(res)
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
    console.log('item',item);
    editLinkModal(item);
  };


  return (
    <Flex sx={style.button}>
      <Flex 
        sx={{
          flexDirection: "row",
          p: "8px",
          py: "16px",
          backgroundColor: "white",
          borderRadius: "16px",
          width: ["100%", "100%", "350px", "350px", "350px", "350px"],
          minWidth: "330px",
          height: "96px",
          justifyContent: "center",
          alignItems: "center",
          mx: "16px",
          my: "16px",
          boxShadow: "0 0 4px 1px " + item.shadow_color,
          "&:hover": {
            p: {
              color: "#fff",
            },
            backgroundColor: item.shadow_color,
          },
        }}
      >
        {item.photo && item.photo != "" ? (
          <Image src={item.photo+'?'+new Date().getTime()} alt="img" sx={style.image} />
        ) : null}
        <Flex
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        onClick={onClickLink}
        >
          <Text as="p" sx={{ 
            fontFamily: "Poppins",
            fontWeight: "medium",
            fontSize: "16px",
            color: "#D7354A",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            color: item.font_color }}>
            {item.title}
          </Text>
        </Flex>
        <Menu isOpen={isOpen}>
          <MenuButton
            width={"fit-content"}
            border="none"
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            variant='outline'
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          />
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} >
            <MenuItem onClick={editLink}> Edit </MenuItem>
            <MenuItem onClick={deleteLink}> Delete </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

const style = {
  button: {
    display: "flex",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderWidth: "0px",
  },
  image: {
    width: "48px",
    height: "48px",
    borderRadius: "48px",
  },
};
