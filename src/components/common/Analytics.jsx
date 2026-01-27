import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Replace this with your actual Measurement ID from Google Analytics
// It usually looks like 'G-XXXXXXXXXX'
const MEASUREMENT_ID = "YOUR_MEASUREMENT_ID"; 

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Send pageview with specific path
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
};

export default Analytics;
