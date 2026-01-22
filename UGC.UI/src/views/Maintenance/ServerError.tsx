import { Link } from 'react-router';

// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from '../../ui-component/extended/AnimateButton';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import error500 from '/assets/images/maintenance/500-error.svg';

export const ServerError = () => {
    return (
        <Stack sx={{ gap: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: { xs: 350, sm: 396 } }}>
                <CardMedia component="img" src={error500} alt="mantis" style={{ height: '100%', width: '90%' }} />
            </Box>
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', p: 1.5, gap: 2 }}>
                <Typography variant="h1">Сървърна грешка</Typography>
                <Typography variant="body2" align="center">
                    Оправяме проблема. Моля, опитайте отново по-късно.
                </Typography>
                <AnimateButton>
                    <Button variant="contained" size="large" component={Link} to="/">
                        <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} />
                        Начало
                    </Button>
                </AnimateButton>
            </Stack>
        </Stack>
    );
};

export default ServerError;
