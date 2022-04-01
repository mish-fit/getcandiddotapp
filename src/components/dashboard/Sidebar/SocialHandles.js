import { Button, Flex, Image, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { event } from "analytics/ga";
import { useRouter } from "next/router";
import { BsPlusCircleFill } from "react-icons/bs";
import socialHandlesStyles from "styles/SocialHandles";
import rearrange from "assets/rearrange.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NoSSR from "react-no-ssr";
import axios from "axios";
import { useEffect, useState } from "react";
import { authapi } from "lib/api";
import { MdOutlineCancel, MdOutlineDoneOutline } from "react-icons/md";

const SocialElement = ({ item }) => (
  <Flex
    sx={socialHandlesStyles.socialView}
    onClick={() => {
      // console.log(item);
      localStorage.setItem(
        "clickLatestSocial",
        item.social_ulink + item.u_name
      );
      window.open(item.social_ulink + item.u_name, "_blank"); //to open new page
    }}
  >
    <Image
      src={item.social_logo}
      alt={"social logo"}
      sx={socialHandlesStyles.social}
    />
    <Text sx={socialHandlesStyles.socialText}>
      {item && item.social_name && item.social_name.length > 9
        ? item.social_name.slice(0, 10) + ".."
        : item.social_name}
    </Text>
  </Flex>
);

// Add a custom Link
export function SocialHandles({ social, data, cookie }) {
  const [items, setItems] = useState(data);
  const [toggle, setToggle] = useState(false);
  const [ cancelState, setCancelState ] = useState(items);
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
    // console.log("Before Post", items);

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
        url: `${authapi}socials`,
        data: { socials_array: JSON.stringify(body)},
        options: options,
      },
      { timeout: 2000 }
    )
      .then((res) => {
        //   console.log("Sucess", res.data);
        // setSortId((id) => id + 1);
        toast({
          title: "Socials Reordered",
          description: "",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        // onRefresh();
      })
      .catch((e) => {
        // console.log(e);
      });
  }

  const addSocial = () => {
    social();
  };

  return (
    <Flex sx={socialHandlesStyles.container}>
      <NoSSR>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable" 
        isDropDisabled={!toggle}
        >
					{(provided) => (
						<SimpleGrid 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            gap={2}
            columns={[5, 5, 5, 5, 5, 5]}
            sx={socialHandlesStyles.grid}
            backgroundColor={toggle ? "gray.100" : ""}
            >
							{items.map((item, index) => (
								<Draggable
									draggableId={item.sort_id.toString()}
									key={item.id}
									index={index}
                  isDragDisabled={!toggle}
								>
									{(provided) => (
                    <Flex
                      flexDirection={"column"}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
                      <SocialElement
                      item={item}
                      key={index}
                      />
                      </Flex>
									)}
								</Draggable>
							))}
						{provided.placeholder}
						</SimpleGrid>
					)}
				</Droppable>
			</DragDropContext>
      </NoSSR>

      <Flex sx={socialHandlesStyles.socialAddFlex}>
        <Button
          as="addbutton"
          sx={socialHandlesStyles.addbutton}
          onClick={addSocial}
          size={'sm'}
        >
          <BsPlusCircleFill color="#D7354A" />
          <Text sx={socialHandlesStyles.socialAddText}>Social Handle</Text>
        </Button>
        <Flex sx={socialHandlesStyles.addButton1}>
        {
          !toggle ? <Button ml={"16px"} onClick={()=>{setToggle(!toggle)}} size={'sm'}><Image src={rearrange} h="4" alt="rearrange log"></Image></Button> :
          <Flex display={"inline"}>
            <Button ml={"16px"} onClick={handleCancel} size={'sm'}><MdOutlineCancel size={20}/></Button>
            <Button ml={"6px"} onClick={handleSave} size={'sm'}><MdOutlineDoneOutline size={20} color="#D7354A"/></Button>
          </Flex>
        }
        </Flex>
      </Flex>
    </Flex>
  );
}
