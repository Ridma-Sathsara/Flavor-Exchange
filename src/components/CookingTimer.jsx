import { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';

function CookingTimer({ cookingTime }) {
  const [seconds, setSeconds] = useState(parseInt(cookingTime) * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(parseInt(cookingTime) * 60);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">
        Timer: {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
      </Typography>
      <Button variant="contained" onClick={handleStart} disabled={isActive}>
        Start
      </Button>
      <Button variant="contained" onClick={handleStop} sx={{ ml: 1 }}>
        Stop
      </Button>
      <Button variant="contained" onClick={handleReset} sx={{ ml: 1 }}>
        Reset
      </Button>
    </Box>
  );
}

export default CookingTimer;