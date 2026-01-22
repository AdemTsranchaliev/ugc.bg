import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Apple, Facebook, Google } from "@mui/icons-material";

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
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const tabButtonStyles = {
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 600,
  py: 1.1,
};

const profileToggleStyles = {
  "& .MuiToggleButton-root": {
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    py: 1.1,
  },
};

const socialButtonStyles = {
  google: {
    backgroundColor: "#EA4335",
    "&:hover": { backgroundColor: "#D53B30" },
  },
  facebook: {
    backgroundColor: "#1877F2",
    "&:hover": { backgroundColor: "#0F6AE8" },
  },
  apple: {
    backgroundColor: "#111111",
    "&:hover": { backgroundColor: "#000000" },
  },
};

export default function AuthPage() {
  const [tabValue, setTabValue] = useState(0);
  const [profileType, setProfileType] = useState<"creator" | "buyer" | "business">("creator");
  const socialProviders = useMemo(
    () => [
      { key: "google", label: "Продължи с Google", icon: <Google /> },
      { key: "facebook", label: "Продължи с Facebook", icon: <Facebook /> },
      { key: "apple", label: "Продължи с Apple", icon: <Apple /> },
    ],
    []
  );
  const profileOptions = useMemo(
    () => [
      { value: "creator", label: "Създател", description: "Създавам съдържание и търся брандове." },
      { value: "buyer", label: "Търси създатели", description: "Търся UGC създатели за кампании." },
      { value: "business", label: "Компания", description: "Работя за бранд или агенция." },
    ],
    []
  );

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
            <Stack spacing={1} alignItems="center" textAlign="center">
              <Typography variant="h3">Достъп до профила</Typography>
              <Typography color="text.secondary">
                Избери таб, за да влезеш или да създадеш нов профил.
              </Typography>
            </Stack>

            <Tabs
              value={tabValue}
              onChange={(_, value) => setTabValue(value)}
              variant="fullWidth"
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                p: 0.5,
                "& .MuiTab-root": {
                  ...tabButtonStyles,
                },
              }}
            >
              <Tab label="Вход" />
              <Tab label="Регистрация" />
            </Tabs>

            {tabValue === 0 && (
              <Stack spacing={2.5}>
                <Stack spacing={1.5}>
                  {socialProviders.map((provider) => (
                    <Button
                      key={provider.key}
                      variant="contained"
                      startIcon={provider.icon}
                      fullWidth
                      sx={socialButtonStyles[provider.key as keyof typeof socialButtonStyles]}
                    >
                      {provider.label}
                    </Button>
                  ))}
                </Stack>

                <Divider>или</Divider>

                <Stack spacing={2}>
                  <TextField label="Имейл адрес" placeholder="you@example.com" fullWidth />
                  <TextField label="Парола" type="password" placeholder="••••••••" fullWidth />
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                    <FormControlLabel control={<Checkbox />} label="Запомни ме" />
                    <Link href="#" underline="hover" color="text.secondary">
                      Забравена парола?
                    </Link>
                  </Stack>
                  <Button variant="contained" size="large" fullWidth>
                    Вход
                  </Button>
                </Stack>
              </Stack>
            )}

            {tabValue === 1 && (
              <Stack spacing={2.5}>
                <Stack spacing={1.5}>
                  {socialProviders.map((provider) => (
                    <Button
                      key={provider.key}
                      variant="contained"
                      startIcon={provider.icon}
                      fullWidth
                      sx={socialButtonStyles[provider.key as keyof typeof socialButtonStyles]}
                    >
                      {provider.label}
                    </Button>
                  ))}
                </Stack>

                <Divider>или</Divider>

                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Stack spacing={0.4}>
                      <Typography variant="subtitle1">Тип профил</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Избери най-подходящия тип за твоята роля.
                      </Typography>
                    </Stack>
                    <ToggleButtonGroup
                      exclusive
                      value={profileType}
                      onChange={(_, value) => value && setProfileType(value)}
                      fullWidth
                      sx={profileToggleStyles}
                    >
                      <ToggleButton value="creator">Създател</ToggleButton>
                      <ToggleButton value="buyer">Търси създатели</ToggleButton>
                      <ToggleButton value="business">Компания</ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>

                  <Divider>или</Divider>

                  <Stack spacing={1}>
                    <Typography variant="subtitle1">Тип профил (карти)</Typography>
                    <Stack spacing={1}>
                      {profileOptions.map((option) => {
                        const isSelected = profileType === option.value;
                        return (
                          <Button
                            key={option.value}
                            onClick={() => setProfileType(option.value)}
                            variant={isSelected ? "contained" : "outlined"}
                            sx={{
                              justifyContent: "space-between",
                              textTransform: "none",
                              borderRadius: 2,
                              px: 2,
                              py: 1.5,
                              bgcolor: isSelected ? "primary.main" : "transparent",
                              color: isSelected ? "primary.contrastText" : "text.primary",
                              borderColor: isSelected ? "primary.main" : "divider",
                              boxShadow: isSelected ? "0 12px 24px -16px rgba(24, 119, 242, 0.65)" : "none",
                              "&:hover": {
                                bgcolor: isSelected ? "primary.dark" : "action.hover",
                              },
                            }}
                          >
                            <Stack alignItems="flex-start" spacing={0.3}>
                              <Typography fontWeight={700}>{option.label}</Typography>
                              <Typography variant="body2" color={isSelected ? "inherit" : "text.secondary"}>
                                {option.description}
                              </Typography>
                            </Stack>
                          </Button>
                        );
                      })}
                    </Stack>
                  </Stack>
                  <TextField label="Пълно име" placeholder="Иван Иванов" fullWidth />
                  <TextField label="Имейл адрес" placeholder="you@example.com" fullWidth />
                  <TextField label="Парола" type="password" placeholder="Създай парола" fullWidth />
                  <TextField label="Потвърди парола" type="password" placeholder="Повтори паролата" fullWidth />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Съгласявам се с Общите условия и Политиката за поверителност"
                  />
                  <Button variant="contained" size="large" fullWidth>
                    Създай акаунт
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        </MainCard>
      </Box>
    </Box>
  );
}
