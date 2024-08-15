import React, { useEffect, useState } from 'react'
import { RoleFields } from '../../../data/Fields/RoleManagement';
import { userManagementClient } from '../../../config';
import { getAllUsers } from '../../../api/userservice';
import DynamicForm from '../../../data/DynamicForm/DynamicForm';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { PropaneSharp } from '@mui/icons-material';

function RoleForm(props) {
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);
const [swalSms, setSwalSms] = useState([]);
const [genderOptions, setGenderOptions] = useState([]);
const [error, setError] = useState([]);
const [refreshTable, setRefreshTable] = useState(false);

const base_url = "Roles";

useEffect(() => {
  fetchIndividualClients();
}, [base_url, refreshTable]);

const fetchIndividualClients = async () => {
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
        swal(
          "Success!",
          `${Created.data.message}`,
          "success"
        );
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

return (
  <DynamicForm
    fields={RoleFields}
    onSubmit={handleSubmit}
    onClose={props.onClose}
    isEditing={props.isEditing}
    initialData={initialValues}
  />
);
}

export default RoleForm
