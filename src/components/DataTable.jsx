import { Page, LegacyCard, DataTable, Button, Box } from "@shopify/polaris";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppModal from "./Modal";
import { deleteUserRecord } from "../store/userSlice";
import { Link } from "react-router-dom";

function DataTableExample() {
  const users = useSelector((state) => state.users.users);
  const [isShowModal, setIsShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const dispatch = useDispatch();
  const rows = users?.map((user) => [
    user?.firstName || "",
    user?.email || "",
    user?.password || "",
    user?.gender || "",
    user?.designation || "",
    <Box>
      <Button
        primary
        onClick={() => {
          setIsShowModal(true);
          setIdToDelete(user.id);
        }}
      >
        Delete
      </Button>
      <Link to={`/edituser/${user.id}`}>
        <Button outline>Edit</Button>
      </Link>
    </Box>,
  ]);

  const deleteUser = () => {
    dispatch(deleteUserRecord(idToDelete));
    setIsShowModal(false);
  };

  return (
    <Page title="Users Record">
      <LegacyCard>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "text", "text"]}
          headings={[
            "User Name",
            "Email",
            "Password",
            "Gender",
            "Designation",
            "Action",
          ]}
          rows={rows}
          footerContent={`Showing ${rows?.length} of ${rows?.length} results`}
        />
      </LegacyCard>
      {isShowModal && (
        <AppModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          descrpition={"Are You sure you want to delete"}
          action={deleteUser}
          ButtonText={"Delete User"}
        />
      )}
    </Page>
  );
}

export default DataTableExample;
