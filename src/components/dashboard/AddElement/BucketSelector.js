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

export function BucketSelector() {
  const [a, setA] = React.useState(["bucket1", "bucket2", "bucket3"]);
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
        <Text>{name}</Text>
      </MenuButton>
      <MenuList>
        {a.map((item) => {
          return (
            <MenuItem>
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
