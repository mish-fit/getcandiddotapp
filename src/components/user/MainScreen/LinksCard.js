import { Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { event } from "analytics/ga";
import { useEffect } from "react";
import linksCardStyles from "styles/LinksCard";
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
      <Flex sx={linksCardStyles.button} onClick={onClickLink}>
        <Flex
          sx={{
            flexDirection: "row",
            p: "8px",
            py: "16px",
            backgroundColor: "white",
            borderRadius: "5px",
            mx: "16px",
            width: ["100%", "100%", "340px", "340px", "340px", "340px"],
            minWidth: "330px",
            height: "72px",
            my: "16px",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 1px 1px " + item.shadow_color,
            "&:hover": {
              p: {
                color: "#fff",
              },
              backgroundColor: item.shadow_color,
            },
          }}
        >
          {item.photo && item.photo != "" ? (
            <Image src={item.photo} alt="img" sx={linksCardStyles.image} />
          ) : null}
          <Flex
            sx={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Text as="p" sx={{
              fontFamily: "Poppins",
              // fontWeight: "medium",
              fontSize: "16px",
              color: "#D7354A",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              color: item.font_color }}>
              {item.title}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Tooltip>
  );
}