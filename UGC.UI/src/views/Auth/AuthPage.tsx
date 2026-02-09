import { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  IconBrandGoogleFilled,
  IconBrandFacebookFilled,
  IconBrandAppleFilled,
  IconRosetteDiscountCheck,
} from '@tabler/icons-react';
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

import StyledPage from "../../ui-component/StyledPage";

type ProfileType = "client" | "creator";

export default function AuthPage() {
  const [tabValue, setTabValue] = useState(0);
  const [profileType, setProfileType] = useState<ProfileType>("creator");

  const socialProviders = useMemo(
    () => [
      { key: "google", icon: <IconBrandGoogleFilled stroke={1} size={20} /> },
      { key: "facebook", icon: <IconBrandFacebookFilled stroke={1} size={20} /> },
      { key: "apple", icon: <IconBrandAppleFilled stroke={1} size={20} /> },
    ],
    []
  );

  return (
    <StyledPage>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          boxSizing: "border-box",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          borderBottomLeftRadius: 24,
          borderTopLeftRadius: 24,
        }}
      >
        {/* Left panel - promotional */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderBottomLeftRadius: 24,
            borderTopLeftRadius: 24,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            display: { xs: "none", md: "flex" },
            flex: { xs: "0 0 auto", md: "1 1 40%" },
            flexDirection: "column",
            justifyContent: "end",
            gap: 2,
            p: 3,
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url("/assets/images/general/abstract-1.png")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              pointerEvents: "none",
            },
            "&:after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <FormatQuoteRoundedIcon
              sx={{
                fontSize: 56,
                color: "rgba(255,255,255,0.9)",
                mb: 1,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.3,
                mb: 2,
                textWrap: "pretty",
                fontSize: "2rem",
              }}
            >
              Открийте безграничните възможности на изкуствения интелект.
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: "1rem",
                lineHeight: 1.6,
                textWrap: "pretty",
              }}
            >
              Присъединете се към нашата общност от творци и иноватори. Създавайте,
              споделяйте и се вдъхновявайте всеки ден.
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ position: "relative", zIndex: 1 }}>
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
              alt="Avatar"
              sx={{
                width: 36,
                height: 36,
                bgcolor: "rgba(255,255,255,0.25)",
                color: "#fff",
                fontWeight: 600,
              }}
            />
            <Box>
              <Typography sx={{ color: "#fff", fontWeight: 600 }}>Елен Петров</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem" }}>
                Digital Artist
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Right panel - form */}
        <Box
          sx={{
            flex: { xs: "1 1 auto", md: "1 1 50%" },
            width: { xs: "100%", md: "auto" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f9fafb",
            py: { xs: 4, md: 6 },
            px: { xs: 2, sm: 4 },
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            borderBottomLeftRadius: { xs: 24, md: 0 },
            borderTopLeftRadius: { xs: 24, md: 0 },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h3">
                Добре дошли в UGC.BG
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Влезте в профила си или създайте нов.
              </Typography>
            </Stack>

            <Tabs
              value={tabValue}
              onChange={(_, value) => setTabValue(value)}
              variant="fullWidth"
              sx={{
                mb: 2.5,
                minHeight: 48,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                  backgroundColor: "secondary.main",
                },
                "& .Mui-selected": {
                  color: "text.primary",
                },
              }}
            >
              <Tab label="Вход" />
              <Tab label="Регистрация" />
            </Tabs>

            <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
              {socialProviders.map((provider) => (
                <Button
                  key={provider.key}
                  variant="outlined"
                  fullWidth
                  startIcon={provider.icon}
                  sx={{
                    py: 1,
                    borderColor: "grey.300",
                    bgcolor: "#fff",
                    color: "text.primary",
                    textTransform: "none",
                    fontWeight: 500,
                    transition: "border-color 0.2s ease, background-color 0.2s ease",
                    "& .MuiButton-startIcon": {
                      transition: "color 0.2s ease",
                    },
                    "&:hover": {
                      borderColor: "grey.400",
                      bgcolor: "grey.50",
                      ...(provider.key === "google" && {
                        "& .MuiButton-startIcon": { color: "orange.dark" },
                      }),
                      ...(provider.key === "facebook" && {
                        "& .MuiButton-startIcon": { color: "primary.main" },
                      }),
                      ...(provider.key === "apple" && {
                        "& .MuiButton-startIcon": { color: "common.black" },
                      }),
                    },
                  }}
                >
                  {String(provider.key).charAt(0).toUpperCase() + String(provider.key).slice(1)}
                </Button>
              ))}
            </Stack>

            <Divider sx={{ my: 2.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                ИЛИ ЧРЕЗ ИМЕЙЛ
              </Typography>
            </Divider>

            {tabValue === 0 && (
              <Stack spacing={2}>
                <TextField
                  label="Имейл адрес"
                  placeholder="ivan.ivanov@gmail.com"
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                    },
                  }}
                />
                <TextField
                  label="Парола"
                  type="password"
                  placeholder="••••••••"
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                    },
                  }}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box />
                  <Link href="/forgot-password" underline="hover" color="secondary.main" fontWeight={500}>
                    Забравена парола?
                  </Link>
                </Stack>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    // bgcolor: "grey.900",
                    bgcolor: "#261846",
                    "&:hover": { bgcolor: "grey.800" },
                    // background: (theme) =>
                    //   `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                    // "&:hover": {
                    //   background: (theme) =>
                    //     `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                    // },
                  }}
                >
                  Вход
                </Button>
              </Stack>
            )}

            {tabValue === 1 && (
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.primary" fontWeight={600} sx={{ mb: 1 }}>
                    Тип профил
                  </Typography>
                  <ToggleButtonGroup
                    exclusive
                    value={profileType}
                    onChange={(_, value) => value != null && setProfileType(value)}
                    fullWidth
                    sx={{
                      display: "flex",
                      "& > *": { flex: 1, minWidth: 0 },
                      "& .MuiToggleButton-root": {
                        width: "100%",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 2,
                        py: 1,
                        mx: 1,
                        borderColor: "grey.300",
                        color: "text.secondary",
                        "&.Mui-selected": {
                          borderColor: "secondary.main",
                          color: "secondary.main",
                          bgcolor: "secondary.light",
                          "&:hover": {
                            bgcolor: "secondary.light",
                          },
                        },
                      },
                    }}
                  >
                    <Badge
                      badgeContent={
                        profileType === "client" ? (
                          <IconRosetteDiscountCheck stroke={2} size={20} color="blue" />
                        ) : 0
                      }
                      showZero={false}
                    >
                      <ToggleButton value="client">
                        Клиент
                      </ToggleButton>
                    </Badge>
                    <Badge
                      badgeContent={
                        profileType === "creator" ? (
                          <IconRosetteDiscountCheck stroke={2} size={20} color="blue" />
                        ) : 0
                      }
                      showZero={false}
                    >
                      <ToggleButton value="creator">
                        Създател
                      </ToggleButton>
                    </Badge>
                  </ToggleButtonGroup>
                </Box>

                <TextField
                  label="Пълно име"
                  placeholder="Иван Иванов"
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                    },
                  }}
                />
                <TextField
                  label="Имейл адрес"
                  placeholder="ivan.ivanov@gmail.com"
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                    },
                  }}
                />
                <TextField
                  label="Парола"
                  type="password"
                  placeholder="••••••••"
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                    },
                  }}
                />
                <TextField
                  label="Потвърди парола"
                  type="password"
                  placeholder="••••••••"
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#fff",
                    },
                  }}
                />

                <Typography component="label" sx={{ display: "flex", alignItems: "flex-start", gap: 1, cursor: "pointer" }}>
                  <Checkbox sx={{ mt: -0.5, p: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    Съгласявам се с{" "}
                    <Link href="/terms" color="secondary.main" underline="hover" fontWeight={500}>
                      Общите условия
                    </Link>{" "}
                    и{" "}
                    <Link href="/privacy" color="secondary.main" underline="hover" fontWeight={500}>
                      Политиката за поверителност
                    </Link>
                  </Typography>
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: "#261846",
                    "&:hover": { bgcolor: "grey.800" },
                  }}
                >
                  Регистрация
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </StyledPage>
  );
}
