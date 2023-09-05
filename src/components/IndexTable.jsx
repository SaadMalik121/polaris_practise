import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Button,
} from "@shopify/polaris";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMultipleRecords } from "../store/userSlice";

function SimpleIndexTableExample() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const resourceName = {
    singular: "user",
    plural: "users",
  };

  let { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(users);

  const rowMarkup = users?.map(
    (
      {
        firstName,
        lastName,
        email,
        password,
        gender,
        designation,
        phoneNumber,
        id,
      },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {firstName + " " + lastName}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{id}</IndexTable.Cell>
        <IndexTable.Cell>{password}</IndexTable.Cell>
        <IndexTable.Cell>{gender}</IndexTable.Cell>
        <IndexTable.Cell>{designation}</IndexTable.Cell>
        <IndexTable.Cell>{phoneNumber}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <LegacyCard>
      {selectedResources.length > 0 && (
        <Button
          onClick={() => {
            dispatch(deleteMultipleRecords(selectedResources));
            handleSelectionChange();
          }}
        >
          Delete Selected Records
        </Button>
      )}
      <IndexTable
        resourceName={resourceName}
        itemCount={users?.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Name" },
          { title: "Email" },
          { title: "Password" },
          { title: "Gender", alignment: "end" },
          { title: "Designation" },
          { title: "Phone Number" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export default SimpleIndexTableExample;
