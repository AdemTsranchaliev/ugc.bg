// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// icons
import SwapVertIcon from '@mui/icons-material/SwapVert';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

// project imports
import { TalentCard1 } from "../../ui-component/cards/TalentCard1";
import useConfig from "../../themes/context/useConfig";
import { StyledPage } from "../../ui-component/StyledPage";
import { InputAdornment, OutlinedInput, Pagination, TextField } from "@mui/material";
import { SearchSection } from "../../layout/Header";

// Mock data for listings
const mockListings = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Ще направя дизайн на Wix уебсайт, редизайн на уебсайт или Wix Studio уебсайт за Вашия бизнес с най-добри практики, чист код и отзивчив дизайн.",
    offerPrice: 77,
    rating: 4.9,
    reviewCount: 212,
    userPicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    userFullname: "Абир Ахмед",
    finishedProjects: 21,
    capabilities: ["Уеб дизайн", "Редизайн на уебсайт", "Уеб разработка"],
    category: "Уеб дизайн",
    isAI: false,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Ще бъда Wix експерт, Wix разработчик за дизайн, уебсайт или онлайн магазин с най-добри практики, чист код и отзивчив дизайн.",
    offerPrice: 82,
    rating: 4.9,
    reviewCount: 86,
    userPicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    userFullname: "Ризви Хосеин",
    finishedProjects: 2,
    capabilities: ["Уеб дизайн", "Редизайн на уебсайт", "Уеб разработка"],
    category: "Уеб дизайн",
    isAI: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Ще създам модерни React приложения с най-добри практики, чист код и отзивчив дизайн за вашия бизнес.",
    offerPrice: 95,
    rating: 4.8,
    reviewCount: 145,
    userPicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    userFullname: "Сара Джонсън",
    finishedProjects: 73,
    capabilities: ["Уеб разработка", "React", "JavaScript"],
    category: "Уеб разработка",
    isAI: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    description: "Ще напиша ангажиращи блог постове и статии за вашия уебсайт или бизнес с най-добри практики, чист код и отзивчив дизайн.",
    offerPrice: 65,
    rating: 4.7,
    reviewCount: 98,
    userPicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    userFullname: "Майкъл Чен",
    finishedProjects: 218,
    capabilities: ["Писане", "Блогове", "Копирайтинг"],
    category: "Писане",
    isAI: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1523473827534-86c15a0107d7?auto=format&fit=crop&w=400&q=80",
    description: "Професионална видео продукция за вашия бизнес, маркетингови клипове и корпоративни филми с високо качество.",
    offerPrice: 120,
    rating: 4.9,
    reviewCount: 156,
    userPicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    userFullname: "Елена Петрова",
    finishedProjects: 45,
    capabilities: ["Видео монтаж", "Видео продукция", "Анимация"],
    category: "Видео",
    isAI: false,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80",
    description: "Създаване на професионални лога, брандинг, визитки и маркетингови материали за вашия бизнес.",
    offerPrice: 88,
    rating: 4.8,
    reviewCount: 203,
    userPicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    userFullname: "Иван Георгиев",
    finishedProjects: 127,
    capabilities: ["Лого дизайн", "Брандинг", "Визитки"],
    category: "Графичен дизайн",
    isAI: true,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    description: "Подобряване на видимостта на вашия уебсайт в търсачките чрез професионална SEO оптимизация.",
    offerPrice: 150,
    rating: 4.7,
    reviewCount: 94,
    userPicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    userFullname: "Мария Стоянова",
    finishedProjects: 38,
    capabilities: ["SEO оптимизация", "Ключови думи", "Линк билдинг"],
    category: "Маркетинг",
    isAI: false,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    description: "Управление на социалните мрежи, създаване на съдържание и увеличаване на ангажираността.",
    offerPrice: 75,
    rating: 4.6,
    reviewCount: 67,
    userPicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    userFullname: "Димитър Иванов",
    finishedProjects: 52,
    capabilities: ["Управление на профили", "Създаване на съдържание", "Реклами"],
    category: "Маркетинг",
    isAI: false,
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=400&q=80",
    description: "Професионална фотография за продукти, портрети, събития и корпоративни нужди с високо качество.",
    offerPrice: 110,
    rating: 4.9,
    reviewCount: 189,
    userPicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    userFullname: "Анна Николова",
    finishedProjects: 89,
    capabilities: ["Продуктова фотография", "Портрети", "Събития"],
    category: "Фотография",
    isAI: false,
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    description: "Професионални преводи на английски, немски, френски и други езици с гарантирано качество.",
    offerPrice: 45,
    rating: 4.8,
    reviewCount: 142,
    userPicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    userFullname: "Петър Димитров",
    finishedProjects: 234,
    capabilities: ["Преводи", "Редактиране", "Коректура"],
    category: "Преводач",
    isAI: false,
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
    description: "Създаване на музика, джингъли, звукови ефекти и аудио продукция за вашия проект.",
    offerPrice: 130,
    rating: 4.7,
    reviewCount: 78,
    userPicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    userFullname: "София Маркова",
    finishedProjects: 41,
    capabilities: ["Музикална композиция", "Джингъли", "Звукови ефекти"],
    category: "Музика",
    isAI: true,
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
    description: "Професионално писане на статии, блогове, копирайтинг и редакторски услуги за вашия бизнес.",
    offerPrice: 55,
    rating: 4.9,
    reviewCount: 167,
    userPicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    userFullname: "Георги Стоянов",
    finishedProjects: 156,
    capabilities: ["Статии", "Блогове", "Копирайтинг"],
    category: "Писане",
    isAI: false,
  },
];

const categories = [
  "Всички",
  "Уеб дизайн",
  "Уеб разработка",
  "Графичен дизайн",
  "Видео",
  "Фотография",
  "Писане",
  "Маркетинг",
  "Преводач",
  "Музика",
];

export const Explore = () => {
  const {
    state: { borderRadius },
  } = useConfig();

  return (
    <StyledPage>
      {/* Search */}
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 4 }}>
        <Box sx={{ width: "80%" }}>
          <SearchSection />
        </Box>
      </Stack>

      <Stack spacing={3}>
        {/* Header */}
        <Typography variant="h1" sx={{ px: 2, color: "#000", fontWeight: 500 }}>
          AI UGC
        </Typography>

        {/* Filter Section */}
        <Stack
          direction="column"
          spacing={2}
          sx={{
            width: "100%",
            backgroundColor: "#fafbfc",
            p: 2,
            borderRadius: `${borderRadius}px`,
            boxShadow: "0 18px 44px rgba(0,0,0,0.16)",
          }}
        >
          {/* Filters */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Сортирай</InputLabel>
              <Select
                value="popular"
                input={
                  <OutlinedInput
                    label="Сортирай"
                    startAdornment={
                      <InputAdornment position="start">
                        <SwapVertIcon />
                      </InputAdornment>
                    }
                  />
                }
                disabled
              >
                <MenuItem value="popular">Популярно</MenuItem>
                <MenuItem value="price-low">Цена: Ниска към Висока</MenuItem>
                <MenuItem value="price-high">Цена: Висока към Ниска</MenuItem>
                <MenuItem value="rating">Най-висок рейтинг</MenuItem>
                <MenuItem value="newest">Най-нови</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Категория</InputLabel>
              <Select
                value="Всички"
                label="Категория"
                disabled
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Цена</InputLabel>
              <Select
                value="all"
                label="Цена"
                disabled
              >
                <MenuItem value="all">Всички</MenuItem>
                <MenuItem value="0-50">0 - 50 лв.</MenuItem>
                <MenuItem value="50-100">50 - 100 лв.</MenuItem>
                <MenuItem value="100-150">100 - 150 лв.</MenuItem>
                <MenuItem value="150+">Над 150 лв.</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Бюджет"
              type="number"
              value=""
              placeholder="Въведете бюджет"
              sx={{ minWidth: 140 }}
              disabled
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              inputProps={{
                min: 0,
                step: 1,
              }}
            />

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Промоции</InputLabel>
              <Select
                value="all"
                label="Промоции"
                disabled
              >
                <MenuItem value="all">Всички</MenuItem>
                <MenuItem value="yes">С промоции</MenuItem>
                <MenuItem value="no">Без промоции</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Рейтинг</InputLabel>
              <Select
                value="all"
                label="Рейтинг"
                disabled
              >
                <MenuItem value="all">Всички</MenuItem>
                <MenuItem value="4.5">4.5+</MenuItem>
                <MenuItem value="4.0">4.0+</MenuItem>
                <MenuItem value="3.5">3.5+</MenuItem>
                <MenuItem value="3.0">3.0+</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Тип</InputLabel>
              <Select
                value="all"
                label="Тип"
                disabled
              >
                <MenuItem value="all">Всички</MenuItem>
                <MenuItem value="real">Реално</MenuItem>
                <MenuItem value="ai">AI</MenuItem>
              </Select>
            </FormControl>

            {/* Spacer to push the button to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Reset Filters Button */}
            <Box
              sx={{
                minWidth: 44,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 1,
                bgcolor: "info.main",
                color: "white",
              }}
            >
              <RotateLeftIcon />
              <Typography variant="button">Нулирай филтрите</Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Results count */}
        <Typography variant="body1" sx={{ px: 2, color: "text.secondary" }}>
          {mockListings.length.toLocaleString("bg-BG")} {mockListings.length === 1 ? "намерена обява" : "намерени обяви"}
        </Typography>

        {/* Listings Grid */}
        <Grid container spacing={2} justifyContent="space-between">
          {mockListings.map((listing) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={listing.id}>
              <TalentCard1
                name={listing.userFullname}
                title={listing.category}
                rate={listing.offerPrice.toString()}
                ratingValue={listing.rating}
                ratingCountText={listing.reviewCount.toString()}
                experienceText={Math.max(1, Math.floor(listing.finishedProjects / 10)).toString()}
                finishedProjectsText={listing.finishedProjects.toString()}
                description={listing.description}
                imageUrl={listing.image}
                avatarUrl={listing.userPicture || listing.image}
              />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Pagination
          count={10}
          page={1}
          onChange={() => { }}
          shape="circular"
          size="large"
          color="standard"
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        />
      </Stack>
    </StyledPage >
  );
};

export default Explore;
