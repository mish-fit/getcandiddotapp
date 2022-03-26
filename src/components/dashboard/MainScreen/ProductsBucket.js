import { useRouter } from "next/router";
import { Flex, Text, Divider, useMediaQuery } from "@chakra-ui/react";
import { ProductsCard } from "./ProductsCard";
import isURL from "validator/lib/isURL";
import productsBucketStyles from "styles/ProductsBucket";

// Add a custom Link
export function ProductsBucket({
  bucketName,
  data,
  link,
  deleteItem,
  editProductModal,
}) {
  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const bucketLinkClick = () => {
    // console.log("link click", link.link);
    if (link.link.substring(0, 8) !== "https://") {
      window.open("https://" + link.link, "_blank");
    } else {
      window.open(link.link, "_blank");
    }
  };

  return (
    <Flex sx={productsBucketStyles.container}>
      <Flex
        sx={{
          justifyContent:["center","center","left","left","left","left"],
          cursor:
            link && link.length != 0 && link.link && isURL(link.link.toString())
              ? "pointer"
              : "default",
          backgroundColor: "white",
        }}
        onClick={
          link && link.length != 0 && link.link && isURL(link.link.toString())
            ? bucketLinkClick
            : null
        }
      >
        <Text
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            fontSize: "18px",
            py: "4px",
            color:
              link &&
              link.length != 0 &&
              link.link &&
              isURL(link.link.toString())
                ? "#2A5DB0"
                : "#323232",
          }}
        >
          {bucketName}
        </Text>
      </Flex>
      <Divider mb="8px" display={isLargerThan768 ? "none" : "block"}/>
      <Flex sx={productsBucketStyles.grid}>
        {data.map((item, index) => {
          return (
            isURL(item.prod_link, { require_tld: true }) && (
              <ProductsCard
                key={index}
                item={item}
                deleteItem={(item) => {
                  // console.log("recosbucket", item);
                  deleteItem(item);
                }}
                editProductModal={(item) => editProductModal(item)}
              />
            )
          );
        })}
      </Flex>
    </Flex>
  );
}

