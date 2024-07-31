import React, { useEffect, useState } from 'react';
import axios from 'axios';
import driverImages from '../components/driverImages';
import './DriverStandings.css';

const DriverStandings = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('https://ergast.com/api/f1/2024/driverStandings.json');
        const standings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        
        setDrivers(standings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching standings data", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={require("./assets/3d6aa9082f3c9e285df9970dc7b762ac.gif")} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="table-container">
      <h1>2024 Driver Standings</h1>
      <table className="standings-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Nat</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {drivers.length > 0 ? (
            drivers.map((driver, index) => {
              const driverKey = driver.Driver.familyName.toLowerCase();
              const driverData = driverImages[driverKey] || {};
              return (
                <tr key={driver.Driver.driverId}>
                  <td>{index + 1}</td>
                  <td>
                    <img 
                      src={driverImages[driver.Driver.familyName]?.flag || './assets/flags/defaultflag.png'} 
                      alt={`${driver.Driver.nationality} Flag`} 
                      className="flag-image" 
                    />
                  </td>
                  <td>
                    <img 
                      src={driverImages[driver.Driver.familyName]?.headshot || './assets/headshots/default.avif'}
                      alt={`${driver.Driver.givenName} Headshot`} 
                      className="headshot-image" 
                    />
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </td>
                  <td>{driver.Constructors[0].name}</td>
                  <td>{driver.points}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No standings available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStandings;