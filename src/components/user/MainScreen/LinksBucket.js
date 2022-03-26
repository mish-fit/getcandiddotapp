import { useRouter } from "next/router";
import { Divider, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { LinksCard } from "./LinksCard";
import isURL from "validator/lib/isURL";
import { useEffect } from "react";
import linksBucketStyles from "styles/LinksBucket";

// Add a custom Link
export function LinksBucket({ bucketName, data, link }) {
  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // console.log(link.link.toString());
  }, []);

  const bucketLinkClick = () => {
    // console.log("link click", link.link);
    if (
      link &&
      link.length != 0 &&
      link.link &&
      isURL(link.link.toString()) &&
      link.link.substring(0, 8) !== "https://"
    ) {
      window.open("https://" + link.link, "_blank");
    } else {
      window.open(link.link, "_blank");
    }
  };

  return (
    <Flex sx={linksBucketStyles.container}>
      {data.filter((item) => isURL(item.link) == true).length > 0 ? (
        <Flex
          sx={{
            justifyContent:["center","center","left","left","left","left"],
            cursor:
              link &&
              link.length != 0 &&
              link.link &&
              isURL(link.link.toString())
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
      ) : null}

      <Divider display={isLargerThan768 ? "none" : "block"}/>
      <Flex sx={linksBucketStyles.grid}>
        {data.map((item, index) => {
          return (
            isURL(item.link, { require_tld: true }) && (
              <LinksCard key={index} item={item} />
            )
          );
        })}
      </Flex>
    </Flex>
  );
}