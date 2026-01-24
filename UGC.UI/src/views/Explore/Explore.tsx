import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams, Link } from "react-router";

// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Divider from "@mui/material/Divider";

// icons
import HomeIcon from "@mui/icons-material/Home";
import SwapVertIcon from '@mui/icons-material/SwapVert';

// project imports
import { TalentCard1 } from "../../ui-component/cards/TalentCard1";
import useConfig from "../../themes/context/useConfig";
import { StyledPage } from "../../ui-component/StyledPage";
import { InputAdornment, OutlinedInput, TextField } from "@mui/material";

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
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sort") || "popular");
  const itemsPerPage = 12;
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  // Additional filter states
  const [priceFilter, setPriceFilter] = useState<string>(searchParams.get("price") || "all");
  const [budget, setBudget] = useState<string>(searchParams.get("budget") || "");
  const [promotions, setPromotions] = useState<string>(searchParams.get("promotions") || "all");

  // Sticky filters state
  const filtersRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const filtersOriginalTopRef = useRef<number>(0);
  const [isFiltersSticky, setIsFiltersSticky] = useState(false);
  const [filtersHeight, setFiltersHeight] = useState(0);

  // Filter listings based on search and filters
  const filteredListings = useMemo(() => {
    let filtered = mockListings.filter((listing) => {
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

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case "price-high":
        sorted.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "popular":
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return sorted;
  }, [searchQuery, selectedCategory, priceRange, ratingFilter, contentType, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const currentPage = Math.min(page, Math.max(1, totalPages || 1));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedListings = filteredListings.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (page > 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, priceRange, ratingFilter, contentType]);

  // Ensure page doesn't exceed total pages
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "Всички") params.set("category", selectedCategory);
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 200) params.set("maxPrice", priceRange[1].toString());
    if (ratingFilter > 0) params.set("rating", ratingFilter.toString());
    if (contentType) params.set("type", contentType);
    if (sortBy !== "popular") params.set("sort", sortBy);
    if (priceFilter !== "all") params.set("price", priceFilter);
    if (budget) params.set("budget", budget);
    if (promotions !== "all") params.set("promotions", promotions);
    if (page > 1) params.set("page", page.toString());

    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, priceRange, ratingFilter, contentType, sortBy, priceFilter, budget, promotions, page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Всички");
    setPriceRange([0, 200]);
    setRatingFilter(0);
    setContentType(null);
    setPriceFilter("all");
    setBudget("");
    setPromotions("all");
    setPage(1);
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== "Всички" ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0) +
    (ratingFilter > 0 ? 1 : 0) +
    (contentType ? 1 : 0);

  // Track filters height, container width, and original position
  useEffect(() => {
    if (filtersRef.current && !isFiltersSticky) {
      const height = filtersRef.current.offsetHeight;
      setFiltersHeight(height);
      // Store the original position relative to the document
      filtersOriginalTopRef.current = filtersRef.current.getBoundingClientRect().top + window.scrollY;
    }


    const handleResize = () => {
      if (filtersRef.current && !isFiltersSticky) {
        setFiltersHeight(filtersRef.current.offsetHeight);
        filtersOriginalTopRef.current = filtersRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedCategory, priceFilter, budget, promotions, ratingFilter, contentType, isFiltersSticky]);

  // Handle scroll to make filters sticky
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (!isFiltersSticky) {
      // When scrolling down and the filters section reaches the top of the viewport
      if (scrollY >= filtersOriginalTopRef.current) {
        setIsFiltersSticky(true);
      }
    } else {
      // When scrolling back up, check if we've scrolled above the original position
      if (scrollY < filtersOriginalTopRef.current) {
        setIsFiltersSticky(false);
      }
    }
  }, [isFiltersSticky]);

  // Calculate original position on mount
  useEffect(() => {
    if (filtersRef.current) {
      filtersOriginalTopRef.current = filtersRef.current.getBoundingClientRect().top + window.scrollY;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <StyledPage>
      <Box ref={containerRef}>
        <Stack spacing={3}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            aria-label="breadcrumb"
            separator="›"
            sx={{
              "& .MuiBreadcrumbs-separator": {
                mx: 1,
              },
            }}
          >
            <MuiLink
              component={Link}
              to="/"
              underline="hover"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
              Начало
            </MuiLink>
            <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
              Разглеждане
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Typography variant="h1">
            AI UGC обяви
          </Typography>

          {/* First Row: Results Count and Sort By */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" color="text.secondary">
              {filteredListings.length.toLocaleString("bg-BG")} {filteredListings.length === 1 ? "обява" : "обяви"}
            </Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Сортирай</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
              >
                <MenuItem value="popular">Популярно</MenuItem>
                <MenuItem value="price-low">Цена: Ниска към Висока</MenuItem>
                <MenuItem value="price-high">Цена: Висока към Ниска</MenuItem>
                <MenuItem value="rating">Най-висок рейтинг</MenuItem>
                <MenuItem value="newest">Най-нови</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider />

          {/* Spacer to prevent layout shift when filters become sticky */}
          {isFiltersSticky && <Box sx={{ height: filtersHeight }} />}

          {/* Second Row: Filters */}
          <Stack
            ref={filtersRef}
            direction="row"
            spacing={1}
            sx={{
              ...(isFiltersSticky && {
                position: "fixed",
                top: "-6%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                backgroundColor: "background.paper",
                padding: 2,
                boxShadow: 2,
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
                maxWidth: "100%",
              }),
            }}
          >
            {/* Primary Filters - Always Visible */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
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

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Цена</InputLabel>
              <Select
                value={priceFilter}
                label="Цена"
                onChange={(e) => setPriceFilter(e.target.value)}
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
              value={budget}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow numbers
                if (value === "" || /^\d+$/.test(value)) {
                  setBudget(value);
                }
              }}
              placeholder="Въведете бюджет"
              sx={{ minWidth: 140 }}
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
                value={promotions}
                label="Промоции"
                onChange={(e) => setPromotions(e.target.value)}
              >
                <MenuItem value="all">Всички</MenuItem>
                <MenuItem value="yes">С промоции</MenuItem>
                <MenuItem value="no">Без промоции</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Рейтинг</InputLabel>
              <Select
                value={ratingFilter > 0 ? ratingFilter.toString() : "all"}
                label="Рейтинг"
                onChange={(e) => setRatingFilter(e.target.value === "all" ? 0 : parseFloat(e.target.value))}
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
                value={contentType || "all"}
                label="Тип"
                onChange={(e) => setContentType(e.target.value === "all" ? null : e.target.value)}
              >
                <MenuItem value="all">Всички</MenuItem>
                <MenuItem value="real">Реално</MenuItem>
                <MenuItem value="ai">AI</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Listings Grid */}
          {displayedListings.length > 0 ? (
            <>
              <Grid container spacing={2} justifyContent="space-between">
                {displayedListings.map((listing) => (
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
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
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
      </Box>
    </StyledPage>
  );
};

export default Explore;
