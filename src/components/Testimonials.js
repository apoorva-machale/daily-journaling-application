import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const userTestimonials = [
  {
    avatar: <Avatar alt="S" src="/static/images/avatar/1.jpg" />,
    name: 'Sarah M.',
    occupation: 'Student',
    testimonial:
      "This app has been a real eye-opener! I never realized how much my mood affects what I write about. Seeing the sentiment analysis really helps me understand my emotional patterns.",
  },
  {
    avatar: <Avatar alt="E" src="/static/images/avatar/2.jpg" />,
    name: 'Emily C.',
    occupation: 'Lead Product Designer',
    testimonial:'Journaling has always been helpful, but this app takes it to the next level. Being able to track my mood over time has helped me identify triggers for stress and anxiety.',
  },
  {
    avatar: <Avatar alt="O" src="/static/images/avatar/3.jpg" />,
    name: 'Olivia J.',
    occupation: 'CTO',
    testimonial: "As someone who reads a lot of news, it's fascinating to see how it impacts my mood. This app separates my news entries and helps me understand how negativity can creep in.",
  },
  {
    avatar: <Avatar alt="J" src="/static/images/avatar/4.jpg" />,
    name: 'Julia Stewart',
    occupation: 'Senior Engineer',
    testimonial: 'I never thought an app could be so therapeutic. Journaling in this app has helped me process difficult emotions and gain a deeper sense of self-awareness.',
  },
  {
    avatar: <Avatar alt="J" src="/static/images/avatar/5.jpg" />,
    name: 'John Smith',
    occupation: 'Product Designer',
    testimonial: "This app has been a game-changer for my mental health. By understanding my moods and journaling triggers, I've been able to manage my anxiety and cultivate a more positive outlook.",
  },
  {
    avatar: <Avatar alt="D" src="/static/images/avatar/6.jpg" />,
    name: 'Daniel Wolf',
    occupation: 'Entrepreneur',
    testimonial:"Before this app, journaling felt like a chore. Now, with the topic categorization and mood tracking, it's actually fun to see the trends and connections in my life.",  
  },
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = darkLogos

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Testimonials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what our customers love about our products. Discover how we excel in
          efficiency, durability, and satisfaction. Join us for quality, innovation,
          and reliable support.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}