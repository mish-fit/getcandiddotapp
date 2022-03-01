/** @jsxRuntime classic */
/** @jsx jsx */
import { Input, Select } from "@chakra-ui/react";
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import React from "react";
import { BucketsModal } from "../Modals/BucketModal";
import { IoChevronDownCircleOutline } from "react-icons/io5";

export function BucketSelector({ buckets }) {
  const [a, setA] = React.useState(JSON.parse(buckets));
  const [input, setInput] = React.useState(false);
  const [name, setName] = React.useState("Select your bucket");

  const onAddBucket = () => {
    setInput(true);
  };

  const onCancelBucket = () => {
    setInput(false);
  };
  const onSaveBucket = (item) => {
    setName(item);
    setA([...a, item]);
    setInput(false);
  };

  const onSelectItem = (item) => {
    setName(item);
  };

  React.useEffect(() => {
    console.log(JSON.parse(buckets));
  }, [buckets]);

  return (
    <Menu>
      <BucketsModal
        isOpen={input}
        onClose={onCancelBucket}
        onSave={(item) => onSaveBucket(item)}
      />
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: "gray.400" }}
        _expanded={{ bg: "blue.400" }}
        _focus={{ boxShadow: "outline" }}
      >
        {/* <Text>{name}</Text> */}
        <Input placeholder="HI" variant="flushed" />
      </MenuButton>
      <MenuList>
        {a.map((item, index) => {
          return (
            <MenuItem key={index.toString()}>
              <Flex onClick={() => onSelectItem(item)}>
                <Text>{item}</Text>
              </Flex>
            </MenuItem>
          );
        })}
        <MenuItem>
          <Flex onClick={() => onAddBucket(name)}>
            <Text sx={{ color: "red" }}>+ Add a Bucket</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
