import {
  Box,
  Button,
  Card,
  Divider,
  HorizontalStack,
  Page,
  Select,
  Text,
  TextField,
  Toast,
  VerticalStack,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productsSlice";

function AddRegularProduct() {
  const MIN_WIDTH = 1;
  const MIN_HEIGHT = 1;
  const MAX_WIDTH = 120;
  const MAX_HEIGHT = 302;
  const [newProduct, setNewProduct] = useState({
    id: 1,
    creditValue: 0,
    width: 1,
    height: 1,
    measureUnit: "sheet",
    image: "https://uniworthdress.com/uploads/product/CS2192..jpg",
    category: "-",
  });

  const [isLoadingBeforeSave, setIsLoadingBeforeSave] = useState(false);
  const [isShowProductSaveToast, setIsShowProductSaveToast] = useState(false);

  const [isSaveable, setIsSaveable] = useState(false);
  const dispatch = useDispatch();

  const [selectedMeasureUnit, setSelectedMeasureUnits] = useState("today");

  const handleMeasureUnitChange = useCallback(
    (value) => setSelectedMeasureUnits(value),
    []
  );

  const onChangeHandler = (field, value) => {
    if (field === "width") {
      if ((value >= MIN_WIDTH && value <= MAX_WIDTH) || value === "") {
        setNewProduct({ ...newProduct, [field]: value });
        setIsSaveable(true);
      }
      return;
    }
    if (field === "height") {
      if ((value >= MIN_HEIGHT && value <= MAX_HEIGHT) || value === "") {
        setNewProduct({ ...newProduct, [field]: value });
        setIsSaveable(true);
      }
      return;
    }
    setNewProduct({ ...newProduct, [field]: value });
    setIsSaveable(true);
  };

  const AddProductToStore = () => {
    setIsLoadingBeforeSave(true);

    setTimeout(() => {
      setIsLoadingBeforeSave(false);
      dispatch(addProduct(newProduct));
      setIsShowProductSaveToast(true);
      setIsSaveable(false);
    }, 1000);
    setTimeout(() => {
      setIsShowProductSaveToast(false);
    }, 3000);
  };

  const measureUnitOptions = [{ label: "Sheet", value: "Sheet" }];
  return (
    <Box style={{ paddingTop: "30px" }}>
      <Page
        backAction={{ content: "Products", url: "/" }}
        title={"Add a Regular Product"}
      >
        {/* 1st Row Start*/}

        <HorizontalStack gap={1}>
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
                Search and Select a Product
              </Text>
              <Box style={{ marginTop: "10px" }}>
                <Text as="p" fontWeight="regular" color="subdued">
                  Search & Select a product from your Shopify products on which
                  you want users to upload their artwork.
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
                  <HorizontalStack gap={"6"}>
                    <Box style={{ width: "47%" }}>
                      <VerticalStack gap={2}>
                        <Text>Name</Text>
                        <TextField
                          value={newProduct?.name}
                          onChange={(e) => onChangeHandler("name", e)}
                        />
                      </VerticalStack>
                    </Box>

                    <Box style={{ width: "47%" }}>
                      <VerticalStack gap={2}>
                        <Text>SKU</Text>
                        <TextField
                          value={newProduct?.SKU}
                          onChange={(e) => onChangeHandler("SKU", e)}
                        />
                      </VerticalStack>
                    </Box>
                  </HorizontalStack>
                  <HorizontalStack gap={"6"}>
                    <Box style={{ width: "47%" }}>
                      <VerticalStack gap={2}>
                        <Text>Product Type</Text>
                        <TextField
                          value={newProduct?.productType}
                          onChange={(e) => onChangeHandler("productType", e)}
                        />
                      </VerticalStack>
                    </Box>

                    <Box style={{ width: "47%" }}>
                      <VerticalStack gap={2}>
                        <Text>Price</Text>
                        <TextField
                          value={newProduct?.price}
                          onChange={(e) => onChangeHandler("price", e)}
                        />
                      </VerticalStack>
                    </Box>
                  </HorizontalStack>
                </VerticalStack>
              </Card>
            </Box>
          </Box>
        </HorizontalStack>
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
                        value={newProduct?.width}
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
                        value={newProduct?.height}
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
                    value={newProduct?.creditValue}
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
          <Button
            primary
            disabled={!isSaveable}
            onClick={AddProductToStore}
            loading={isLoadingBeforeSave}
          >
            Save
          </Button>
        </Box>

        {isShowProductSaveToast && (
          <Toast
            content="Product is added to the list"
            onDismiss={() => setIsShowProductSaveToast(false)}
          />
        )}
      </Page>
    </Box>
  );
}

export default AddRegularProduct;
