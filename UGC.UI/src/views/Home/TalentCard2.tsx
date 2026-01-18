import {
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
import Avatar from "../../ui-component/extended/Avatar";

export type TalentCard2Props = {
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

export const TalentCard2 = ({
  name,
  title,
  rate,
  ratingValue,
  ratingCountText,
  experienceText,
  finishedProjectsText,
  description,
  imageUrl,
  onFavoriteClick,
}: TalentCard2Props) => {
  const CARD_HEIGHT = 440;

  return (
    <Card
      elevation={0}
      sx={{
        width: 320,
        height: CARD_HEIGHT,
        borderRadius: "28px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 18px 44px rgba(0,0,0,0.16)",
      }}
    >
      {/* Avatar bubble (half-hidden under the dark panel) */}
      <Box
        sx={{
          position: "absolute",
          left: 18,
          top: CARD_HEIGHT - 240,
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
        <Avatar
          src={imageUrl}
          sx={{ width: 42, height: 42 }}
          className="avatar"
          color="success"
          outline
          size="md"
        />
      </Box>
      {/* Full card image */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Heart icon - top right */}
        <IconButton
          onClick={onFavoriteClick}
          aria-label="favorite"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            width: 32,
            height: 32,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: "50%",
            boxShadow: 2,
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.6)",
            },
          }}
        >
          <FavoriteBorderRoundedIcon sx={{ fontSize: 18, color: "#424242" }} />
        </IconButton>

        {/* Bottom Info Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            p: 2.5,
            background: "rgba(32, 32, 32, 0.4)",
            backdropFilter: "blur(4px)",
            borderTop: "2px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Name */}
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              mb: 0.5,
            }}
          >
            {name}
          </Typography>

          {/* Title */}
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "0.875rem",
              mb: 1.5,
            }}
          >
            {title}
          </Typography>

          {/* Stars + rating left, price right */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1.2 }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Rating
                value={ratingValue}
                precision={0.1}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": { color: "#FFD700" },
                  "& .MuiRating-iconEmpty": {
                    color: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {ratingValue.toFixed(1)}{" "}
                <Box
                  component="span"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  ({ratingCountText})
                </Box>
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  mr: 0.5,
                  fontSize: 13,
                }}
              >
                от
              </Typography>
              <IconCurrencyEuro
                size={20}
                stroke={3}
                style={{ color: "#fff" }}
              />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 16,
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
            sx={{ mb: 1.2 }}
          >
            <Stack direction="row" spacing={0.8} alignItems="center">
              <IconBriefcase2Filled size={15} style={{ color: "#fff" }} />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {experienceText} г. опит
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.8} alignItems="center">
              <IconSquareRoundedCheckFilled
                size={15}
                style={{ color: "#fff" }}
              />
              <Typography
                sx={{
                  color: "#fff",
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
              color: "rgba(255, 255, 255, 0.9)",
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
      </Box>
    </Card>
  );
};

export default TalentCard2;
