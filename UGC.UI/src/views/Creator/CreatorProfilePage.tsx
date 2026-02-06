import { useState } from "react";

// material-ui
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormControlLabel from "@mui/material/FormControlLabel";

// icons
import {
  Star,
  Edit,
  MoreVert,
  PlayArrow,
  Add,
  Videocam,
  CameraAlt,
  GridView,
  DragIndicator,
  VideoSettings,
} from "@mui/icons-material";
import { IconBrandInstagram, IconBrandTiktok, IconBrandYoutube } from '@tabler/icons-react';

// project imports
import MainCard from "../../ui-component/cards/MainCard";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { StyledSwitch } from "../../ui-component/StyledSwitch";
import Fab from "@mui/material/Fab";

// Placeholder images matching reference (Elena Petrova, Moraine Lake cover, portfolio items)
const COVER_IMAGE =
  "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=800&q=80";
const AVATAR_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80";
const FEATURED_REEL_PLACEHOLDER =
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80";

const PORTFOLIO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
    type: "VIDEO" as const,
  },
  {
    url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=80",
    type: "AD" as const,
  },
  {
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    type: "VIDEO" as const,
  },
  {
    url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80",
    type: "PHOTO" as const,
  },
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
    type: "PHOTO" as const,
  },
];

const TAGS = ["Грижа за кожата", "Технологии", "Приложения", "Мода"];
const PORTFOLIO_TABS = ["Всички", "UGC Reels", "Unboxing", "Снимки", "Видеа"];
const PORTFOLIO_TYPE_LABELS: Record<string, string> = { VIDEO: "ВИДЕО", AD: "РЕКЛАМА", PHOTO: "СНИМКА" };

const SERVICES = [
  {
    title: "1 UGC видео (15–30 сек)",
    description: "Включва варианти на куки и монтаж",
    price: "От 150 лв.",
    icon: <Videocam sx={{ color: "dark.text.primary" }} />,
    bgColor: "orange.main",
  },
  {
    title: "Продуктова фотография",
    description: "5 снимки с висока резолюция и монтаж",
    price: "От 80 лв.",
    icon: <CameraAlt sx={{ color: "#fff" }} />,
    bgColor: "primary.main",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Елена е абсолютно невероятна за работа! Нейното съдържание конвертираше 3 пъти по-добре от предишните ни реклами.",
    name: "Sarah J.",
    company: "GlowSkin",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
  },
  {
    quote:
      "Високо качество, бърза доставка и супер креативни куки. Горещо препоръчваме!",
    name: "Mike T.",
    company: "TechStart",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
];

export default function CreatorProfilePage() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [portfolioTab, setPortfolioTab] = useState(0);
  const [featuredReelPublic, setFeaturedReelPublic] = useState(true);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, pb: 3 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>

          <Grid container spacing={3}>

            {/* Left column - Creator profile card */}
            <Grid size={{ xs: 12, md: 4 }}>
              <MainCard
                border
                boxShadow
                shadow
                contentSX={{ p: 0 }}
                sx={{
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "grey.200",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                  "&:hover": {
                    boxShadow: "0 10px 44px rgba(0,0,0,0.14)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                {/* Cover image with edit overlay */}
                <Box
                  sx={{
                    height: 160,
                    position: "relative",
                    backgroundImage: `url(${COVER_IMAGE})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 36,
                      height: 36,
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      borderRadius: { xs: "8px", md: "12px" },
                      boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
                      "&:hover": {
                        bgcolor: "#fff",
                      },
                    }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>

                <Box sx={{ px: 2, pb: 2, pt: 0 }}>
                  {/* Avatar overlapping cover */}
                  <Box
                    sx={{
                      width: { xs: 38, md: 82 },
                      height: { xs: 38, md: 82 },
                      borderRadius: "50%",
                      bgcolor: "#fff",
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "0 10px 18px rgba(0,0,0,0.12)",
                      mt: -6,
                    }}
                  >
                    <Avatar
                      src={AVATAR_IMAGE}
                      sx={{ width: { xs: 30, md: 72 }, height: { xs: 30, md: 72 } }}
                    />
                  </Box>

                  <Typography
                    variant="h3"
                    fontWeight={700}
                    sx={{ mt: 1.5 }}
                  >
                    Elena Petrova
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    flexWrap="wrap"
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      @elena_ugc
                    </Typography>
                    <Chip
                      icon={<Star color="warning" sx={{ fontSize: 18 }} />}
                      label={<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>5.0 (24)</Typography>}
                      color="warning"
                      size="small"
                      sx={{ fontWeight: 600, }}
                    />
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1.5, }}
                  >
                    Професионален UGC създател, специализиран в красота и технологии.
                    Създавам автентични куки, които превръщат зрителите в клиенти.
                    Нека създадем магия! ✨
                  </Typography>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={0.75}
                    justifyContent="center"
                    sx={{ my: 2 }}
                  >
                    {TAGS.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: "primary.light",
                          color: "primary.dark",
                          fontWeight: "bold",
                        }}
                      />
                    ))}
                  </Stack>

                  <Divider sx={{ my: 2, borderColor: "grey.200", opacity: 0.6 }} />

                  <Stack direction="row" justifyContent="space-around" spacing={2}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" fontWeight={700}>
                        24
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        ПРОЕКТИ
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" fontWeight={700}>
                        1.2k
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        ПОСЛЕДОВАТЕЛИ
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={1.5}
                    sx={{ mt: 1.5 }}
                  >
                    <IconButton size="small">
                      <IconBrandInstagram stroke={1} />
                    </IconButton>
                    <IconButton size="small">
                      <IconBrandTiktok stroke={1} />
                    </IconButton>
                    <IconButton size="small">
                      <IconBrandYoutube stroke={1} />
                    </IconButton>
                  </Stack>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Edit />}
                    sx={{
                      mt: 2,
                      py: 1.25,
                      borderColor: "grey.300",
                      color: "text.primary",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Редактирай профила
                  </Button>
                </Box>
              </MainCard>
            </Grid>

            {/* Right column */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={3}>
                {/* Featured Reel */}
                <MainCard
                  border
                  boxShadow
                  shadow
                  contentSX={{ p: 2 }}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "grey.200",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    "&:hover": {
                      boxShadow: "0 10px 44px rgba(0,0,0,0.14)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Typography variant="h4">
                      Избрано видео
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {!downSM && (
                        <>
                          <Fab variant="extended" size="small" sx={{ boxShadow: 'none', }}>
                            <VideoSettings fontSize="small" sx={{ mr: 1 }} />
                            Смени видеото
                          </Fab>
                        </>
                      )}
                      <Tooltip title="Редактиране">
                        <IconButton size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Плъзнете за пренареждане">
                        <Stack
                          direction="row"
                          alignItems="center"
                          sx={{
                            cursor: "grab",
                          }}
                        >
                          <DragIndicator fontSize="small" />
                        </Stack>
                      </Tooltip>
                      <Tooltip title="Още опции">
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                  <Box
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      height: 320,
                      backgroundImage: `url(${FEATURED_REEL_PLACEHOLDER})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "grey.900",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.35)",
                      }}
                    />
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        color: "text.primary",
                        width: 64,
                        height: 64,
                        zIndex: 1,
                        "&:hover": { bgcolor: "white" },
                      }}
                    >
                      <PlayArrow sx={{ fontSize: 40 }} />
                    </IconButton>
                  </Box>
                </MainCard>

                {/* Portfolio */}
                <MainCard
                  border
                  boxShadow
                  shadow
                  contentSX={{ p: 2 }}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "grey.200",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    "&:hover": {
                      boxShadow: "0 10px 44px rgba(0,0,0,0.14)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Typography variant="h4">
                      Портфолио
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Редактиране">
                        <IconButton size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Плъзнете за пренареждане">
                        <IconButton size="small">
                          <GridView fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Още опции">
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>

                  <Tabs
                    value={portfolioTab}
                    onChange={(_, v) => setPortfolioTab(v)}
                    sx={{
                      mt: 1.5,
                      minHeight: "auto",
                      "& .MuiTab-root": { minHeight: "auto", py: 1, textTransform: "none", fontWeight: "bold" },
                      "& .Mui-selected": { color: "primary.main", fontWeight: "bold" },
                      "& .MuiTabs-indicator": { backgroundColor: "primary.main" },
                    }}
                  >
                    {PORTFOLIO_TABS.map((label) => (
                      <Tab key={label} label={label} />
                    ))}
                  </Tabs>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {PORTFOLIO_IMAGES.map((item, index) => (
                      <Grid size={{ xs: 6, sm: 4 }} key={index}>
                        <Box
                          sx={{
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                            aspectRatio: "1",
                            bgcolor: "grey.200",
                            "&:hover .portfolio-actions": { opacity: 1 },
                          }}
                        >
                          <Box
                            component="img"
                            src={item.url}
                            alt=""
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <Chip
                            label={PORTFOLIO_TYPE_LABELS[item.type] ?? item.type}
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: "grey.800",
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              borderRadius: 2,
                            }}
                          />
                          {item.type === "VIDEO" && (
                            <IconButton
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                left: 8,
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                                color: "text.primary",
                                width: 30,
                                height: 30,
                                zIndex: 1,
                                cursor: "pointer",
                                "&:hover": { bgcolor: "white" },
                              }}
                            >
                              <PlayArrow sx={{ fontSize: 20 }} />
                            </IconButton>
                          )}
                        </Box>
                      </Grid>
                    ))}
                    <Grid size={{ xs: 6, sm: 4 }}>
                      <Box
                        sx={{
                          aspectRatio: "1",
                          borderRadius: 2,
                          border: "2px dashed",
                          borderColor: "grey.400",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "grey.50",
                          cursor: "pointer",
                          "&:hover": { borderColor: "primary.main", bgcolor: "primary.light" },
                        }}
                      >
                        <Stack alignItems="center" spacing={0.5}>
                          <Add sx={{ fontSize: 48, color: "grey.500" }} />
                          <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            ДОБАВИ
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </MainCard>

                {/* Services */}
                <MainCard
                  border
                  boxShadow
                  shadow
                  contentSX={{ p: 2 }}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "grey.200",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    "&:hover": {
                      boxShadow: "0 10px 44px rgba(0,0,0,0.14)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Typography variant="h4">
                      Услуги
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                      <FormControlLabel
                        labelPlacement="start"
                        control={
                          <StyledSwitch
                            checked={featuredReelPublic}
                            onChange={(_, v) => setFeaturedReelPublic(v)}
                            size="small"
                          />
                        }
                        label={
                          <Typography variant="h5" sx={{ color: featuredReelPublic ? 'text.primary' : 'text.secondary', fontWeight: 'bold', mx: 1 }}>
                            {featuredReelPublic ? "Публично" : "Лично"}
                          </Typography>
                        }
                      />
                      <Tooltip title="Редактиране">
                        <IconButton size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Още опции">
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>

                  <Stack spacing={2}>
                    {SERVICES.map((service, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{
                          p: 1.5,
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            p: 1.5,
                            backgroundColor: service.bgColor,
                            borderRadius: "50%",
                          }}>
                          {service.icon}
                        </Stack>

                        <Stack direction="column">
                          <Typography variant="subtitle1" fontWeight={600}>
                            {service.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {service.description}
                          </Typography>
                          <Chip
                            sx={{
                              height: 'auto',
                              width: 'fit-content',
                              borderRadius: 1,
                            }}
                            label={
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {service.price}
                              </Typography>
                            }
                          />
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Add />}
                    sx={{
                      mt: 2,
                      py: 1.25,
                      borderColor: "grey.300",
                      color: "text.primary",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Добави нова услуга
                  </Button>
                </MainCard>

                {/* Client Love */}
                <MainCard
                  border
                  boxShadow
                  shadow
                  contentSX={{ p: 2 }}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "grey.200",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    "&:hover": {
                      boxShadow: "0 10px 44px rgba(0,0,0,0.14)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Typography variant="h4">
                      Отзиви от клиенти
                    </Typography>

                  </Stack>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {TESTIMONIALS.map((t, i) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={i}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: "#f8f9fb",
                          }}
                        >
                          <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
                            {[1, 2, 3, 4, 5].map((_) => (
                              <Star key={_} sx={{ color: "#FDB022", fontSize: 18 }} />
                            ))}
                          </Stack>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            &quot;{t.quote}&quot;
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar
                              src={t.avatar}
                              sx={{ width: 32, height: 32 }}
                            />
                            <Typography variant="body2" fontWeight={600}>
                              {t.name}, {t.company}
                            </Typography>
                          </Stack>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </MainCard>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box >
  );
}
