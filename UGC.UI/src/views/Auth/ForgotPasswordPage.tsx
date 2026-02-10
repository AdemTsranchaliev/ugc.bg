import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  Alert,
  Box,
  Button,
  Divider,
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
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
};

const CODE_LENGTH = 6;

export default function ForgotPasswordPage() {
  const steps = useMemo(() => ["Имейл", "Потвърждение", "Нова парола"], []);
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState<string[]>(() => Array(CODE_LENGTH).fill(""));
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, CODE_LENGTH).split("");
      const newCode = [...code];
      digits.forEach((d, i) => {
        if (index + i < CODE_LENGTH) newCode[index + i] = d;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + digits.length, CODE_LENGTH - 1);
      codeInputRefs.current[nextIndex]?.focus();
      return;
    }
    const digit = value.replace(/\D/g, "");
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (digit && index < CODE_LENGTH - 1) codeInputRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Box
      sx={{
        ...pageContainerStyles,
      }}
    >
      <Box width="100%" maxWidth={560}>
        <MainCard
          // border
          boxShadow
          shadow
          sx={cardStyles}
        >
          <Stack spacing={3}>
            <Stack spacing={0.6} alignItems="center" textAlign="center">
              <Typography variant="h3">Забравена парола?</Typography>
              <Typography color="text.secondary">
                Ще ти помогнем да възстановиш достъпа до профила си.
              </Typography>
            </Stack>

            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                "& .MuiStepIcon-root": {
                  color: "grey.300",
                  "&.Mui-active": { color: "#1a237e" },
                  "&.Mui-completed": { color: "#1a237e" },
                },
                "& .MuiStepConnector-line": {
                  borderColor: "grey.300",
                },
                "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                  borderColor: "#1a237e",
                },
                "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                  borderColor: "#1a237e",
                },
                "& .MuiStepLabel-label.Mui-active": {
                  color: "#1a237e",
                  fontWeight: 600,
                },
                "& .MuiStepLabel-label.Mui-completed": {
                  color: "#1a237e",
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Stack spacing={2}>
                <TextField label="Имейл за потвърждение" placeholder="ivan.ivanov@gmail.com" fullWidth />
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleNext}
                  sx={{
                    bgcolor: "#261846",
                    "&:hover": { bgcolor: "grey.800" },
                  }}
                >
                  Изпрати код
                </Button>
                <Divider />
                <Link to="/auth" color="text.secondary">
                  Назад към вход
                </Link>
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Поставете кода в полето
                </Typography>
                <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ gap: 1 }}>
                  {Array.from({ length: CODE_LENGTH }, (_, index) => (
                    <TextField
                      key={index}
                      inputRef={(el) => { codeInputRefs.current[index] = el; }}
                      value={code[index]}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      inputProps={{
                        maxLength: 6,
                        inputMode: "numeric",
                        "aria-label": `Цифра ${index + 1} от ${CODE_LENGTH}`,
                      }}
                      variant="standard"
                      sx={{
                        width: 48,
                        "& .MuiInput-root": {
                          fontSize: "1.5rem",
                          textAlign: "center",
                          "&::before": { borderBottomColor: "grey.300" },
                          "&:hover:not(.Mui-disabled)::before": { borderBottomColor: "grey.500" },
                          "&::after": { borderBottomColor: "#1a237e" },
                        },
                        "& .MuiInput-input": { py: 1.5, textAlign: "center" },
                      }}
                    />
                  ))}
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleBack}
                  >
                    Назад
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleNext}
                    sx={{
                      bgcolor: "#261846",
                      "&:hover": { bgcolor: "grey.800" },
                    }}
                  >
                    Потвърди кода
                  </Button>
                </Stack>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Не получи кода?{" "}
                  <Link to="#">
                    Изпрати отново
                  </Link>
                </Typography>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={2}>
                <TextField label="Нова парола" type="password" placeholder="********" fullWidth />
                <TextField label="Потвърди новата парола" type="password" placeholder="********" fullWidth />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button variant="outlined" fullWidth onClick={handleBack}>
                    Назад
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleNext}
                    sx={{
                      bgcolor: "#261846",
                      "&:hover": { bgcolor: "grey.800" },
                    }}
                  >
                    Смени паролата
                  </Button>
                </Stack>
              </Stack>
            )}

            {activeStep === 3 && (
              <Stack spacing={2}>
                <Alert severity="success">Паролата е сменена успешно.</Alert>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  component={Link}
                  to="/auth"
                  sx={{
                    bgcolor: "#261846",
                    "&:hover": { bgcolor: "grey.800" },
                  }}
                >
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
