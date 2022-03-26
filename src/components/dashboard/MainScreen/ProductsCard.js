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
import axios from "axios";
import { authapi } from "lib/api";
import { useRouter } from "next/router";
import { BsThreeDotsVertical } from "react-icons/bs";
import productsCardStyles from "styles/ProductsCard";
// Add a custom Link
export function ProductsCard({ item, deleteItem, editProductModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const addLinks = () => {
    // console.log("add links");
  };

  const buy = () => {
    // console.log(item);
    localStorage.setItem("buyLatestItem", item.prod_name);
    if (item.prod_link.substring(0, 8) !== "https://") {
      window.open("https://" + item.prod_link, "_blank");
    } else {
      window.open(item.prod_link, "_blank");
    }
  };

  const deleteProduct = () => {
    deleteItem(item.id);
    // console.log("recoscard", item.id);
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
        // console.log(res);
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

  const editProduct = () => {
    // console.log("item", item);
    editProductModal(item);
  };

  return (
    <Flex sx={productsCardStyles.container}>
      <Flex sx={productsCardStyles.imageMaster}>
        <Flex sx={productsCardStyles.imageContainer}>
          <Image
            src={item.photo || "/user/mobile.png"}
            alt="img"
            sx={productsCardStyles.image}
          />
        </Flex>
      </Flex>
      <Flex sx={productsCardStyles.categoryDetailsContainer}>
        <Flex sx={productsCardStyles.categoryContent}>
          <Text sx={productsCardStyles.category}>{item.cat_name}</Text>
        </Flex>
      </Flex>
      <Flex sx={productsCardStyles.detailsContainer}>
        <Flex sx={productsCardStyles.content}>
          <Text sx={productsCardStyles.product}>{item.prod_name}</Text>
        </Flex>
        {/* <Flex sx={productsCardStyles.buttonContainer}>
          <Flex sx={productsCardStyles.button} onClick={buy}>
            <Text sx={productsCardStyles.buttonText}>Buy Now</Text>
          </Flex>
        </Flex> */}
      </Flex>

      <Menu isOpen={isOpen}>
        <MenuButton
          as={IconButton}
          icon={<BsThreeDotsVertical />}
          variant="outline"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          sx={{
            width:"fit-content",
            border:"none",
            position: "absolute",
            top: "-12px",
            right: "-18px",
            backgroundColor: "white",
            padding: "0px",
          }}
        />
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} minWidth="148px">
          <MenuItem onClick={editProduct}> Edit </MenuItem>
          <MenuItem onClick={deleteProduct}> Delete </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}