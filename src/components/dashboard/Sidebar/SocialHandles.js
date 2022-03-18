import { Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsPlusCircleFill } from "react-icons/bs";

const SocialElement = ({ item }) => (
  <Flex
    sx={style.socialView}
    onClick={() => {
      // console.log(item);
      localStorage.setItem(
        "clickLatestSocial",
        item.social_ulink + item.u_name
      );
      window.open(item.social_ulink + item.u_name, "_blank"); //to open new page
    }}
  >
    <Image src={item.social_logo} alt={"social logo"} sx={style.social} />
    <Text sx={style.socialText}>
      {item && item.social_name && item.social_name.length > 9
        ? item.social_name.slice(0, 10) + ".."
        : item.social_name}
    </Text>
  </Flex>
);

// Add a custom Link
export function SocialHandles({ social, data }) {
  const router = useRouter();

  const addSocial = () => {
    social();
  };

  return (
    <Flex
      sx={{
        width: "100%",
        px: ["0%", "0%", "5%", "5%", "5%", "5%"],
        // ml: ["0%", "0%", "10%", "10%", "10%", "10%"],
        // mr: ["0%", "10%", "10%", "10%", "10%", "10%"],
        mt: "12px",
        flexDirection: "column",
      }}
    >
      {/* <Text sx={style.heading}>Social Handles</Text> */}
      <SimpleGrid gap={2} columns={[4, 5, 6, 6, 6, 6]} sx={style.grid}>
        {data.map((item, index) => {
          return <SocialElement item={item} key={index} />;
        })}
      </SimpleGrid>
      <Flex
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mb: "0px",
        }}
      >
        <Button as="addbutton" sx={style.addbutton} onClick={addSocial}>
          <BsPlusCircleFill color="#D7354A" size={15} />
          <Text
            sx={{
              ml: "4px",
              fontSize: "10px",
              fontWeight: "bold",
              fontFamily: "Poppins",
              color: "#D7354A",
            }}
          >
            Social Handle
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
}

const style = {
  grid: {},
  headingTextView: {
    width: "100%",
    px: ["0%", "0%", "5%", "5%", "5%", "5%"],
    my: "4px",
    flexDirection: "column",
  },
  heading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "12px",
    py: "4px",
  },
  socialView: {
    ml: ["50px", "50px", "50px", "10px", "10px", "10px"],
    textAlign: "center",
    cursor: "pointer",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  social: {
    width: "16px",
    height: "16px",
    borderRadius: "16px",
  },
  socialText: {
    fontFamily: "Poppins",
    fontSize: "8px",
    color: "#646464",
    textAlign: "center",
  },
  addbutton: {
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  addContainer: {
    textAlign: "center",
  },
  addbuttonText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#FFFFFF",
  },
};
