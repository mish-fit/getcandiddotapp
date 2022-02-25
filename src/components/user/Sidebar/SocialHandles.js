/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";

const SocialElement = ({ item }) => (
  <Flex sx={style.socialView} onClick={() => console.log("Trell")}>
    <Image
      src={item.social_logo}
      alt="Logo for Social Network Websites"
      sx={style.social}
    />
    <Text sx={style.socialText}>
      {item && item.social_name && item.social_name.length > 9
        ? item.social_name.slice(0, 10) + ".."
        : item.social_name}
    </Text>
  </Flex>
);

// Add a custom Link
export function SocialHandles({ data }) {
  return (
    <Flex sx={{ px: ["1%","1%","10%","10%","10%","10%"], mt: "8px", pb: "16px", flexDirection:"column"}}>
      <Text sx={style.heading}>Social Handles</Text>
      <Grid gap={2} columns={[6, 6, 6, 6, 6, 6]} sx={style.grid}>
        {data.map((item, index) => {
          return <SocialElement item={item} key={index} />;
        })}
      </Grid>
    </Flex>
  );
}

const style = {
  grid: {},
  heading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "24px",
    py: "8px",
  },
  socialView: {
    ml:['50px','50px','50px','10px','10px','10px'],
    textAlign: "center",
    cursor: "pointer",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  social: {
    width: "24px",
    height: "24px",
  },
  socialText: {
    fontFamily: "Poppins",
    fontSize: "11px",
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
