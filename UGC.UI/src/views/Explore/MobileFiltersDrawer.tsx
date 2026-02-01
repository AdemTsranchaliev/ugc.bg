// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

// project imports
import {
    categoriesWithCounts,
    sortOptions,
    priceOptions,
    promotionOptions,
    ratingOptions,
    typeOptions,
} from "./ExploreLanding";
import { styled } from "@mui/material";

const getCardStyles = () => ({
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

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    // backgroundColor: grey[300],
    backgroundColor: theme.palette.grey[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
    // ...theme.applyStyles('dark', {
    //     backgroundColor: grey[900],
    // }),
}));

export type MobileFiltersDrawerProps = {
    open: boolean;
    onClose: () => void;
    pendingSort: string;
    setPendingSort: (v: string) => void;
    pendingCategory: Set<string>;
    onCategoryToggle: (value: string) => void;
    pendingPrice: string;
    setPendingPrice: (v: string) => void;
    pendingBudget: string;
    setPendingBudget: (v: string) => void;
    pendingPromo: string;
    setPendingPromo: (v: string) => void;
    pendingRating: string;
    setPendingRating: (v: string) => void;
    pendingType: string;
    setPendingType: (v: string) => void;
    onClearAll: () => void;
    onApply: () => void;
};

export const MobileFiltersDrawer = ({
    open,
    onClose,
    pendingSort,
    setPendingSort,
    pendingCategory,
    onCategoryToggle,
    pendingPrice,
    setPendingPrice,
    pendingBudget,
    setPendingBudget,
    pendingPromo,
    setPendingPromo,
    pendingRating,
    setPendingRating,
    pendingType,
    setPendingType,
    onClearAll,
    onApply,
}: MobileFiltersDrawerProps) => {
    const styles = getCardStyles();

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            onOpen={() => { }}
            disableSwipeToOpen
            sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    maxHeight: "85vh",
                },
            }}
        >
            <Box sx={{ px: 2, pt: 2, pb: 3, overflow: "hidden" }}>
                <Puller />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Филтри
                </Typography>
                <Box sx={{ maxHeight: "70vh", overflowY: "auto", pb: 2 }}>
                    {/* Sort */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Сортирай
                    </Typography>
                    <RadioGroup value={pendingSort} onChange={(_, v) => setPendingSort(v)}>
                        {sortOptions.map((o) => (
                            <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                        ))}
                    </RadioGroup>
                    <Divider sx={{ my: 2 }} />

                    {/* Category */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Категория
                    </Typography>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.5, mb: 1 }}>
                        {categoriesWithCounts.map((c) => (
                            <FormControlLabel
                                key={c.value}
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={pendingCategory.has(c.value)}
                                        onChange={() => onCategoryToggle(c.value)}
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
                    <Divider sx={{ my: 2 }} />

                    {/* Price */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Цена
                    </Typography>
                    <RadioGroup value={pendingPrice} onChange={(_, v) => setPendingPrice(v)}>
                        {priceOptions.map((o) => (
                            <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                        ))}
                    </RadioGroup>
                    <Divider sx={{ my: 2 }} />

                    {/* Budget */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Бюджет
                    </Typography>
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
                    <Divider sx={{ my: 2 }} />

                    {/* Promo */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Промоции
                    </Typography>
                    <RadioGroup value={pendingPromo} onChange={(_, v) => setPendingPromo(v)}>
                        {promotionOptions.map((o) => (
                            <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                        ))}
                    </RadioGroup>
                    <Divider sx={{ my: 2 }} />

                    {/* Rating */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Рейтинг
                    </Typography>
                    <RadioGroup value={pendingRating} onChange={(_, v) => setPendingRating(v)}>
                        {ratingOptions.map((o) => (
                            <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                        ))}
                    </RadioGroup>
                    <Divider sx={{ my: 2 }} />

                    {/* Type */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Тип
                    </Typography>
                    <RadioGroup value={pendingType} onChange={(_, v) => setPendingType(v)}>
                        {typeOptions.map((o) => (
                            <FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
                        ))}
                    </RadioGroup>
                </Box>

                <Box sx={{ ...styles.cardFooter, borderTop: "1px solid", borderColor: "grey.200", pt: 2 }}>
                    <Button color="inherit" onClick={onClearAll}>
                        Изчисти всички
                    </Button>
                    <Button sx={styles.applyBtn} onClick={onApply}>
                        Приложи
                    </Button>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
};

export default MobileFiltersDrawer;
