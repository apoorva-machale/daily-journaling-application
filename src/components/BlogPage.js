import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import axios  from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import DetailedBlogComponent from './DetailedBlogComponent';
import { toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const BlogPage = (props) => {
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [selectedBlog, setSelectedBlog] = useState([]);
    const [blog, setBlog] = useState({
        id: "",
        body: "",
        title: ""
      });

    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj.token;
    const navigate = useNavigate();

    function handleChange({ target }) {
        // console.log("check target", target.value);
        setBlog({
          ...blog,
          error: false,
          [target.name]: target.value,
        });
      }

    const handleTitleClick = (clickedBlog) => {
      console.log("Hi",clickedBlog)
      setSelectedBlog(clickedBlog);
    };

  const handleSubmit = (event) => {
    event.preventDefault();
      
    // console.log("blog",blog)
    axios({
        method: "post",
        url: "http://localhost:8000/blog/",
        headers: {
          Token: accessToken,
        },
        data: blog,
      })
        .then((res) => {
        if(res.data == "Insufficient word count to classify the blog"){
          toast.error("Insufficient word count to classify the blog")
        }else{
          setBlog({
            ...blog,
            id: blog.id,
            body: blog.body,
            title: blog.title,
          });
          console.log("blog saved")
          toast.success("Your blog has been saved")
        }
        })
        .catch((error) => {
          console.log("error", error);
          toast.error("Please try again!")
          if (
            error.response.data.detail === "Token expired: Signature has expired." ||
            error.response.data.detail ==="Invalid token"
          ) {
            navigate("/signin"); 
            toast.error("Session expired");
          }
        });
    };

    useEffect(() => {
        const obj = JSON.parse(sessionStorage.getItem("login"));
        const accessToken = obj ? obj.token : null;
        // console.log(accessToken);
        setLoading(true);
    
        axios({
          method: "get",
          url: "http://localhost:8000/blog/",
          headers: {
            Token: accessToken,
          },
        })
          .then((blogs) => {
            console.log("blogs", blogs.data);
            setBlogs(blogs.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            setLoading(false);
            if (
              error.response.data.detail === "Token expired: Signature has expired." ||
              error.response.data.detail === "Invalid token"
            ) {
              navigate("/signin"); 
              toast.error("Session expired");
            }
          });
      }, []);
    
  return (
    <ThemeProvider theme={defaultTheme}>
    <Paper>
    <Grid item xs={6} sm={6} spacing={2}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h5">
            Start Journaling here
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> 
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="blog-name"
                  name="title"
                  required
                  fullWidth
                  id="BlogTitle"
                  label="Blog Title Name"
                  onChange={handleChange}
                  value={blog.title}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="BlogBody"
                  label="Blog Content"
                  name="body"
                  onChange={handleChange}
                  helperText="Your blog content should be minimum of 25 words"
                  value={blog.body}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, suggestions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Store Blog
            </Button>
            <Button
              // type="submit"
              fullWidth
              href='/dashboard'
              variant="contained"
            >
              Go to Dashboard
            </Button>
          </Box>
        </Box> 
       
      </Container>
      </Grid>
      <Grid item xs={6} sm={6} spacing={2}>
      <Container component="main" >
      <Typography component="h2" variant="h5">
            Your Blogs
       </Typography>
       {loading && (
          <Typography variant="body2">Loading...</Typography>
        )}
        { blogs.length === 0 && (
                <Typography variant="body2">
                  You don't have any blogs yet. Start journaling here!
                </Typography>
              )}
        {!loading && (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {blogs.length >0 && blogs.map((row) => (
            <ListItem alignItems="flex-start" >
                <ListItemText key={row.title} onClick={() => handleTitleClick(row)}
                primary={
                    <React.Fragment>
                    {row.title}
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                    {row.body}
                    </React.Fragment>
                }
                >
                </ListItemText>
                
            </ListItem>
            ))}
            
        </List>
        )}
        <Typography>Details for {selectedBlog.title}</Typography>
         {selectedBlog && <DetailedBlogComponent blog={selectedBlog} />}
      </Container>
      </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default BlogPage;