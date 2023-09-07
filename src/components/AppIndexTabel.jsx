import {
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Badge,
  Spinner,
  Thumbnail,
  Box,
  Pagination,
  EmptySearchResult,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function IndexFiltersDefaultExample() {
  const ITEMS_PER_PAGE = 5;
  const navigation = useNavigate();
  const allProducts = useSelector((state) => state.products.products);
  const [selected, setSelected] = useState(0);
  const [products, setProducts] = useState(allProducts); //hold all products after filteration
  const [productsToDisplay, setProductsToDisplay] = useState(allProducts); //hold all products to display in page for ex 10 at a time (per page)
  const [startIndexForProduct, setStartIndexForProduct] = useState(0); //for display in page
  const [queryValue, setQueryValue] = useState("");
  const [itemStrings] = useState(["All", "Bulk", "Regular"]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let filteredProducts = allProducts;
    if (selected === 1) {
      filteredProducts = allProducts.filter(
        (product) => product.productType === "Bulk"
      );
    } else if (selected === 2) {
      filteredProducts = allProducts.filter(
        (product) => product.productType === "Regular"
      );
    }

    if (queryValue.trim() !== "" && queryValue.length >= 3) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(queryValue.toLowerCase())
      );
    }
    const slice = filteredProducts.slice(
      startIndexForProduct,
      startIndexForProduct + ITEMS_PER_PAGE
    );
    setProductsToDisplay(slice);
    setProducts(filteredProducts);
  }, [selected, queryValue, allProducts, startIndexForProduct]);

  const tabs = itemStrings?.map((item, index) => ({
    content: item,
    index,
    onAction: () => {
      setStartIndexForProduct(0);
    },
    id: `${item}-${index}`,
  }));

  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const handleFiltersQueryChange = useCallback((value) => {
    setQueryValue(value);

    if (value.length >= 3) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, []);
  const emptyStateMarkup = (
    <EmptySearchResult
      title={"No products found"}
      description={"Try changing the filters or search term"}
      withIllustration
    />
  );

  const filters = [];

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const rowMarkup = productsToDisplay?.map(
    (
      {
        id,
        name,
        image,
        width,
        height,
        category,
        price,
        measureUnit,
        creditValue,
        productType,
      },
      index
    ) => (
      <IndexTable.Row
        onClick={() => navigation(`/productDetail/${id}`)}
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Thumbnail source={image} size="small" />
        </IndexTable.Cell>
        <IndexTable.Cell>{name}</IndexTable.Cell>
        <IndexTable.Cell>{category}</IndexTable.Cell>
        <IndexTable.Cell>{width + " X " + height}</IndexTable.Cell>
        <IndexTable.Cell>{price}</IndexTable.Cell>
        <IndexTable.Cell>{measureUnit}</IndexTable.Cell>
        <IndexTable.Cell>{creditValue}</IndexTable.Cell>
        <IndexTable.Cell>
          <Badge status="success" size="medium">
            {productType}
          </Badge>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <LegacyCard>
      <IndexFilters
        // primaryAction={""}
        canCreateNewView={false}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={() => {
          setQueryValue("");
        }}
        // primaryAction={primaryAction}

        cancelAction={{
          onAction: onHandleCancel,
          disabled: false,
          loading: false,
        }}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        filters={filters}
        // onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
      />
      {!isLoading ? (
        <>
          <IndexTable
            emptyState={emptyStateMarkup}
            resourceName={resourceName}
            itemCount={products.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: "" },
              { title: "Product" },
              { title: "Category" },
              { title: "Size" },
              { title: "Price" },
              { title: "Measure Unit" },
              { title: "Credit Value" },
              { title: "Product Type" },
            ]}
          >
            {rowMarkup}
          </IndexTable>
          {ITEMS_PER_PAGE < products.length && (
            <Pagination
              hasPrevious={startIndexForProduct >= ITEMS_PER_PAGE}
              onPrevious={() => {
                setStartIndexForProduct(startIndexForProduct - ITEMS_PER_PAGE);
              }}
              hasNext={startIndexForProduct + ITEMS_PER_PAGE < products.length}
              onNext={() => {
                setStartIndexForProduct(startIndexForProduct + ITEMS_PER_PAGE);
              }}
            />
          )}
        </>
      ) : (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </Box>
      )}
    </LegacyCard>
  );
}

export default IndexFiltersDefaultExample;
