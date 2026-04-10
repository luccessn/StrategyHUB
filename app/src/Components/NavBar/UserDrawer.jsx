import React, { useState, Dispatch, SetStateAction } from "react";
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
//
//
import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from "react-icons/fi";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { motion } from "framer-motion";
export const UserDrawer = () => {
  const [openDraw, setopenDraw] = useState(false);
  const { state, dispatch } = useAppContext();
  //
  //
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(LogOutAction());
  };
  return (
    <div className="  flex items-center justify-center ">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-full cursor-target rounded-bl-none text-indigo-50  hover:bg-indigo-500 transition-colors"
        >
          <FaUserAstronaut className="font-medium text-2xl" />
          {/* <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span> */}
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <Option click={setOpen} Icon={FiEdit} text="Edit" />
          <Option click={setOpen} Icon={FiPlusSquare} text="Duplicate" />
          <Option click={setOpen} Icon={FiShare} text="Share" />
          <Option
            click={() => {
              handleLogout();
              setOpen(false);
            }}
            Icon={RiLogoutCircleRLine}
            text="Log Out"
          />
        </motion.ul>
      </motion.div>
    </div>
    // <React.Fragment>
    //   <Box
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       textAlign: "center",
    //     }}
    //   >
    //     {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
    //     <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
    //     <Tooltip title="Account settings">
    //       <IconButton
    //         onClick={handleClick}
    //         size="small"
    //         sx={{ ml: 2 }}
    //         aria-controls={open ? "account-menu" : undefined}
    //         aria-haspopup="true"
    //         aria-expanded={open ? "true" : undefined}
    //       >
    //         <Avatar sx={{ width: 32, height: 32 }} />
    //       </IconButton>
    //     </Tooltip>
    //   </Box>
    //   <Menu
    //     anchorEl={anchorEl}
    //     id="account-menu"
    //     open={open}
    //     onClose={handleClose}
    //     onClick={handleClose}
    //     slotProps={{
    //       paper: {
    //         elevation: 0,
    //         sx: {
    //           overflow: "visible",
    //           filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    //           mt: 1.5,
    //           "& .MuiAvatar-root": {
    //             width: 32,
    //             height: 32,
    //             ml: -0.5,
    //             mr: 1,
    //           },
    //           "&::before": {
    //             content: '""',
    //             display: "block",
    //             position: "absolute",
    //             top: 0,
    //             right: 14,
    //             width: 10,
    //             height: 10,
    //             bgcolor: "background.paper",
    //             transform: "translateY(-50%) rotate(45deg)",
    //             zIndex: 0,
    //           },
    //         },
    //       },
    //     }}
    //     transformOrigin={{ horizontal: "right", vertical: "top" }}
    //     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    //   >
    //     {/* <MenuItem onClick={handleClose}>
    //       <Avatar /> Profile
    //     </MenuItem> */}
    //     <MenuItem onClick={handleClose}>
    //       <Avatar /> My account
    //     </MenuItem>
    //     <Divider />
    //     <MenuItem onClick={handleClose}>
    //       <ListItemIcon>
    //         <PersonAdd fontSize="small" />
    //       </ListItemIcon>
    //       Add another account
    //     </MenuItem>
    //     <MenuItem onClick={handleClose}>
    //       <ListItemIcon>
    //         <Settings fontSize="small" />
    //       </ListItemIcon>
    //       Settings
    //     </MenuItem>
    //     <MenuItem
    //       onClick={() => {
    //         dispatch(LogOutAction());
    //         handleClose();
    //       }}
    //     >
    //       <ListItemIcon>
    //         <Logout fontSize="small" />
    //       </ListItemIcon>
    //       Logout
    //     </MenuItem>
    //   </Menu>
    // </React.Fragment>
  );
};
// <FaRegUser className="text-white text-xl font-bold " />
const Option = ({ text, Icon, click }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => click(false)}
      className="flex items-center  gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

// export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
