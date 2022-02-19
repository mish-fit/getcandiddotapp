/** @jsxRuntime classic */
/** @jsx jsx */
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
// Add a custom Link
function ColorItem({ color }) {
  return (
    <Container
      sx={{
        borderRadius: "16px",
        height: "16px",
        width: "16px",
        backgroundColor: color,
      }}
    />
  );
}

function ListItem({ color, name, pick }) {
  const pickColor = () => {
    pick(color, name);
  };
  return (
    <Flex
      sx={{
        width: "100%",
        flexDirection: "row",
        p: "5x",
        justifyContent: "flex-start",
      }}
      onClick={pickColor}
    >
      <Flex>
        <ColorItem color={color} />
      </Flex>
      <Flex sx={{ flex: 1 }}>
        <Text
          sx={{
            ml: "8px",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </Flex>
    </Flex>
  );
}

export function TextColorPicker({ textColor }) {
  const [color, setColor] = React.useState("black");

  const selectedColor = (color, name) => {
    console.log(color, name);
    setColor(color);
    textColor(color);
  };

  return (
    <Menu>
      <MenuButton>
        <ColorItem color={color} />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <ListItem
            color="#8A2BE2"
            name="Purple"
            pick={(color, name) => selectedColor(color, name)}
          />
        </MenuItem>
        <MenuItem>
          <ListItem
            color="#FF4500"
            name="Orange"
            pick={(color, name) => selectedColor(color, name)}
          />
        </MenuItem>
        <MenuItem>
          <ListItem
            color="#008000"
            name="Green"
            pick={(color, name) => selectedColor(color, name)}
          />
        </MenuItem>
        <MenuItem>
          <ListItem
            color="#0000FF"
            name="Blue"
            pick={(color, name) => selectedColor(color, name)}
          />
        </MenuItem>
        <MenuItem>
          <ListItem
            color="#D7354A"
            name="Red"
            pick={(color, name) => selectedColor(color, name)}
          />
        </MenuItem>
        <MenuItem>
          <ListItem
            color="#323232"
            name="Black"
            pick={(color, name) => selectedColor(color, name)}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
