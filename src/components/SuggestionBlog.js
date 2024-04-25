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

const SuggestionBlog = (props) => {
    const {
        blog
    } = props

    const obj = JSON.parse(sessionStorage.getItem("login"));
    const accessToken = obj.token;
    // console.log(accessToken);  

    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        console.log("in suggestions blog componenet")
        axios({
        method: "get",
        url: "http://localhost:8000/blog/suggest",
        headers: {
          Token: accessToken,
        },
        params:{
            blog_id:blog.id
        }
        })
        .then((suggestions) => {
            console.log(suggestions.data)
            setSuggestions(suggestions.data);
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
         <Typography variant="body2">{suggestions}</Typography>
    )}
        </div>
    );
};

export default SuggestionBlog;
