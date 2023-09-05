import { Frame, HorizontalStack, Navigation } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function NavigationExample() {
  const users = useSelector((state) => state.users.users);
  const location = useLocation(); // Get the current location

  return (
    <Frame>
      <HorizontalStack gap={"10"} wrap={true}>
        <div>
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
                  badge: String(users?.length),
                  active: location.pathname === "/viewUsers",
                },
              ]}
            />
          </Navigation>
        </div>

        <div style={{ width: "75%" }}>
          <Outlet />
        </div>
      </HorizontalStack>
    </Frame>
  );
}

export default NavigationExample;
