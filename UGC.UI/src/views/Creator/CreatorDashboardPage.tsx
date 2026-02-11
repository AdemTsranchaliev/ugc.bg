import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  Add,
  Bolt,
  Campaign,
  ChatBubbleOutline,
  Edit,
  MoreVert,
  RocketLaunch,
  AutoFixHigh,
  Star
} from "@mui/icons-material";

// project imports
import MainCard from "../../ui-component/cards/MainCard";
import { getImageUrl } from "../../utils/getImageUrl";
import StyledPage from "../../ui-component/StyledPage";

const headerGradient = "linear-gradient(135deg, #6a44bf 0%, #56299b 100%)";

const statCardIconSx = (color: string) => (theme: any) => {
  const resolved =
    color === "primary.main"
      ? theme.palette.primary.main
      : color;
  return {
    width: 48,
    height: 48,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: alpha(resolved, 0.25),
    color: resolved,
    "& svg": { fontSize: 28 },
  };
};

export const CreatorDashboardPage = () => {
  const avatarImage = getImageUrl("user-round.svg", "users");
  const recentMessages = [
    { name: "Nova Beauty", text: "Можеш ли да изпратиш пример?", time: "10:30" },
    { name: "FitPro", text: "Искаме оферта за 3 видеа.", time: "Вчера" },
    { name: "Urban Tech", text: "Кога е най-ранната дата?", time: "2 дни" },
  ];
  const recentReviews = [
    {
      name: "Maria",
      rating: "5",
      comment: "Страхотна комуникация и бързо изпълнение.",
    },
    {
      name: "Nikolay",
      rating: "4.8",
      comment: "Много качествени видеа, точно както ги искахме.",
    },
  ];
  const listings = [
    {
      title: "Cosmic Dreams AI Generated Art",
      views: "1.2к преглеждания",
      price: "€50",
      type: "Image",
      thumb: getImageUrl("customization-left.png", "landing"),
    },
    {
      title: "Nature's Whisper Video Pack",
      views: "856 преглеждания",
      price: "€35",
      type: "Video",
      thumb: getImageUrl("customization-left.png", "landing"),
    },
  ];

  return (
    <StyledPage>
      {/* Header banner - deep purple gradient */}
      <Box
        sx={{
          borderRadius: 6,
          background: headerGradient,
          p: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.5}
          alignItems={{ md: "center" }}
          justifyContent="space-between"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Stack spacing={1.2}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip
                icon={<AutoFixHigh />}
                label="AI Creator"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  border: 1,
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontWeight: 600,
                  "& .MuiChip-icon": { color: "yellow" },
                }}
                size="small"
              />
              <Chip
                icon={<Bolt />}
                label="Бърз отговор"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  border: 1,
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontWeight: 600,
                  "& .MuiChip-icon": { color: "#464976" },
                }}
                size="small"
              />
            </Stack>
            <Typography variant="h1" sx={{ color: "#fff", fontWeight: 700 }}>
              Табло за управление
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
              Следете обявите, бустовете и активните разговори на едно място.
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              sx={{
                bgcolor: "transparent",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Редакция на профила
            </Button>
            <Button
              variant="outlined"
              startIcon={<Add />}
              sx={{
                bgcolor: "#fff",
                color: "#582c9e",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              Нова Обява
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* 4 stat cards */}
      <Grid container spacing={2} sx={{ my: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MainCard border boxShadow contentSX={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={statCardIconSx("primary.main")}><Campaign /></Box>
              <Stack>
                <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Активни Обяви
                </Typography>
                <Typography variant="h2" fontWeight={700}>
                  12
                </Typography>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MainCard border boxShadow contentSX={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={statCardIconSx("primary.main")}><RocketLaunch /></Box>
              <Stack>
                <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Активни Boosts
                </Typography>
                <Typography variant="h2" fontWeight={700}>
                  3
                </Typography>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MainCard border boxShadow contentSX={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={statCardIconSx("#EC4899")}>
                <ChatBubbleOutline />
              </Box>
              <Stack>
                <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Нови съобщения
                </Typography>
                <Typography variant="h2" fontWeight={700}>
                  2
                </Typography>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MainCard border boxShadow contentSX={{ p: 2.5 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={statCardIconSx("#F59E0B")}>
                <Star />
              </Box>
              <Stack>
                <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Среден рейтинг
                </Typography>
                <Typography variant="h2" fontWeight={700}>
                  4.9
                </Typography>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>

      {/* Two columns: Quick actions + Listings | Messages + Reviews */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* Quick actions - 3 horizontal cards */}
            <Box sx={{ backgroundColor: "#f9fafb", p: 2.5, borderRadius: 4 }}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                Бързи действия
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <MainCard
                    border
                    boxShadow
                    sx={{
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                    contentSX={{
                      p: 2.5,
                      background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
                      color: "#fff",
                      position: "relative",
                      overflow: "hidden",
                      minHeight: 120,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        right: "-10%",
                        top: "35%",
                        opacity: 0.2,
                        "& svg": { fontSize: 120 },
                        transform: "rotate(-20deg)",
                      }}
                    >
                      <Campaign />
                    </Box>
                    <Stack direction="column" spacing={1.5} position="relative">
                      <Button
                        sx={{
                          minWidth: 48,
                          minHeight: 48,
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "rgba(255,255,255,0.25)",
                          color: "#fff",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.35)",
                          },
                        }}
                      >
                        <Add sx={{ fontSize: 28 }} />
                      </Button>
                      <Box>
                        <Typography variant="body2" sx={{ color: "white", opacity: 0.95 }}>
                          Създай нова
                        </Typography>
                        <Typography variant="h4" fontWeight={700} sx={{ color: "white" }}>
                          Обява
                        </Typography>
                      </Box>
                    </Stack>
                  </MainCard>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <MainCard
                    boxShadow
                    shadow
                    sx={{
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                    contentSX={{
                      backgroundColor: "#e9ecef",
                      borderRadius: 2,
                      border: "1px solid #f3f4f6",
                      p: 2.5,
                      minHeight: 120,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#d0d2d4",
                        transition: "all 0.3s ease-in-out",
                      }
                    }}
                  >
                    <Stack direction="column" spacing={1.5}>
                      <Button
                        sx={{
                          minWidth: 48,
                          minHeight: 48,
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#fff",
                          color: "#000",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <Edit sx={{ fontSize: 26 }} />
                      </Button>
                      <Box>
                        <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.95 }}>
                          Актуализирай
                        </Typography>
                        <Typography variant="h4" fontWeight={700} sx={{ color: "black" }}>
                          Профил
                        </Typography>
                      </Box>
                    </Stack>
                  </MainCard>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <MainCard
                    boxShadow
                    shadow
                    sx={{
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                    contentSX={{
                      backgroundColor: "#fcfaff",
                      p: 2.5,
                      minHeight: 120,
                      borderRadius: 2,
                      border: "2px dashed #bf82f9",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        borderColor: "#7e23ce",
                        backgroundColor: "#f3e8ff",
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                  >
                    <Stack direction="column" spacing={1.5}>
                      <Button
                        sx={{
                          minWidth: 48,
                          minHeight: 48,
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "#faf5ff",
                          "&:hover": {
                            bgcolor: "#f3e8ff",
                          },
                        }}
                      >
                        <Bolt sx={{ fontSize: 26 }} />
                      </Button>
                      <Box>
                        <Typography variant="body2" sx={{ color: "#bf82f9", opacity: 0.95 }}>
                          Промотирай
                        </Typography>
                        <Typography variant="h4" fontWeight={700} sx={{ color: "#7e23ce" }}>
                          Добави Boost
                        </Typography>
                      </Box>
                    </Stack>
                  </MainCard>
                </Grid>
              </Grid>
            </Box>

            {/* Activity on listings */}
            <Box sx={{ backgroundColor: "#f9fafb", p: 2.5, borderRadius: 4 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h4" fontWeight={700}>
                  Активност на обявите
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  variant="body2"
                  color="primary.main"
                  sx={{ textDecoration: "none", fontWeight: 500 }}
                >
                  Виж всички
                </Typography>
              </Stack>
              <Stack spacing={1.5}>
                {listings.map((item) => (
                  <Stack
                    key={item.title}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      backgroundColor: "#fff",
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        bgcolor: "grey.200",
                        backgroundImage: `url(${item.thumb})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        flexShrink: 0,
                      }}
                    />
                    <Stack flex={1} minWidth={0}>
                      <Typography variant="subtitle1" fontWeight={600} noWrap>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.views} • <Box component="span" sx={{ color: "#7e23ce", fontWeight: 700 }}>{item.price}</Box>
                      </Typography>
                    </Stack>
                    <Chip
                      label="Активна"
                      size="small"
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Recent messages */}
            <Box sx={{ backgroundColor: "#f9fafb", p: 2.5, borderRadius: 4 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h4" fontWeight={700}>
                  Последни съобщения
                </Typography>
                <Chip
                  size="small"
                  label={
                    <Typography variant="body2" color="#2865eb" fontWeight={600}>
                      2 нови
                    </Typography>
                  }
                />
              </Stack>
              <Stack spacing={0}>
                {recentMessages.map((msg, index) => (
                  <Stack
                    key={msg.name}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{
                      py: 1.5,
                      borderBottom:
                        index < recentMessages.length - 1
                          ? "1px solid"
                          : "none",
                      borderColor: "divider",
                    }}
                  >
                    {index !== 0 ? (
                      <Badge variant="dot" sx={{ "& .MuiBadge-badge": { bgcolor: "#3b82f6" } }}>
                        <Avatar
                          src={avatarImage}
                          sx={{ width: 44, height: 44 }}
                        />
                      </Badge>
                    ) : (
                      <Avatar
                        src={avatarImage}
                        sx={{ width: 44, height: 44 }}
                      />
                    )}
                    <Stack flex={1} minWidth={0}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {msg.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{
                          color: index != 0 && "#000",
                          fontWeight: index != 0 && 600,
                        }}
                      >
                        {msg.text}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {msg.time}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 1.5,
                  bgcolor: "#e9ecef",
                  color: "#000",
                  boxShadow: "none",
                  borderRadius: 4,
                  "&:hover": {
                    bgcolor: "#d0d2d4",
                    boxShadow: "none",
                  },
                }}
              >
                Виж всички съобщения
              </Button>
            </Box>

            {/* Recent reviews */}
            <Box sx={{ backgroundColor: "#f9fafb", p: 2.5, borderRadius: 4 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h4" fontWeight={700}>
                  Последни ревюта
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Chip
                    size="small"
                    color="warning"
                    icon={<Star sx={{ color: "#F59E0B", fontSize: 16 }} />}
                    label={
                      <Typography variant="body2" fontWeight={600} sx={{ color: "#b75a13" }}>4.9 средно</Typography>
                    }
                  />
                </Stack>
              </Stack>
              <Stack spacing={2}>
                {recentReviews.map((review) => (
                  <Stack key={review.name} flex={1} minWidth={0} sx={{ backgroundColor: "#fff", p: 1.5, borderRadius: 2 }}>
                    <Stack direction="row" alignItems="center" sx={{ mb: 0.25 }}>
                      <Avatar src={avatarImage} sx={{ width: 25, height: 25 }} />
                      <Typography variant="subtitle1" fontWeight={600} sx={{ ml: 1 }}>
                        {review.name}
                      </Typography>

                      <Box sx={{ flexGrow: 1 }} />
                      <Star sx={{ color: "#F59E0B", fontSize: 16 }} />
                      <Typography variant="body2">{review.rating}</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                      "{review.comment}"
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </StyledPage>
  );
};

export default CreatorDashboardPage;
