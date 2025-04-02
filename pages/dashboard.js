import { useState, useEffect } from 'react';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch flight data
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/flights');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setFlights(data.data || []);
      setLastUpdated(new Date().toLocaleString());
      setError(null);
    } catch (err) {
      setError('Failed to fetch flight data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchFlights();
    
    // Set up polling every 60 seconds for live updates
    const interval = setInterval(fetchFlights, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Canceled Flights Dashboard</h1>
      
      <div className={styles.controls}>
        <button 
          onClick={fetchFlights} 
          disabled={loading}
          className={styles.refreshButton}
        >
          Refresh Data
        </button>
        {lastUpdated && (
          <p className={styles.lastUpdated}>
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      
      {loading ? (
        <div className={styles.loading}>Loading flight data...</div>
      ) : (
        <>
          <div className={styles.summary}>
            <h2>Summary</h2>
            <p>Total canceled flights: {flights.length}</p>
          </div>
          
          {flights.length > 0 ? (
            <table className={styles.flightsTable}>
              <thead>
                <tr>
                  <th>Flight Number</th>
                  <th>Airline</th>
                  <th>Route</th>
                  <th>Scheduled Departure</th>
                  <th>Cancellation Reason</th>
                  <th>Cancellation Time</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight._id}>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.airline}</td>
                    <td>{flight.departureAirport} → {flight.arrivalAirport}</td>
                    <td>{new Date(flight.scheduledDeparture).toLocaleString()}</td>
                    <td>{flight.cancellationReason || 'Not specified'}</td>
                    <td>{new Date(flight.cancellationTime).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.noData}>
              No canceled flights found. Data will appear here when flights are canceled.
            </div>
          )}
        </>
      )}
    </div>
  );
}
