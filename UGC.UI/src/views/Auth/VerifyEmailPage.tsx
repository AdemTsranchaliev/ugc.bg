import { Box, Button, Stack, Typography } from "@mui/material";

// project imports
import MainCard from "../../ui-component/cards/MainCard";

const pageContainerStyles = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  py: { xs: 4, md: 6 },
};

const cardStyles = {
  borderRadius: 3,
  px: { xs: 2.5, md: 4 },
  py: { xs: 3, md: 4 },
  maxWidth: 520,
  width: "100%",
};

export default function VerifyEmailPage() {
  return (
    <Box sx={pageContainerStyles}>
      <MainCard border boxShadow sx={cardStyles}>
        <Stack spacing={2.5} textAlign="center">
          <Typography variant="h3">Провери имейла си</Typography>
          <Typography color="text.secondary">
            Изпратихме ти имейл с линк за потвърждение.
          </Typography>
          <Button variant="contained" size="large">
            Изпрати отново
          </Button>
        </Stack>
      </MainCard>
    </Box>
  );
}
