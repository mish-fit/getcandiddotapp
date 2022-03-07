/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
import { useEffect, useState } from "react";
// Add a custom Link
export function ProductsCard({ item, deleteItem }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const addLinks = () => {
    // console.log("add links");
  };

  const buy = () => {
    console.log(item);
    localStorage.setItem("buyLatestItem", item.prod_name);
    if(item.prod_link.substring(0, 8)!=="https://"){
      window.open("https://"+item.prod_link, "_blank");
    }
    else{
      window.open(item.prod_link, "_blank");
    }
  };

  const deleteCard = ()=>{
    deleteItem(item.id)
    console.log('recoscard', item.id);
    axios(
      {
        method: "post",
        url: `${authapi}recos/delete`,
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
        title: "Card deleted",
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
    <Flex sx={style.container}>
      <Flex sx={style.imageMaster}>
        <Flex sx={style.imageContainer}>
          <Image
            src={item.photo || "/user/mobile.png"}
            alt="img"
            sx={style.image}
          />
        </Flex>
      </Flex>
      
      <Flex sx={style.detailsContainer}>
        <Flex sx={style.content}>
          <Text sx={style.product}>{item.prod_name}</Text>
          <Text sx={style.category}>{item.cat_name}</Text>
        </Flex>
        <Flex sx={style.buttonContainer}>
          <Flex sx={style.button} onClick={buy}>
            <Text sx={style.buttonText}>Buy Now</Text>
          </Flex>
        </Flex>
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
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            {/* <MenuItem onClick={editCard}> Edit </MenuItem> */}
            <MenuItem onClick={deleteCard}> Delete </MenuItem>
          </MenuList>
        </Menu>
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
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.1)",
    width: ["100%", "100%", "350px", "350px", "448px", "448px"],
    minWidth: "330px",
    mx: "16px",
    my: "16px",
  },
  imageMaster: {
    backgroundColor: "white",
  },
  imageContainer: {
    mx: "8px",
    backgroundColor: "white",
  },
  image: {
    height: "96px",
    width: "148px",
    borderRadius: "6px",
  },
  detailsContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    ml: "8px",
    width: "248px",
    justifyContent: "space-between",
    py: "8px",
  },
  buttonText: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: "0px",
    color: "white",
    fontWeight: "medium",
    fontFamily: "Poppins",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#D7354A",
    borderRadius: "24px",
    borderColor: "#D7354A",
    py: "4px",
    width: "148px",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "column",
  },
  buttonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  product: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "24px",
    color: "#000",
  },
  category: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "16px",
    color: "#D7354A",
  },
  buynow: {},
};
