import { useEffect, useState } from "react";
import { Link } from "react-router";

// material-ui
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project imports
import MainCard from "./MainCard";
import SkeletonProductPlaceholder from "./ProductPlaceholder";
// import { getImageUrl, ImagePath } from "../../utils/getImageUrl";

// assets
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import useConfig from "../../themes/context/useConfig";

// ==============================|| PRODUCT CARD ||============================== //

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  description: string;
  offerPrice: number;
  salePrice: number;
  rating: number;
};

export const ProductCard = ({
  id,
  name,
  image,
  description,
  offerPrice,
  salePrice,
  rating,
}: ProductCardProps) => {
  const {
    state: { borderRadius },
  } = useConfig();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            borderRadius,
            "&:hover": {
              transform: "scale3d(1.02, 1.02, 1)",
              transition: "all .4s ease-in-out",
            },
          }}
        >
          <CardMedia
            image={image}
            // image={image && getImageUrl(`${image}`, ImagePath.ECOMMERCE)}
            component={Link}
            to={`#`}
            sx={{
              height: 220,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Typography
                  component={Link}
                  to={`#`}
                  variant="subtitle1"
                  noWrap
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  {name}
                </Typography>
              </Grid>
              {description && (
                <Grid size={12}>
                  <Typography
                    variant="body2"
                    sx={{ overflow: "hidden", height: 45 }}
                  >
                    {description}
                  </Typography>
                </Grid>
              )}
              <Grid sx={{ pt: "8px !important" }} size={12}>
                <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                  <Rating
                    precision={0.5}
                    name="size-small"
                    value={rating}
                    size="small"
                    readOnly
                  />
                  <Typography variant="caption">
                    ({Math.round(Number(offerPrice))}+)
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={12}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Grid container spacing={1}>
                    <Grid>
                      <Typography variant="h4">${offerPrice}</Typography>
                    </Grid>
                    {salePrice && (
                      <Grid>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "grey.500",
                            textDecoration: "line-through",
                          }}
                        >
                          ${salePrice}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{ minWidth: 0 }}
                    aria-label="product add to cart"
                  >
                    <ShoppingCartTwoToneIcon fontSize="small" />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default ProductCard;
