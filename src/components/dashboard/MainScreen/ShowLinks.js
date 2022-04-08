import { useRouter } from "next/router";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { LinksBucket } from "./LinksBucket";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NoSSR from "react-no-ssr";
import { useEffect, useState } from "react";
import { IoReorderFour } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineDoneOutline } from "react-icons/md";

// Add a custom Link
export function ShowLinks({ data, bucketData, deleteItem, editLinkModal, cookie, linksBucketsHandler }) {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [reorderedToggle, setReorderedToggle]=useState(false);
  const [showBuckets, setShowBuckets] = useState(false);
  const [items, setItems] = useState(bucketData);
  const [buckets, setBuckets]=useState([]);
  const [cancelState, setCancelState] = useState(bucketData);
  const bucketsArr = [];
  data.map((item) => {
    if (bucketsArr.indexOf(item.bucket) === -1) {
      bucketsArr.push(item.bucket);
    }
  });

  useEffect(()=>{
    setBuckets(bucketsArr);
  },[])

  useEffect(()=>{
    setItems(bucketData);
    setCancelState(bucketData);
  }, [bucketData])

  useEffect(()=>{
    console.log("Dashboard",'data', data)
    console.log('bucketData',bucketData);
    console.log('bucketsArr',bucketsArr);
  },[reorderedToggle])
  const addLinks = () => {
    // console.log("add links");
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    console.log("onDragEnd newitems",newItems);
    setItems(newItems)
  }

  const reorderedHandler=(curToggle)=>{
    console.log('reached reordered', curToggle)
    setReorderedToggle(curToggle); 
  }

  const showBucketsHandler=(prev)=>{
    setShowBuckets(prev)
  }

  const handleSave = () => {
    setToggle(!toggle);
    setCancelState(items);

    const body = [...items];
    body.forEach((element, idx) => {
      element.sort_id = idx;
      element.others = {};
    });

    linksBucketsHandler(body);
  }

  const handleCancel = () => {
    setToggle(!toggle);
    setItems(cancelState);

  }

  return (
    // <Flex sx={{ width:"fit-content", mx:"auto", flexDirection:"column" }} id="links">
    //   {bucketsArr.map((item, index) => {
    //     return (
    //       <LinksBucket
    //         key={index}
    //         bucketName={bucketsArr[index]}
    //         cookie={cookie}
    //         data={data.filter((item) => item.bucket === bucketsArr[index])}
    //         link={
    //           bucketData.filter((item) => item.name === bucketsArr[index])[0] || ""
    //         }
    //         deleteItem={(item) => {
    //           deleteItem(item);
    //           // console.log("linksshow", item);
    //         }}
    //         editLinkModal={(item) => editLinkModal(item)}
    //       />
    //     );
    //   })}
    // </Flex>

  <Flex>
    <Flex sx={{ width:"fit-content", mx:"auto", flexDirection:"column" }} id="links" display={toggle ? 'none' : null}>
    <Flex alignItems={'center'} justifyContent={'space-between'} mx={'16px'} my={'4px'}>
      <Heading size={'md'} textDecoration={"underline"} textUnderlineOffset={"2px"}>Links</Heading>
    <Button onClick={()=>{setToggle(!toggle)}} size={'sm'} w='fit-content' ><IoReorderFour size={'24px'}/></Button>
    </Flex>
    {buckets.map((item, index) => {
      return (
        <LinksBucket
          key={index}
          bucketName={bucketData[index].name}
          data={data.filter((item) => item.bucket === bucketData[index].name)}
          cookie={cookie}
          link={
            bucketData.filter((item) => item.name === bucketData[index].name)[0] || ""
          }
          deleteItem={(item) => {
            deleteItem(item);
            // console.log("recosshow", item);
          }}
          editProductModal={(item) => editProductModal(item)}
          reorderedToggle={reorderedHandler}
          showBucketsHandler={showBucketsHandler}
        />
        );
      })}
    </Flex>
    <NoSSR>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Flex {...provided.droppableProps} ref={provided.innerRef} sx={{ width:["200px","480px","704px","704px","704px","704px"], mx:"auto", flexDirection:"column" }} display={toggle ? null : 'none'} >
          <Flex alignItems={'center'} justifyContent={'space-between'} mx={'16px'} my={'4px'}>
            <Heading size={'md'} textDecoration={"underline"} textUnderlineOffset={"2px"}>Reorder Links Buckets</Heading>
          <Flex>
            <Button onClick={handleCancel} size={'sm'} w='fit-content' mr='4px'><MdOutlineCancel size={20}/></Button>
            <Button onClick={handleSave} size={'sm'} w='fit-content'><MdOutlineDoneOutline size={20}  color="#D7354A"/></Button>
          </Flex>
          </Flex>
            {items.map((item, index) => (
              <Draggable
                draggableId={item.sort_id.toString()}
                key={item.id}
                index={index}
              >
                {(provided) => (
                  <Flex
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                    flexDirection: "row",
                    p: "8px",
                    // py: "16px",
                    backgroundColor: "#df5d6e",
                    // color: "white",
                    mx: "16px",
                    width:["sm","md","2xl","2xl","2xl","2xl"],
                    height: "64px",
                    my: "8px",
                    justifyContent: "center",
                    alignItems: "center"}}
                    >
                 <Text>
                   {item.name}
                 </Text>
                 </Flex>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
    </NoSSR>
  </Flex>
  );
}