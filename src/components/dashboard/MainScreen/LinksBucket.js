import { useRouter } from "next/router";
import { Container, Flex, Text } from "@chakra-ui/react";
import { LinksCard } from "./LinksCard";

// Add a custom Link
export function LinksBucket({ bucketName, data, link, deleteItem, editLinkModal }) {
  const router = useRouter();

  const bucketLinkClick = () => {
    console.log("link click", link.link);
    if(link.link.substring(0, 8)!=="https://"){
      window.open("https://"+link.link, "_blank");
    }
    else{
      window.open(link.link, "_blank");
    }
  };

  return (
    <Flex sx={style.container}>
      <Flex
        sx={{
          cursor: link.link ? "pointer" : "default",
          backgroundColor: "white",
        }}
        onClick={link.link ? bucketLinkClick : null}
      >
        <Text
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            fontSize: "24px",
            py: "8px",
            color: link.link ? "#2A5DB0" : "#323232",
          }}
        >
          {bucketName}
        </Text>
      </Flex>
      <Flex sx={style.grid}>
        {data.map((item, index) => {
          return <LinksCard key={index} item={item} 
          deleteItem={(item)=>{
            console.log('linksbucket', item);
            deleteItem(item)}
          } 
          editLinkModal = {(item)=>editLinkModal(item)}
          />;
        })}
      </Flex>
    </Flex>
  );
}

const style = {
  container: {
    flexDirection: "column",
    my: "8px",
    width: "100%",
    backgroundColor: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
};
