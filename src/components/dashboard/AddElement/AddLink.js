/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import { TextColorPicker } from "./TextColorPicker";
import { FiMenu } from "react-icons/fi";
import React from "react";
import { ShadowPicker } from "./ShadowPicker";
import { IoCloseCircleOutline } from "react-icons/io5";

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
          boxShadow: `0px 1px 1px 1px ${shadowColor}`,
        }}
      >
        <Flex sx={style.titleContainer}>
          <Text sx={{ color: titleColor }}>Link Title</Text>
          <TextColorPicker textColor={(color) => fontColor(color)} />
          <Flex style={style.dragIcon}>
            <FiMenu sx={{ textAlign: "center" }} />
          </Flex>
        </Flex>
        <Text sx={style.link}>Link</Text>
        <Flex sx={style.pickerContainer}>
          <ShadowPicker
            borderShadowColor={(color) => borderShadowColor(color)}
          />
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
    height: "150px",
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
  },
  link: {},
  bucket: {},
  delete: {
    cursor: "pointer",
  },
  pickerContainer: {
    flexDirection: "row",
  },
};
