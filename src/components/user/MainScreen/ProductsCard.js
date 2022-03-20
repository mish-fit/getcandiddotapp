import { Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { event } from "analytics/ga";
import { useRouter } from "next/router";
import { useEffect } from "react";
import productsCardStyles from "styles/ProductsCard";

// Add a custom Link
export function ProductsCard({ item }) {
  const router = useRouter();

  const addLinks = () => {
    // console.log("add links");
  };

  useEffect(() => {
    event("PRODUCT_EXTENSION", item);
  }, []);

  const buy = () => {
    event("PRODUCT_CLICK", item);
    localStorage.setItem("buyLatestItem", item.prod_name);
    if (item.prod_link.substring(0, 8) !== "https://") {
      window.open("https://" + item.prod_link, "_blank");
    } else {
      window.open(item.prod_link, "_blank");
    }
  };

  return (
    <Tooltip label={item.prod_link.substring(0, 100) + ".."} placement="top">
      <Flex sx={productsCardStyles.container} onClick={buy}>
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
      </Flex>
    </Tooltip>
  );
}