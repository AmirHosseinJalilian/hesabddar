'use client';

import { useScroll } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// layouts
import MainLayout from 'src/layouts/main';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import HomeHero from '../home-hero';
import HomeCleanInterface from '../home-clean-interface';
import HomeAdvertisement from '../home-advertisement';

// ----------------------------------------------------------------------
const ContentStyle = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));
// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <HomeHero />
      {/* <ContentStyle>
        <HomeCleanInterface />
        <HomeAdvertisement />
      </ContentStyle> */}
    </MainLayout>
  );
}
