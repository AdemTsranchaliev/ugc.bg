import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

// icons
import { IconSearch, IconX } from "@tabler/icons-react";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// project imports
import { ProductCard } from "../../ui-component/cards/ProductCard";
import useConfig from "../../themes/context/useConfig";

// ==============================|| EXPLORE PAGE ||============================== //

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
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    state: { borderRadius },
  } = useConfig();

  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "Всички");
  const [priceRange, setPriceRange] = useState<number[]>([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || "200"),
  ]);
  const [ratingFilter, setRatingFilter] = useState<number>(parseFloat(searchParams.get("rating") || "0"));
  const [contentType, setContentType] = useState<string | null>(searchParams.get("type") || null);
  const [showFilters, setShowFilters] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  // Filter listings based on search and filters
  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          listing.description.toLowerCase().includes(query) ||
          listing.userFullname.toLowerCase().includes(query) ||
          listing.capabilities.some((cap) => cap.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "Всички" && listing.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (listing.offerPrice < priceRange[0] || listing.offerPrice > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (listing.rating < ratingFilter) {
        return false;
      }

      // AI/Real filter
      if (contentType === "ai" && !listing.isAI) return false;
      if (contentType === "real" && listing.isAI) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, priceRange, ratingFilter, contentType]);

  const displayedListings = filteredListings.slice(0, displayedCount);
  const hasMore = displayedCount < filteredListings.length;

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "Всички") params.set("category", selectedCategory);
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 200) params.set("maxPrice", priceRange[1].toString());
    if (ratingFilter > 0) params.set("rating", ratingFilter.toString());
    if (contentType) params.set("type", contentType);

    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, priceRange, ratingFilter, contentType]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + 8);
      setIsLoading(false);
    }, 500);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Всички");
    setPriceRange([0, 200]);
    setRatingFilter(0);
    setContentType(null);
    setDisplayedCount(8);
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== "Всички" ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0) +
    (ratingFilter > 0 ? 1 : 0) +
    (contentType ? 1 : 0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Разглеждане на обяви
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Открийте най-добрите услуги и създатели
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box>
          <TextField
            fullWidth
            placeholder="Търси по заглавие, описание, креатор или умения..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="20px" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    sx={{ mr: -1 }}
                  >
                    <IconX stroke={1.5} size="18px" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: `${borderRadius}px`,
              },
            }}
          />
        </Box>

        {/* Filters Section */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: `${borderRadius}px`,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{ mr: -1 }}
            >
              <FilterListIcon />
            </IconButton>
            <Typography variant="h6">Филтри</Typography>
            {activeFiltersCount > 0 && (
              <Chip
                label={activeFiltersCount}
                size="small"
                color="primary"
                sx={{ ml: "auto" }}
              />
            )}
            {activeFiltersCount > 0 && (
              <Button
                size="small"
                onClick={handleClearFilters}
                startIcon={<IconX stroke={1.5} size="16px" />}
              >
                Изчисти
              </Button>
            )}
            <Box sx={{ ml: "auto" }}>
              {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </Stack>

          <Collapse in={showFilters}>
            <Grid container spacing={3}>
              {/* Category Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Категория</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Категория"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Price Range Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box>
                  <Typography gutterBottom>
                    Цена: {priceRange[0]} - {priceRange[1]} лв./ч.
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={(_, newValue) => setPriceRange(newValue as number[])}
                    min={0}
                    max={200}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} лв.`}
                  />
                </Box>
              </Grid>

              {/* Rating Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box>
                  <Typography gutterBottom>
                    Минимален рейтинг: {ratingFilter > 0 ? ratingFilter.toFixed(1) : "Всички"}
                  </Typography>
                  <Slider
                    value={ratingFilter}
                    onChange={(_, newValue) => setRatingFilter(newValue as number)}
                    min={0}
                    max={5}
                    step={0.1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => (value > 0 ? value.toFixed(1) : "Всички")}
                  />
                </Box>
              </Grid>

              {/* AI/Real Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box>
                  <Typography gutterBottom sx={{ mb: 1 }}>
                    Тип съдържание
                  </Typography>
                  <ToggleButtonGroup
                    value={contentType}
                    exclusive
                    onChange={(_, newValue) => setContentType(newValue)}
                    fullWidth
                  >
                    <ToggleButton value="real">Реално</ToggleButton>
                    <ToggleButton value="ai">AI</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
            </Grid>
          </Collapse>
        </Paper>

        {/* Results Count */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            Намерени {filteredListings.length} {filteredListings.length === 1 ? "обява" : "обяви"}
          </Typography>
        </Box>

        {/* Listings Grid */}
        {displayedListings.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {displayedListings.map((listing) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={listing.id}>
                  <ProductCard
                    image={listing.image}
                    description={listing.description}
                    offerPrice={listing.offerPrice}
                    rating={listing.rating}
                    reviewCount={listing.reviewCount}
                    userPicture={listing.userPicture}
                    userFullname={listing.userFullname}
                    finishedProjects={listing.finishedProjects}
                    capabilities={listing.capabilities}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Load More Button */}
            {hasMore && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                  {isLoading ? "Зареждане..." : "Зареди още"}
                </Button>
              </Box>
            )}
          </>
        ) : (
          // No Results Message
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: `${borderRadius}px`,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Няма резултати
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Не бяха намерени обяви, отговарящи на вашите критерии.
            </Typography>
            {activeFiltersCount > 0 && (
              <Button variant="contained" onClick={handleClearFilters}>
                Изчисти филтрите
              </Button>
            )}
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default Explore;
