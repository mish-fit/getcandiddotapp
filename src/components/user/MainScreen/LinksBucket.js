/** @jsxRuntime classic */
/** @jsx jsx */
import { useRouter } from "next/router";
import { Container, Flex, jsx, merge, Text } from "theme-ui";
import { LinksCard } from "./LinksCard";
import isURL from "validator/lib/isURL";
import { useEffect } from "react";

// Add a custom Link
export function LinksBucket({ bucketName, data, link }) {
  const router = useRouter();

  useEffect(() => {
    console.log(link.link.toString());
  }, []);

  const bucketLinkClick = () => {
    console.log("link click", link.link);
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
    <Container sx={style.container}>
      {data.filter((item) => isURL(item.link) == true).length > 0 ? (
        <Flex
          sx={{
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
            sx={merge(style.heading, {
              color:
                link &&
                link.length != 0 &&
                link.link &&
                isURL(link.link.toString())
                  ? "#2A5DB0"
                  : "#323232",
            })}
          >
            {bucketName}
          </Text>
        </Flex>
      ) : null}
      <Flex sx={style.grid}>
        {data.map((item, index) => {
          return (
            isURL(item.link, { require_tld: true }) && (
              <LinksCard key={index} item={item} />
            )
          );
        })}
      </Flex>
    </Container>
  );
}

const style = {
  container: {
    my: "8px",
    width: "100%",
    backgroundColor: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  heading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "16px",
    py: "4px",
  },
};
