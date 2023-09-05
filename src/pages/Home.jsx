import {
  Avatar,
  Card,
  HorizontalGrid,
  HorizontalStack,
  Text,
} from "@shopify/polaris";
import React from "react";
import CalloutCardEx from "../components/CalloutCard";
import { useSelector } from "react-redux";

function Home() {
  const users = useSelector((state) => state.users.users);
  const cardStyle = {
    padding: "20px",
    textAlign: "center",
  };

  const headingStyle = {
    marginBottom: "8px",
    textAlign: "center",
  };

  const valueStyle = {
    fontSize: "24px",
    textAlign: "center",
  };

  return (
    <>
      <HorizontalGrid gap="4" columns={1}>
        <HorizontalStack gap={4} blockAlign="center">
          <Avatar customer name="Farrah" />
          <Text>Hi User, Good Morning</Text>
        </HorizontalStack>
        <Card style={cardStyle} sectioned>
          <div style={headingStyle}>
            <Text as="h2" variant="headingXl">
              Total Users
            </Text>
          </div>
          <div style={valueStyle}>
            <Text>{users?.length}</Text>
          </div>
        </Card>
        <Card style={cardStyle} sectioned>
          <div style={headingStyle}>
            <Text as="h2" variant="headingXl">
              Total Orders
            </Text>
          </div>
          <div style={valueStyle}>
            <Text style={{ textAlign: "center" }}>5</Text>
          </div>
        </Card>
        <CalloutCardEx />
      </HorizontalGrid>
    </>
  );
}

export default Home;
