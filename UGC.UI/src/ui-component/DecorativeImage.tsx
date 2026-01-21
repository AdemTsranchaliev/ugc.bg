import { Box, CardMedia } from "@mui/material";

type DecorativeImageProps = {
  image: string;
  top?: string | number;
  left?: string | number;
  width?: string | number;
  height?: string | number;
  zIndex?: number;
  opacity?: string | number;
  alt?: string;
};

export const DecorativeImage = ({
  image,
  top = "0%",
  left = "0%",
  width = "200px",
  height = "200px",
  zIndex = -1,
  opacity = "0.3",
  alt = "Layer",
}: DecorativeImageProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left,
        width,
        height,
        zIndex,
        opacity,
      }}
    >
      <CardMedia component="img" image={image} alt={alt} />
    </Box>
  );
};

export default DecorativeImage;
