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
  IconBriefcase2Filled,
} from "@tabler/icons-react";

export type TalentCard3Props = {
  name?: string;
  title?: string;
  rate?: string;
  ratingValue?: number;
  ratingCountText?: string;
  experienceText?: string;
  finishedProjectsText?: string;
  description?: string;
  imageUrl?: string;
  avatarUrl?: string;
  onFavoriteClick?: () => void;
};

export const TalentCard3 = ({
  name,
  title,
  rate,
  ratingValue,
  ratingCountText,
  finishedProjectsText,
  description,
  imageUrl,
  avatarUrl,
  onFavoriteClick,
}: TalentCard3Props) => {
  const IMAGE_H = 230;

  return (
    <Card
      elevation={4}
      sx={{
        width: 320,
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        bgcolor: "#fff",
      }}
    >
      {/* Top image with padding */}
      <Box sx={{ p: 2, pb: 0 }}>
        <Box
          sx={{
            height: IMAGE_H,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "14px",
          }}
        />
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
        <Stack direction="row" alignItems="center" justifyContent="start">
          {/* Avatar bubble */}
          <Avatar src={avatarUrl || imageUrl} />

          {/* Name and title */}
          <Stack direction="column" flexGrow={1} ml={1}>
            <Typography
              sx={{
                color: "#2f343a",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.1,
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                color: "rgba(47, 52, 58, 0.7)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
          </Stack>

          {/* Heart Icon */}
          <IconButton
            onClick={onFavoriteClick}
            aria-label="favorite"
          >
            <FavoriteBorderRoundedIcon sx={{ fontSize: 30, color: "#2f343a" }} />
          </IconButton>
        </Stack>


        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1.6 }}
        >
          {/* Stars + rating left, price right */}
          <Stack direction="column" spacing={0.5} justifyContent="start">
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
                ({ratingCountText} ревюта)
              </Box>
            </Typography>
          </Stack>

          {/* Price row + projects row */}
          <Stack direction="column">
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

            <Stack direction="row" spacing={0.8} alignItems="center">
              <IconBriefcase2Filled size={15} />
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

export default TalentCard3;
