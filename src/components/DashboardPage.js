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
import { Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';



const DashboardPage = (props) => {
  const [sentiment, setSentiment] = useState({});
  const [piedata, setPiedata] = useState([])
  const [loading, setLoading] = useState([]);

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
    setLoading(true);
    let data = []
    axios({
      method: "get",
      url: "http://localhost:8000/blog/output",
      params: {
        date:"2024-04-14",
        email: "string"
      },
      headers: {
        // Authorization: `Token ${accessToken}`,
      },
    })
      .then((sentiment) => {
        console.log("sentiment", sentiment.data);
        setSentiment(sentiment.data);
        data = create_piedata(sentiment.data)
        setPiedata(data)
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  
  return (
    <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" />
      </DemoContainer>
    </LocalizationProvider>
    <Button variant="contained">Blog Analysis</Button>
    <Typography variant="h3">Your blog content</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blog Title</TableCell>
            <TableCell align="right">Body</TableCell>
            <TableCell align="right">Sentiment Score</TableCell>
            <TableCell align="right">Sentiment Magnitude</TableCell>
          </TableRow>
        </TableHead>
        {loading && (
          <Typography variant="body2">Loading...</Typography>
        )}
        {!loading && (
        <TableBody>
          {sentiment && sentiment.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.body}</TableCell>
              <TableCell align="right">{row.sentiment_magnitude}</TableCell>
              <TableCell align="right">{row.sentiment_score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        )}
      </Table>
    </TableContainer>
    <Typography variant="h3">Overall Analysis</Typography>
    <PieChart
      series={[
        {
          data: piedata
        },
      ]}
      width={600}
      height={200}
    />
    </div>
  );
}

export default DashboardPage;
