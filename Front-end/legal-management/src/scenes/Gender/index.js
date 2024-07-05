import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
// import create_Us// Import service functions
import DynamicTable from "../../data/DynamicTable/dynamicTable";
import { tokens } from "../../theme";
import { GenderColumns } from "../../data/columns/SetUpManagement";
import { userManagementClient } from "../../config";
import GenderForm from "./form";

function Gender() {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const base_url = "gender";

  useEffect(() => {
    fetchGender();
  }, []);

  const handleFormSubmit = async (user) => {
    try {
      if (isEditing) {
        // Update user logic here
        await userManagementClient.put(`${base_url}/${editData.id}`, user); // Update API call(user); // Uncomment and implement this if update functionality is available
      } else {
        await userManagementClient.post(`${base_url}`);
      }

      setDrawerOpen(false);
      setDialogOpen(false);
    } catch (error) {
      swal("Error!", "Unable to save the user, try again later", "error");
    }
  };

  const fetchGender = async () => {
    try {
      setLoading(true);
      const response = await userManagementClient.get(base_url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const actions = {
    edit: {
      key: "EDIT",
      button_name: "Edit",
      Show_Button: true,
    },
    add: {
      key: "ADD",
      button_name: "Add",
      Show_Button: true,
    },
    activateDeactivate: {
      key: "deletion",
      button_name: "Deactivate",
      Show_Button: true,
    },
    // ViewCase: {
    //   key: "VIEWDETAILS",
    //   button_name: "View Details",
    //   Show_Button: true,
    // },
  };

  return (
    <Box m="20px">
      <DynamicTable
        title="Gender"
        subtitle="View all Gender, create edit or Deactivate"
        columns={GenderColumns}
        FormComponent={GenderForm}
        // query ={allGender}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default Gender;
