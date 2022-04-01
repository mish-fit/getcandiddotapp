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
// Add a custom Link
export function ProductsBucket({
  bucketName,
  data,
  link,
  cookie,
  deleteItem,
  editProductModal,
}) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [items, setItems]= useState(data);
  const [toggle, setToggle] = useState(false);
  const [ cancelState, setCancelState ] = useState(data);
  const toast = useToast();

  useEffect(()=>{
    console.log("onDragEnd data", data);
    setItems(data);
    setCancelState(items);
  }, [data])

  useEffect(()=>{
    console.log("onDragEnd items", items);
  },[items])

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

  const handleCancel = () => {
    setToggle(!toggle);
    setItems(cancelState);
  }
  
  const handleSave = () => {
    setToggle(!toggle);
    setCancelState(items);

    const body = [...items];
    body.forEach((element, idx) => {
      element.sort_id = idx;
      element.others = {};
    });
    
    console.log(body);

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
        // console.log(res);
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


  const bucketLinkClick = () => {
    event("SIGNED_IN_USER_BUCKET_LINK_CLICK", link.link);
    if (link.link.substring(0, 8) !== "https://") {
      window.open("https://" + link.link, "_blank");
    } else {
      window.open(link.link, "_blank");
    }
  };

  return (
    <Flex sx={productsBucketStyles.container}>
      <Flex
        sx={{
					justifyContent: ['center', 'center', 'space-between', 'space-between', 'space-between', 'space-between'],
          cursor:
            link && link.length != 0 && link.link && isURL(link.link.toString())
              ? "pointer"
              : "default",
          backgroundColor: "white",
        }}
        onClick={
          link && link.length != 0 && link.link && isURL(link.link.toString())
            ? bucketLinkClick
            : null
        }
      >
        <Text
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            fontSize: "18px",
            py: "4px",
            color:
              link &&
              link.length != 0 &&
              link.link &&
              isURL(link.link.toString())
                ? "#2A5DB0"
                : "#323232",
          }}
        >
          {bucketName}
        </Text>

        <Flex mb="8px">
          {
            !toggle ? <Button ml={"16px"} onClick={()=>{setToggle(!toggle)}} size={'sm'}><Image src={rearrange} h="4" alt="rearrange log"></Image></Button> :
            <Flex display={"inline"}>
              <Button ml={"16px"} onClick={handleCancel} size={'sm'}><MdOutlineCancel size={20}/></Button>
              <Button ml={"6px"} onClick={handleSave} size={'sm'}><MdOutlineDoneOutline size={20} color="#D7354A"/></Button>
            </Flex>
          }
        </Flex>
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

    
      <NoSSR>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable" isDropDisabled={!toggle}>
					{(provided) => (
						<Flex {...provided.droppableProps} ref={provided.innerRef} sx={productsBucketStyles.grid} backgroundColor={toggle ? "gray.100" : ""}>
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

                  {/* isURL(item.prod_link, { require_tld: true }) && ( */}
                    <ProductsCard
                      key={index}
                      item={item}
                      deleteItem={(item) => {
                        // console.log("recosbucket", item);
                        deleteItem(item);
                      }}
                      editProductModal={(item) => editProductModal(item)}
                    />
                  {/* ) */}
										
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
