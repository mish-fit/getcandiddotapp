/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid, merge } from "theme-ui";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { authapi } from "lib/api";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'

// Add a custom Link
export function LinksCard({ item, deleteItem }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickLink = () => {
    if(item.link.substring(0, 8)!=="https://"){
      window.open("https://"+item.link, "_blank");
    }
    else{
      window.open(item.link, "_blank");
    }
  };

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

  return (
    <Flex sx={style.button}>
      <Flex 
        sx={merge(style.container, {
          boxShadow: "0 0 4px 1px " + item.shadow_color,
          "&:hover": {
            p: {
              color: "#fff",
            },
            backgroundColor: item.shadow_color,
          },
        })}
      >
        {item.photo && item.photo != "" ? (
          <Image src={item.photo} alt="img" sx={style.image} />
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
          <Text as="p" sx={merge(style.link, { color: item.font_color })}>
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
            {/* <MenuItem onClick={editCard}> Edit </MenuItem> */}
            <MenuItem onClick={deleteLink}> Delete </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

const style = {
  container: {
    flexDirection: "row",
    p: "8px",
    py: "16px",
    backgroundColor: "white",
    borderRadius: "16px",
    width: ["100%", "100%", "350px", "350px", "448px", "448px"],
    minWidth: "330px",
    height: "96px",
    justifyContent: "center",
    alignItems: "center",
    mx: "16px",
    my: "16px",
  },
  button: {
    display: "flex",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderWidth: "0px",
  },
  link: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "16px",
    color: "#D7354A",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "48px",
    height: "48px",
    borderRadius: "48px",
  },
};
