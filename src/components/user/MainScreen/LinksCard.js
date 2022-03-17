/** @jsxRuntime classic */
/** @jsx jsx */
import { Tooltip } from "@chakra-ui/react";
import { event } from "analytics/ga";
import { useEffect } from "react";
import { Flex, Image, jsx, merge, Text } from "theme-ui";

// Add a custom Link
export function LinksCard({ item }) {
  useEffect(() => {
    event("LINK_EXTENSION", item);
  }, []);

  const onClickLink = () => {
    event("LINK_CLICK", item);
    if (item.link.substring(0, 8) !== "https://") {
      window.open("https://" + item.link, "_blank");
    } else {
      window.open(item.link, "_blank");
    }
  };

  return (
    <Tooltip label={item.link.substring(0, 100) + ".."} placement="top">
      <Flex sx={style.button} onClick={onClickLink}>
        <Flex
          sx={merge(style.container, {
            boxShadow: "0 0 1px 1px " + item.shadow_color,
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
          >
            <Text as="p" sx={merge(style.link, { color: item.font_color })}>
              {item.title}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Tooltip>
  );
}

const style = {
  container: {
    flexDirection: "row",
    p: "8px",
    py: "16px",
    backgroundColor: "white",
    borderRadius: "0px",
    mx: "16px",
    width: ["100%", "100%", "340px", "340px", "340px", "340px"],
    minWidth: "330px",
    height: "72px",
    my: "16px",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    cursor: "pointer",
    borderWidth: "0px",
  },
  link: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "14px",
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
