import { Box, Frame, HorizontalStack, Navigation } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function NavigationExample() {
  const location = useLocation(); // Get the current location

  return (
    <Frame>
      <HorizontalStack gap={"10"} wrap={true}>
        <Box paddingBlockStart={"12"}>
          <Navigation location={location.pathname}>
            <Navigation.Section
              items={[
                {
                  url: "/",
                  label: "Home",
                  icon: HomeMinor,
                  exactMatch: true,
                  active: location.pathname === "/",

                  content: (
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      Home
                    </NavLink>
                  ),
                },
                {
                  url: "/addUser",
                  label: "Add Users",
                  icon: OrdersMinor,
                  active: location.pathname === "/addUser",
                },
                {
                  url: "/viewUsers",
                  label: "View Users",
                  icon: ProductsMinor,
                  active: location.pathname === "/viewUsers",
                },
              ]}
            />
          </Navigation>
        </Box>

        <div style={{ width: "75%" }}>
          <Outlet />
        </div>
      </HorizontalStack>
    </Frame>
  );
}

export default NavigationExample;
