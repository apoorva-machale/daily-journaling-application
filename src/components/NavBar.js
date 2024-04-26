import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const NavBar = (props) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("login");
        toast.success("You have been logged out.")
        navigate("/"); 
      };

        return (
           <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </div>

        );
      };
export default NavBar;