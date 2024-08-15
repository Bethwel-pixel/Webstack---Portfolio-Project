import React, { useEffect, useState } from "react";
import { ModuleFields } from "../../../data/Fields/RoleManagement";
import { userManagementClient } from "../../../config";
import { getAllUsers } from "../../../api/userservice";
import DynamicForm from "../../../data/DynamicForm/DynamicForm";
import Swal from "sweetalert2";
import swal from "sweetalert";

function ModuleForm(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [swalSms, setSwalSms] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [error, setError] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [modulo, setModulo] = useState([]); // Initialize as an empty array

  const base_url = "modules";

  useEffect(() => {
    fetchIndividualClients();
    fetchModules();
  }, [base_url, refreshTable]);

  const fetchIndividualClients = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers(base_url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    setLoading(true);
    try {
      const RoleResponse = await userManagementClient.get("Roles"); // Replace with your API endpoint for Roles
      if (Array.isArray(RoleResponse.data)) {
        setModulo(RoleResponse.data); // Ensure the response is an array
      } else {
        setModulo([]); // Fallback to an empty array if it's not an array
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    Role: props.data ? props.data.role : "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const creator = sessionStorage.username;
      if (props.isEditing) {
        values.updated_by = creator;
        const Updated = await userManagementClient.put(
          `/${base_url}/${props.data.id}`,
          values
        );

        if (Updated) {
          swal("Success!", `${Updated.data.message}`, "success");
        }
        setRefreshTable((prev) => !prev);
      } else {
        values.created_by = creator;
        const Created = await userManagementClient.post(`/${base_url}`, values);
        if (Created) {
          swal("Success!", `${Created.data.message}`, "success");
          setRefreshTable((prev) => !prev);
        }
      }
      await fetchIndividualClients(); // Fetch the updated data immediately after submission
    } catch (error) {
      swal("Error!", `${error.response.data.error}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const ModuleOptions = modulo.map((mod) => ({
    value: mod.id,
    label: mod.role,
  }));

  const columns = [
    ...ModuleFields,
    {
      id: "role",
      name: "role",
      label: "Role",
      type: "select",
      options: ModuleOptions,
      isRequired: true,
    },
  ];

  return (
    <DynamicForm
      fields={columns}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isEditing={props.isEditing}
      initialData={initialValues}
    />
  );
}

export default ModuleForm;