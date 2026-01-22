import { Link } from 'react-router';

// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import { motion } from 'framer-motion';

// project imports
import AnimateButton from '../../ui-component/extended/AnimateButton';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import imageBackground from '/assets/images/maintenance/img-error-bg.svg';
import imageBlue from '/assets/images/maintenance/img-error-blue.svg';
import imageText from '/assets/images/maintenance/img-error-text.svg';
import imagePurple from '/assets/images/maintenance/img-error-purple.svg';

export const NotFound = () => {

    throw new Error('Test error');

    return (
        <Stack sx={{ gap: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: { xs: 350, sm: 580, md: 720 }, margin: '0 auto', position: 'relative' }}>
                <CardMedia component="img" image={imageBackground} sx={{ width: '90%' }} />
                <motion.div
                    style={{ position: 'absolute', top: 0, left: 0, width: '90%' }}
                    animate={{ y: [-20, 20, -20] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <CardMedia component="img" image={imageText} sx={{ width: '100%' }} />
                </motion.div>
                <motion.div
                    style={{ position: 'absolute', top: 0, left: 0, width: '90%' }}
                    animate={{ y: [-20, 20, -20] }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <CardMedia component="img" image={imageBlue} sx={{ width: '100%' }} />
                </motion.div>
                <motion.div
                    style={{ position: 'absolute', top: 0, left: 0, width: '90%' }}
                    animate={{ y: [-20, 20, -20] }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <CardMedia component="img" image={imagePurple} sx={{ width: '100%' }} />
                </motion.div>
            </Box>
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', p: 1.5, gap: 2 }}>
                <Typography variant="h1">Страницата не е намерена</Typography>
                <Typography variant="body2" align="center" sx={{ maxWidth: 400 }}>
                    Страницата, която търсите, е била преместена, изтрита, преименувана или може би никога не е съществувала!
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

export default NotFound;
