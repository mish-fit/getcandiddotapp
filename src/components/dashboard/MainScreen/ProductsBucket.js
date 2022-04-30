import { useRouter } from "next/router";
import { Flex, Text, Divider, useMediaQuery, Button, useToast, Image } from "@chakra-ui/react";
import { ProductsCard } from "./ProductsCard";
import isURL from "validator/lib/isURL";
import productsBucketStyles from "styles/ProductsBucket";
import { event } from "analytics/ga";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NoSSR from "react-no-ssr";
import axios from "axios";
import { useEffect, useState } from "react";
import { authapi } from "lib/api";
import rearrange from "assets/rearrange.png";
import { MdOutlineCancel, MdOutlineDone, MdOutlineDoneOutline } from "react-icons/md";
import { BsPlusCircle, BsPlusCircleDotted } from "react-icons/bs";
// Add a custom Link
export function ProductsBucket({
  bucketName,
  data,
  link,
  cookie,
  deleteItem,
  editProductModal,
  addProduct,
  selectedBucket,
  column,
  curToggle,
}) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [items, setItems]= useState(data);
  // const [toggle, setToggle] = useState(curToggle);
  // const [reorderToggle, setReorderToggle] = useState(true);
  // const [cancelState, setCancelState] = useState(data);
  const toast = useToast();
// console.log(toggle)
  useEffect(()=>{
    // console.log("onDragEnd data", data);
    setItems(data);
    // setCancelState(items);
  }, [data])

  useEffect(()=>{
    // console.log("onDragEnd items", data, link, bucketName);
  },[items])

  // function onDragEnd(result) {
  //   if (!result.destination) {
  //     return;
  //   }
  //   const newItems = [...items];
  //   const [removed] = newItems.splice(result.source.index, 1);
  //   newItems.splice(result.destination.index, 0, removed);
  //   console.log("onDragEnd newitems",newItems);
  //   setItems(newItems)
  // }

  // const handleCancel = () => {
  //   setToggle(!toggle);
  //   setItems(cancelState);
  // }
  
  // const handleSave = () => {
  //   setToggle(!toggle);
  //   setCancelState(items);

  //   const body = [...items];
  //   body.forEach((element, idx) => {
  //     element.sort_id = idx;
  //     element.others = {};
  //   });
    
  //   console.log(body);

  //   const options = {
  //     headers: {
  //       Authorization: `bearer ${cookie}`,
  //       Origin: "localhost:3000",
  //     },
  //   };

  //   axios(
  //     {
  //       method: "post",
  //       url: `${authapi}recos`,
  //       data: { recos_array: JSON.stringify(body)},
  //       options: options,
  //     },
  //     { timeout: 2000 }
  //   )
  //     .then((res) => {
  //       // console.log(res);
  //       toast({
  //         title: "Recos Reordered",
  //         description: "",
  //         status: "success",
  //         duration: 1000,
  //         isClosable: true,
  //       });
  //     })
  //     .catch((e) => {
  //       // console.log(e);
  //     });
  // }

  const bucketLinkClick = () => {
    event("SIGNED_IN_USER_BUCKET_LINK_CLICK", link.link);
    if (link.link.substring(0, 8) !== "https://") {
      window.open("https://" + link.link, "_blank");
    } else {
      window.open(link.link, "_blank");
    }
  };

  const addProducts = () => {
    addProduct();
  }

  const selectedBucketHandler = () => {
    selectedBucket(bucketName);
  }

  return (
    <Flex sx={productsBucketStyles.container} 
    // display={data.length ? null : 'none'}
    >
      <Flex
        mx={ curToggle ? ["-72px","0px","0px","0px","0px","0px"] : ["-72px","16px","16px","16px","16px","16px"]}
        sx={{
					justifyContent: ['space-between', 'space-between', 'space-between', 'space-between', 'space-between', 'space-between'],
        }}
      >
      <Flex>
        <Text
          sx={{ 
            mt: "-4px",
            fontWeight: "bold",
            fontSize: "18px",
            py: "4px",
            cursor:
            link && link.length != 0 && link.link && isURL(link.link.toString())
              ? "pointer"
              : "default",
          backgroundColor : curToggle ? "gray.100" : "white",
            color:
              link &&
              link.length != 0 &&
              link.link &&
              isURL(link.link.toString())
                ? "#2A5DB0"
                : "#323232",
          }}
          onClick={
          link && link.length != 0 && link.link && isURL(link.link.toString())
            ? bucketLinkClick
            : null
        }
        >
          {bucketName}
        </Text>
        </Flex>
        {/* <Flex mb="8px" display={reorderToggle ? null: 'none'}>
          {
            !toggle ? <Button ml={"16px"} display={data.length>1 ? null : 'none'} onClick={()=>{setToggle(!toggle)}} size={'sm'}><Image src={rearrange} h="4" alt="rearrange log"></Image></Button> :
            <Flex display={"inline"}>
              <Button ml={"16px"} onClick={handleCancel} size={'sm'}><MdOutlineCancel size={20}/></Button>
              <Button ml={"6px"} onClick={handleSave} size={'sm'}><MdOutlineDoneOutline size={20} color="#D7354A"/></Button>
            </Flex>
          }
        </Flex> */}
      </Flex>
      <Divider mb="8px" display={isLargerThan768 ? "none" : "block"} />

      {/* <Flex sx={productsBucketStyles.grid}>
        {data.map((item, index) => {
          return (
            isURL(item.prod_link, { require_tld: true }) && (
              <ProductsCard
                key={index}
                item={item}
                deleteItem={(item) => {
                  // console.log("recosbucket", item);
                  deleteItem(item);
                }}
                editProductModal={(item) => editProductModal(item)}
              />
            )
          );
        })}
      </Flex> */}
      {/* <NoSSR>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable" isDropDisabled={!toggle}>
					{(provided) => (
            <Flex>
						<Flex {...provided.droppableProps} ref={provided.innerRef} sx={productsBucketStyles.grid} backgroundColor={toggle ? "gray.100" : ""} display={reorderToggle ? null : 'none'}>
							{items.map((item, index) => (
								<Draggable
									draggableId={item.sort_id.toString()}
									key={item.id}
									index={index}
                  isDragDisabled={!toggle}
								>
									{(provided) => (
										<Flex
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>

                    <ProductsCard
                      key={index}
                      item={item}
                      deleteItem={(item) => {
                        // console.log("recosbucket", item);
                        deleteItem(item);
                      }}
                      editProductModal={(item) => editProductModal(item)}
                      addProduct={addProduct}
                    />
										</Flex>
									)}
								</Draggable>
							))}
              <Flex
              onClick={addProducts}
              mx={'16px'}
              my={'8px'}
            >
              <Button 
              width={'200px'}
              height={'240px'}
              onClick={selectedBucketHandler}
              >
                <BsPlusCircleDotted size={64} color="#D7354A"/>
          </Button>
          </Flex>
						{provided.placeholder}
						</Flex>
        </Flex>
					)}
				</Droppable>
			</DragDropContext>
      </NoSSR> */}
      <NoSSR>
      <Droppable droppableId={column.id}>
      {(provided) => (
            <Flex>
						<Flex {...provided.droppableProps} ref={provided.innerRef} sx={productsBucketStyles.grid} backgroundColor={curToggle ? "gray.100" : ""} >
							{column.list.map((item, index) => (
								<Draggable
									draggableId={item.sort_id.toString()}
									key={item.id}
									index={index}
                  isDragDisabled={!curToggle}
								>
									{(provided) => (
										<Flex
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>

                    <ProductsCard
                      key={index}
                      item={item}
                      deleteItem={(item) => {
                        // console.log("recosbucket", item);
                        deleteItem(item);
                      }}
                      editProductModal={(item) => editProductModal(item)}
                      addProduct={addProduct}
                      index={index}
                      curToggle={curToggle}
                    />
										</Flex>
									)}
								</Draggable>
							))}
              <Flex
              onClick={addProducts}
              mx={'16px'}
              my={'8px'}
              >
                <Button 
                width={'200px'}
                height={'240px'}
                onClick={selectedBucketHandler}
                >
                  <BsPlusCircleDotted size={64} color="#D7354A"/>
                </Button>
              </Flex>
						{provided.placeholder}
						</Flex>
        </Flex>
					)}
        {/* {(provided) => (
          <Flex ref={provided.innerRef}>
            <Flex>
              {column.list.map((item, index) => {
                return <ProductsCard 
                      key={index}
                      item={item}
                      deleteItem={(item) => {
                        // console.log("recosbucket", item);
                        deleteItem(item);
                      }}
                      editProductModal={(item) => editProductModal(item)}
                      addProduct={addProduct}
                      index={index}
                      />;
              })}
              {provided.placeholder}
            </Flex>
          </Flex>
        )} */}
      </Droppable>
      </NoSSR>
    </Flex>
  );
}
