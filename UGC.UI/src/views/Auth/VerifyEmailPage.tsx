import { Link } from "react-router";
import { Box, Button, CardMedia, Divider, Stack, Typography } from "@mui/material";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

// project imports
import StyledPage from "../../ui-component/StyledPage";

// assets
import { IconMail, IconArrowNarrowLeft } from '@tabler/icons-react';
import MailOpenOutline from "/assets/images/general/mail-open-outline.svg";

export default function VerifyEmailPage() {
  return (
    <StyledPage>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          boxSizing: "border-box",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          borderBottomLeftRadius: 24,
          borderTopLeftRadius: 24,
        }}
      >
        {/* Left panel - promotional */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderBottomLeftRadius: 24,
            borderTopLeftRadius: 24,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            display: { xs: "none", md: "flex" },
            flex: { xs: "0 0 auto", md: "1 1 40%" },
            flexDirection: "column",
            justifyContent: "end",
            gap: 2,
            p: 3,
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url("/assets/images/general/abstract-2.jpg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              pointerEvents: "none",
            },
            "&:after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
            }}
          >
            <FormatQuoteRoundedIcon
              sx={{
                fontSize: 56,
                color: "rgba(255,255,255,0.9)",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1.3,
                mb: 2,
                textWrap: "pretty",
                fontSize: "1.2rem",
              }}
            >
              "Сигурността на вашия профил е наш приоритет. Потвърдете самоличността си, за да отключите пълния потенциал на UGC.BG."
            </Typography>
          </Box>
        </Box>

        {/* Right panel - form */}
        <Box
          sx={{
            flex: { xs: "1 1 auto", md: "1 1 50%" },
            width: { xs: "100%", md: "auto" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // bgcolor: "#f9fafb",
            py: { xs: 4, md: 6 },
            px: { xs: 2, sm: 4 },
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            borderBottomLeftRadius: { xs: 24, md: 0 },
            borderTopLeftRadius: { xs: 24, md: 0 },
          }}
        >
          <Box sx={{ width: "100%", position: "relative" }}>
            <Stack spacing={1} gap={2} sx={{ mb: 5, alignItems: "center", textAlign: "center" }}>
              <Box
                sx={{
                  backgroundColor: "rgba(243, 238, 248, 0.7)",
                  borderRadius: "50%",
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)", // Safari
                  border: "1px solid rgba(255,255,255,0.35)",
                  boxShadow: "0 10px 40px rgba(243, 238, 248, 0.7)",
                }}
              >
                {/* <IconMail stroke={1.25} size={50} color="#5d24b7" /> */}
                <CardMedia
                  component="img"
                  image={MailOpenOutline}
                  alt="Mail Open Outline"
                  sx={{ width: 50, height: 50 }}
                />
              </Box>
              <Typography variant="h1">
                Потвърди имейл
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Моля натиснете бутона по-долу за да потвърдете вашият имейл адрес - <Box component="span" sx={{ fontWeight: "bold", color: "black" }}>ivan.ivanov@gmail.com</Box>, за да продължите.
              </Typography>
            </Stack>

            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "100%",
                mb: 3,
                bgcolor: "#261846",
                "&:hover": { bgcolor: "grey.800" },
              }}
            >
              Потвърди
            </Button>

            <Divider sx={{ mb: 2 }} />

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover .back-arrow": {
                    color: "black",
                    transform: "translateX(-4px)",
                  },
                  "&:hover .back-text": {
                    color: "black",
                  },
                }}
              >
                <Link
                  to="/auth"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "inherit",
                  }}
                >
                  <Box
                    className="back-arrow"
                    component="span"
                    sx={{
                      display: "inline-flex",
                      color: "grey.600",
                      transition: "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                    }}
                  >
                    <IconArrowNarrowLeft stroke={1.25} size={20} color="currentColor" />
                  </Box>
                  <Typography
                    className="back-text"
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      transition: "color 0.3s ease-in-out",
                    }}
                  >
                    Върнете се към Вход
                  </Typography>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </StyledPage>
  );
}
