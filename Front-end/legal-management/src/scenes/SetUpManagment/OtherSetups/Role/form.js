import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../../../config";
import { getAllUsers } from "../../../../api/userservice";
import DynamicForm from "../../../../data/DynamicForm/DynamicForm";
import { RoleFormFields } from "../../../../data/Fields/setummanagement";

const RoleForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [swalSms, setSwalSms] = useState([]);

  const [genderOptions, setGenderOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [countyOptions, setCountyOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);
  const [error, setError] = useState(null);
  const base_url = "Roles";

  useEffect(() => {
    fetchRoles();
  }, [base_url, refreshTable]);

  const fetchRoles = async () => {
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

  const initialValues = {
    roleName: props.data ? props.data.role : "",
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
        const Created = await userManagementClient.post("/Roles", values);
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


  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DynamicForm
      fields={RoleFormFields}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isEditing={props.isEditing}
      initialData={initialValues}
      swalMessage={swalSms}
    />
  );
};

export default RoleForm;
