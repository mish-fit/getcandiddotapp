/** @jsxRuntime classic */
/** @jsx jsx */
import { useRouter } from "next/router";
import { Flex, Image, jsx, Text } from "theme-ui";

// Add a custom Link
export function ProductsCard({ item }) {
  const router = useRouter();

  const addLinks = () => {
    // console.log("add links");
  };

  const buy = () => {
    // console.log(item);
    localStorage.setItem("buyLatestItem", item.prod_name);
    if (item.prod_link.substring(0, 8) !== "https://") {
      window.open("https://" + item.prod_link, "_blank");
    } else {
      window.open(item.prod_link, "_blank");
    }
  };

  return (
    <Flex sx={style.container} onClick={buy}>
      <Flex sx={style.imageMaster}>
        <Flex sx={style.imageContainer}>
          <Image
            src={item.photo || "/user/mobile.png"}
            alt="img"
            sx={style.image}
          />
        </Flex>
      </Flex>
      <Flex sx={style.categoryDetailsContainer}>
        <Flex sx={style.categoryContent}>
          <Text sx={style.category}>{item.cat_name}</Text>
        </Flex>
      </Flex>
      <Flex sx={style.detailsContainer}>
        <Flex sx={style.content}>
          <Text sx={style.product}>{item.prod_name}</Text>
        </Flex>
        {/* <Flex sx={style.buttonContainer}>
          <Flex sx={style.button} onClick={buy}>
            <Text sx={style.buttonText}>Buy Now</Text>
          </Flex>
        </Flex> */}
      </Flex>
    </Flex>
  );
}

const style = {
  container: {
    flexDirection: "column",
    // p: "8px",
    // py: "16px",
    backgroundColor: "white",
    borderRadius: "0px",
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.1)",
    mx: "8px",
    width: "210px",
    // width: ["100%", "100%", "350px", "350px", "448px", "448px"],
    // minWidth: "330px",
    my: "8px",
    cursor: "pointer",
  },
  imageMaster: {
    backgroundColor: "white",
  },
  imageContainer: {
    // mx: "8px",
    backgroundColor: "white",
  },
  image: {
    height: "300px",
    width: "210px",
    borderRadius: "8px",
  },
  categoryDetailsContainer: {
    mt: "-20px",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    my: "6px",
    justifyContent: "space-between",
    textAlign: "center",
  },
  buttonText: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderWidth: "0px",
    color: "white",
    fontWeight: "medium",
    fontFamily: "Poppins",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#D7354A",
    borderRadius: "24px",
    borderColor: "#D7354A",
    py: "4px",
    width: "148px",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "column",
    px: "4px",
  },
  buttonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  product: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#000",
  },
  category: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "12px",
    color: "white",
  },
  buynow: {},
  categoryContent: {
    backgroundColor: "#D7354A",
    height: "30px",
    justifyContent: "center",
    alignItems: "center",
    px: "4px",
    borderRadius: "8px",
  },
};
