import { useRouter } from "next/router";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { ProductsBucket } from "./ProductsBucket";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NoSSR from "react-no-ssr";
import { useEffect, useState } from "react";
import { IoReorderFour } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineDoneOutline } from "react-icons/md";
import showProductsLinksStyles from "styles/ShowLinksProducts";
// Add a custom Link
export function ShowProducts({
  data,
  bucketData,
  cookie,
  deleteItem,
  editProductModal,
  recosBucketsHandler
}) {
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
      // console.log('item.bucket',item.bucket)
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
    
    console.log('data', data)
    console.log('bucketData',bucketData);
    console.log('bucketsArr',bucketsArr);
  },[reorderedToggle])

  // useEffect(()=>{
  //   console.log(reorderedToggle)
  // },[reorderedToggle])
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

    recosBucketsHandler(body);
  }

  const handleCancel = () => {
    setToggle(!toggle);
    setItems(cancelState);

  }

  return (
  <Flex>
    <Flex sx={showProductsLinksStyles.container} id="recos" display={toggle ? 'none' : null}>
    <Flex sx={showProductsLinksStyles.headingFlex} display={bucketsArr.length>1 ? null : 'none'}>
      <Heading sx={showProductsLinksStyles.headingText}>Recommendations</Heading>
    <Button onClick={()=>{setToggle(!toggle)}} sx={showProductsLinksStyles.headingButton} ><IoReorderFour size={'24px'}/></Button>
    </Flex>
    {buckets.map((item, index) => {
      return (
        <ProductsBucket
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
          <Flex {...provided.droppableProps} ref={provided.innerRef} sx={showProductsLinksStyles.container} display={toggle ? null : 'none'} >
          <Flex sx={showProductsLinksStyles.headingFlex}>
            <Heading sx={showProductsLinksStyles.headingText}>Reorder Recos Buckets</Heading>
          <Flex>
            <Button onClick={handleCancel} sx={showProductsLinksStyles.headingButton} mr='4px'><MdOutlineCancel size={20}/></Button>
            <Button onClick={handleSave} sx={showProductsLinksStyles.headingButton}><MdOutlineDoneOutline size={20}  color="#D7354A"/></Button>
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
                    sx={showProductsLinksStyles.listFlex}
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