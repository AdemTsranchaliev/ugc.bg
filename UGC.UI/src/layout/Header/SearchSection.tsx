import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

// third party
// import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
// import Transitions from "../../ui-component/extended/Transitions";

// assets
import {
  IconAdjustmentsHorizontal,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

function HeaderAvatar({ children, ref, ...others }) {
  const theme = useTheme();

  return (
    <Avatar
      ref={ref}
      variant="rounded"
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        color: theme.vars.palette.secondary.dark,
        background: theme.vars.palette.secondary.light,
        "&:hover": {
          color: theme.vars.palette.secondary.light,
          background: theme.vars.palette.secondary.dark,
        },

        ...theme.applyStyles("dark", {
          color: theme.vars.palette.secondary.main,
          background: theme.vars.palette.dark.main,
          "&:hover": {
            color: theme.vars.palette.secondary.light,
            background: theme.vars.palette.secondary.main,
          },
        }),
      }}
      {...others}
    >
      {children}
    </Avatar>
  );
}

// ==============================|| SEARCH INPUT - MOBILE||============================== //

function MobileSearch({ value, setValue }) {
  const theme = useTheme();

  return (
    <OutlinedInput
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="16px" />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <HeaderAvatar ref={undefined}>
            <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
          </HeaderAvatar>
          <Box sx={{ ml: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                bgcolor: "orange.light",
                color: "orange.dark",
                "&:hover": { bgcolor: "orange.dark", color: "orange.light" },

                ...theme.applyStyles("dark", {
                  bgcolor: theme.vars.palette.dark.main,
                }),
              }}
            >
              <IconX stroke={1.5} size="20px" />
            </Avatar>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      slotProps={{
        input: {
          "aria-label": "weight",
          sx: { bgcolor: "transparent", pl: 0.5 },
        },
      }}
      sx={{ width: "100%", ml: 0.5, px: 2, bgcolor: "background.paper" }}
    />
  );
}

// ==============================|| SEARCH INPUT ||============================== //

export default function SearchSection() {
  const [value, setValue] = useState("");

  return (
    <>
      <Box>
        <OutlinedInput
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Търси по роля, умения, ключови думи"
          endAdornment={
            <InputAdornment position="end">
              <HeaderAvatar ref={undefined}>
                <IconSearch stroke={1.5} size="20px" />
              </HeaderAvatar>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          slotProps={{
            input: {
              "aria-label": "weight",
              sx: { bgcolor: "transparent", pl: 0.5 },
            },
          }}
          sx={{
            width: "100%",
            px: 2,
            minHeight: 56,
            py: 1,
            borderRadius: 4,
            '& fieldset': {
              borderRadius: 4,
            },
            '&:hover fieldset': {
              borderRadius: 4,
            },
            '&.Mui-focused fieldset': {
              borderRadius: 4,
            }
          }}
        />
      </Box>
    </>
  );
}

HeaderAvatar.propTypes = {
  children: PropTypes.node,
  ref: PropTypes.any,
  others: PropTypes.any,
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};
