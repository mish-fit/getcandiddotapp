/** @jsxRuntime classic */
/** @jsx jsx */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, Flex, jsx, merge, Text } from "theme-ui";
import isURL from "validator/lib/isURL";
import { ProductsCard } from "./ProductsCard";

// Add a custom Link
export function ProductsBucket({ bucketName, data, link }) {
  const router = useRouter();

  useEffect(() => {
    console.log("PRoduct bucket", link.length);
  }, []);

  const bucketLinkClick = () => {
    console.log("link click", link.link);
    if (
      link &&
      link.length != 0 &&
      link.link &&
      isURL(link.link.toString()) &&
      link.link.toString().substring(0, 8) !== "https://"
    ) {
      window.open("https://" + link.link, "_blank");
    } else {
      window.open(link.link, "_blank");
    }
  };

  return (
    <Container sx={style.container}>
      {data.filter((item) => isURL(item.prod_link) == true).length > 0 ? (
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
            isURL(item.prod_link, { require_tld: true }) && (
              <ProductsCard key={index} item={item} />
            )
          );
        })}
      </Flex>
    </Container>
  );
}

const style = {
  container: {
    flexDirection: "column",
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
