import {
  Avatar,
  Box,
  Card,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import {
  IconCurrencyEuro,
  IconSquareRoundedCheckFilled,
  IconBriefcase2Filled,
} from "@tabler/icons-react";

export type TalentCard1Props = {
  name: string;
  title: string;
  rate: string;
  ratingValue: number;
  ratingCountText: string;
  experienceText: string;
  finishedProjectsText: string;
  description: string;
  imageUrl: string;
  avatarUrl: string;
  onFavoriteClick?: () => void;
};

export const TalentCard1 = ({
  name,
  title,
  rate,
  ratingValue,
  ratingCountText,
  experienceText,
  finishedProjectsText,
  description,
  imageUrl,
  avatarUrl,
  onFavoriteClick,
}: TalentCard1Props) => {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: { xs: "14px", md: "28px" },
        overflow: "hidden",
        position: "relative",
        bgcolor: "#fff",
        boxShadow: {
          xs: "0 8px 24px rgba(0,0,0,0.12)",
          md: "0 18px 44px rgba(0,0,0,0.16)",
        },
        "&:hover": {
          boxShadow: "0 24px 48px rgba(0,0,0,0.24)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      {/* Top image */}
      <Box
        sx={{
          height: { xs: 130, md: 230 },
          position: "relative",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Heart */}
        <IconButton
          onClick={onFavoriteClick}
          aria-label="favorite"
          sx={{
            position: "absolute",
            top: { xs: 8, md: 14 },
            right: { xs: 8, md: 14 },
            width: { xs: 28, md: 36 },
            height: { xs: 28, md: 36 },
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: { xs: "8px", md: "12px" },
            boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          <FavoriteBorderRoundedIcon
            sx={{ fontSize: { xs: 16, md: 20 }, color: "#2f343a" }}
          />
        </IconButton>
      </Box>

      {/* Avatar bubble (half-hidden under the dark panel) */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: 10, md: 18 },
          top: { xs: 100, md: 200 },
          width: { xs: 38, md: 52 },
          height: { xs: 38, md: 52 },
          borderRadius: "50%",
          bgcolor: "#fff",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
          zIndex: 3,
        }}
      >
        <Avatar
          src={avatarUrl || imageUrl}
          sx={{ width: { xs: 30, md: 42 }, height: { xs: 30, md: 42 } }}
        />
      </Box>

      {/* Bottom panel (solid, straight top edge) */}
      <Box
        sx={{
          bgcolor: "#fff",
          px: { xs: 1.25, md: 2.6 },
          pt: { xs: 1.4, md: 2.6 },
          pb: { xs: 1.2, md: 2.4 },
          borderRadius: { xs: "0 0 14px 14px", md: "0 0 28px 28px" },
        }}
      >
        <Typography
          sx={{
            color: "#2f343a",
            fontWeight: 500,
            fontSize: { xs: 14, md: 22 },
            lineHeight: 1.1,
            mt: { xs: 0.4, md: 0.6 },
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            color: "rgba(47, 52, 58, 0.7)",
            fontSize: { xs: 11, md: 14 },
            fontWeight: 600,
            mt: { xs: 0.25, md: 0.4 },
          }}
        >
          {title}
        </Typography>

        {/* Stars + rating left, price right */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent={{ xs: "start", md: "space-between" }}
          sx={{ mt: { xs: 0.8, md: 1.6 } }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Rating
              value={ratingValue}
              precision={0.1}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": { color: "#f5c84c" },
                "& .MuiRating-iconEmpty": {
                  color: "rgba(255,255,255,0.18)",
                },
                "& .MuiRating-icon": {
                  fontSize: { xs: 14, md: "inherit" },
                },
              }}
            />
            <Typography
              sx={{
                color: "#2f343a",
                fontSize: { xs: 10, md: 13 },
                fontWeight: 700,
              }}
            >
              {ratingValue.toFixed(1)}{" "}
              <Box component="span" sx={{ color: "rgba(47, 52, 58, 0.6)" }}>
                ({ratingCountText})
              </Box>
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Typography
              sx={{
                color: "rgba(47, 52, 58, 0.75)",
                fontSize: { xs: 10, md: "inherit" },
                mr: 0.5,
              }}
            >
              от
            </Typography>
            <Box
              component="span"
              sx={{ display: "inline-flex", "& svg": { width: { xs: 18, md: 25 }, height: { xs: 18, md: 25 } } }}
            >
              <IconCurrencyEuro size={25} stroke={3} />
            </Box>
            <Typography
              sx={{
                color: "#2f343a",
                fontSize: { xs: 13, md: 18 },
                fontWeight: 900,
                letterSpacing: 0.2,
              }}
            >
              {rate}/ч.
            </Typography>
          </Stack>
        </Stack>

        {/* Experience row + projects row */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent={{ xs: "start", md: "space-between" }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Box sx={{ display: "inline-flex", "& svg": { width: { xs: 12, md: 15 }, height: { xs: 12, md: 15 } } }}>
              <IconBriefcase2Filled size={15} />
            </Box>
            <Typography
              sx={{
                color: "#2f343a",
                fontSize: { xs: 10, md: 13 },
                fontWeight: 700,
              }}
            >
              {experienceText} г. опит
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <Box sx={{ display: "inline-flex", "& svg": { width: { xs: 12, md: 15 }, height: { xs: 12, md: 15 } } }}>
              <IconSquareRoundedCheckFilled size={15} />
            </Box>
            <Typography
              sx={{
                color: "#2f343a",
                fontSize: { xs: 10, md: 13 },
                fontWeight: 700,
              }}
            >
              {finishedProjectsText} проекта
            </Typography>
          </Stack>
        </Stack>

        {/* Description */}
        <Typography
          sx={{
            mt: { xs: 0.7, md: 1.4 },
            color: "rgba(47, 52, 58, 0.75)",
            fontSize: { xs: 10.5, md: 13 },
            lineHeight: 1.35,
            textWrap: "pretty",
            display: "-webkit-box",
            WebkitLineClamp: { xs: 2, md: 3 },
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: { xs: "calc(1.35em * 2)", md: "calc(1.35em * 3)" },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Card>
  );
};

export default TalentCard1;
