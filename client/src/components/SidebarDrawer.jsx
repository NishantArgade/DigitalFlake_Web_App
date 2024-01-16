import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

export default function SidebarDrawer({ open, setOpen }) {
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };

  return (
    <>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem className="bg-[#662671] p-1 mb-2" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src="/assets/brandSmallLogo.svg"
                    className="md:w-[9.5rem] w-32 "
                    alt="logo"
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Divider />

            <Link to="/">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/category">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Category"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/products">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AllInboxOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Products"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
