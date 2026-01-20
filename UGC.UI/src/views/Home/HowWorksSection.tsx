// material-ui
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// assets
import { IconCircleCheck } from "@tabler/icons-react";

import LayerLeft from "/assets/images/landing/customization-left.png";
import LayerRight from "/assets/images/landing/customization-right.png";

import useConfig from "../../themes/context/useConfig";

// ==============================|| LANDING - CUSTOMIZE ||============================== //

export const HowWorksSection = () => {
  const {
    state: { borderRadius },
  } = useConfig();

  const listSX = {
    display: "flex",
    gap: "0.7rem",
    padding: "10px 0",
    fontSize: "1rem",
    color: "grey.900",
    svg: { color: "secondary.main", minWidth: 20 },
  };

  return (
    <Box
      component="section"
      sx={{
        mt: 8,
        pt: 2,
        backgroundColor: "#eef2f6",
        borderRadius: borderRadius,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 500,
          mb: 1,
          px: 2,
        }}
      >
        Как работи
        <Box component="span" sx={{ ml: 1, color: "#5b84fa" }}>
          Платформата
        </Box>
      </Typography>

      <Grid
        container
        spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}
        sx={{ justifyContent: "space-between", alignItems: "center", px: 4 }}
      >
        <Grid sx={{ img: { width: "100%" } }} size={{ xs: 12, md: 6 }}>
          <Stack sx={{ width: "50%", mb: 5, mx: "auto" }}>
            <CardMedia component="img" image={LayerLeft} alt="Layer" />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2.5}>
            <Grid size={12}>
              <Typography
                variant="h3"
                sx={{
                  color: "text.primary",
                  fontSize: "1rem",
                  zIndex: "99",
                  width: { xs: "100%", sm: "100%", md: "calc(100% - 20%)" },
                }}
              >
                Апликацията свързва бизнеси и UGC създатели в лесен за
                използване marketplace, фокусиран върху автентично съдържание.
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Бизнесите създават кампании с ясни цели и изисквания за
                съдържание.
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Създателите разглеждат проекти и кандидатстват според уменията
                си.
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Профилите включват портфолио, опит и реални примери за
                съдържание.
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Цялата комуникация и предаване на съдържание става в
                платформата.
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Бизнесите одобряват и използват съдържанието за маркетинг
                цели.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid
            container
            spacing={2.5}
            direction={{ xs: "column-reverse", md: "row" }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={2.5}>
                <Grid size={12}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "text.primary",
                      fontSize: "1rem",
                      zIndex: "99",
                      width: { xs: "100%", md: "calc(100% - 20%)" },
                    }}
                  >
                    Платформата оптимизира процеса на работа и улеснява
                    създаването на UGC съдържание.
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography sx={listSX}>
                    <IconCircleCheck size={20} />
                    UGC създателите могат да работят без нужда от голяма
                    аудитория.
                  </Typography>
                  <Typography sx={listSX}>
                    <IconCircleCheck size={20} />
                    Бизнесите получават мащабируемо и автентично съдържание за
                    бранда си.
                  </Typography>
                  <Typography sx={listSX}>
                    <IconCircleCheck size={20} />
                    Ясни задания, срокове и очаквания за всяка кампания.
                  </Typography>
                  <Typography sx={listSX}>
                    <IconCircleCheck size={20} />
                    Сигурни плащания и прозрачни условия за работа.
                  </Typography>
                  <Typography sx={listSX}>
                    <IconCircleCheck size={20} />
                    Лесно изграждане на дългосрочни партньорства между страни.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ img: { width: "100%" } }} size={{ xs: 12, md: 6 }}>
              <Stack sx={{ width: "50%", mx: "auto" }}>
                <CardMedia component="img" image={LayerRight} alt="Layer" />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowWorksSection;
