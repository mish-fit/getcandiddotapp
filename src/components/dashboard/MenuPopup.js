import { Flex, Divider, Text } from "@chakra-ui/react";
import menuPopupStyles from "styles/MenuPopup";

// Add a custom Link
export function MenuPopup() {
  return (
    <Flex sx={menuPopupStyles.container}>
      <Text sx={menuPopupStyles.text}>Edit Profile</Text>
      <Divider />
      <Text sx={menuPopupStyles.text}>Sign Out</Text>
    </Flex>
  );
}