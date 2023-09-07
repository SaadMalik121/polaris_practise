import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  HorizontalStack,
  Page,
  Select,
  Spinner,
  Text,
  TextField,
  Thumbnail,
  Toast,
  VerticalStack,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeProduct, updateProduct } from "../store/productsSlice";
import AppModal from "../components/AppModal";

function ProductDetails() {
  const MIN_WIDTH = 1;
  const MIN_HEIGHT = 1;
  const MAX_WIDTH = 120;
  const MAX_HEIGHT = 302;
  const products = useSelector((state) => state.products.products);
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState();
  const [isLoadingBeforeSave, setIsLoadingBeforeSave] = useState(false);
  const [isShowProductSaveToast, setIsShowProductSaveToast] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();

  const [isSaveable, setIsSaveable] = useState(false);
  const dispatch = useDispatch();

  const [selectedMeasureUnit, setSelectedMeasureUnits] = useState("today");

  useEffect(() => {
    let product = products.find((product) => product.id === parseInt(id));
    setSelectedProduct(product);
  }, [setSelectedProduct, id, products]);

  const handleMeasureUnitChange = useCallback(
    (value) => setSelectedMeasureUnits(value),
    []
  );

  const onChangeHandler = (field, value) => {
    if (field === "width") {
      if ((value >= MIN_WIDTH && value <= MAX_WIDTH) || value === "") {
        setSelectedProduct({ ...selectedProduct, [field]: value });
        setIsSaveable(true);
      }
      return;
    }
    if (field === "height") {
      if ((value >= MIN_HEIGHT && value <= MAX_HEIGHT) || value === "") {
        setSelectedProduct({ ...selectedProduct, [field]: value });
        setIsSaveable(true);
      }
      return;
    }
    setSelectedProduct({ ...selectedProduct, [field]: value });
    setIsSaveable(true);
  };

  const EditProductDetails = () => {
    setIsLoadingBeforeSave(true);

    setTimeout(() => {
      setIsLoadingBeforeSave(false);
      dispatch(updateProduct(selectedProduct));
      setIsShowProductSaveToast(true);
      setIsSaveable(false);
    }, 1000);
    setTimeout(() => {
      setIsShowProductSaveToast(false);
    }, 3000);
  };
  const handleDeleteProduct = () => {
    dispatch(removeProduct(parseInt(id)));
    alert("Item deleted successfully");
    navigate("/");
  };

  const measureUnitOptions = [{ label: "Sheet", value: "Sheet" }];
  return (
    <Box style={{ paddingTop: "30px" }}>
      <Page
        backAction={{ content: "Products", url: "/" }}
        title={selectedProduct?.name}
      >
        {!selectedProduct ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner size="large" />
          </Box>
        ) : (
          <>
            {/* 1st Row Start*/}

            <Box
              style={{
                width: "100%",
              }}
            >
              <HorizontalStack gap={1}>
                <Box style={{ width: "36%" }}>
                  <Text as="h1" fontWeight="medium">
                    Product Details
                  </Text>
                </Box>
                <Box
                  style={{
                    width: "63%",
                    // marginLeft: "50px",
                  }}
                >
                  <Card>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <HorizontalStack gap={"2"}>
                        <Box>
                          <Thumbnail
                            size="small"
                            source={selectedProduct?.image}
                          ></Thumbnail>
                        </Box>
                        <VerticalStack gap={"1"}>
                          <Text as="h1" fontWeight="medium">
                            {selectedProduct?.name}
                          </Text>
                          <Text>SKU: {selectedProduct?.SKU}</Text>
                        </VerticalStack>
                      </HorizontalStack>
                      <Text as="h1" fontWeight="medium">
                        Price: {selectedProduct?.price}PKR
                      </Text>
                    </Box>
                  </Card>
                </Box>
              </HorizontalStack>
            </Box>
            {/* 1st Row End */}

            <Box style={{ margin: "20px 0px" }}>
              <Divider />
            </Box>

            {/* 2nd Row Start*/}
            <HorizontalStack gap={"32"}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box width="50%">
                  <Text as="h1" fontWeight="medium">
                    Product Dimensions
                  </Text>

                  <Box style={{ marginTop: "10px" }}>
                    <Text as="p" fontWeight="regular" color="subdued">
                      Specify the Products Dimensions (Height & Width) in
                      Centimeters
                    </Text>
                  </Box>
                </Box>

                <Box
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                  }}
                >
                  <Card>
                    <HorizontalStack gap={"6"}>
                      <Box style={{ width: "47%" }}>
                        <VerticalStack gap={2}>
                          <Text>Width (Min 1 - Max 120)</Text>
                          <TextField
                            type="number"
                            max={120}
                            min={1}
                            value={selectedProduct?.width}
                            onChange={(e) => onChangeHandler("width", e)}
                          />
                        </VerticalStack>
                      </Box>

                      <Box style={{ width: "47%" }}>
                        <VerticalStack gap={2}>
                          <Text>Height (Min 1 - Max 302)</Text>
                          <TextField
                            type="number"
                            max={302}
                            min={1}
                            value={selectedProduct?.height}
                            onChange={(e) => onChangeHandler("height", e)}
                          />
                        </VerticalStack>
                      </Box>
                    </HorizontalStack>
                  </Card>
                </Box>
              </Box>
            </HorizontalStack>
            {/* 2nd Row End */}

            <Box style={{ margin: "20px 0px" }}>
              <Divider />
            </Box>

            {/* 3rd Row Start*/}
            <HorizontalStack gap={"32"}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box width="50%">
                  <Text as="h1" fontWeight="medium">
                    Measure Unit
                  </Text>

                  <Box style={{ marginTop: "10px" }}>
                    <Text as="p" fontWeight="regular" color="subdued">
                      Specify the measure unit
                    </Text>
                  </Box>
                </Box>

                <Box
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                  }}
                >
                  <Card>
                    <VerticalStack gap={2}>
                      <Select
                        label="Measure"
                        options={measureUnitOptions}
                        onChange={handleMeasureUnitChange}
                        value={selectedMeasureUnit}
                      />
                    </VerticalStack>
                  </Card>
                </Box>
              </Box>
            </HorizontalStack>
            {/* 3rd Row End */}
            <Box style={{ margin: "20px 0px" }}>
              <Divider />
            </Box>

            {/* 4rth Row Start*/}
            <HorizontalStack gap={"32"}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box width="50%">
                  <Text as="h1" fontWeight="medium">
                    Sheets Credit Value
                  </Text>

                  <Box style={{ marginTop: "10px" }}>
                    <Text as="p" fontWeight="regular" color="subdued">
                      Specify the number of credits this product will use
                    </Text>
                  </Box>
                </Box>

                <Box
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                  }}
                >
                  <Card>
                    <VerticalStack gap={2}>
                      <Text>Credit Value</Text>
                      <TextField
                        type="number"
                        max={120}
                        min={1}
                        value={selectedProduct?.creditValue}
                        onChange={(e) => onChangeHandler("creditValue", e)}
                      />
                    </VerticalStack>
                  </Card>
                </Box>
              </Box>
            </HorizontalStack>
            {/* 4rth Row End */}

            {/* ButtonContainer */}
            <Box
              style={{
                position: "absolute",
                right: 50,
                paddingTop: "30px",
                paddingBottom: "20px",
              }}
            >
              <ButtonGroup>
                <Box
                  style={{
                    border: "2px solid red",
                    borderRadius: 6,
                  }}
                >
                  <Button outline onClick={() => setIsShowModal(true)}>
                    <Text color="critical" fontWeight="medium">
                      Delete Product
                    </Text>
                  </Button>
                </Box>
                <Button
                  primary
                  disabled={!isSaveable}
                  onClick={EditProductDetails}
                  loading={isLoadingBeforeSave}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Box>

            {isShowProductSaveToast && (
              <Toast
                content="Product details are updated"
                onDismiss={() => setIsShowProductSaveToast(false)}
              />
            )}
          </>
        )}
      </Page>

      {isShowModal && (
        <AppModal
          ButtonText={"Delete Product"}
          descrpition={"Are you sure you want to delete Product"}
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          action={handleDeleteProduct}
        />
      )}
    </Box>
  );
}

export default ProductDetails;
