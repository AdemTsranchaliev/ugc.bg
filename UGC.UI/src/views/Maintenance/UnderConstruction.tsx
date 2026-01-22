import { Link } from 'react-router';

// material-ui
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// framer-motion
import { motion } from 'framer-motion';

// project imports
import AnimateButton from '../../ui-component/extended/AnimateButton';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import image from '/assets/images/maintenance/img-build.svg';
import imageBackground from '/assets/images/maintenance/img-bg-grid.svg';
import imageParts from '/assets/images/maintenance/img-bg-parts.svg';

// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 600,
    margin: '0 auto',
    position: 'relative'
});

const PageContentWrapper = styled('div')({
    margin: '0 auto',
    textAlign: 'center'
});

const ConstructionCard = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const ImageWrapper = styled(motion.img)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
});

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1] as const
        }
    }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1] as const
        }
    }
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] as const,
            delay: 0.4
        }
    }
};

export const UnderConstruction = () => {
    return (
        <ConstructionCard>
            <CardContent>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid size={12}>
                            <motion.div variants={imageVariants}>
                                <CardMediaWrapper>
                                    <CardMedia
                                        component="img"
                                        image={imageBackground}
                                    />
                                    <ImageWrapper
                                        src={imageParts}
                                        animate={{
                                            opacity: [0.3, 1, 0.3],
                                            scale: [1, 1.02, 1]
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    />
                                    <ImageWrapper
                                        src={image}
                                        animate={{
                                            y: [-10, 10, -10],
                                            rotate: [0, 1, 0]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    />
                                </CardMediaWrapper>
                            </motion.div>
                        </Grid>
                        <Grid size={12}>
                            <PageContentWrapper>
                                <Grid container spacing={2}>
                                    <Grid size={12}>
                                        <motion.div variants={textVariants}>
                                            <Typography variant="h1">В процес на изграждане</Typography>
                                        </motion.div>
                                    </Grid>
                                    <Grid size={12}>
                                        <motion.div variants={textVariants}>
                                            <Typography variant="body2" sx={{ maxWidth: 400, margin: '0 auto' }}>
                                                Тази част е в процес на изграждане!! Моля, проверете отново след известно време.
                                            </Typography>
                                        </motion.div>
                                    </Grid>
                                    <Grid size={12}>
                                        <motion.div variants={buttonVariants}>
                                            <AnimateButton>
                                                <Button variant="contained" size="large" component={Link} to="/">
                                                    <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} />
                                                    Начало
                                                </Button>
                                            </AnimateButton>
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </PageContentWrapper>
                        </Grid>
                    </Grid>
                </motion.div>
            </CardContent>
        </ConstructionCard>
    );
};

export default UnderConstruction;
