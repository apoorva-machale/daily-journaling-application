import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Delete } from '@mui/icons-material';
import NavBar from './NavBar';


const DashboardPage = (props) => {
  const [sentiment, setSentiment] = useState([]);
  const [piedata, setPiedata] = useState([])
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isBlogDeleted, setIsBlogDeleted] = useState(false);

  const obj = JSON.parse(sessionStorage.getItem("login"));
  const accessToken = obj.token;

  const DeleteBlog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/blog/${id}`);
      console.log("Blog deleted successfully:", response.data);
      setIsBlogDeleted(true)
      // Update state or UI to reflect the deletion (optional)
    } catch (error) {
      console.error("Error deleting blog:", error);
  
      // Handle errors appropriately (e.g., display an error message)
      if (error.response && error.response.status === 404) {
        console.error("Blog not found: The blog entry with the given ID might not exist.");
      } else if (error.response && error.response.status === 401) {
        console.error("Unauthorized: You might need a valid access token to delete blogs.");
      } else if (error.response && error.response.status === 403) {
        console.error("Forbidden: You might not have permission to delete blogs.");
      }
      // Handle other potential errors as needed
    }
  };

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("DATE",selectedDate)
    setSelectedDate(selectedDate)
    // setDate(date)
    setLoading(true)
    axios({
        method: "get",
        url: "http://localhost:8000/blog/output/",
        headers: {
          Token: accessToken,
        },
        params: {
          date: selectedDate,
        },
      })
        .then((sentiment) => {
        setSentiment(sentiment.data);
        let data = create_piedata(sentiment.data)
        console.log(sentiment.data)
        setPiedata(data)
        setLoading(false)
        //   toast.success("Your skills are updated");
      })
        .catch((error) => {
          console.log("error2", error);
          setLoading(false);
          if (
            error.response.data.detail === "Token has expired" ||
            error.response.data.detail === "Invalid token"
          ) {
            // history.push("/");
            // toast.error("Session expired");
          }
        });
    };


  const create_piedata = (data) => {
    let analysisData = [];
    let id = 0; // Use a separate counter for id

    // Loop through data to collect unique analyses
    for (const item of data) {
      const analysis = item.analysis;
      const existingAnalysis = analysisData.find(a => a.label === analysis);

      if (!existingAnalysis) {
        analysisData.push({ id: id++, label: analysis, value: 0 });
      }
    }

    // Loop through data again to count occurrences
    for (const item of data) {
      const analysis = item.analysis;
      for (let i = 0; i < analysisData.length; i++) {
        if (analysisData[i].label === analysis) {
          analysisData[i].value++;
          break; // Exit inner loop after finding the matching analysis
        }
      }
    }
    return analysisData
  };

  useEffect(() => {
    let data;
    setLoading(true);
    axios({
      method: "get",
      url: "http://localhost:8000/blog/output",
      params: {
        date:selectedDate,
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
      .then((temp) => {
        console.log("sentiment", temp.data);
        setSentiment(temp.data);
        data = create_piedata(temp.data)
        setPiedata(data)
        setLoading(false);
      })
      .catch((error) => {
        console.log("error1", error);
        setLoading(false);
      });
  }, [selectedDate, isBlogDeleted]);

  
  return (
    <div>
    <NavBar/>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> 
    <TextField
          id="date"
          name="date"
          label="YYYY-MM-DD"
          variant="outlined"
          value={selectedDate}
          onChange={handleChange}
        />
        <Box><Button variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">Blog Analysis</Button></Box>
    <Button href="/blogs" variant="contained"> Go back to Journaling</Button>
    <Typography variant="h4">Your blog content</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blog Title</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Sentiment Score</TableCell>
            <TableCell>Sentiment Magnitude</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {loading && (
          <Typography variant="body2">Loading...</Typography>
        )}
        {!loading && (
        <TableBody>
          { sentiment && sentiment.map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {row.title}
              </TableCell>
              <TableCell>{row.body}</TableCell>
              <TableCell>{(row.sentiment_magnitude).toFixed(2)}</TableCell>
              <TableCell>{(row.sentiment_score).toFixed(2)}</TableCell>
              <TableCell><DeleteRoundedIcon onClick={() => DeleteBlog(row.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
        )}
      </Table>
    </TableContainer>
    <Typography variant="h4">Overall Analysis</Typography>
    <PieChart
      series={[
        {
          data: piedata
        },
      ]}
      width={600}
      height={200}
    />
    </Box>
    </div>
  );
}

export default DashboardPage;
