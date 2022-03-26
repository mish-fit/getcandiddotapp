import { Flex, Text, useMediaQuery, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";
import addButtonsStyles from "styles/AddButtons";

// Add a custom Link
export function AddButtons({ addLink, addProduct, showAnalytics }) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  useEffect(()=>{
    // console.log("isLargerThan768", isLargerThan768);
  },[isLargerThan768])
  const addLinks = () => {
    addLink();
  };

  const addProducts = () => {
    addProduct();
  };

  const analytics = () => {
    showAnalytics();
  };

  return (
    <Flex as="container" sx={addButtonsStyles.container} >
      <Flex sx={addButtonsStyles.analytics}>
        <Flex
          as="addbutton"
          sx={addButtonsStyles.showAnalytics}
          onClick={showAnalytics}
        >
          <Button sx={addButtonsStyles.flex} id="analytics">
            <IoMdAnalytics  />
            <Text sx={addButtonsStyles.showAnalyticsText} >Show Analytics</Text>
          </Button>
        </Flex>
      </Flex>
      <Flex id="addbuttons" >
        <Flex
          as="addbutton"
          sx={addButtonsStyles.addbutton}
          onClick={addProducts}
        >
          <Button sx={addButtonsStyles.flex}>
            <BsPlusCircleFill color="#D7354A" />
            <Text sx={addButtonsStyles.addbuttonText}>Recommend Products</Text>
          </Button>
        </Flex>
        <Flex as="addbutton" sx={addButtonsStyles.addbutton} onClick={addLinks}>
          <Button sx={addButtonsStyles.flex}>
            <BsPlusCircleFill color="#D7354A" />
            <Text sx={addButtonsStyles.addbuttonText}>Custom Links</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
