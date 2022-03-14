import { Button, Container, Flex, Heading, Input, Select, Stack } from "@chakra-ui/react";
import "@fontsource/poppins";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../lib/UserDataProvider";
import Header from "./Header";

const Step5 = (props) => {
  const ctx = useContext(UserContext);
  const [selectedAffiliates, setSelectedAffiliates] = useState([]);
  const [brandArray, setBrandArray] = useState([
    "Amazon",
    "Flipkart",
    "Ajio",
    "Myntra",
  ]);
  const affiliateBrand = useRef();
  const affiliateCode = useRef();

  const next = (e) => {
    // console.log(ctx.userData);
    e.preventDefault();
    ctx.setAffiliateCodes(selectedAffiliates);
    props.nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const handleAffiliates = (e) => {
    e.preventDefault();
    console.log(selectedAffiliates);
    console.log(brandArray);
    let newSelectedAffiliates = [...selectedAffiliates];
    newSelectedAffiliates.push(
      affiliateBrand.current.value + " " + affiliateCode.current.value
    );
    setSelectedAffiliates(newSelectedAffiliates);
    let newBrandArray = brandArray.filter(
      (brand) => brand !== affiliateBrand.current.value
    );
    setBrandArray(newBrandArray);
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
            <form onSubmit={next}>
              <Heading size={"lg"} marginBottom="16px">
                Affiliate Codes
              </Heading>
              <Flex marginBottom="8px">
                <Flex w="148px">
                  <Select placeholder="Affiliates" ref={affiliateBrand}>
                    {brandArray.map((item, id) => (
                      <option value={item} key={id}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </Flex>
                <Flex w="148px">
                  <Input type="text" bg="white" ref={affiliateCode} />
                </Flex>
                <Button
                  borderRadius={50}
                  color="white"
                  bg={"#ff5151"}
                  _hover={{ bg: "#D7354A" }}
                  onClick={handleAffiliates}
                >
                  Add
                </Button>
              </Flex>
              <Button
                borderRadius={50}
                color="white"
                bg={"#ff5151"}
                marginRight="6px"
                _hover={{ bg: "#D7354A" }}
                onClick={back}
              >
                Back
              </Button>
              <Button
                borderRadius={50}
                color="white"
                bg={"#ff5151"}
                _hover={{ bg: "#D7354A" }}
                onClick={next}
              >
                Next
              </Button>
            </form>
          </Stack>
        </Flex>
      </Container>
    </>
  );
};
export default Step5;
