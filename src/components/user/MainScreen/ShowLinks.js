import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { LinksBucket } from "./LinksBucket";
import { useEffect } from "react";
import showProductsLinksStyles from "styles/ShowLinksProducts";

// Add a custom Link
export function ShowLinks({ data, bucketData }) {
  const router = useRouter();
  const buckets = [];
  data.map((item) => {
    if (buckets.indexOf(item.bucket) === -1) {
      buckets.push(item.bucket);
    }
  });

  useEffect(()=>{
    console.log("User Page",'data', data)
    console.log('bucketData',bucketData);
    console.log('bucketsArr',buckets);
  },[])

  const addLinks = () => {
    // console.log("add links");
  };

  return (
    <Flex sx={showProductsLinksStyles.container} width="fit-content">
      {buckets.map((item, index) => {
        return (
          <LinksBucket
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
