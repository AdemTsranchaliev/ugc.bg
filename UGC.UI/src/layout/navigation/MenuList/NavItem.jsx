import PropTypes from "prop-types";
import { Activity, useEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation } from "react-router";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// project imports
import useConfig from "../../../themes/context/useConfig";
import { withAlpha } from "../../../utils/colorUtils";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function NavItem({
  item,
  level,
  isParents = false,
  setSelectedID,
}) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const ref = useRef(null);

  const { pathname } = useLocation();
  const {
    state: { borderRadius },
  } = useConfig();

  const drawerOpen = false;

  const isHorizontal = true;
  const isSelected = !!matchPath(
    { path: item?.link ? item.link : item.url, end: false },
    pathname
  );

  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare =
      ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
    window.removeEventListener("resize", compareSize);
  }, []);

  const Icon = item?.icon;
  const itemIcon = item?.icon ? (
    <Icon
      stroke={1.5}
      size={drawerOpen ? "20px" : "24px"}
      style={{
        ...(isHorizontal && isParents && { fontSize: 20, stroke: "1.5" }),
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{ width: isSelected ? 8 : 6, height: isSelected ? 8 : 6 }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  const itemHandler = () => {
    // if (downMD) handlerDrawerOpen(false);

    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  return (
    <ListItemButton
      component={Link}
      to={item.url}
      target={itemTarget}
      disabled={item.disabled}
      sx={{
        borderRadius: 0,
        py: 1.5,
        px: 2,
        minHeight: "auto",
        alignItems: "center",
        backgroundColor: "transparent",
        borderBottom: "2px solid",
        borderColor: "transparent",
        color: isSelected ? "secondary.main" : "grey.600",
        "&:hover": {
          backgroundColor: "transparent",
          color: isSelected ? "secondary.main" : "grey.700",
        },
        "&.Mui-selected": {
          backgroundColor: "transparent",
          color: "secondary.main",
          borderColor: "secondary.main",
          "&:hover": {
            backgroundColor: "transparent",
            color: "secondary.dark",
            borderColor: "secondary.dark",
          },
        },
      }}
      selected={isSelected}
      onClick={() => itemHandler()}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography
            component="span"
            variant="body1"
            sx={{
              fontWeight: 500,
              color: "inherit",
            }}
          >
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.any,
  level: PropTypes.number,
  isParents: PropTypes.bool,
  setSelectedID: PropTypes.func,
};
