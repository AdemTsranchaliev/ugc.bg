import { memo, useState } from "react";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

// project imports
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import menuItem from "../MenuItems";

import { HORIZONTAL_MAX_ITEM } from "../../../themes/config";

// ==============================|| SIDEBAR MENU LIST ||============================== //

function MenuList() {
  const [selectedID, setSelectedID] = useState("");
  const [menuItems, setMenuItems] = useState({ items: [...menuItem.items] });

  // last menu-item to show in horizontal menu bar
  const lastItem = HORIZONTAL_MAX_ITEM;

  let lastItemIndex = menuItems.items.length - 1;
  let remItems = [];
  let lastItemId;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items
      .slice(lastItem - 1, menuItems.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
        ...(item.url && {
          url: item.url,
        }),
      }));
  }

  const navItems = menuItems.items
    .slice(0, lastItemIndex + 1)
    .map((item) => {
      switch (item.type) {
        case "group":
          if (item.url && item.id !== lastItemId) {
            return (
              <List key={item.id}>
                <NavItem
                  item={item}
                  level={1}
                  isParents
                  setSelectedID={() => setSelectedID("")}
                />
              </List>
            );
          }

          return (
            <NavGroup
              key={item.id}
              setSelectedID={setSelectedID}
              selectedID={selectedID}
              item={item}
              lastItem={lastItem}
              remItems={remItems}
              lastItemId={lastItemId}
            />
          );
        default:
          return (
            <Typography
              key={item.id}
              variant="h6"
              align="center"
              sx={{ color: "error.main" }}
            >
              Menu Items Error
            </Typography>
          );
      }
    });

  return <>{navItems}</>;
}

export default memo(MenuList);
