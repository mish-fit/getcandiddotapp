import {
  Input,
  Text,
  Heading,
  Stack,
  Container,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Progress,
  Button,
} from "@chakra-ui/react";
import Header from "./Header";
import { useState, useContext, useRef } from "react";
import { firestore } from "../../lib/firebase";
import { UserContext } from "../../lib/UserDataProvider";
import "@fontsource/poppins";

import { ChakraProvider } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useRouter } from "next/router";

const brands = [
  { value: "amazon", label: "Amazon" },
  { value: "flipkart", label: "Flipkart" },
  { value: "ajio", label: "Ajio" },
  { value: "myntra", label: "Myntra" },
];

const affiliates = [];

const Step4 = (props) => {
  const router = useRouter();
  const ctx = useContext(UserContext);
  const affiliateCode = useRef();
  const affiliateBrand = useRef();
  const [brandArray, setBrandArray] = useState(brands);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const handleCreateItem = (item) => {
    setBrandArray((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
    // console.log(curr);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      // console.log(selectedItems);
      setSelectedItems(selectedItems);
      setShowInput(true);
    }
  };

  const handleAffiliates = (e) => {
    e.preventDefault();
    // console.log(affiliates);
    // console.log(affiliateCode.current.value);
    // console.log(selectedItems[selectedItems.length-1].value);
    affiliates.push({
      brand: selectedItems[selectedItems.length - 1].value,
      code: affiliateCode.current.value,
    });
    console.log(affiliates);
    setShowInput(false);
  };

  const next = async (e) => {
    e.preventDefault();
    ctx.setAffiliateCodes(affiliates);
    const userDoc = firestore.doc(`users/${ctx.userSignInInfo.user.uid}`);
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: ctx.userData.username,
      displayName: ctx.userData.name,
      mail: ctx.userData.mail,
      phone: ctx.userData.phone,
      affiliateCodes: affiliates,
    });
    await batch.commit();
    router.push("/dashboard");
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <>
      <Container
        fontFamily={"Poppins"}
        maxW={"container.md"}
        p={0}
        align="center"
      >
        <Header value={100} />
        <Flex display={{ md: "flex" }}>
          <Stack
            align={{ base: "center", md: "stretch" }}
            textAlign={{ base: "center", md: "left" }}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
          >
            <Flex flexDirection={"column"}>
              <Heading size={"lg"} marginBottom="16px">
                Affiliate Codes
              </Heading>
              <Flex width={"248px"} display="block">
                <CUIAutoComplete
                  placeholder="Type a brand"
                  onCreateItem={handleCreateItem}
                  items={brandArray}
                  inputStyleProps={{
                    focusBorderColor: "#E78692",
                    _hover: { borderColor: "#E78692" },
                    borderColor: "#E78592",
                    width: "248px",
                    height: "48px",
                  }}
                  tagStyleProps={{
                    rounded: "full",
                    pt: 1,
                    pb: 2,
                    px: 2,
                    fontSize: "15",
                  }}
                  toggleButtonStyleProps={{
                    width: "48px",
                    height: "48px",
                  }}
                  selectedItems={selectedItems}
                  onSelectedItemsChange={(changes) => {
                    // console.log(changes);
                    handleSelectedItemsChange(changes.selectedItems);
                  }}
                />
              </Flex>
              <Flex
                width="200px"
                style={{ display: showInput ? "inline" : "none" }}
              >
                <Input
                  type="text"
                  bg="white"
                  focusBorderColor="#E78692"
                  _hover={{ borderColor: "#E78592" }}
                  borderColor="#E78592"
                  width="248px"
                  height="48px"
                  fontSize={15}
                  marginBottom="8px"
                  ref={affiliateCode}
                />
                <Button
                  borderRadius={50}
                  bg={"#ff5151"}
                  bg={"#D7354A"}
                  _hover={{ bg: "#C23043" }}
                  borderRadius={10}
                  color="white"
                  width="248px"
                  height="48px"
                  fontSize={15}
                  onClick={handleAffiliates}
                >
                  Add
                </Button>
              </Flex>
            </Flex>
            {affiliates.map((item, id) => (
              <Heading value={item} key={id} size="md">
                {item.brand + " " + item.code}
              </Heading>
            ))}
            <Flex>
              <Button
                borderRadius={50}
                color="white"
                bg={"#D7354A"}
                _hover={{ bg: "#C23043" }}
                borderRadius={10}
                color="white"
                width="116px"
                height="48px"
                marginRight="6px"
                _hover={{ bg: "#D7354A" }}
                onClick={back}
              >
                Back
              </Button>
              <Button
                borderRadius={50}
                color="white"
                bg={"#D7354A"}
                _hover={{ bg: "#C23043" }}
                borderRadius={10}
                color="white"
                width="116px"
                height="48px"
                onClick={next}
              >
                Submit
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </>
  );
};
export default Step4;
