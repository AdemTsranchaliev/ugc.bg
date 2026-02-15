import { useState } from "react";
import {
  Alert,
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
  type SelectChangeEvent,
  type Theme,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  IconMail,
  IconDeviceMobile,
  IconLiveView,
  IconEye,
  IconEyeClosed,
} from '@tabler/icons-react';

// project imports
import SubCard from "../../ui-component/cards/SubCard";
import User1 from "/assets/images/users/user-round.svg";
import { StyledSwitch } from "../../ui-component/StyledSwitch";


const pageContainerStyles = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 3,
  py: 4,
};

const tabs = [
  { value: "profile", label: "Профил", icon: <PersonOutlineIcon fontSize="small" /> },
  { value: "personal", label: "Лични данни", icon: <BadgeOutlinedIcon fontSize="small" /> },
  { value: "password", label: "Парола", icon: <LockOutlinedIcon fontSize="small" /> },
  { value: "settings", label: "Общи настройки", icon: <TuneOutlinedIcon fontSize="small" /> },
];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export const CreatorSettingsPage = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState("profile");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [newSocialLink, setNewSocialLink] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleAddSocialLink = () => {
    const trimmed = newSocialLink.trim();
    if (trimmed) {
      setSocialLinks((prev) => [...prev, trimmed]);
      setNewSocialLink("");
    }
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={pageContainerStyles}>
      <Stack spacing={0.4}>
        <Typography variant="h1">Настройки на профил</Typography>
        <Typography color="text.secondary">Настройте своите лични данни, парола и общи настройки.</Typography>
      </Stack>

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

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <SubCard
            title={
              <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid>
                  <Avatar src={User1} alt="Creator" sx={{ width: 80, height: 80 }} />
                </Grid>
                <Grid size="grow">
                  <Typography variant="h3">Elen Petrov</Typography>
                  <Typography variant="subtitle1" color="blue" fontWeight={600}>Creator</Typography>
                </Grid>
              </Grid>
            }
            sx={{ borderRadius: 6 }}
          >
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  borderBottom: '1px solid #fff',
                  pb: 1,
                  "&:hover": {
                    borderColor: 'primary.main',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                    color: "primary.main",
                    "& svg": { fontSize: 28 },
                  }}
                >
                  <IconMail />
                </Box>
                <Stack direction="column" alignItems="start">
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>ИМЕЙЛ</Typography>
                  <Typography variant="h4" color="text.primary">
                    creator@ugc.bg
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  borderBottom: '1px solid #fff',
                  pb: 1,
                  "&:hover": {
                    borderColor: 'primary.main',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (theme) => alpha(theme.palette.success.dark, 0.2),
                    color: "success.dark",
                    "& svg": { fontSize: 28 },
                  }}
                >
                  <IconDeviceMobile />
                </Box>
                <Stack direction="column" alignItems="start">
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>ТЕЛЕФОН</Typography>
                  <Typography variant="h4" color="text.primary">
                    +359 88 123 4567
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  borderBottom: '1px solid #fff',
                  pb: 1,
                  "&:hover": {
                    borderColor: 'primary.main',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                    color: "secondary.main",
                    "& svg": { fontSize: 28 },
                  }}
                >
                  <IconLiveView />
                </Box>
                <Stack direction="column" alignItems="start">
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>ЛОКАЦИЯ</Typography>
                  <Typography variant="h4" color="text.primary">
                    ул. "Георги Димитров" 12, София
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </SubCard>
        </Grid>

        {/* Settings Card */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <SubCard sx={{ borderRadius: 6 }}>
                {tabValue === "profile" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="h4">Профил</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Имена" placeholder="Иван Иванов" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField label="Таг" placeholder="@creator" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Категории</InputLabel>
                        <Select
                          multiple
                          value={personName as any}
                          onChange={handleChange}
                          input={<OutlinedInput label="Категории" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value: string) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, personName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Говорими езици</InputLabel>
                        <Select
                          multiple
                          value={personName as any}
                          onChange={handleChange}
                          input={<OutlinedInput label="Говорими езици" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value: string) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {names.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, personName, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={12}>
                      <TextField label="Описание" multiline minRows={3} fullWidth />
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="h5" sx={{ mb: 1.5 }}>
                        Социални мрежи
                      </Typography>
                      <Stack spacing={1.5}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: "100%" }}>
                          <FormControl sx={{ width: 350 }}>
                            <InputLabel>Тип на социална мрежа</InputLabel>
                            <Select label="Тип на социална мрежа" defaultValue="">
                              <MenuItem value="instagram">Instagram</MenuItem>
                              <MenuItem value="tiktok">TikTok</MenuItem>
                              <MenuItem value="youtube">YouTube</MenuItem>
                              <MenuItem value="facebook">Facebook</MenuItem>
                              <MenuItem value="twitter">Twitter</MenuItem>
                              <MenuItem value="linkedin">LinkedIn</MenuItem>
                              <MenuItem value="github">GitHub</MenuItem>
                              <MenuItem value="website">Website</MenuItem>
                              <MenuItem value="other">Other</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            label="Връзка"
                            placeholder="https://instagram.com/creator"
                            fullWidth
                            value={newSocialLink}
                            onChange={(e) => setNewSocialLink(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddSocialLink();
                              }
                            }}
                          />
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddSocialLink}
                            sx={{ flexShrink: 0, minWidth: 120 }}
                          >
                            Добави
                          </Button>
                        </Stack>
                        {socialLinks.map((link, index) => (
                          <Stack
                            key={index}
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{
                              py: 0.75,
                              px: 1.5,
                              borderRadius: 1,
                              bgcolor: "action.hover",
                            }}
                          >
                            <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                              {link}
                            </Typography>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRemoveSocialLink(index)}
                              aria-label="Премахни връзка"
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        ))}
                      </Stack>
                    </Grid>
                    <Grid size={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="contained">Запази промените</Button>
                    </Grid>
                  </Grid>
                )}

                {tabValue === "personal" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="h4">Лични данни</Typography>
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
                    <Grid size={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="contained">Запази промените</Button>
                    </Grid>
                  </Grid>
                )}

                {tabValue === "password" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="h4">Промяна на парола</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Текуща парола</InputLabel>
                        <OutlinedInput
                          label="Текуща парола"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                              >
                                {showPassword ? <IconEyeClosed stroke={2} /> : <IconEye stroke={2} />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Нова парола</InputLabel>
                        <OutlinedInput
                          label="Нова парола"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                              >
                                {showPassword ? <IconEyeClosed stroke={2} /> : <IconEye stroke={2} />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Потвърди новата парола</InputLabel>
                        <OutlinedInput
                          label="Потвърди новата парола"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                              >
                                {showPassword ? <IconEyeClosed stroke={2} /> : <IconEye stroke={2} />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="contained">Запази паролата</Button>
                    </Grid>
                  </Grid>
                )}

                {tabValue === "settings" && (
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <Typography variant="h4">Известия</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          backgroundColor: "#f8fafc",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="h4">Имейл известия</Typography>
                        <StyledSwitch defaultChecked />
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          backgroundColor: "#f8fafc",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="h4">Push известия</Typography>
                        <StyledSwitch defaultChecked />
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          backgroundColor: "#f8fafc",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="h4">Съобщения от клиенти</Typography>
                        <StyledSwitch defaultChecked />
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          backgroundColor: "#f8fafc",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="h4">Маркетинг кампании</Typography>
                        <StyledSwitch defaultChecked />
                      </Stack>
                    </Grid>

                    <Grid size={12}>
                      <Divider />
                    </Grid>

                    <Grid size={12}>
                      <Alert
                        severity="error"
                        sx={{
                          alignItems: "start",
                          "& .MuiAlert-message": { flex: 1, minWidth: 0, width: "100%" },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Typography variant="h5" color="red" fontWeight={600}>Изтриване на акаунт</Typography>
                            <Typography color="text.secondary">
                              Това действие е необратимо. Всички данни и обяви ще бъдат премахнати.
                            </Typography>
                          </Box>
                          <Button variant="outlined" color="error">
                            Изтрий акаунта
                          </Button>
                        </Stack>
                      </Alert>
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
};

export default CreatorSettingsPage;
