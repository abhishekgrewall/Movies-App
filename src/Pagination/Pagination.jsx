import React from "react";
import { useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Pagination({ handleNextPage, handlePreviousPage }) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Button
        onClick={() => {
          handlePreviousPage();
          handleScrollToTop(); 
        }}
        variant="outlined"
        size="small"
        style={{
          color: 'black',
          backgroundColor: 'white',
          padding: '13px',
          fontSize: '14px',
          marginRight: '10px'
        }}>
        <NavigateBeforeIcon /> Previous Page
      </Button>
      <Button
        onClick={() => {
          handleNextPage();
          handleScrollToTop(); 
        }}
        variant="outlined"
        size="small"
        style={{
          color: 'black',
          backgroundColor: 'white',
          padding: '13px',
          fontSize: '14px',
          marginLeft: '10px'
        }}>
        Next Page <NavigateNextIcon />
      </Button>
    </div>
  );
}

export default Pagination;

