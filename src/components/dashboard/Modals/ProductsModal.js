import { Box, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalContent, ModalOverlay, Text, useMediaQuery, useToast } from "@chakra-ui/react";
import axios from "axios";
import { authapi, s3url } from "lib/api";
import { UploadImageToS3WithNativeSdk } from "lib/aws";
import debounce from "lodash.debounce";
import Lottie from "lottie-react";
import { nanoid } from "nanoid";
import Head from "next/head";
import React from "react";
import { BiCategoryAlt, BiLink } from "react-icons/bi";
import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import {
  MdOutlineRecommend
} from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import productsModalStyles from "styles/ProductsModal";
import smm from "../../../../public/lottie/smm.json";
import { BucketsModal } from "./BucketModal";

// Add a custom Link
export function ProductsModal({
  closeParent,
  isOpen,
  buckets,
  user,
  maxSortId,
  cookie,
  newItem,
}) {
  const toast = useToast();
  const [refreshScreen, setRefreshScreen] = React.useState(false);
  const [a, setA] = React.useState(buckets.recos);
  const [input, setInput] = React.useState(false);
  const [image, setImage] = React.useState({ preview: "", raw: "" });
  const [imageName, setImageName] = React.useState(nanoid());
  const [imageSelected, setImageSelected] = React.useState(false);
  const [sortId, setSortId] = React.useState(maxSortId + 1);
  const [signedURL, setSignedURL] = React.useState("");
  const [catArray, setCatArray] = React.useState([]);
  const [prodArray, setProdArray] = React.useState([]);
  const [catActive, setCatActive] = React.useState(false);
  const [prodActive, setProdActive] = React.useState(false);

  let hiddenInput = null;

  const [values, setValues] = React.useState({
    id: "",
    u_id: user[0].u_id,
    u_name: user[0].u_name,
    prod_name: "",
    cat_name: "",
    bucket: "My Recommendations",
    photo: "",
    prod_link: "",
    aff_code: "",
    sort_id: sortId,
    others: {},
  });

  React.useEffect(() => {
    // console.log("bUCKETR STRING", imageName);
    axios
      .get(`${authapi}image`, { params: { id: imageName } }, { timeout: 3000 })
      .then((res) => {
        // console.log(res.data);
        setSignedURL(res.data);
      })
      .catch((error) => {
        // console.log(error);
      });
    axios
      .get(
        `${authapi}search/categories`,
        { params: { category_text: values.cat_name } },
        { timeout: 1000 }
      )
      .then((res) => {
        setCatArray(res.data);
      })

      .catch((error) => {
        // console.log(error);
      });
  }, [imageName, values.cat_name]);

  const ProdItem = ({ item }) => {
    return (
      <Flex
        sx={{
          my: "4px",
          py: "8px",
          px: "4px",
          height: "32px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#EEE",
          },
          alignItems: "center",
        }}
        onMouseDown={(e) => {
          // console.log(item.prod_name);
          setValues({ ...values, prod_name: item.prod_name });
          setProdActive(false);

          return false;
        }}
      >
        <Text
          sx={{ fontproductsModalStyles: "Poppins", fontSize: "16px", fontWeight: "medium" }}
        >
          {item.prod_name}
        </Text>
      </Flex>
    );
  };

  const CatItem = ({ item }) => {
    return (
      <Flex
        sx={{
          my: "4px",
          py: "8px",
          px: "4px",
          height: "32px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#EEE",
          },
          alignItems: "center",
        }}
        onMouseDown={(e) => {
          // console.log(item.cat_name);
          setValues({
            ...values,
            cat_name: item.cat_name,
            cat_id: item.cat_id,
          });
          setCatActive(false);
          axios
            .get(
              `${authapi}search/products`,
              {
                params: {
                  product_text: "",
                  cat_id: item.cat_id,
                },
              },
              { timeout: 1000 }
            )
            .then((res) => {
              setProdArray(res.data);
            })
            .catch((error) => {
              // console.log(error);
            });
          return false;
        }}
      >
        <Text
          sx={{ fontproductsModalStyles: "Poppins", fontSize: "16px", fontWeight: "medium" }}
        >
          {item.cat_name}
        </Text>
      </Flex>
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.files[0]);
    if (e.target.files.length) {
      setImageSelected(true);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      handleUpdate({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      e.target.value = null;
    }
  };

  const handleUpdate = (image) => {
    // console.log(image);
    const formData = new FormData();
    formData.append("image", image.raw);
    UploadImageToS3WithNativeSdk(image.raw, imageName);
  };

  const onCancelImage = () => {
    setImageSelected(false);
    setImage({ preview: "", raw: "" });
  };

  const onAddBucket = () => {
    setInput(true);
  };

  const onCancelBucket = () => {
    setInput(false);
  };
  const onSaveBucket = (item) => {
    // console.log(values);
    setValues({ ...values, bucket: item.name });
    setA([...a, item]);
    setInput(false);
    const options = {
      headers: {
        Authorization: `bearer ${cookie}`,
        Origin: "localhost:3000",
      },
    };

    const newBuckets = { ...buckets, recos: [...a, item] };

    axios(
      {
        method: "post",
        url: `${authapi}buckets`,
        data: {
          u_id: user[0].u_id,
          u_buckets: newBuckets,
        },
        options: options,
      },
      { timeout: 5000 }
    )
      .then((res) => {
        toast({
          title: "New Bucket Added",
          description: "",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const onSelectItem = (item) => {
    setValues({ ...values, bucket: item.name });
  };

  const closeModal = () => {
    onRefresh();
    closeParent(true);
  };

  const savenadd = () => {
    if (values.prod_name && values.prod_link) {
      const body = {
        ...values,
        photo: imageSelected ? s3url + imageName + ".png" : "",
      };

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
          data: { recos_array: JSON.stringify([body]) },
          options: options,
        },
        { timeout: 5000 }
      )
        .then((res) => {
          //  console.log("Recos Success", res.data);
          newItem(res.data);
          setSortId((id) => id + 1);
          toast({
            title: "New Recommendation Added",
            description: "",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          onRefresh();
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      toast({
        title: "Product Name and Product Link are mandatory",
        description:
          "Recommend most trending products to maximize affiliate revenue",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const savenclose = () => {
    if (values.prod_name && values.prod_link) {
      const body = {
        ...values,
        photo: imageSelected ? s3url + imageName + ".png" : "",
      };

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
          data: { recos_array: JSON.stringify([body]) },
          options: options,
        },
        { timeout: 1000 }
      )
        .then((res) => {
          //   console.log("Recos Success", res.data);
          newItem(res.data);
          setSortId((id) => id + 1);
          toast({
            title: "New Recommendation Added",
            description: "",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          closeModal();
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      toast({
        title: "Product Name, and Product Link are mandatory",
        description:
          "Recommend most trending products to maximize affiliate revenue",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const onRefresh = () => {
    setImageName(nanoid());
    setImage({ preview: "", raw: "" });
    setImageSelected(false);
    setValues({
      id: "",
      u_id: user[0].u_id,
      u_name: user[0].u_name,
      prod_name: "",
      cat_name: "",
      bucket: "My Recommendations",
      photo: "",
      prod_link: "",
      aff_code: "",
      sort_id: sortId,
      others: {},
    });
  };

  const categorySearch = React.useMemo(
    () =>
      debounce(async () => {
        // console.log(values.cat_name);
        if (values.cat_name.length >= 0) {
          axios
            .get(
              `${authapi}search/categories`,
              { params: { category_text: values.cat_name } },
              { timeout: 1000 }
            )
            .then((res) => {
              setCatArray(res.data);
            })

            .catch((error) => {
              // console.log(error);
            });
        }
      }, 500),
    [values.cat_name]
  );

  const productSearch = React.useMemo(
    () =>
      debounce(async () => {
        if (values.prod_name.length >= 3) {
          axios
            .get(
              `${authapi}search/products`,
              {
                params: {
                  product_text: values.prod_name,
                  cat_id: values.cat_id,
                },
              },
              { timeout: 1000 }
            )
            .then((res) => {
              setProdArray(res.data);
            })
            .catch((error) => {
              // console.log(error);
            });
        }
      }, 500),
    [values.prod_name, values.cat_id]
  );

  const onChangeCategory = () => {};

  const onChangeProduct = () => {};

  return (
    <Flex>
      {/* <Head>
        <meta
          name="viewport"
          content="initial-scale=0.75, width=device-width"
        />
      </Head> */}
      <Modal onClose={closeModal} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"1000px"}>
          <Flex sx={productsModalStyles.container}>
            <Flex sx={productsModalStyles.row1}>
              <Text sx={productsModalStyles.topHeader}>Add Product</Text>
              <Flex sx={productsModalStyles.saveContainer} onClick={savenclose}>
                <Text sx={productsModalStyles.save}>Save </Text>
                <BsCheckCircleFill
                  color="#D7354A"
                />
              </Flex>
            </Flex>
            <Flex sx={productsModalStyles.row2}>
              <Box sx={productsModalStyles.subHeaderContainer}>
                <Text sx={productsModalStyles.subHeader}>Recommendations</Text>
              </Box>
            </Flex>
            <Flex sx={productsModalStyles.row3}>
              <Flex sx={productsModalStyles.lottie}>
                <Lottie animationData={smm} />
              </Flex>
              <Flex sx={productsModalStyles.linkView}>
                <Flex sx={productsModalStyles.addlink}>
                  <Flex sx={productsModalStyles.leftContainer}>
                    <Flex sx={productsModalStyles.imageContainer}>
                      {image.preview ? (
                        <Flex
                          sx={{
                            position: "relative",
                            flex: 1,
                          }}
                        >
                          <Flex
                            onClick={() => hiddenInput.click()}
                            sx={{ flex: 1 }}
                          >
                            <Image
                              src={image.preview}
                              alt="dummy"
                              sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "100%",
                              }}
                            />
                          </Flex>
                          <Flex
                            sx={{
                              position: "absolute",
                              top: "-5%",
                              right: "-5%",
                              zIndex: 101,
                              cursor: "pointer",
                            }}
                            onClick={onCancelImage}
                          >
                            <IoCloseCircle size={20} color="gray" />
                          </Flex>
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
                        accept="image/png, image/jpeg, image/jpg"
                        type="file"
                        hidden
                        onChange={handleChange}
                        ref={(el) => (hiddenInput = el)}
                      />
                    </Flex>
                  </Flex>
                  <Flex
                    sx={{
                      flex: 1,
                      flexGrow: 1,
                      flexDirection: "column",
                      borderRadius: "8px",
                      boxShadow: `0 0 1px 1px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <Flex
                      sx={{
                        flexDirection: "row",
                        position: "relative" 
                        }}
                    >
                      <Flex sx={{ flex: 1 }}>
                        <Flex
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            p: "8px",
                          }}
                        >
                          <BiCategoryAlt size={20} />
                        </Flex>

                        <Input
                          sx={{ color: "#323232" }}
                          placeholder="Enter Category Name"
                          variant="flushed"
                          onChange={(e) => {
                            setValues((values) => ({
                              ...values,
                              cat_name: e.target.value,
                            }));
                            onChangeCategory(e.target.value);
                            categorySearch();
                          }}
                          value={values.cat_name}
                          onFocus={() => setCatActive(true)}
                          onBlur={() => setCatActive(false)}
                          autoFocus
                        />
                      </Flex>
                      {catActive ? (
                        <Flex
                          sx={{
                            flex: 1,

                            // height: "250px",
                            width: "100%",
                            position: "absolute",
                            top: "50%",
                            mt: "30px",
                            flexDirection: "column",
                            p: "8px",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            borderWidth: 1,
                            boxShadow: `0 0 1px 1px rgba(0,0,0,0.5)`,
                          }}
                        >
                          {catArray.map((item, index) => {
                            return <CatItem key={index} item={item} />;
                          })}
                        </Flex>
                      ) : null}
                    </Flex>
                    {catActive ? null : (
                      <Flex
                        sx={{
                          flexDirection: "row",
                          position: "relative",
                        }}
                      >
                        <Flex sx={{ flex: 1 }}>
                          <Flex
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                              p: "8px",
                            }}
                          >
                            <MdOutlineRecommend size={20} />
                          </Flex>

                          <Input
                            sx={{ color: "#323232" }}
                            placeholder="Enter Product Name"
                            variant="flushed"
                            onChange={(e) => {
                              setValues((values) => ({
                                ...values,
                                prod_name: e.target.value,
                              }));
                              onChangeProduct();
                              productSearch();
                            }}
                            value={values.prod_name}
                            onFocus={() => setProdActive(true)}
                            onBlur={() => setProdActive(false)}
                          />
                        </Flex>
                        {prodActive && values.cat_id ? (
                          <Flex
                            sx={{
                              flex: 1,
                              height: "450px",
                              width: "100%",
                              position: "absolute",
                              top: "50%",
                              mt: "30px",
                              flexDirection: "column",
                              p: "8px",
                              backgroundColor: "white",
                              borderRadius: "8px",
                              borderWidth: 1,
                              boxShadow: `0 0 1px 1px rgba(0,0,0,0.5)`,
                            }}
                          >
                            {prodArray.map((item, index) => {
                              return <ProdItem key={index} item={item} />;
                            })}
                          </Flex>
                        ) : null}
                      </Flex>
                    )}
                    {catActive || (prodActive && values.cat_id) ? null : (
                      <Flex sx={productsModalStyles.titleContainer}>
                        <Flex sx={{ flex: 1 }}>
                          <Flex
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                              p: "8px",
                            }}
                          >
                            <BiLink size={20} />
                          </Flex>

                          <Input
                            sx={{ color: "#323232" }}
                            placeholder="Enter Product Link"
                            variant="flushed"
                            onChange={(e) =>
                              setValues({
                                ...values,
                                prod_link: e.target.value,
                              })
                            }
                            value={values.link}
                          />
                        </Flex>
                      </Flex>
                    )}
                    {catActive || (prodActive && values.cat_id) ? null : (
                      <Flex sx={productsModalStyles.pickerContainer}>
                        <Flex
                          sx={{
                            flex: 1,
                            justifyContent: ["flex-start", "flex-start", null],
                            alignItems: ["flex-start", "flex-start", null],
                          }}
                        >
                          <Flex
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                              p: "8px",
                            }}
                          >
                            <RiCouponLine size={20} />
                          </Flex>

                          <Input
                            sx={{ color: "#323232" }}
                            placeholder="Enter your affiliate code"
                            variant="flushed"
                            onChange={(e) =>
                              setValues({ ...values, aff_code: e.target.value })
                            }
                            value={values.aff_code}
                          />
                        </Flex>
                        <Flex
                          sx={{
                            mr: "16px",
                            mt: ["16px", "16px", null],
                            ml: ["32px", "32px", null],
                          }}
                        >
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
                              <Text>{values.bucket}</Text>
                            </MenuButton>
                            <MenuList>
                              {a.map((item, index) => {
                                return (
                                  <MenuItem key={index.toString()}>
                                    <Flex onClick={() => onSelectItem(item)}>
                                      <Text>{item.name}</Text>
                                    </Flex>
                                  </MenuItem>
                                );
                              })}
                              <MenuItem>
                                <Flex onClick={() => onAddBucket()}>
                                  <Text sx={{ color: "red" }}>
                                    + Add a Bucket
                                  </Text>
                                </Flex>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </Flex>
                    )}
                  </Flex>
                  <Flex sx={productsModalStyles.rightContainer}>
                    <Flex sx={productsModalStyles.delete} onClick={onRefresh}>
                      <IoCloseCircleOutline size={20} />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex sx={productsModalStyles.row4}>
              <Flex onClick={savenadd} sx={{ cursor: "pointer" }}>
                <BsPlusCircleFill color="#D7354A" size="32px" sx={{}} />
              </Flex>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
