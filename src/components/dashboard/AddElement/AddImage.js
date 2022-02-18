/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
// Add a custom Link
export function AddImage({ handleUpdate }) {
  let hiddenInput = null;

  const [image, setImage] = React.useState({ preview: "", raw: "" });
  const handleChange = (e) => {
    console.log(e.target.files[0]);

    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      handleUpdate({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <Flex sx={style.container}>
      {image.preview ? (
        <Flex onClick={() => hiddenInput.click()}>
          <Image
            src={image.preview}
            alt="dummy"
            sx={{ width: "100%", height: "100%", borderRadius: "100%" }}
          />
        </Flex>
      ) : (
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flex: 1,
          }}
          onClick={() => hiddenInput.click()}
        >
          <Text sx={{ fontSize: "12px" }}>Upload Image</Text>
        </Flex>
      )}
      <input
        type="file"
        hidden
        onChange={handleChange}
        ref={(el) => (hiddenInput = el)}
      />
      {/* <BsPlusCircleFill
        color="#D7354A"
        size="16px"
        sx={{ position: "absolute", right: "5%", bottom: "5%" }}
      /> */}
    </Flex>
  );
}

const style = {
  container: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
    borderWidth: 1,

    position: "relative",
    cursor: "pointer",
  },
};
