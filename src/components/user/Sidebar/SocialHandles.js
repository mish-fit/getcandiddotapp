import { Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsPlusCircleFill } from "react-icons/bs";
import { event } from "analytics/ga";
import socialHandlesStyles from "styles/SocialHandles";

const SocialElement = ({ item }) => (
  <Flex
    sx={socialHandlesStyles.socialView}
    onClick={() => {
      event("SOCIAL_HANDLE_CLICK", item);
      // console.log(item);
      localStorage.setItem(
        "clickLatestSocial",
        item.social_ulink + item.u_name
      );
      window.open(item.social_ulink + item.u_name, "_blank"); //to open new page
    }}
  >
    <Image src={item.social_logo} alt={"social logo"} sx={socialHandlesStyles.social} />
    <Text sx={socialHandlesStyles.socialText}>
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
      sx={socialHandlesStyles.container}
    >
      {/* <Text sx={socialHandlesStyles.heading}>Social Handles</Text> */}
      <SimpleGrid gap={2} columns={[5, 5, 5, 5, 5, 5]} sx={socialHandlesStyles.grid}>
        {data.map((item, index) => {
          return <SocialElement item={item} key={index} />;
        })}
      </SimpleGrid>
    </Flex>
  );
}