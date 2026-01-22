import { Avatar, Box, Button, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { Add, AutoAwesome, Edit, Message, RocketLaunch, Star } from "@mui/icons-material";

// project imports
import MainCard from "../../ui-component/cards/MainCard";
import { getImageUrl } from "../../utils/getImageUrl";

const pageContainerStyles = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 3,
  background: (theme: any) =>
    `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.action.hover} 100%)`,
  borderRadius: 3,
};

export default function CreatorDashboardPage() {
  const avatarImage = getImageUrl("user-round.svg", "users");
  const coverImage = getImageUrl("customization-left.png", "landing");
  const recentMessages = [
    { name: "Nova Beauty", text: "Можеш ли да изпратиш пример?", unread: true },
    { name: "FitPro", text: "Искаме оферта за 3 видеа.", unread: false },
    { name: "Urban Tech", text: "Кога е най-ранната дата?", unread: true },
  ];
  const recentReviews = [
    { name: "Maria", rating: "5.0", comment: "Страхотна комуникация и бързо изпълнение." },
    { name: "Nikolay", rating: "4.8", comment: "Много качествени видеа." },
  ];

  return (
    <Box sx={pageContainerStyles}>
      <MainCard
        border
        boxShadow
        contentSX={{
          p: 3,
          backgroundImage: `linear-gradient(120deg, rgba(24,119,242,0.2) 0%, rgba(107,70,193,0.2) 45%, rgba(0,0,0,0.1) 100%), url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
            borderRadius: 2,
          }}
        />
        <Stack direction={{ xs: "column", md: "row" }} spacing={2.5} alignItems={{ md: "center" }} position="relative">
          <Stack spacing={0.6} flex={1}>
            <Typography variant="h3">Creator Dashboard</Typography>
            <Typography color="text.secondary">
              Следи обявите, бустовете и активните разговори на едно място.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip icon={<AutoAwesome />} label="AI Creator" color="primary" size="small" />
              <Chip icon={<RocketLaunch />} label="Бърз отговор" variant="outlined" size="small" />
            </Stack>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button variant="contained" startIcon={<Add />}>
              Нова обява
            </Button>
            <Button variant="outlined" startIcon={<Edit />}>
              Редакция на профила
            </Button>
          </Stack>
        </Stack>
      </MainCard>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <MainCard border boxShadow>
              <Stack spacing={1.5}>
                <Typography variant="subtitle1">Активност</Typography>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        p: 2,
                        background: "linear-gradient(135deg, rgba(24,119,242,0.15) 0%, rgba(24,119,242,0) 100%)",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Stack spacing={0.4}>
                        <Typography variant="h3">12</Typography>
                        <Typography color="text.secondary">Обяви</Typography>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        p: 2,
                        background: "linear-gradient(135deg, rgba(130,71,229,0.15) 0%, rgba(130,71,229,0) 100%)",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Stack spacing={0.4}>
                        <Typography variant="h3">3</Typography>
                        <Typography color="text.secondary">Boosts</Typography>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>

            <MainCard border boxShadow>
              <Stack spacing={1.5}>
                <Typography variant="subtitle1">Бързи действия</Typography>
                <Grid container spacing={1.5}>
                  <Grid size={12}>
                    <Button variant="contained" fullWidth startIcon={<Add />}>
                      Създай обява
                    </Button>
                  </Grid>
                  <Grid size={12}>
                    <Button variant="outlined" fullWidth startIcon={<Edit />}>
                      Редакция на профила
                    </Button>
                  </Grid>
                  <Grid size={12}>
                    <Button variant="text" fullWidth startIcon={<AutoAwesome />}>
                      Добави Boost
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <MainCard border boxShadow>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AutoAwesome />
                  </Box>
                  <Stack spacing={0.3}>
                    <Typography variant="subtitle1">Брой обяви</Typography>
                    <Typography variant="h2">12</Typography>
                  </Stack>
                </Stack>
                <Divider flexItem orientation="vertical" sx={{ display: { xs: "none", md: "block" } }} />
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2,
                      bgcolor: "secondary.main",
                      color: "secondary.contrastText",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RocketLaunch />
                  </Box>
                  <Stack spacing={0.3}>
                    <Typography variant="subtitle1">Активни boosts</Typography>
                    <Typography variant="h2">3</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </MainCard>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <MainCard border boxShadow>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h4">Последни съобщения</Typography>
                      <Chip label="2 нови" color="primary" size="small" />
                    </Stack>
                    <Stack spacing={1.5}>
                      {recentMessages.map((message, index) => (
                        <Stack key={message.name} spacing={1}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar src={avatarImage} sx={{ width: 44, height: 44, borderRadius: 2 }} />
                            <Stack spacing={0.2} flex={1}>
                              <Typography variant="subtitle1">{message.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {message.text}
                              </Typography>
                            </Stack>
                            {message.unread && (
                              <Chip
                                icon={<Message fontSize="small" />}
                                label="Ново"
                                size="small"
                                color="primary"
                              />
                            )}
                          </Stack>
                          {index < recentMessages.length - 1 && <Divider />}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </MainCard>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <MainCard border boxShadow>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h4">Последни ревюта</Typography>
                      <Chip label="4.9 средно" size="small" />
                    </Stack>
                    <Stack spacing={1.5}>
                      {recentReviews.map((review, index) => (
                        <Stack key={review.name} spacing={1}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar src={avatarImage} sx={{ width: 44, height: 44, borderRadius: 2 }} />
                            <Stack spacing={0.3} flex={1}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="subtitle1">{review.name}</Typography>
                                <Star sx={{ color: "#FDB022", fontSize: 16 }} />
                                <Typography variant="body2">{review.rating}</Typography>
                              </Stack>
                              <Typography variant="body2" color="text.secondary">
                                {review.comment}
                              </Typography>
                            </Stack>
                          </Stack>
                          {index < recentReviews.length - 1 && <Divider />}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </MainCard>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
