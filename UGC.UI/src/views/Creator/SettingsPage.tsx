import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// project imports
import Avatar from "../../ui-component/extended/Avatar";
import SubCard from "../../ui-component/cards/SubCard";
import { getImageUrl } from "../../utils/getImageUrl";

const pageContainerStyles = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function CreatorSettingsPage() {
  const avatarImage = getImageUrl("user-round.svg", "users");
  const [tabValue, setTabValue] = useState("settings");

  const tabs = [
    { value: "profile", label: "Профил", icon: <PersonOutlineIcon fontSize="small" /> },
    { value: "personal", label: "Лични данни", icon: <BadgeOutlinedIcon fontSize="small" /> },
    { value: "account", label: "Акаунт", icon: <AccountBoxOutlinedIcon fontSize="small" /> },
    { value: "password", label: "Парола", icon: <LockOutlinedIcon fontSize="small" /> },
    { value: "settings", label: "Настройки", icon: <SettingsOutlinedIcon fontSize="small" /> },
  ];

  return (
    <Box sx={pageContainerStyles}>
      <Stack spacing={0.4}>
        <Typography variant="h3">Creator Settings</Typography>
        <Typography color="text.secondary">Настройки на профила, сигурност и известия</Typography>
      </Stack>

      <Box>
        <Tabs
          value={tabValue}
          onChange={(_, value) => setTabValue(value)}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-flexContainer": {
              border: "none",
            },
            "& .MuiTab-root": {
              minHeight: "auto",
              minWidth: 10,
              py: 1.5,
              px: 1,
              mr: 2.25,
              textTransform: "none",
              fontWeight: 600,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "primary.main",
            },
            "& .MuiTab-root > svg": {
              marginBottom: "4px !important",
              mr: 1.25,
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} iconPosition="start" label={tab.label} />
          ))}
        </Tabs>
        <Divider />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SubCard
            title={
              <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid>
                  <Avatar alt="Creator" src={avatarImage} size="lg" />
                </Grid>
                <Grid size="grow">
                  <Typography variant="subtitle1">UGC Studio</Typography>
                  <Typography variant="subtitle2">Creator</Typography>
                </Grid>
              </Grid>
            }
          >
            <List component="nav" aria-label="contact details">
              <ListItemButton>
                <ListItemIcon>
                  <MailTwoToneIcon sx={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1">Имейл</Typography>} />
                <Typography variant="subtitle2" align="right">
                  creator@ugc.bg
                </Typography>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <PhonelinkRingTwoToneIcon sx={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1">Телефон</Typography>} />
                <Typography variant="subtitle2" align="right">
                  +359 88 123 4567
                </Typography>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <PinDropTwoToneIcon sx={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="subtitle1">Локация</Typography>} />
                <Typography variant="subtitle2" align="right">
                  София
                </Typography>
              </ListItemButton>
            </List>
          </SubCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <SubCard
                title="Настройки"
                secondary={
                  <Button>
                    <EditOutlinedIcon fontSize="small" />
                  </Button>
                }
              >
                {tabValue === "profile" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="subtitle1">Профил</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Име" placeholder="Иван Иванов" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Псевдоним (handle)" placeholder="@creator" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Категории" placeholder="Beauty, Fitness" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Езици" placeholder="Български, Английски" fullWidth />
                    </Grid>
                    <Grid size={12}>
                      <TextField label="Описание" multiline minRows={3} fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Уебсайт" placeholder="https://myportfolio.com" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Instagram" placeholder="@creator" fullWidth />
                    </Grid>
                    <Grid size={12}>
                      <Button variant="contained">Запази промените</Button>
                    </Grid>
                  </Grid>
                )}

                {tabValue === "personal" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="subtitle1">Лични данни</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Имейл" placeholder="you@example.com" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Телефонен номер" placeholder="+359 88 123 4567" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Локация" placeholder="София, България" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Уебсайт" placeholder="https://myportfolio.com" fullWidth />
                    </Grid>
                    <Grid size={12}>
                      <Button variant="contained">Запази промените</Button>
                    </Grid>
                  </Grid>
                )}

                {tabValue === "account" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="subtitle1">Акаунт</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Език" select fullWidth defaultValue="bg">
                        <MenuItem value="bg">Български</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Статус" placeholder="Активен" fullWidth />
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="subtitle1">Notification настройки</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={1}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Имейл известия" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Push известия" />
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={1}>
                        <FormControlLabel control={<Switch />} label="Съобщения от клиенти" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Маркетинг кампании" />
                      </Stack>
                    </Grid>
                    <Grid size={12}>
                      <Button variant="contained">Запази промените</Button>
                    </Grid>
                  </Grid>
                )}

                {tabValue === "password" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="subtitle1">Промяна на парола</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Текуща парола" type="password" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Нова парола" type="password" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Потвърди новата парола" type="password" fullWidth />
                    </Grid>
                    <Grid size={12}>
                      <Button variant="contained">Запази паролата</Button>
                    </Grid>
                  </Grid>
                )}

                {tabValue === "settings" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="subtitle1">Настройки</Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="subtitle1">Изтриване на акаунт</Typography>
                      <Typography color="text.secondary">
                        Това действие е необратимо. Всички данни и обяви ще бъдат премахнати.
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Button variant="contained" color="error">
                        Изтрий акаунта
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </SubCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
