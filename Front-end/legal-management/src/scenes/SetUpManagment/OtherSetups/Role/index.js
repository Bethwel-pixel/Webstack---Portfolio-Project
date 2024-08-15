import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Button,
  Typography,
  MenuItem,
  Select,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { PulseLoader } from "react-spinners";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import BlockIcon from "@mui/icons-material/Block";
import { CheckCircleOutline, LockResetRounded } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AnchorTemporaryDrawer from "../../../../components/Drawer";
import swal from "sweetalert";
import { userManagementClient } from "../../../../config";
import UsersForm from "../../../users/users-form";
import { createUser } from "../../../../api/userservice"; // Import service functions
import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { RoleColumns } from "../../../../data/columns/SetUpManagement";
import RoleForm from "./form";

function Role() {
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
  const base_url = "Roles";
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
  };

  const Columns = [
    ...RoleColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const text = params.formattedValue === 1 ? "Active" : "InActive";
        return text;
      },
    },
  ];

  return (
    <Box m="20px">
      <DynamicTable
        title="Role"
        subtitle="View all Role, create edit or Deactivate"
        columns={Columns}
        FormComponent={RoleForm}
        // query ={allIndividualClients}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default Role;
