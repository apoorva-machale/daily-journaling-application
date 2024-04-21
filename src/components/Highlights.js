import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Carousel from 'react-material-ui-carousel'
import InsightsIcon from '@mui/icons-material/Insights';
import CategoryIcon from '@mui/icons-material/Category';
import AssistantIcon from '@mui/icons-material/Assistant';


const items = [
  {
    icon: <SentimentSatisfiedAltIcon />,
    title: 'Sentiment Analysis',
    description:
      'Analyzes user blogs using Google Sentiment API to determine overall mood (positive, negative, neutral) and sentiment strength (magnitude).',
  },
  {
    icon: <InsightsIcon />,
    title: 'Mood Tracking',
    description:
      'Provides users with insights into their emotional well-being over time.',
  },
  {
    icon: <CategoryIcon />,
    title: 'Topic Categorization',
    description:
      'Categorizes blog entries into different domains (news, vehicles, etc.) for easy organization and trend identification.',
  },
  {
    icon: <AssistantIcon />,
    title: 'Personalized Blogging Platform',
    description:
      'Offers users a private space to express themselves and track their moods.',
  },
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Precision in every detail',
    description:
      'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'black',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '100%' },
            textAlign: { sm: 'left', md: 'center' },
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.700' }}>
            Explore why our product stands out: adaptability, durability,
            user-friendly design, and innovation. Enjoy reliable customer support and
            precision in every detail.
          </Typography>
        </Box>
        <Box
          sx={{
            width: { sm: '100%', md: '100%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
        <Carousel>
          {items.map((item, index) => (
            <Grid item key={index}>
                <Box sx={{ opacity: '30%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" >
                    {item.description}
                  </Typography>
                </div>
            </Grid>
          ))}
         </Carousel>
         </Box>
      </Container>
    </Box>
  );
}