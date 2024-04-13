import * as React from 'react';
// import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './AppAppBar';
// import Hero from './components/Hero';
// import LogoCollection from './components/LogoCollection';
// import Highlights from './components/Highlights';
// import Features from './components/Features';
// import Testimonials from './components/Testimonials';
// import FAQ from './components/FAQ';
// import Footer from './components/Footer';

export default function WelcomePage() {
    const [mode, setMode] = React.useState('light');
    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
      };
  return (
    <div>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
      {/* <Hero /> */}
      <Box sx={{ bgcolor: 'background.default' }}>
        {/* <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <FAQ />
        <Divider />
        <Footer /> */}
      </Box>
    </div>
  );
}
