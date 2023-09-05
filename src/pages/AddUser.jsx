import React, { useState, useCallback } from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Select,
  RadioButton,
  InlineError,
  Text,
  Banner,
  Card,
} from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { setUserRecord } from "../store/userSlice";

function AddUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    designation: "SoftwareEngineer",
    gender: "male",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [isEmailAlreadyExist, setIsEmailAlreadyExist] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(() => {
    const newErrors = {};

    if (!userData.email) {
      newErrors.email = "Email is required";
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
    }

    if (!userData.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!userData.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!userData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      let existingUser = null;
      existingUser = users.filter((user) => {
        return user.email === userData.email;
      });
      if (existingUser.length > 0) {
        setIsEmailAlreadyExist(true);
        setTimeout(() => {
          setIsEmailAlreadyExist(false);
        }, 2000);
        return;
      }
      dispatch(setUserRecord(userData));
      setIsSuccessfull(true);
      setUserData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        designation: "SoftwareEngineer",
        gender: "male",
      });

      setTimeout(() => {
        setIsSuccessfull(false);
      }, 2000);
    }
  }, [userData, dispatch, users]);

  const handleDataChange = useCallback(
    (field, value) => {
      setUserData({ ...userData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    },
    [userData, errors]
  );

  const options = [
    { label: "Software Engineer", value: "SoftwareEngineer" },
    { label: "Web Developer", value: "WebDeveloper" },
    { label: "Software Tester", value: "softwareTester" },
  ];

  return (
    <div>
      {isEmailAlreadyExist && (
        <Banner
          status="critical"
          title="Email already exist"
          subtitle="Please use another email"
          onDismiss={() => setIsEmailAlreadyExist(false)}
        />
      )}
      {isSuccessfull && (
        <Banner
          status="success"
          title="User added successfully"
          onDismiss={() => setIsSuccessfull(false)}
        >
          <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
        </Banner>
      )}

      <Card>
        <Text
          as="h1"
          fontWeight="bold"
          variant="headingLg"
          style={{ padding: "20px" }}
        >
          Add New User
        </Text>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={userData.email}
              onChange={(value) => handleDataChange("email", value)}
              label="Email"
              type="email"
              autoComplete="email"
            />
            {errors.email && <InlineError message={errors.email} />}
            <TextField
              value={userData.password}
              onChange={(value) => handleDataChange("password", value)}
              label="Password"
              type="password"
            />
            {errors.password && <InlineError message={errors.password} />}

            <TextField
              value={userData.firstName}
              onChange={(value) => handleDataChange("firstName", value)}
              label="firstName"
              type="firstName"
            />
            {errors.firstName && <InlineError message={errors.firstName} />}
            <TextField
              value={userData.lastName}
              onChange={(value) => handleDataChange("lastName", value)}
              label="lastName"
              type="lastName"
            />
            {errors.lastName && <InlineError message={errors.lastName} />}

            <TextField
              value={userData.phoneNumber}
              onChange={(value) => handleDataChange("phoneNumber", value)}
              label="phoneNumber"
              type="phoneNumber"
            />
            {errors.phoneNumber && <InlineError message={errors.phoneNumber} />}

            <Select
              label="Designation"
              options={options}
              onChange={(value) => handleDataChange("designation", value)}
              value={userData.designation}
            />

            <Text>Gender</Text>
            <RadioButton
              label="Male"
              checked={userData.gender === "male"}
              id="male"
              name="gender"
              onChange={(value) => handleDataChange("gender", "male")}
            />
            <RadioButton
              label="Female"
              id="female"
              name="gender"
              checked={userData.gender === "female"}
              onChange={(value) => handleDataChange("gender", "female")}
            />

            <Button primary submit>
              Submit
            </Button>
          </FormLayout>
        </Form>
      </Card>
    </div>
  );
}

export default AddUser;
