import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../config";
import { getAllUsers } from "../../api/userservice";
import DynamicForm from "../../data/DynamicForm/DynamicForm";
import { userFormFields } from "../../data/Fields/userFields";

const UsersForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [genderOptions, setGenderOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [countyOptions, setCountyOptions] = useState([]);
  const [filteredCountyOptions, setFilteredCountyOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const base_url = "data";

  useEffect(() => {
    fetchData();
  }, [base_url]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const genderResponse = await getAllUsers("gender");
      const countryResponse = await getAllUsers("countries");
      const countyResponse = await getAllUsers("counties");

      setGenderOptions(genderResponse.data);
      setCountryOptions(countryResponse.data);
      setCountyOptions(countyResponse.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const genderOptionsFormatted = genderOptions.map((gender) => ({
    value: gender.id,
    label: gender.gender,
  }));

  const countryOptionsFormatted = countryOptions.map((country) => ({
    value: country.id,
    label: country.Country,
  }));

  const filterCountyOptions = (countryId) => {
    const filteredOptions = countyOptions
      .filter((item) => item.CountryID === countryId) // Make sure CountryID exists in county data
      .map((item) => ({
        value: item.id,
        label: item.county,
      }));

    setFilteredCountyOptions(filteredOptions);
  };
  const SwalSms = 'hello';

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

  const onFieldChange = (field, value) => {
    if (field.name === "country") {
      setSelectedCountry(value);
      filterCountyOptions(value);
    }
    return {};
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const creator = sessionStorage.username;
      if (props.isEditing) {
        values.updated_by = creator;
        const updated = await userManagementClient.put(
          `/update/${props.data.id}`,
          values
        );

        if (updated) {
          swal("Success!", `${updated.data.message}`, "success");
        }
      } else {
        values.created_by = creator;
        const created = await userManagementClient.post("/data", values);
        if (created) {
          swal("Success!", `${created.data.message}`, "success");
        }
      }
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
      options: genderOptionsFormatted,
      isRequired: true,
    },
    {
      id: "country",
      name: "country",
      label: "Country",
      type: "select",
      options: countryOptionsFormatted,
      isRequired: true,
      onChange: onFieldChange,
    },
    {
      id: "county",
      name: "county",
      label: "County",
      type: "select",
      options: filteredCountyOptions,
      isRequired: true,
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
      swalMessage={SwalSms}
      onFieldChange={onFieldChange}
    />
  );
};

export default UsersForm;