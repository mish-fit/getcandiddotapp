import {
  Button, Flex
} from "@chakra-ui/react";

const commonprops = { borderRadius: 0, bg: "white", h: "24px" };
const usernameprops = { fontWeight: "normal", fontSize: 14 };
const shareprops = {
  fontWeight: "bold",
  fontSize: 12,
  borderRadius: 3,
  borderColor: "brand.900",
  borderWidth: 1,
};

const UserNameShare = (props) => (
  <Flex direction={"row"} justify={"space-between"} p={1} bg={"gray.100"}>
    <Button
      {...commonprops}
      {...usernameprops}
      m={2}
      flex={1}
      onClick={props.onClickUserName}
    >
      {props.link}
    </Button>
    <Button {...commonprops} {...shareprops} m={2} onClick={props.onClickShare}>
      Share
    </Button>
  </Flex>
);

export default UserNameShare;
