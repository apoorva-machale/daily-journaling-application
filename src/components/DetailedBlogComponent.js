import React, {useState, useEffect} from 'react';
import axios  from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const DetailedBlogComponent = (props) => {
    const {
        blog
    } = props

    const [classification, setClassification] = useState([]);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);
    
    useEffect(() => {
        // const obj = JSON.parse(sessionStorage.getItem("login"));
        // const accessToken = obj ? obj.token : null;
        // console.log(accessToken);
        setLoading(true);

        axios({
        method: "get",
        url: "http://localhost:8000/blog/classify_blog_id",
        headers: {
            // Authorization: `Token ${accessToken}`,
        },
        params:{
            blog_id:blog.id
        }
        })
        .then((classification) => {
            console.log(classification.data)
            setClassification(classification.data);
            setLoad(false)
            setLoading(false);
        })
        .catch((error) => {
            console.log("error", error);
            setLoading(false);
        });
    }, [blog]);


    return (
        <div>
             {load && (
          <Typography variant="body2">Loading...</Typography>
        )}
         {!load && (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Confidence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { classification && classification.map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.category_name}</TableCell>
              <TableCell>{(row.category_confidence*100).toFixed(2)} %</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
    )}
        </div>
    );
};

export default DetailedBlogComponent;
