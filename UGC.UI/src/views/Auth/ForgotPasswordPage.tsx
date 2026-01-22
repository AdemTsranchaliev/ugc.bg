import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

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
  display: "flex",
  flexDirection: "column",
};

export default function ForgotPasswordPage() {
  const steps = useMemo(() => ["Имейл", "Потвърждение", "Нова парола"], []);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <Box
      sx={{
        ...pageContainerStyles,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.action.hover} 100%)`,
      }}
    >
      <Box width="100%" maxWidth={560}>
        <MainCard border boxShadow sx={cardStyles}>
          <Stack spacing={3}>
            <Stack spacing={0.6} alignItems="center" textAlign="center">
              <Typography variant="h3">Забравена парола</Typography>
              <Typography color="text.secondary">
                Ще ти помогнем да възстановиш достъпа до профила си.
              </Typography>
            </Stack>

            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Stack spacing={2}>
                <TextField label="Имейл адрес" placeholder="you@example.com" fullWidth />
                <Alert severity="info">
                  Ще изпратим код за потвърждение на този имейл адрес.
                </Alert>
                <Button variant="contained" size="large" fullWidth onClick={handleNext}>
                  Изпрати код
                </Button>
                <Divider />
                <Link href="/auth" underline="hover" color="text.secondary" textAlign="center">
                  Назад към вход
                </Link>
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={2}>
                <TextField label="Код за потвърждение" placeholder="123456" fullWidth />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button variant="outlined" fullWidth onClick={handleBack}>
                    Назад
                  </Button>
                  <Button variant="contained" fullWidth onClick={handleNext}>
                    Потвърди код
                  </Button>
                </Stack>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Не получи кода?{" "}
                  <Link href="#" underline="hover">
                    Изпрати отново
                  </Link>
                </Typography>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={2}>
                <TextField label="Нова парола" type="password" placeholder="Създай парола" fullWidth />
                <TextField label="Потвърди новата парола" type="password" placeholder="Повтори паролата" fullWidth />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button variant="outlined" fullWidth onClick={handleBack}>
                    Назад
                  </Button>
                  <Button variant="contained" fullWidth onClick={handleNext}>
                    Смени паролата
                  </Button>
                </Stack>
              </Stack>
            )}

            {activeStep === 3 && (
              <Stack spacing={2}>
                <Alert severity="success">Паролата е сменена успешно.</Alert>
                <Button variant="contained" size="large" fullWidth href="/auth">
                  Продължи към вход
                </Button>
              </Stack>
            )}
          </Stack>
        </MainCard>
      </Box>
    </Box>
  );
}
