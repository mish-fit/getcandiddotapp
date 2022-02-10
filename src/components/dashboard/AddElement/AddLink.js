/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import { TextColorPicker } from "./TextColorPicker";
import { FiMenu } from "react-icons/fi";
import React from "react";
import { ShadowPicker } from "./ShadowPicker";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Input } from "@chakra-ui/react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { BucketSelector } from "./BucketSelector";
import { BucketsModal } from "../Modals/BucketModal";
// Add a custom Link
export function AddLink() {
  const [titleColor, setTitleColor] = React.useState("black");
  const [shadowColor, setShadowColor] = React.useState("rgba(0,0,0,0.5)");

  const fontColor = (color) => {
    setTitleColor(color);
  };

  const borderShadowColor = (color) => {
    setShadowColor(color);
  };

  return (
    <Flex sx={style.container}>
      <Flex sx={style.leftContainer}>
        <Text sx={style.imageContainer}>Image</Text>
        <Text sx={style.addImage}>Add Button</Text>
      </Flex>
      <Flex
        sx={{
          flex: 1,
          boxShadow: `1px 1px 2px 2px ${shadowColor}`,
          flexDirection: "column",
          borderRadius: "10px",
        }}
      >
        <Flex sx={style.titleContainer}>
          <Flex sx={{ flex: 1 }}>
            <Flex
              sx={{ justifyContent: "center", alignItems: "center", p: "10px" }}
            >
              <MdOutlineDriveFileRenameOutline size={20} />
            </Flex>

            <Input
              sx={{ color: titleColor }}
              placeholder="Enter Custom Link Title"
              variant="flushed"
            />
          </Flex>
          <Flex sx={{ p: "10px", px: "15px" }}>
            <TextColorPicker textColor={(color) => fontColor(color)} />
          </Flex>
        </Flex>
        <Flex sx={style.titleContainer}>
          <Flex sx={{ flex: 1 }}>
            <Flex
              sx={{ justifyContent: "center", alignItems: "center", p: "10px" }}
            >
              <BiLink size={20} />
            </Flex>

            <Input
              sx={{ color: "black" }}
              placeholder="Enter Custom Link Address"
              variant="flushed"
            />
          </Flex>
        </Flex>
        <Flex sx={style.pickerContainer}>
          <Flex sx={{ flex: 2, mr: "20px" }}>
            <BucketSelector />
          </Flex>
          <Flex sx={{ flex: 1, justifyContent: "flex-end" }}>
            <ShadowPicker
              borderShadowColor={(color) => borderShadowColor(color)}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={style.rightContainer}>
        <Flex sx={style.delete}>
          <IoCloseCircleOutline />
        </Flex>
      </Flex>
    </Flex>
  );
}

const style = {
  container: {
    flexDirection: "row",

    width: "100%",
  },
  leftContainer: {
    flexDirection: "column",
  },
  rightContainer: {
    flexDirection: "column",
    ml: "10px",
  },
  imageContainer: {},
  addImage: {},
  titleContainer: {
    flexDirection: "row",
  },

  dragIcon: {
    cursor: "grab",
    p: "10px",
    backgroundColor: "gray",
  },
  link: {},
  bucket: {},
  delete: {
    cursor: "pointer",
  },
  pickerContainer: {
    flexDirection: "row",
    mx: "40px",
    py: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    height: "50px",
    mt: "10px",
    pr: "10px",
  },
};
