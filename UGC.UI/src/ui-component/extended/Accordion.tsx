import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";

// assets
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ==============================|| ACCORDION ||============================== //

type AccordionProps = {
  data: {
    id: string | number;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
    defaultExpand?: boolean;
    expanded?: boolean;
  }[];
  defaultExpandedId?: string | number | null;
  expandIcon?: React.ReactNode | false;
  square?: boolean;
  toggle?: boolean;
};

type ExpandedState = string | number | null | (string | number)[];

function getInitialExpanded(
  toggle: boolean | undefined,
  defaultExpandedId: string | number | null | undefined,
  data: AccordionProps["data"]
): ExpandedState {
  if (toggle) return defaultExpandedId ?? null;
  return (data?.filter((item) => !item.disabled && item.defaultExpand).map((item) => item.id) ?? []) as (string | number)[];
}

export default function Accordion({
  data,
  defaultExpandedId = null,
  expandIcon,
  square,
  toggle,
}: AccordionProps) {
  const [expanded, setExpanded] = useState<ExpandedState>(() =>
    getInitialExpanded(toggle, defaultExpandedId, data)
  );

  const handleChange = (panel: string | number) => (_: React.SyntheticEvent, newExpanded: boolean) => {
    if (toggle) {
      setExpanded(newExpanded ? panel : null);
    } else {
      setExpanded((prev) => {
        const ids = Array.isArray(prev) ? prev : [];
        return newExpanded ? [...ids, panel] : ids.filter((id) => id !== panel);
      });
    }
  };

  useEffect(() => {
    if (toggle) setExpanded(defaultExpandedId ?? null);
  }, [defaultExpandedId, toggle]);

  return (
    <Box sx={{ width: "100%" }}>
      {data &&
        data.map((item) => {
          const isExpanded = toggle
            ? expanded === item.id
            : Array.isArray(expanded) && expanded.includes(item.id);
          return (
            <MuiAccordion
              key={item.id}
              elevation={0}
              defaultExpanded={!item.disabled && item.defaultExpand}
              expanded={!item.disabled && isExpanded}
              disabled={item.disabled}
              square={square}
              onChange={handleChange(item.id)}
            >
              <MuiAccordionSummary
                expandIcon={
                  expandIcon || expandIcon === false ? (
                    expandIcon
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
                sx={{ fontWeight: 600 }}
              >
                {item.title}
              </MuiAccordionSummary>
              <MuiAccordionDetails>{item.content}</MuiAccordionDetails>
            </MuiAccordion>
          );
        })}
    </Box>
  );
}

Accordion.propTypes = {
  data: PropTypes.array,
  defaultExpandedId: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.string,
    PropTypes.bool,
  ]),
  expandIcon: PropTypes.node,
  square: PropTypes.bool,
  toggle: PropTypes.bool,
};
