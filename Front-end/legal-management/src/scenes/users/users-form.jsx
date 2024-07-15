import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../config";
import { getAllUsers } from "../../api/userservice";
import DynamicForm from "../../data/DynamicForm/DynamicForm";
import { userFormFields } from "../../data/Fields/userFields";

const UsersForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [swalSms, setSwalSms] = useState([]);

  const [genderOptions, setGenderOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [countyOptions, setCountyOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);
  const [error, setError] = useState(null);
  const base_url = "data";

  useEffect(() => {
    fetchCountries();
    fetchGenderOptions();
    fetchUsers();
  }, [base_url, refreshTable]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers(base_url);
      setData(response.data); // Adjust based on your API response structure
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenderOptions = async () => {
    try {
      const response = await getAllUsers("gender");
      setGenderOptions(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await getAllUsers("countries");
      setCountryOptions(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchCounties = async (countryId) => {
    try {
      const response = await getAllUsers(`counties/${26}`);
      setCountyOptions(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    fetchCounties(countryId);
  };

  const OPtions = genderOptions.map((gender) => ({
    parent_key: gender.id,
    value: gender.id,
    label: gender.gender,
  }));

  const CountryOPtions = countryOptions.map((country) => ({
    parent_key: country.id,
    value: country.id,
    label: country.Country,
  }));

  const CountyOptions = countyOptions.map((county) => ({
    parent_key: county.id,
    value: county.id,
    label: county.County,
  }));

  const initialValues = {
    Username: props.data ? props.data.Username : "",
    first_name: props.data ? props.data.First_name : "",
    last_name: props.data ? props.data.Last_name : "",
    email: props.data ? props.data.User_email : "",
    phone: props.data ? props.data.Phone_number : "",
    genderId: props.data ? props.data.gender : "",
    created_by: props.data ? props.data.created_by : "",
    updated_by: props.data ? props.data.updated_by : "",
    country: props.data ? props.data.country : "",
    county: props.data ? props.data.county : "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const creator = sessionStorage.username;
      if (props.isEditing) {
        values.updated_by = creator;
        const Updated = await userManagementClient.put(
          `/update/${props.data.id}`,
          values
        );

        if (Updated) {
          swal("Success!", `${Updated.data.message}`, "success");
        }
      } else {
        values.created_by = creator;
        const Created = await userManagementClient.post("/data", values);
        if (Created) {
          swal("Success!", `${Created.data.message}`, "success");
        }
      }
      setRefreshTable((prev) => !prev); // Refresh the table after submission
    } catch (error) {
      swal("Error!", `${error.response.statusText}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const userFields = [
    ...userFormFields,
    {
      id: "gender",
      name: "gender",
      label: "Gender",
      type: "select",
      options: OPtions,
      isRequired: true,
    },
    {
      id: "country",
      name: "country",
      label: "Country",
      type: "select",
      options: CountryOPtions,
      isRequired: true,
      onChange: handleCountryChange,
    },
    {
      id: "county",
      name: "county",
      label: "County",
      type: "select",
      options: CountyOptions,
      isRequired: true,
      disabled: !selectedCountry,
    },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DynamicForm
      fields={userFields}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isEditing={props.isEditing}
      initialData={initialValues}
      swalMessage={swalSms}
    />
  );
};

export default UsersForm;
