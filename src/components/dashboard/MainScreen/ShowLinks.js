import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { LinksBucket } from "./LinksBucket";

// Add a custom Link
export function ShowLinks({ data, bucketData, deleteItem, editLinkModal }) {
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
    <Flex sx={{ width: "95%", mx: "auto" }}>
      {buckets.map((item, index) => {
        return (
          <LinksBucket
            key={index}
            bucketName={buckets[index]}
            data={data.filter((item) => item.bucket === buckets[index])}
            link={
              bucketData.filter((item) => item.name === buckets[index])[0] || ""
            }
            deleteItem={(item) => {
              deleteItem(item);
              // console.log("linksshow", item);
            }}
            editLinkModal={(item) => editLinkModal(item)}
          />
        );
      })}
    </Flex>
  );
}