import { useEffect, useState } from "react";

// material-ui
import { alpha, Avatar, Box, Chip, IconButton, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  IconCurrencyEuro,
  IconStarFilled,
  IconBriefcase2,
} from "@tabler/icons-react";

// project imports
import MainCard from "./MainCard";
import SkeletonProductPlaceholder from "./ProductPlaceholder";
// import { getImageUrl, ImagePath } from "../../utils/getImageUrl";

// assets
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useConfig from "../../themes/context/useConfig";

// external
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ==============================|| PRODUCT CARD ||============================== //

type ProductCardProps = {
  image: string | string[];
  description: string;
  offerPrice: number;
  rating: number;
  reviewCount: number;
  userPicture?: string;
  userFullname?: string;
  finishedProjects?: number;
  capabilities?: string[];
};

export const ProductCard = ({
  image,
  description,
  offerPrice,
  rating,
  reviewCount,
  userPicture,
  userFullname,
  finishedProjects,
  capabilities,
}: ProductCardProps) => {
  const {
    state: { borderRadius },
  } = useConfig();
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  // Custom arrow components for the slider
  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <IconButton
      onClick={onClick}
      sx={(theme) => ({
        position: "absolute",
        left: "2%",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        width: 30,
        height: 30,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        color: theme.palette.common.white,
        border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-50%) scale(1.1)",
        },
        "&:active": {
          transform: "translateY(-50%) scale(0.95)",
        },
      })}
      aria-label="previous image"
    >
      <ArrowBackIosIcon sx={{ fontSize: 18, ml: 0.5 }} />
    </IconButton>
  );

  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <IconButton
      onClick={onClick}
      sx={(theme) => ({
        position: "absolute",
        right: "2%",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        width: 30,
        height: 30,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        color: theme.palette.common.white,
        border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-50%) scale(1.1)",
        },
        "&:active": {
          transform: "translateY(-50%) scale(0.95)",
        },
      })}
      aria-label="next image"
    >
      <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
    </IconButton>
  );

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            borderRadius: `${borderRadius}px`,
            background:
              "linear-gradient(20deg, #2e3228 0%,rgb(88, 87, 70) 100%)",
            "&:hover": {
              boxShadow: borderRadius,
            },
          }}
        >
          {Array.isArray(image) ? (
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={handleSaveToggle}
                sx={(theme) => ({
                  position: "absolute",
                  right: "2%",
                  top: "2%",
                  zIndex: 3,
                  width: 30,
                  height: 30,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(8px)",
                  color: isSaved ? "#ff1744" : theme.palette.common.white,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                    transform: "scale(1.1)",
                    color: "#ff1744",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                })}
                aria-label={isSaved ? "remove from saved" : "save product"}
              >
                {isSaved ? (
                  <FavoriteIcon sx={{ fontSize: 18 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
              <Slider
                dots={false}
                slidesToShow={1}
                arrows={true}
                slidesToScroll={1}
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
              >
                {image.map((imgUrl, i) => (
                  <Box key={i}>
                    <CardMedia
                      image={imgUrl}
                      sx={{
                        height: 220,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        borderRadius: `${borderRadius}px  ${borderRadius}px 0 0`,
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
          ) : (
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={handleSaveToggle}
                sx={(theme) => ({
                  position: "absolute",
                  right: "2%",
                  top: "2%",
                  zIndex: 3,
                  width: 30,
                  height: 30,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(8px)",
                  color: isSaved ? "#ff1744" : theme.palette.common.white,
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                    transform: "scale(1.1)",
                    color: "#ff1744",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                })}
                aria-label={isSaved ? "remove from saved" : "save product"}
              >
                {isSaved ? (
                  <FavoriteIcon sx={{ fontSize: 18 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
              <CardMedia
                image={image}
                sx={{
                  height: 220,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: `${borderRadius}px  ${borderRadius}px 0 0`,
                }}
              />
            </Box>
          )}
          <CardContent
            sx={{
              p: 2,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-6px",
                left: 0,
                right: 0,
                height: "50px",
                // Use a noisy/messy mask for a messy blur instead of a linear gradient
                background: `
                  radial-gradient(circle at 30% 30%, rgba(46,50,40,0.94) 0%, rgba(46,50,40,0.50) 50%, transparent 85%),
                  radial-gradient(circle at 70% 70%, rgba(46,50,40,0.8) 0%, rgba(46,50,40,0.2) 50%, transparent 90%),
                  radial-gradient(circle at 55% 20%, rgba(46,50,40,0.7) 0%, transparent 65%),
                  repeating-linear-gradient(120deg, rgba(46,50,40,0.2) 0px, rgba(46,50,40,0.08) 10px, transparent 21px)
                `,
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                pointerEvents: "none",
                zIndex: 1,
                // jagged, organic edge on the bottom
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 75%, 85% 95%, 70% 90%, 55% 98%, 40% 92%, 20% 100%, 0% 93%)",
              },
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ position: "relative", zIndex: 2 }}
            >
              <Grid size={12}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center" }}
                >
                  {userPicture && (
                    <Avatar
                      src={userPicture}
                      alt="User"
                      sx={{
                        width: 32,
                        height: 32,
                      }}
                    />
                  )}
                  <Stack direction="column" alignContent="center">
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={(theme) => ({
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                        textDecoration: "none",
                        flex: 1,
                        fontWeight: 600,
                        color: theme.palette.common.white,
                      })}
                    >
                      {userFullname}
                    </Typography>
                    <Stack direction="row" spacing={2} alignContent="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          color: theme.palette.common.white,
                        }}
                      >
                        <IconCurrencyEuro
                          size={16}
                          style={{ color: theme.palette.common.white }}
                        />
                        {offerPrice}/ч.
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          color: theme.palette.common.white,
                        }}
                      >
                        <IconStarFilled
                          size={16}
                          style={{ color: "#FFD700" }}
                        />
                        {rating} ({reviewCount})
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          color: theme.palette.common.white,
                        }}
                      >
                        <IconBriefcase2
                          size={16}
                          style={{ color: theme.palette.common.white }}
                        />
                        {finishedProjects}
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              {description && (
                <Grid size={12}>
                  {description && description.length > 90 ? (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={(theme) => ({
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          height: 45,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          color: theme.palette.common.white,
                        })}
                        title={description}
                      >
                        {description}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={(theme) => ({
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        height: 45,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        color: theme.palette.common.white,
                      })}
                    >
                      {description}
                    </Typography>
                  )}
                </Grid>
              )}
              <Grid size={12} sx={{ px: 2 }}>
                <Slider arrows={true} variableWidth={true}>
                  {capabilities?.map((capability, index) => (
                    <Box key={index}>
                      <Chip
                        label={capability}
                        size="small"
                        color="secondary"
                        sx={{ m: 0.5 }}
                      />
                    </Box>
                  ))}
                </Slider>
              </Grid>
              <Grid size={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={(theme) => ({
                    fontWeight: "bold",
                    color: theme.palette.common.black,
                    backgroundColor: theme.palette.common.white,
                    borderRadius,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hoverOpacity,
                    },
                  })}
                >
                  Към профила
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default ProductCard;
