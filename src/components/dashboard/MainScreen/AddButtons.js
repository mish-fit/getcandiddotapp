import { useRouter } from "next/router";
import { BsPlusCircleFill } from "react-icons/bs";
import { Flex, Text } from "@chakra-ui/react";
import addButtonsStyles from "styles/AddButtons";

// Add a custom Link
export function AddButtons({ addLink, addProduct }) {
  const router = useRouter();

  const addLinks = () => {
    addLink();
  };

  const addProducts = () => {
    addProduct();
  };

  return (
    <Flex as="container" sx={addButtonsStyles.container}>
      <Flex as="addbutton" sx={addButtonsStyles.addbutton} onClick={addProducts}>
        <Flex
          sx={addButtonsStyles.flex}
        >
          <BsPlusCircleFill color="#D7354A" />
          <Text sx={addButtonsStyles.addbuttonText}>Recommend Products</Text>
        </Flex>
      </Flex>
      <Flex as="addbutton" sx={addButtonsStyles.addbutton} onClick={addLinks}>
        <Flex
          sx={addButtonsStyles.flex}
        >
          <BsPlusCircleFill color="#D7354A" />
          <Text sx={addButtonsStyles.addbuttonText}>Custom Links</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
