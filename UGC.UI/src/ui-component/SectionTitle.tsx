import { Link } from "react-router";
import { Box, Stack, Typography, type SxProps } from "@mui/material";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import type { Theme } from "@emotion/react";

type SectionTitleProps = {
  title: string;
  highlightedTitle: string;
  highlightColor?: string;
  hasLink?: boolean;
  subtitle?: string;
  styles?: SxProps<Theme>;
};

export const SectionTitle = ({
  title,
  highlightedTitle,
  highlightColor = "#5b84fa",
  hasLink = false,
  subtitle = "",
  styles = {},
}: SectionTitleProps) => {
  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ ...styles }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 500,
            mb: 1,
          }}
        >
          {title}
          <Box component="span" sx={{ ml: 1, color: highlightColor }}>
            {highlightedTitle}
          </Box>
        </Typography>

        {hasLink && (
          <Stack
            direction="row"
            justifyContent={"space-evenly"}
            alignItems="center"
            component={Link}
            to="#"
            sx={{
              fontSize: 20,
              textDecoration: "none",
              color: "#000",
              "&:hover": {
                color: "#5b84fa",
              },
            }}
          >
            Виж още
            <IconArrowNarrowRight size={40} stroke={1} />
          </Stack>
        )}
      </Stack>

      {subtitle && subtitle.length > 0 && (
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            color: "rgba(47, 52, 58, 0.6)"
          }}
        >
          {subtitle}
        </Typography>
      )}
    </>
  );
};

export default SectionTitle;
