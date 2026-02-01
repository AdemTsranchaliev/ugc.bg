// material-ui
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

// icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

// project imports
import useConfig from "../../themes/context/useConfig";
import { SearchSection } from "../../layout/Header";
import { MobileFiltersDrawer } from "./MobileFiltersDrawer";

export const categoriesWithCounts = [
    { label: "Всички", value: "all", count: 0 },
    { label: "Уеб дизайн", value: "web-design", count: 124 },
    { label: "Уеб разработка", value: "web-dev", count: 89 },
    { label: "Графичен дизайн", value: "graphic", count: 156 },
    { label: "Видео", value: "video", count: 67 },
    { label: "Фотография", value: "photo", count: 92 },
    { label: "Писане", value: "writing", count: 134 },
    { label: "Маркетинг", value: "marketing", count: 78 },
    { label: "Преводач", value: "translation", count: 45 },
    { label: "Музика", value: "music", count: 31 },
];

export const sortOptions = [
    { value: "popular", label: "Популярно" },
    { value: "price-low", label: "Цена: Ниска към Висока" },
    { value: "price-high", label: "Цена: Висока към Ниска" },
    { value: "rating", label: "Най-висок рейтинг" },
    { value: "newest", label: "Най-нови" },
];

export const priceOptions = [
    { value: "all", label: "Всички" },
    { value: "0-50", label: "0 - 50 лв." },
    { value: "50-100", label: "50 - 100 лв." },
    { value: "100-150", label: "100 - 150 лв." },
    { value: "150+", label: "Над 150 лв." },
];

export const promotionOptions = [
    { value: "all", label: "Всички" },
    { value: "yes", label: "С промоции" },
    { value: "no", label: "Без промоции" },
];

export const ratingOptions = [
    { value: "all", label: "Всички" },
    { value: "4.5", label: "4.5+" },
    { value: "4.0", label: "4.0+" },
    { value: "3.5", label: "3.5+" },
    { value: "3.0", label: "3.0+" },
];

export const typeOptions = [
    { value: "all", label: "Всички" },
    { value: "real", label: "Реално" },
    { value: "ai", label: "AI" },
];

type FilterId = "sort" | "category" | "price" | "budget" | "promo" | "rating" | "type" | null;

const getCardStyles = (theme: Theme) => ({
    trigger: {
        minHeight: 40,
        px: 2,
        py: 1.25,
        borderRadius: 2,
        bgcolor: (theme.palette.grey as unknown as Record<number, string>)[100],
        color: theme.palette.text.primary,
        border: "1px solid",
        borderColor: (theme.palette.grey as unknown as Record<number, string>)[200],
        textTransform: "none",
        fontWeight: 500,
        "&:hover": {
            bgcolor: (theme.palette.grey as unknown as Record<number, string>)[200],
            borderColor: (theme.palette.grey as unknown as Record<number, string>)[300],
        },
    },
    card: {
        minWidth: 280,
        maxWidth: 360,
        maxHeight: 380,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        border: "1px solid",
        borderColor: "grey.200",
        overflow: "hidden",
    },
    cardHeader: {
        fontWeight: 700,
        fontSize: "0.95rem",
        color: "text.primary",
        px: 2,
        pt: 2,
        pb: 1,
    },
    cardBody: {
        px: 2,
        py: 2,
        overflowY: "auto",
        flex: 1,
        maxHeight: 260,
    },
    cardFooter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
        borderTop: "1px solid",
        borderColor: "grey.200",
        mt: "auto",
    },
    clearAll: {
        color: "grey.600",
        fontSize: "0.875rem",
        cursor: "pointer",
        "&:hover": { color: "grey.900", textDecoration: "underline" },
    },
    applyBtn: {
        bgcolor: "grey.900",
        color: "#fff",
        px: 2,
        py: 1,
        borderRadius: 1.5,
        textTransform: "none",
        fontWeight: 600,
        "&:hover": { bgcolor: "grey.800" },
    },
});

export const ExploreLanding = ({ _tempIsExplore2 = false }: { _tempIsExplore2?: boolean }) => {
    const theme = useTheme();
    const {
        state: { borderRadius },
    } = useConfig();
    const styles = getCardStyles(theme);

    const [openFilter, setOpenFilter] = useState<FilterId>(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const anchorRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    // Applied filter values (what's "live")
    const [sort, setSort] = useState("popular");
    const [categoryValues, setCategoryValues] = useState<Set<string>>(new Set(["all"]));
    const [price, setPrice] = useState("all");
    const [budget, setBudget] = useState("");
    const [promo, setPromo] = useState("all");
    const [rating, setRating] = useState("all");
    const [type, setType] = useState("all");

    // Pending values (inside open card, before Apply)
    const [pendingSort, setPendingSort] = useState(sort);
    const [pendingCategory, setPendingCategory] = useState<Set<string>>(new Set(categoryValues));
    const [pendingPrice, setPendingPrice] = useState(price);
    const [pendingBudget, setPendingBudget] = useState(budget);
    const [pendingPromo, setPendingPromo] = useState(promo);
    const [pendingRating, setPendingRating] = useState(rating);
    const [pendingType, setPendingType] = useState(type);

    const handleOpen = (id: FilterId) => {
        if (openFilter === id) {
            setOpenFilter(null);
            return;
        }
        setPendingSort(sort);
        setPendingCategory(new Set(categoryValues));
        setPendingPrice(price);
        setPendingBudget(budget);
        setPendingPromo(promo);
        setPendingRating(rating);
        setPendingType(type);
        setOpenFilter(id);
    };

    const handleApply = () => {
        setSort(pendingSort);
        setCategoryValues(new Set(pendingCategory));
        setPrice(pendingPrice);
        setBudget(pendingBudget);
        setPromo(pendingPromo);
        setRating(pendingRating);
        setType(pendingType);
        setOpenFilter(null);
    };

    const handleClearAll = () => {
        setPendingSort("popular");
        setPendingCategory(new Set(["all"]));
        setPendingPrice("all");
        setPendingBudget("");
        setPendingPromo("all");
        setPendingRating("all");
        setPendingType("all");
    };

    const handleResetAllFilters = () => {
        setSort("popular");
        setCategoryValues(new Set(["all"]));
        setPrice("all");
        setBudget("");
        setPromo("all");
        setRating("all");
        setType("all");
        setOpenFilter(null);
    };

    const handleOpenMobileFilters = () => {
        setPendingSort(sort);
        setPendingCategory(new Set(categoryValues));
        setPendingPrice(price);
        setPendingBudget(budget);
        setPendingPromo(promo);
        setPendingRating(rating);
        setPendingType(type);
        setMobileFiltersOpen(true);
    };

    const handleApplyMobileFilters = () => {
        handleApply();
        setMobileFiltersOpen(false);
    };

    const handleCategoryToggle = (value: string) => {
        const next = new Set(pendingCategory);
        if (value === "all") {
            next.clear();
            next.add("all");
        } else {
            next.delete("all");
            if (next.has(value)) next.delete(value);
            else next.add(value);
            if (next.size === 0) next.add("all");
        }
        setPendingCategory(next);
    };

    const anchorEl = openFilter ? anchorRefs.current[openFilter] ?? null : null;

    const renderFilterCard = () => {
        if (!openFilter) return null;

        const commonFooter = (
            <Box sx={styles.cardFooter}>
                <Button color="inherit" onClick={handleClearAll}>
                    Изчисти всички
                </Button>
                <Button sx={styles.applyBtn} onClick={handleApply}>
                    Приложи
                </Button>
            </Box>
        );

        if (openFilter === "sort") {
            return (
                <Paper sx={styles.card} elevation={0}>
                    <Box sx={styles.cardBody}>
                        <RadioGroup value={pendingSort} onChange={(_, v) => setPendingSort(v)}>
                            {sortOptions.map((o) => (
                                <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                            ))}
                        </RadioGroup>
                    </Box>
                    {commonFooter}
                </Paper>
            );
        }

        if (openFilter === "category") {
            return (
                <Paper sx={[styles.card, { minWidth: 420, maxWidth: 520 }]} elevation={0}>
                    <Box sx={[styles.cardBody, { px: 2.5 }]}>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.5 }}>
                            {categoriesWithCounts.map((c) => (
                                <FormControlLabel
                                    key={c.value}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={pendingCategory.has(c.value)}
                                            onChange={() => handleCategoryToggle(c.value)}
                                        />
                                    }
                                    label={
                                        <Typography component="span" variant="body2">
                                            {c.label}
                                            {c.count > 0 && (
                                                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                                    ({c.count.toLocaleString("bg-BG")})
                                                </Typography>
                                            )}
                                        </Typography>
                                    }
                                />
                            ))}
                        </Box>
                    </Box>
                    {commonFooter}
                </Paper>
            );
        }

        if (openFilter === "price") {
            return (
                <Paper sx={styles.card} elevation={0}>
                    <Box sx={styles.cardBody}>
                        <RadioGroup value={pendingPrice} onChange={(_, v) => setPendingPrice(v)}>
                            {priceOptions.map((o) => (
                                <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                            ))}
                        </RadioGroup>
                    </Box>
                    {commonFooter}
                </Paper>
            );
        }

        if (openFilter === "budget") {
            return (
                <Paper sx={styles.card} elevation={0}>
                    <Box sx={styles.cardBody}>
                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            placeholder="0"
                            value={pendingBudget}
                            onChange={(e) => setPendingBudget(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">лв.</InputAdornment>
                                    ),
                                    inputProps: { min: 0, step: 1 },
                                },
                            }}
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                        />
                    </Box>
                    {commonFooter}
                </Paper>
            );
        }

        if (openFilter === "promo") {
            return (
                <Paper sx={styles.card} elevation={0}>
                    <Box sx={styles.cardBody}>
                        <RadioGroup value={pendingPromo} onChange={(_, v) => setPendingPromo(v)}>
                            {promotionOptions.map((o) => (
                                <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                            ))}
                        </RadioGroup>
                    </Box>
                    {commonFooter}
                </Paper>
            );
        }

        if (openFilter === "rating") {
            return (
                <Paper sx={styles.card} elevation={0}>
                    <Box sx={styles.cardBody}>
                        <RadioGroup value={pendingRating} onChange={(_, v) => setPendingRating(v)}>
                            {ratingOptions.map((o) => (
                                <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                            ))}
                        </RadioGroup>
                    </Box>
                    {commonFooter}
                </Paper>
            );
        }

        if (openFilter === "type") {
            return (
                <Paper sx={styles.card} elevation={0}>
                    <Box sx={styles.cardBody}>
                        <RadioGroup value={pendingType} onChange={(_, v) => setPendingType(v)}>
                            {typeOptions.map((o) => (
                                <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                            ))}
                        </RadioGroup>
                    </Box>
                    {commonFooter}
                </Paper>
            );
        }

        return null;
    };

    return (
        <Box sx={{ position: "relative", pb: 10 }}>
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    width: "100%",
                    height: 250,
                    p: 2,
                    borderRadius,
                    "&:before": {
                        content: '""',
                        position: "absolute",
                        zIndex: 0,
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url("/assets/images/general/city-bg.png")`,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 97%",
                        filter: "blur(2px) brightness(0.8)",
                        backgroundRepeat: "no-repeat",
                        pointerEvents: "none",
                    },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    },
                }}
            >
                <Box sx={{ position: "absolute", top: "20%", left: "3%", zIndex: 2 }}>
                    <Typography variant="h1" sx={{ width: "100%", color: "#fff", fontWeight: 500, zIndex: 2 }}>
                        AI UGC
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            width: "100%",
                            color: "#cccace",
                            zIndex: 2,
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            maxWidth: 500,
                            whiteSpace: "normal",
                        }}
                    >
                        Създавайте и продавайте UGC, използвайки изкуствен интелект. Без ограничения.
                    </Typography>
                </Box>
            </Box>

            <Stack
                direction="column"
                spacing={2}
                sx={{
                    position: "absolute",
                    top: 170,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 100,
                    width: "90%",
                    backgroundColor: "#fff",
                    p: 2,
                    borderRadius: 4,
                    boxShadow: "0 18px 44px rgba(0,0,0,0.16)",
                }}
            >
                <SearchSection />

                {/* Filter buttons for mobile */}
                <Button
                    variant="contained"
                    onClick={handleOpenMobileFilters}
                    sx={{
                        ...styles.applyBtn,
                        display: {
                            xs: "flex",
                            md: "none",
                        }
                    }}
                >
                    Филтри
                </Button>

                <MobileFiltersDrawer
                    open={mobileFiltersOpen}
                    onClose={() => setMobileFiltersOpen(false)}
                    pendingSort={pendingSort}
                    setPendingSort={setPendingSort}
                    pendingCategory={pendingCategory}
                    onCategoryToggle={handleCategoryToggle}
                    pendingPrice={pendingPrice}
                    setPendingPrice={setPendingPrice}
                    pendingBudget={pendingBudget}
                    setPendingBudget={setPendingBudget}
                    pendingPromo={pendingPromo}
                    setPendingPromo={setPendingPromo}
                    pendingRating={pendingRating}
                    setPendingRating={setPendingRating}
                    pendingType={pendingType}
                    setPendingType={setPendingType}
                    onClearAll={handleClearAll}
                    onApply={handleApplyMobileFilters}
                />

                {/* Filter buttons */}
                {!_tempIsExplore2 && (
                    <ClickAwayListener onClickAway={() => setOpenFilter(null)}>
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "block",
                                }
                            }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                                {[
                                    { id: "sort" as const, label: "Сортирай" },
                                    { id: "category" as const, label: "Категория" },
                                    { id: "price" as const, label: "Цена" },
                                    { id: "budget" as const, label: "Бюджет" },
                                    { id: "promo" as const, label: "Промоции" },
                                    { id: "rating" as const, label: "Рейтинг" },
                                    { id: "type" as const, label: "Тип" },
                                ].map(({ id, label }) => (
                                    <Button
                                        key={id}
                                        ref={(el) => { anchorRefs.current[id] = el; }}
                                        onClick={() => handleOpen(id)}
                                        endIcon={<KeyboardArrowDownIcon sx={{ transform: openFilter === id ? "rotate(180deg)" : "none" }} />}
                                        sx={styles.trigger}
                                    >
                                        {label}
                                    </Button>
                                ))}

                                <Box sx={{ flexGrow: 1 }} />

                                <Button
                                    variant="text"
                                    startIcon={<RotateLeftIcon />}
                                    onClick={handleResetAllFilters}
                                    sx={{ color: "info.main", textTransform: "none", fontWeight: 500 }}
                                >
                                    Нулирай
                                </Button>
                            </Stack>

                            <Popper
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                placement="bottom-start"
                                disablePortal
                                modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
                                sx={{ zIndex: 100 }}
                            >
                                {renderFilterCard()}
                            </Popper>
                        </Box>
                    </ClickAwayListener>
                )}
            </Stack>
        </Box>
    );
};

export default ExploreLanding;