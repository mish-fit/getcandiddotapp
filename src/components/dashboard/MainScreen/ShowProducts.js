import { useRouter } from "next/router";
import { Button, Flex, Grid, Heading, Text,Image } from "@chakra-ui/react";
import { ProductsBucket } from "./ProductsBucket";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NoSSR from "react-no-ssr";
import { useEffect, useState } from "react";
import { IoReorderFour } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineDoneOutline } from "react-icons/md";
import showProductsLinksStyles from "styles/ShowLinksProducts";
import axios from "axios";
import { authapi } from "lib/api";
import rearrange from "assets/rearrange.png";
// Add a custom Link
export function ShowProducts({
  data,
  bucketData,
  cookie,
  deleteItem,
  editProductModal,
  recosBucketsHandler,
  addProduct,
  selectedBucket,
}) {
  const router = useRouter();
  // const [reorderedToggle, setReorderedToggle]=useState(false);
  const [showBuckets, setShowBuckets] = useState(false);
  const [items, setItems] = useState(bucketData);
  const [bucketsArr, setBucketsArr]=useState([]);
  const [toggle, setToggle] = useState(0);
  const [columns, setColumns] = useState({});
  const [bucketsCancelState, setBucketsCancelState] = useState(bucketData);
  const [productsCancelState, setProductsCancelState] = useState({});
  const [bucketsToggle, setBucketsToggle] = useState(false);
  const [productsToggle, setProductsToggle] = useState(false);


  useEffect(() => {
    const buckets = [];
    bucketData.map((item) => {
      buckets.push(item.name);
    });
    setBucketsArr(buckets);

    console.log('initialData',data, bucketData)
    const initialColumns = {};
    for(let i=0; i<bucketsArr.length; i++){
      initialColumns[bucketsArr[i]]={};
      initialColumns[bucketsArr[i]]['id'] = bucketsArr[i];
      initialColumns[bucketsArr[i]]['list'] = [];
      for(let j=0; j<data.length; j++){
        if(bucketsArr[i]===data[j].bucket){
          initialColumns[bucketsArr[i]]['list'].push(data[j]);
        }
      }
    }
    console.log('initialColumns',initialColumns)
    setColumns(initialColumns);
    setProductsCancelState(initialColumns);
  }, [data])

  useEffect(()=>{
    setItems(bucketData);
    setBucketsCancelState(bucketData);
  }, [bucketData])

  function onDragEndBuckets(result) {
    if (!result.destination) {
      return;
    }
    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    console.log("onDragEnd newitems",newItems);
    setItems(newItems)
  }

  const onDragEndProducts = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];
    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      console.log(start);
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      };
      
      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList
      };
      
      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
      return null;
    }
  };

  // const reorderedHandler=(curToggle)=>{
  //   console.log('reached reordered', curToggle)
  //   setReorderedToggle(curToggle); 
  // }

  const showBucketsHandler=(prev)=>{
    setShowBuckets(prev)
  }

  const handleBucketsSave = () => {
    setToggle(0);
    setBucketsToggle(!bucketsToggle);
    setBucketsCancelState(items);

    const body = [...items];
    body.forEach((element, idx) => {
      element.id = idx;
      element.sort_id = idx;
      element.others = {};
    });

    recosBucketsHandler(body);

    const newColumns = {}
    for(let i=0; i<body.length; i++){
      if(body[i].name===columns[body[i].name].id){
        newColumns[body[i].name]={};
        newColumns[body[i].name]['id'] = body[i].name;
        newColumns[body[i].name]['list'] = [];
        newColumns[body[i].name]['list'] = columns[body[i].name].list;
      }
      
    }
    setColumns(newColumns);
  }

  const handleBucketsCancel = () => {
    setToggle(0);
    setBucketsToggle(!bucketsToggle);
    setItems(bucketsCancelState);
  }
  
  const handleProductsSave = () => {
    setToggle(0);
    setProductsToggle(!productsToggle);
    setProductsCancelState(columns);
    
    // const body = [...items];
    // body.forEach((element, idx) => {
    //   element.sort_id = idx;
    //   element.others = {};
    // });

    let body = [];
    bucketsArr.forEach((item, index)=>{
      for(let k=0; k<columns[item]['list'].length; k++){
        // console.log(columns[item]['list'][k]);
        let bucketItem = columns[item]['list'][k];
        bucketItem['sort_id'] = k;
        bucketItem['bucket'] = item;
        bucketItem['others'] = {};
        body.push(bucketItem)
        // console.log(index,k,columns[item]['list'][k]['sort_id']);
      }
    })
    console.log('oldData', data);
    console.log('newData', body);
    
    const options = {
      headers: {
        Authorization: `bearer ${cookie}`,
        Origin: "localhost:3000",
      },
    };
    axios(
      {
        method: "post",
        url: `${authapi}recos`,
        data: { recos_array: JSON.stringify(body)},
        options: options,
      },
      { timeout: 2000 }
      )
      .then((res) => {
        toast({
          title: "Recos Reordered",
          description: "",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((e) => {
        // console.log(e);
      });
    }
    
    const handleProductsCancel = () => {
      setToggle(0);
      setProductsToggle(!productsToggle);
      console.log(productsCancelState)
      setColumns(productsCancelState);
    }

    return (
    <Flex sx={showProductsLinksStyles.container}>
    <Flex display={toggle === 0 ? null: 'none'} sx={showProductsLinksStyles.headingFlex} mx = '16px'>
      <Heading sx={showProductsLinksStyles.headingText}>Recommendations</Heading>
      <Flex>
      <Button onClick={()=>{
          setToggle(1);
          setProductsToggle(!productsToggle);
          console.log('columns onClick', columns);
        }} 
        sx={showProductsLinksStyles.headingButton}
        size='sm' mr='4px'>reorder products</Button>
      <Button onClick={()=>{
          setToggle(2);
          setBucketsToggle(!bucketsToggle);
        }} 
        sx={showProductsLinksStyles.headingButton} 
        size='sm'>reorder buckets</Button>
      </Flex>
    </Flex>
    <Flex display={toggle === 1 ? null: 'none'} sx={showProductsLinksStyles.headingFlex}>
          {/* { */}
            {/* !productsToggle ? <Button ml={"16px"} display={data.length>1 ? null : 'none'} onClick={()=>{setProductsToggle(!productsToggle)}} size={'sm'}><Image src={rearrange} h="4" alt="rearrange log"></Image></Button> : */}
            {/* <Flex flexDir={'row'} justifyContent={'space-between'}> */}
              <Heading sx={showProductsLinksStyles.headingText}>Reorder Products</Heading>
              <Flex>
              <Button ml={"16px"} onClick={handleProductsCancel} size={'sm'}><MdOutlineCancel size={20}/></Button>
              <Button ml={"6px"} onClick={handleProductsSave} size={'sm'}><MdOutlineDoneOutline size={20} color="#D7354A"/></Button>
              {/* </Flex> */}
            </Flex>
            
          {/* } */}
      </Flex>

      <Flex display={toggle === 2 ? null: 'none'} sx={showProductsLinksStyles.headingFlex} mx = '16px'>
          {/* {
            !bucketsToggle ? <Button ml={"16px"} display={data.length>1 ? null : 'none'} onClick={()=>{setBucketsToggle(!bucketsToggle)}} size={'sm'}><Image src={rearrange} h="4" alt="rearrange log"></Image></Button> : */}
            {/* <Flex flexDir={'row'} > */}
              <Flex>
                <Heading sx={showProductsLinksStyles.headingText}>Reorder Buckets</Heading>
              </Flex>
              <Flex>
                <Button ml={"16px"} onClick={handleBucketsCancel} size={'sm'}><MdOutlineCancel size={20}/></Button>
                <Button ml={"6px"} onClick={handleBucketsSave} size={'sm'}><MdOutlineDoneOutline size={20} color="#D7354A"/></Button>
              </Flex>
            {/* </Flex> */}
            
          {/* } */}
      </Flex>
    <Flex>
    <NoSSR>
      <DragDropContext onDragEnd={onDragEndProducts}>
      <Flex flexDir={'column'} backgroundColor={productsToggle ? "gray.100" : ""} display={toggle==2 ? 'none' : null}>
        {Object.values(columns).map((column, index) => {
          {/* console.log("start") */}

          {/* console.log(column.list.) */}
          {/* console.log(data);
          console.log(bucketData);
          console.log(columns);
          console.log(column); */}
          {/* console.log(data.filter((item) => item.bucket === bucketData[index].name))
          console.log(column.list) */}
          {/* console.log(columns[]) */}
          return (
            <ProductsBucket
              key={index}
              bucketName={column.id}
              data={column.list}
              cookie={cookie}
              link={
                bucketData.filter((item) => item.name === bucketData[index].name)[0] || ""
              }
              deleteItem={(item) => {
                deleteItem(item);
                // console.log("recosshow", item);
              }}
              editProductModal={(item) => editProductModal(item)}
              // reorderedToggle={reorderedHandler}
              showBucketsHandler={showBucketsHandler}
              addProduct={addProduct}
              selectedBucket={selectedBucket}
              column={column}
              curToggle={productsToggle}
            />
          );
        })}
      </Flex>
    </DragDropContext>
    </NoSSR>
    </Flex>
    <Flex>
    <NoSSR>
    <DragDropContext onDragEnd={onDragEndBuckets}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Flex {...provided.droppableProps} ref={provided.innerRef} sx={showProductsLinksStyles.container} display={toggle==2 ? null : 'none'} >
          {/* <Flex sx={showProductsLinksStyles.headingFlex}>
            <Heading sx={showProductsLinksStyles.headingText}>Reorder Recos Buckets</Heading>
          <Flex>
            <Button onClick={handleBucketsCancel} sx={showProductsLinksStyles.headingButton} mr='4px'><MdOutlineCancel size={20}/></Button>
            <Button onClick={handleBucketsSave} sx={showProductsLinksStyles.headingButton}><MdOutlineDoneOutline size={20}  color="#D7354A"/></Button>
          </Flex>
          </Flex> */}
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
  {/* <Flex>
    <Flex sx={showProductsLinksStyles.container} id="recos" display={toggle ? 'none' : null}>
    <Flex sx={showProductsLinksStyles.headingFlex} 
    // display={bucketsArr.length>1 ? null : 'none'}
    >
      <Heading sx={showProductsLinksStyles.headingText}>Recommendations</Heading>
    <Button onClick={()=>{setToggle(!toggle)}} sx={showProductsLinksStyles.headingButton} size={'sm'}><IoReorderFour size={'24px'}/></Button>
    </Flex>
    {items.map((item, index) => (
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
          addProduct={addProduct}
          selectedBucket={selectedBucket}
        />
    ))}
    </Flex>
  </Flex>     */}
  </Flex>
    );
}