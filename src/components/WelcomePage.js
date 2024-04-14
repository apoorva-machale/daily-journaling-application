import * as React from 'react';
// import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
// import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './AppAppBar';
import Main from './Main';
import Highlights from './Highlights';
import Features from './Features';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Footer from './Footer';

export default function WelcomePage() {
    const [mode, setMode] = React.useState('light');
    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
      };
  return (
    <div>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Main />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </div>
  );
}
