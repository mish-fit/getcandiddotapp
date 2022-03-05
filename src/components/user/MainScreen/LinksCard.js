/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid, merge } from "theme-ui";

// Add a custom Link
export function LinksCard({ item }) {
  const onClickLink = () => {
    window.open(item.link, "_blank");
  };

  return (
    <Flex sx={style.button} onClick={onClickLink}>
      <Flex
        sx={merge(style.container, {
          boxShadow: "0 0 4px 1px " + item.shadow_color,
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
  );
}

const style = {
  container: {
    flexDirection: "row",
    p: "8px",
    py: "16px",
    backgroundColor: "white",
    borderRadius: "16px",
    mx: "16px",
    width: ["100%", "100%", "350px", "350px", "448px", "448px"],
    minWidth: "330px",
    height: "96px",
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
    fontSize: "16px",
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
