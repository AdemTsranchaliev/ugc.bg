
// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// project imports
import useConfig from "../themes/context/useConfig";
import { Button, } from "@mui/material";

export const PageSearch = () => {
    const {
        state: { borderRadius },
    } = useConfig();

    return (
        <Box sx={{ position: "relative", pb: 4 }}>
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    width: "100%",
                    height: 240,
                    p: 2,
                    borderRadius,
                    "&:before": {
                        content: '""',
                        position: "absolute",
                        zIndex: 0,
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url("/assets/images/general/light-bg.png")`,
                        backgroundSize: "cover",
                        backgroundPosition: "bottom",
                        filter: "blur(6px) brightness(0.8)",
                        transform: "scale(1.1)",
                        backgroundRepeat: "no-repeat",
                        pointerEvents: "none",
                    },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    },
                }}
            />
            {/* Filter Section */}
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    width: "90%",
                }}
            >
                {/* Title */}
                <Typography variant="h2" sx={{ px: 2, fontWeight: 500, color: "#fff" }}>
                    Открийте творци или услуги чрез търсене
                </Typography>

                {/* Search */}
                <SearchSection />

                {/* Popular Searches - Example placeholder section */}
                <Stack
                    direction="row"
                    sx={{
                        mt: 3,
                        pt: 3,
                        borderTop: "1px solid",
                        borderColor: "grey.700",
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        gap: 3,
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        "UGC",
                        "Instagram",
                        "Facebook",
                        "TikTok",
                        "Shorts",
                        "YouTube",
                    ].map((item, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            endIcon={<ArrowRightAltIcon />}
                            sx={(theme) => ({
                                color: theme.palette.common.white,
                                borderColor: theme.palette.common.white,
                                "&:hover": {
                                    borderColor: theme.palette.common.white,
                                    backgroundColor: theme.palette.action.hover,
                                },
                            })}
                        >
                            {item}
                        </Button>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
};

export default PageSearch;