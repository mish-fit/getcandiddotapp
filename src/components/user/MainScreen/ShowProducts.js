import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { ProductsBucket } from "./ProductsBucket";
import showProductsLinksStyles from "styles/ShowLinksProducts";
// Add a custom Link
export function ShowProducts({ data, bucketData }) {
  const router = useRouter();
  const buckets = [];
  data.map((item) => {
    if (buckets.indexOf(item.bucket) === -1) {
      buckets.push(item.bucket);
    }
  });

  const addLinks = () => {
    // console.log("add links");
  };

  return (
    <Flex sx={showProductsLinksStyles.container}>
      {bucketData.map((item, index) => {
        return (
          <ProductsBucket
            key={index}
            bucketName={bucketData[index].name}
            data={data.filter((item) => item.bucket === bucketData[index].name)}
            link={
              bucketData.filter((item) => item.name === bucketData[index].name)[0] || ""
            }
          />
        );
      })}
    </Flex>
  );
}
