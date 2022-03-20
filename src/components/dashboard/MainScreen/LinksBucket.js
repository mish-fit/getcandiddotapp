import { useRouter } from "next/router";
import { Container, Flex, Text } from "@chakra-ui/react";
import { LinksCard } from "./LinksCard";
import linksBucketStyles from "styles/LinksBucket";

// Add a custom Link
export function LinksBucket({
  bucketName,
  data,
  link,
  deleteItem,
  editLinkModal,
}) {
  const router = useRouter();

  const bucketLinkClick = () => {
    console.log("link click", link.link);
    if (link.link.substring(0, 8) !== "https://") {
      window.open("https://" + link.link, "_blank");
    } else {
      window.open(link.link, "_blank");
    }
  };

  return (
    <Flex sx={linksBucketStyles.container}>
      <Flex
        sx={{
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
            fontSize: "16px",
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
      <Flex sx={linksBucketStyles.grid}>
        {data.map((item, index) => {
          return (
            <LinksCard
              key={index}
              item={item}
              deleteItem={(item) => {
                console.log("linksbucket", item);
                deleteItem(item);
              }}
              editLinkModal={(item) => editLinkModal(item)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
