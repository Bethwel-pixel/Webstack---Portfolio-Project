import { Box } from "@mui/material";
import DynamicTable from "../../../data/DynamicTable/dynamicTable";
import { allCorporateClients } from "../../../data/Axios/queries";
import { clientManagementUrl } from "../../../config";
import CorporateClientsForm from "./form";
import { CorporateClientsColumns } from "../../../data/DynamicTable/Collumns";
const base_url = clientManagementUrl.uri;
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
    key: "ACTIVATEDEACTIVATE",
    button_name: "Deactivate",
    Show_Button: false,
  },
  ViewCase: {
    key: "VIEWDETAILS",
    button_name: "View Details",
    Show_Button: false,
  },
};
function CorporateClients() {
  return (
    <Box m="2px">
      <DynamicTable
        title="Corporate Clients"
        subtitle="View all Corporate Clients, create edit or view details"
        columns={CorporateClientsColumns}
        FormComponent={CorporateClientsForm}
        query ={allCorporateClients}
        base_url={base_url}
        actions={actions}
      />
    </Box>
  );
}

export default CorporateClients;
