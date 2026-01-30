import PropTypes from "prop-types";

// material-ui
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// assets
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

// project imports
import MainCard from "../../ui-component/cards/MainCard";
import Accordion from "../../ui-component/extended/Accordion";

// same content as ExploreLanding filters
import {
  categoriesWithCounts,
  sortOptions,
  priceOptions,
  promotionOptions,
  ratingOptions,
  typeOptions,
} from "./ExploreLanding";

// ==============================|| SORT FILTER ||============================== //

function SortFilter({ sort, handelFilter }) {
  return (
    <RadioGroup value={sort} onChange={(_, v) => handelFilter("sort", v)}>
      <Stack spacing={0.25}>
        {sortOptions.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio size="medium" />}
            label={o.label}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
}

// ==============================|| CATEGORY FILTER ||============================== //

function CategoryFilter({ categories, handelFilter }) {
  const hasAll = Array.isArray(categories) && categories.includes("all");
  const handleToggle = (value) => {
    if (value === "all") {
      handelFilter("categories", "all");
      return;
    }
    handelFilter("categories", value);
  };

  return (
    <Stack spacing={0.25}>
      {categoriesWithCounts.map((c) => (
        <FormControlLabel
          key={c.value}
          control={
            <Checkbox
              size="medium"
              checked={
                hasAll
                  ? c.value === "all"
                  : Array.isArray(categories) && categories.includes(c.value)
              }
              onChange={() => handleToggle(c.value)}
            />
          }
          label={
            <Typography component="span" variant="body2">
              {c.label}
              {c.count > 0 && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 0.5 }}
                >
                  ({c.count.toLocaleString("bg-BG")})
                </Typography>
              )}
            </Typography>
          }
        />
      ))}
    </Stack>
  );
}

// ==============================|| PRICE FILTER ||============================== //

function PriceFilter({ price, handelFilter }) {
  return (
    <RadioGroup value={price} onChange={(_, v) => handelFilter("price", v)}>
      <Stack spacing={0.25}>
        {priceOptions.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio size="medium" />}
            label={o.label}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
}

// ==============================|| BUDGET FILTER ||============================== //

function BudgetFilter({ budget, handelFilter }) {
  return (
    <TextField
      fullWidth
      size="small"
      type="number"
      placeholder="0"
      value={budget}
      onChange={(e) => handelFilter("budget", e.target.value)}
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
  );
}

// ==============================|| PROMO FILTER ||============================== //

function PromoFilter({ promo, handelFilter }) {
  return (
    <RadioGroup value={promo} onChange={(_, v) => handelFilter("promo", v)}>
      <Stack spacing={0.25}>
        {promotionOptions.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio size="medium" />}
            label={o.label}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
}

// ==============================|| RATING FILTER ||============================== //

function RatingFilter({ rating, handelFilter }) {
  return (
    <RadioGroup value={rating} onChange={(_, v) => handelFilter("rating", v)}>
      <Stack spacing={0.25}>
        {ratingOptions.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio size="medium" />}
            label={o.label}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
}

// ==============================|| TYPE FILTER ||============================== //

function TypeFilter({ type, handelFilter }) {
  return (
    <RadioGroup value={type} onChange={(_, v) => handelFilter("type", v)}>
      <Stack spacing={0.25}>
        {typeOptions.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio size="medium" />}
            label={o.label}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
}

// ==============================|| PRODUCT FILTER (SIDE) ||============================== //

export default function ProductFilter({ filter, handelFilter }) {
  const matchDownLG = useMediaQuery((theme) => theme.breakpoints.down("xl"));

  const filterData = [
    {
      id: "sort",
      defaultExpand: true,
      title: "Сортирай",
      content: <SortFilter sort={filter.sort} handelFilter={handelFilter} />,
    },
    {
      id: "category",
      defaultExpand: true,
      title: "Категория",
      content: (
        <CategoryFilter categories={filter.categories} handelFilter={handelFilter} />
      ),
    },
    {
      id: "price",
      defaultExpand: true,
      title: "Цена",
      content: <PriceFilter price={filter.price} handelFilter={handelFilter} />,
    },
    {
      id: "budget",
      defaultExpand: true,
      title: "Бюджет",
      content: <BudgetFilter budget={filter.budget} handelFilter={handelFilter} />,
    },
    {
      id: "promo",
      defaultExpand: true,
      title: "Промоции",
      content: <PromoFilter promo={filter.promo} handelFilter={handelFilter} />,
    },
    {
      id: "rating",
      defaultExpand: true,
      title: "Рейтинг",
      content: (
        <RatingFilter rating={filter.rating} handelFilter={handelFilter} />
      ),
    },
    {
      id: "type",
      defaultExpand: true,
      title: "Тип",
      content: <TypeFilter type={filter.type} handelFilter={handelFilter} />,
    },
  ];

  return (
    <MainCard
      content={false}
      sx={{ overflow: "visible" }}
    >
      <CardContent sx={{ p: 1, height: matchDownLG ? "100vh" : "auto" }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Accordion
              defaultExpandedId={null}
              toggle={false}
              expandIcon={<ExpandMoreIcon />}
              data={filterData}
            />
          </Grid>
          <Grid sx={{ m: 1 }} size={12}>
            <Stack
              direction="row"
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button
                variant="text"
                startIcon={<RotateLeftIcon />}
                onClick={() => handelFilter("reset", "")}
                sx={{ width: "100%", color: "info.main", textTransform: "none", fontWeight: 500 }}
              >
                Нулирай
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
}

SortFilter.propTypes = { sort: PropTypes.string, handelFilter: PropTypes.func };
CategoryFilter.propTypes = {
  categories: PropTypes.array,
  handelFilter: PropTypes.func,
};
PriceFilter.propTypes = { price: PropTypes.string, handelFilter: PropTypes.func };
BudgetFilter.propTypes = { budget: PropTypes.string, handelFilter: PropTypes.func };
PromoFilter.propTypes = { promo: PropTypes.string, handelFilter: PropTypes.func };
RatingFilter.propTypes = { rating: PropTypes.string, handelFilter: PropTypes.func };
TypeFilter.propTypes = { type: PropTypes.string, handelFilter: PropTypes.func };
ProductFilter.propTypes = { filter: PropTypes.any, handelFilter: PropTypes.func };
