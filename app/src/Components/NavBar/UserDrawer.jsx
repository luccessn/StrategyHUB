import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useAppContext } from "../../Context/AppContextProvider";
import { LogOutAction } from "../../Context/AppActionsCreator";
//
//
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { AppBar, Toolbar } from "@mui/material";
export const UserDrawer = () => {
  const [openDraw, setopenDraw] = useState(false);
  const { state, dispatch } = useAppContext();
  //
  //
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    // <div className="relative left-5">
    //   <button
    //     className="cursor-target p-2"
    //     onClick={() => setopenDraw((prev) => !prev)}
    //   >
    //     <FaRegUser className="text-white text-xl font-bold " />
    //   </button>
    //   {openDraw && (
    //     <div className="flex flex-col float-left absolute bg-red-400 p-4 pl-6 pr-6 left-2 top-14  gap-4">
    //       <h1>My Profile</h1>
    //       <div className="flex flex-col gap-2">
    //         <button className="hover:bg-red-500 p-2 rounded">Profile</button>
    //         <button className="hover:bg-red-500 p-2 rounded">Settings</button>
    //         <button className="hover:bg-red-500 p-2 rounded">Billing</button>
    //         <button className="hover:bg-red-500 p-2 rounded">
    //           Notifications
    //         </button>
    //       </div>
    //       <button
    //         className="hover:bg-red-500 p-2 rounded"
    //         onClick={() => dispatch(LogOutAction())}
    //       >
    //         Log Out
    //       </button>
    //     </div>
    //   )}
    // </div>
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem> */}
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(LogOutAction());
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
// <FaRegUser className="text-white text-xl font-bold " />
