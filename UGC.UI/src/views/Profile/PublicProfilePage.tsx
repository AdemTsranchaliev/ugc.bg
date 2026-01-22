import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  AutoAwesome,
  CalendarMonth,
  InfoOutlined,
  Place,
  RateReview,
  Star,
  Verified,
  VideoLibrary,
  ViewList,
  AccountCircle,
} from "@mui/icons-material";

// project imports
import MainCard from "../../ui-component/cards/MainCard";
import { getImageUrl } from "../../utils/getImageUrl";

const pageContainerStyles = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  py: { xs: 4, md: 6 },
};

const coverStyles = {
  height: { xs: 160, sm: 200, md: 260 },
  borderRadius: 3,
  position: "relative",
  overflow: "hidden",
};

const avatarStyles = {
  width: { xs: 80, sm: 100, md: 140 },
  height: { xs: 80, sm: 100, md: 140 },
  borderRadius: 4,
  border: "4px solid",
  borderColor: "background.paper",
  bgcolor: "primary.main",
  fontSize: 32,
  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.18)",
};

const tabStyles = {
  mt: 2.5,
  "& .MuiTabs-flexContainer": {
    border: "none",
  },
  "& .MuiTab-root": {
    minHeight: "auto",
    minWidth: 10,
    py: 1.5,
    px: 1,
    mr: 2.25,
    textTransform: "none",
    fontWeight: 600,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiTab-root.Mui-selected": {
    color: "primary.main",
  },
  "& .MuiTab-root > svg": {
    marginBottom: "4px !important",
    mr: 1.25,
  },
};

type ProfileType = "creator" | "business";

export default function PublicProfilePage() {
  const [activeTab, setActiveTab] = useState(0);
  const profileType: ProfileType = "creator";
  const isCreator = profileType === "creator";
  const reviewsTabIndex = isCreator ? 2 : 1;
  const aboutTabIndex = isCreator ? 3 : 2;

  const coverImage = getImageUrl("customization-right.png", "landing");
  const coverAltImage = getImageUrl("customization-left.png", "landing");
  const avatarImage = getImageUrl("user-round.svg", "users");
  const listingImages = [coverImage, coverAltImage, coverImage];

  const stats = useMemo(
    () => [
      { label: "Завършени проекти", value: "124" },
      { label: "Повторни клиенти", value: "38%" },
      { label: "Среден отговор", value: "2ч" },
    ],
    []
  );

  const tabs = useMemo(
    () => [
      { label: "Общ преглед", icon: <InfoOutlined fontSize="small" /> },
      ...(isCreator ? [{ label: "Обяви", icon: <ViewList fontSize="small" /> }] : []),
      { label: "Отзиви", icon: <RateReview fontSize="small" />, count: "128" },
      { label: "За мен", icon: <AccountCircle fontSize="small" /> },
    ],
    [isCreator]
  );

  return (
    <Box sx={pageContainerStyles}>
      <Box width="100%" maxWidth={1100}>
        <Stack spacing={3}>
          <MainCard
            border
            boxShadow
            contentSX={{
              p: 1.5,
              paddingBottom: "0px !important",
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            <Box
              sx={{
                ...coverStyles,
                backgroundImage: `linear-gradient(120deg, rgba(24,119,242,0.25) 0%, rgba(107,70,193,0.2) 35%, rgba(0,0,0,0.2) 100%), url(${coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
                }}
              />
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Avatar
                  src={avatarImage}
                  sx={{
                    ...avatarStyles,
                    margin: { xs: "-60px auto 0", md: "-70px 0 0 auto" },
                  }}
                >
                  UG
                </Avatar>
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={0.5}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h5">UGC Studio</Typography>
                        <Verified color="primary" fontSize="small" />
                      </Stack>
                      <Typography variant="subtitle2">Android Developer</Typography>
                      <Typography color="text.secondary">@ugc.studio</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip icon={<Verified />} label="Verified" color="primary" size="small" />
                        <Chip icon={<AutoAwesome />} label="AI" variant="outlined" size="small" />
                        <Chip icon={<VideoLibrary />} label="UGC Video" variant="outlined" size="small" />
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      justifyContent={{ xs: "center", md: "flex-end" }}
                    >
                      <Button variant="contained">Портфолио</Button>
                      <Button variant="outlined">Съобщение</Button>
                      <Button variant="text">Следвай</Button>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container sx={{ justifyContent: { xs: "center", md: "flex-end" } }}>
                  <Tabs
                    value={activeTab}
                    variant="scrollable"
                    onChange={(_, value) => setActiveTab(value)}
                    allowScrollButtonsMobile
                    sx={tabStyles}
                  >
                    {tabs.map((tab, index) => (
                      <Tab
                        key={tab.label}
                        icon={tab.icon}
                        iconPosition="start"
                        label={
                          tab.count ? (
                            <Stack direction="row" spacing={1} alignItems="center">
                              <span>{tab.label}</span>
                              <Chip label={tab.count} size="small" color="secondary" sx={{ ml: 1 }} />
                            </Stack>
                          ) : (
                            tab.label
                          )
                        }
                        id={`profile-tab-${index}`}
                        aria-controls={`profile-tabpanel-${index}`}
                      />
                    ))}
                  </Tabs>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={2}>
                <MainCard border boxShadow sx={{ borderRadius: 3 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="h6">Рейтинг</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Star sx={{ color: "#FDB022" }} />
                      <Typography variant="h4">4.9</Typography>
                      <Typography color="text.secondary">(128 отзива)</Typography>
                    </Stack>
                  </Stack>
                </MainCard>

                <MainCard border boxShadow sx={{ borderRadius: 3 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="h6">Статистики</Typography>
                    {stats.map((stat) => (
                      <Stack key={stat.label} direction="row" justifyContent="space-between">
                        <Typography color="text.secondary">{stat.label}</Typography>
                        <Typography fontWeight={600}>{stat.value}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </MainCard>

                <MainCard border boxShadow sx={{ borderRadius: 3 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="h6">Информация</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Place fontSize="small" color="action" />
                      <Typography color="text.secondary">София, България</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTime fontSize="small" color="action" />
                      <Typography color="text.secondary">Отговор до 2 часа</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarMonth fontSize="small" color="action" />
                      <Typography color="text.secondary">Член от 2022</Typography>
                    </Stack>
                  </Stack>
                </MainCard>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <MainCard border boxShadow sx={{ borderRadius: 3 }}>
                <Stack spacing={3}>
                  {activeTab === 0 && (
                    <Stack spacing={2.5}>
                      <Typography variant="h5">Общ преглед</Typography>
                      <Typography color="text.secondary">
                        Създаваме UGC видеа с фокус върху storytelling, конверсия и автентичност.
                        Поддържаме силен визуален стил и предлагаме ясни пакети за брандове и агенции.
                      </Typography>
                      <Grid container spacing={2}>
                        {[
                          { title: "Ниши", value: "Beauty, Fitness, Tech, Food" },
                          { title: "Езици", value: "Български, Английски" },
                          { title: "Формати", value: "Reels, TikTok, Shorts" },
                        ].map((item) => (
                          <Grid key={item.title} size={{ xs: 12, sm: 4 }}>
                            <MainCard border sx={{ borderRadius: 2.5 }}>
                              <Stack spacing={0.6}>
                                <Typography variant="subtitle2" color="text.secondary">
                                  {item.title}
                                </Typography>
                                <Typography variant="subtitle1">{item.value}</Typography>
                              </Stack>
                            </MainCard>
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                  )}

                  {isCreator && activeTab === 1 && (
                    <Stack spacing={2}>
                      <Typography variant="h5">Обяви</Typography>
                      <Stack spacing={2}>
                        {[
                          "UGC видео за TikTok",
                          "Product review пакет",
                          "Story пакет (3x)",
                        ].map((title, index) => (
                          <MainCard key={title} border sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 2.5 } }}>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
                              <Box
                                sx={{
                                  width: { xs: "100%", sm: 112 },
                                  height: { xs: 120, sm: 80 },
                                  borderRadius: 2,
                                  backgroundImage: `url(${listingImages[index]})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  flexShrink: 0,
                                }}
                              />
                              <Stack spacing={0.5} flex={1}>
                                <Typography variant="subtitle1">{title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Време за доставка: 3-5 дни
                                </Typography>
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                <Chip label="От 180 лв." color="primary" size="small" />
                                <Chip label="Видео" variant="outlined" size="small" />
                              </Stack>
                            </Stack>
                          </MainCard>
                        ))}
                      </Stack>
                    </Stack>
                  )}

                  {activeTab === reviewsTabIndex && (
                    <Stack spacing={2}>
                      <Typography variant="h5">Отзиви</Typography>
                      <Stack spacing={2}>
                        {["Мария", "Никола", "Елена"].map((name) => (
                          <MainCard key={name} border sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 2.5 } }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Avatar src={avatarImage} sx={{ width: 44, height: 44 }}>
                                {name.slice(0, 1)}
                              </Avatar>
                              <Stack spacing={0.6}>
                                <Typography variant="subtitle1">{name}</Typography>
                                <Stack direction="row" spacing={0.4} alignItems="center">
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} sx={{ color: "#FDB022", fontSize: 16 }} />
                                  ))}
                                </Stack>
                                <Typography variant="body2" color="text.secondary">
                                  Отлична комуникация и бърза доставка. Препоръчвам.
                                </Typography>
                              </Stack>
                            </Stack>
                          </MainCard>
                        ))}
                      </Stack>
                    </Stack>
                  )}

                  {activeTab === aboutTabIndex && (
                    <Stack spacing={2}>
                      <Typography variant="h5">За мен</Typography>
                      <Typography color="text.secondary">
                        Работим с брандове, които търсят автентично съдържание и измерими резултати.
                        Предлагаме консултация по бриф и ясни срокове.
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </MainCard>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
