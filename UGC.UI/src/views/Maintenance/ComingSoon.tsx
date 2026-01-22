// material-ui
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// framer-motion
import { motion } from 'framer-motion';

// assets
import imageGrid from '/assets/images/maintenance/img-soon-grid.svg';
import imageBlock from '/assets/images/maintenance/img-soon-block.svg';
import imageBlueBlock from '/assets/images/maintenance/img-soon-blue-block.svg';
import imagePurpleBlock from '/assets/images/maintenance/img-soon-purple-block.svg';


// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative'
});

const PageContentWrapper = styled('div')({
    maxWidth: 450,
    margin: '0 auto',
    textAlign: 'center'
});

const ComingSoonCard = styled(Card)({
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

export const ComingSoon = () => {
    return (
        <ComingSoonCard>
            <CardContent>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid size={12}>
                            <PageContentWrapper>
                                <Grid container spacing={2}>
                                    <Grid size={12}>
                                        <motion.div variants={textVariants}>
                                            <Typography variant="h1">Очаквайте скоро</Typography>
                                        </motion.div>
                                    </Grid>
                                    <Grid size={12}>
                                        <motion.div variants={textVariants}>
                                            <Typography variant="body1">🚀 Нещо ново е на път...</Typography>
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </PageContentWrapper>
                        </Grid>
                        <Grid size={12}>
                            <motion.div variants={imageVariants}>
                                <CardMediaWrapper>
                                    <CardMedia component="img" image={imageGrid} title="Slider5 image" />
                                    <ImageWrapper
                                        src={imageBlock}
                                        title="Slider 1 image"
                                        animate={{
                                            y: [-15, 15, -15],
                                            opacity: [0.8, 1, 0.8]
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    />
                                    <ImageWrapper
                                        src={imageBlueBlock}
                                        title="Slider 2 image"
                                        animate={{
                                            y: [-20, 20, -20],
                                            rotate: [0, 2, 0]
                                        }}
                                        transition={{
                                            duration: 15,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    />
                                    <ImageWrapper
                                        src={imagePurpleBlock}
                                        title="Slider 3 image"
                                        animate={{
                                            y: [-18, 18, -18],
                                            rotate: [0, -2, 0]
                                        }}
                                        transition={{
                                            duration: 12,
                                            repeat: Infinity,
                                            ease: 'easeInOut'
                                        }}
                                    />
                                </CardMediaWrapper>
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </CardContent>
        </ComingSoonCard>
    );
};

export default ComingSoon;