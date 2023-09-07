import { Box, Button, Divider, Page } from "@shopify/polaris";
import React from "react";
// import AppIndexTable from "../components/AppIndexTabel";
import AppIndexTable from "../components/AppIndexTabel";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "../store/productsSlice";

function HomePage() {
  const dispatch = useDispatch();
  return (
    <Box padding={10}>
      {/* Page */}
      <Page
        title="Product"
        subtitle="View All Your Gangr Products"
        primaryAction={{
          content: "Add Regular Product",
          url: "/addRegularProduct",
        }}
        secondaryActions={[
          {
            content: "Add Bulk Product",
          },
        ]}
      />
      <Box padding={5}>
        <Divider />
      </Box>
      <Button onClick={() => dispatch(removeAllProducts())}>
        Remove All Users
      </Button>

      <Box paddingBlockStart={5}>
        <AppIndexTable />
      </Box>
    </Box>
  );
}

export default HomePage;
