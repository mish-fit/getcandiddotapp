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
import { AddImage } from "./AddImage";
// Add a custom Link
export function AddLink({ buckets, values, onRefresh, onValuesChange }) {
  const [titleColor, setTitleColor] = React.useState(values.titleColor);
  const [shadowColor, setShadowColor] = React.useState(values.shadowColor);
  const [title, setTitle] = React.useState(values.title);
  const [link, setLink] = React.useState(values.link);

  const refresh = () => {
    console.log("Refresh");
    setTitleColor("black");
    setShadowColor("rgba(0,0,0,0.5)");
    setTitle("");
    setLink("");
    onRefresh();
  };

  const fontColor = (color) => {
    setTitleColor(color);
    onValuesChange({ ...values, titleColor: color });
  };

  const borderShadowColor = (color) => {
    setShadowColor(color);
    onValuesChange({ ...values, shadowColor: color });
  };

  const handleUpdate = (image) => {
    console.log(image);
    const formData = new FormData();
    formData.append("image", image.raw);

    //     await fetch("YOUR_URL", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "multipart/form-data"
    //       },
    //       body: formData
    //     });
    //   };
  };

  return (
    <Flex sx={style.container}>
      <Flex sx={style.leftContainer}>
        <AddImage handleUpdate={(image) => handleUpdate(image)} />
      </Flex>
      <Flex
        sx={{
          flex: 1,
          boxShadow: `1px 1px 2px 2px ${shadowColor}`,
          flexDirection: "column",
          borderRadius: "8px",
        }}
      >
        <Flex sx={style.titleContainer}>
          <Flex sx={{ flex: 1 }}>
            <Flex
              sx={{ justifyContent: "center", alignItems: "center", p: "8px" }}
            >
              <MdOutlineDriveFileRenameOutline size={20} />
            </Flex>

            <Input
              sx={{ color: titleColor }}
              placeholder="Enter Custom Link Title"
              variant="flushed"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Flex>
          <Flex sx={{ p: "8px", px: "16px" }}>
            <TextColorPicker textColor={(color) => fontColor(color)} />
          </Flex>
        </Flex>
        <Flex sx={style.titleContainer}>
          <Flex sx={{ flex: 1 }}>
            <Flex
              sx={{ justifyContent: "center", alignItems: "center", p: "8px" }}
            >
              <BiLink size={20} />
            </Flex>

            <Input
              sx={{ color: "black" }}
              placeholder="Enter Custom Link Address"
              variant="flushed"
              onChange={(e) => setLink(e.target.value)}
              value={link}
            />
          </Flex>
        </Flex>
        <Flex sx={style.pickerContainer}>
          <Flex sx={{ flex: 2, mr: "16px" }}>
            <BucketSelector buckets={buckets} />
          </Flex>
          <Flex sx={{ flex: 1, justifyContent: "flex-end" }}>
            <ShadowPicker
              borderShadowColor={(color) => borderShadowColor(color)}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={style.rightContainer}>
        <Flex sx={style.delete} onClick={refresh}>
          <IoCloseCircleOutline size={20} />
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
    width: "64px",
    height: "64px",
    mx: "8px",
  },
  rightContainer: {
    flexDirection: "column",
    ml: "8px",
  },
  imageContainer: {},
  addImage: {},
  titleContainer: {
    flexDirection: "row",
  },

  dragIcon: {
    cursor: "grab",
    p: "8px",
    backgroundColor: "gray",
  },
  link: {},
  bucket: {},
  delete: {
    cursor: "pointer",
    mt: "8px",
    p: "2px",
  },
  pickerContainer: {
    flexDirection: "row",
    mx: "32px",
    py: "8px",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    height: "48px",
    mt: "8px",
    pr: "8px",
  },
};
