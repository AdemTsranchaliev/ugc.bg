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
  const IMAGE_H = 230;

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "28px",
        overflow: "hidden",
        position: "relative",
        bgcolor: "#fff",
        boxShadow: "0 18px 44px rgba(0,0,0,0.16)",
      }}
    >
      {/* Top image */}
      <Box
        sx={{
          height: IMAGE_H,
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
            top: 14,
            right: 14,
            width: 36,
            height: 36,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: "12px",
            boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          <FavoriteBorderRoundedIcon sx={{ fontSize: 20, color: "#2f343a" }} />
        </IconButton>
      </Box>

      {/* Avatar bubble (half-hidden under the dark panel) */}
      <Box
        sx={{
          position: "absolute",
          left: 18,
          top: IMAGE_H - 30,
          width: 52,
          height: 52,
          borderRadius: "50%",
          bgcolor: "#fff",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
          zIndex: 3,
        }}
      >
        <Avatar src={avatarUrl || imageUrl} sx={{ width: 42, height: 42 }} />
      </Box>

      {/* Bottom panel (solid, straight top edge) */}
      <Box
        sx={{
          bgcolor: "#fff",
          px: 2.6,
          pt: 2.6,
          pb: 2.4,
          borderRadius: "0 0 28px 28px",
        }}
      >
        <Typography
          sx={{
            color: "#2f343a",
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1.1,
            mt: 0.6,
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            color: "rgba(47, 52, 58, 0.7)",
            fontSize: 14,
            fontWeight: 600,
            mt: 0.4,
          }}
        >
          {title}
        </Typography>

        {/* Stars + rating left, price right */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1.6 }}
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
              }}
            />
            <Typography
              sx={{
                color: "#2f343a",
                fontSize: 13,
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
                mr: 0.5,
              }}
            >
              от
            </Typography>
            <IconCurrencyEuro size={25} stroke={3} />
            <Typography
              sx={{
                color: "#2f343a",
                fontSize: 18,
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
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={0.8} alignItems="center">
            <IconBriefcase2Filled size={15} />
            <Typography
              sx={{
                color: "#2f343a",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {experienceText} г. опит
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.8} alignItems="center">
            <IconSquareRoundedCheckFilled size={15} />
            <Typography
              sx={{
                color: "#2f343a",
                fontSize: 13,
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
            mt: 1.4,
            color: "rgba(47, 52, 58, 0.75)",
            fontSize: 13,
            lineHeight: 1.35,
            textWrap: "pretty",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: 'calc(1.35em * 3)', // Ensures visually limited to 3 lines
          }}
        >
          {description}
        </Typography>
      </Box>
    </Card>
  );
};

export default TalentCard1;
