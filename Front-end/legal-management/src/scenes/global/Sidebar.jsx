import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Drawer,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { tokens } from "../../theme";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import {
  CasesOutlined,
  GavelRounded,
  Groups2Outlined,
  SettingsOutlined,
  WcOutlined,
} from "@mui/icons-material";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import CasesIcon from "@mui/icons-material/Cases";
import AddchartIcon from "@mui/icons-material/Addchart";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import CheckIcon from "@mui/icons-material/Check";
import GavelIcon from "@mui/icons-material/Gavel";
import TerrainIcon from "@mui/icons-material/Terrain";
import MessageIcon from "@mui/icons-material/Message";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { getAllUsers } from "../../api/userservice";

const base_url = "SideBar";

function getIconByName(iconName) {
  switch (iconName) {
    case "companymanagement":
      return <LocationCityIcon />;
    case "dashboard":
      return <DashboardIcon />;
    case "casemanagement":
      return <CasesIcon />;
    case "clientmanagement":
      return <PersonIcon />;
    case "usermanagement":
      return <Groups2Outlined />;
    case "rolemanagement":
      return <ViewModuleIcon />;
    case "accountsandfinancemanagement":
      return <ManageAccountsIcon />;
    case "clients":
      return <ReceiptOutlinedIcon />;
    case "Individualclients":
      return <PersonOutlinedIcon />;
    case "users":
      return <PeopleOutlinedIcon />;
    case "Cases":
      return <CasesOutlined />;
    case "setupmanagement":
      return <SettingsOutlined />;
    case "gender":
      return <WcOutlined />;
    case "country":
      return <MapOutlinedIcon />;
    default:
      return null;
  }
}

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  setMenuSelected,
  selectedMenu,
  submenuitems,
  isCollapsed,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <SubMenu
      active={selectedMenu === title}
      style={{ color: colors.grey[100] }}
      icon={getIconByName(icon)}
      title={title}
      to={to}
    >
      {submenuitems &&
        submenuitems.map((submenuitem, j) => (
          <MenuItem
            key={j}
            active={selected === submenuitem.title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(submenuitem.title)}
            icon={getIconByName(submenuitem.icon)}
          >
            <Typography>{submenuitem.title}</Typography>
            <Link to={submenuitem.to} />
          </MenuItem>
        ))}
    </SubMenu>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [selectedMenu, setMenuSelected] = useState("Dashboard");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isButtonVisible, setButtonVisible] = useState(true);
  const [userRole, setUserRole] = useState("admin");
  const [menuItems, setMenuItems] = useState([]); // Example role, replace with actual logic

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await getAllUsers(`${base_url}/1`);
        const fetchedData = response.data;

        const modules = fetchedData.reduce((acc, item) => {
          const existingModule = acc.find(
            (mod) => mod.ModuleId === item.ModuleId
          );

          if (existingModule) {
            existingModule.children.push({
              title: item.SubModuleTitle,
              icon: item.SubModuleIcon,
              to: item.SubModuleLink,
            });
          } else {
            acc.push({
              title: item.ModuleTitle,
              icon: item.ModuleIcon,
              children: [
                {
                  title: item.SubModuleTitle,
                  icon: item.SubModuleIcon,
                  to: item.SubModuleLink,
                },
              ],
              roles: [item.RoleName.toLowerCase()],
            });
          }

          return acc;
        }, []);

        setMenuItems(modules);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchModules();
  }, []);

  const sidebarContent = (
    <Box
      sx={{
        height: "150vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-sidebar-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-sidebar-inner:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      {isSmallScreen && (
        <IconButton
          style={{
            margin: "10px",
            display: isSmallScreen ? "none" : "block",
            zIndex: isSmallScreen ? -1 : "auto",
          }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <MenuOutlinedIcon />
        </IconButton>
      )}
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="Center"
                alignItems="Center"
                ml="15px"
              >
                <Box display="flex" justifyContent="start" alignItems="start">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../..//Law.png`}
                    style={{ cursor: "pointer", borderRadius: "10%" }}
                  />
                </Box>

                <IconButton
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="10px" ms="10px">
              <Box ms="10px" textAlign="Center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 10px 0" }}
                >
                  Legal Management
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {menuItems
              .filter((menuitem) => menuitem.roles.includes(userRole))
              .map((menuitem, i) => (
                <Tooltip
                  title={isCollapsed ? menuitem.title : ""}
                  placement="right"
                  key={i}
                >
                  <div>
                    <Item
                      key={i}
                      title={menuitem.title}
                      icon={menuitem.icon}
                      selected={selected}
                      setSelected={setSelected}
                      setMenuSelected={setMenuSelected}
                      selectedMenu={selectedMenu}
                      submenuitems={menuitem.children}
                      isCollapsed={isCollapsed} // Pass isCollapsed prop to Item component
                    />
                  </div>
                </Tooltip>
              ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );

  return (
    <Box>
      {isSmallScreen ? (
        <>
          {isButtonVisible && (
            <IconButton
              onClick={() => {
                setDrawerOpen(true);
                setButtonVisible(false);
              }}
              style={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
            >
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => {
              setDrawerOpen(false);
              setButtonVisible(true);
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        sidebarContent
      )}
    </Box>
  );
};

export default Sidebar;
