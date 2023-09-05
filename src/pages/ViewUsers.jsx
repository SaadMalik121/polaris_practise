import { Autocomplete, Button, Card, Icon, Text } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTableExample from "../components/DataTable";
import IndexTable from "../components/IndexTable";
import { clearUserData } from "../store/userSlice";
import AppModal from "../components/Modal";

function AutocompleteExample() {
  const [isShowModal, setIsShowModal] = useState(false);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions([]);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = users
        .filter((user) => user.email.match(filterRegex))
        .map((user) => ({ value: user.email, label: user.email }));
      setOptions(resultOptions);
    },
    [users]
  );

  const updateSelection = useCallback((selected) => {
    setSelectedOptions(selected);
    setInputValue(selected[0] || "");
  }, []);

  const emptyState = (
    <>
      <Icon source={SearchMinor} />
      <div style={{ textAlign: "center" }}>
        <Text>Could not find any results</Text>
      </div>
    </>
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Search Users"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search for a user"
      options={options}
      onSelect={updateSelection}
      singleSelection
    />
  );

  const clearUserRecords = () => {
    dispatch(clearUserData());
    setIsShowModal(false);
  };
  return (
    <Card style={{ height: "225px" }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
        emptyState={emptyState}
      />

      <Button onClick={() => setIsShowModal(true)}>Clear Record</Button>
      <DataTableExample />
      <br />
      <br />
      <IndexTable />
      {isShowModal && (
        <AppModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          descrpition={"Are You sure you want to clear user records?"}
          action={clearUserRecords}
          ButtonText={"Clear User Records"}
        />
      )}
    </Card>
  );
}

export default AutocompleteExample;
