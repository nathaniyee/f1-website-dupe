import React, { useEffect, useState } from 'react';
import axios from 'axios';
import constructorImages from '../components/constructorImages'; // Assuming you have a similar file for constructor images
import './ConstructorStandings.css';

const ConstructorStandings = () => {
  const [constructors, setConstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('http://ergast.com/api/f1/current/constructorStandings.json');
        const standings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        setConstructors(standings);
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
      <h1>2024 Constructor Standings</h1>
      <table className="standings-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Constructor</th>
            <th>Livery</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {constructors.length > 0 ? (
            constructors.map((constructor, index) => {
              const constructorKey = constructor.Constructor.name.toLowerCase().replace(/\s+/g, '-');
              console.log(constructorKey); // Debugging line to check the key
              const constructorData = constructorImages[constructorKey] || {};
              console.log(constructorData); // Debugging line to check the image data
              return (
                <tr key={constructor.Constructor.constructorId}>
                  <td>{index + 1}</td>
                  <td>
                    <img 
                      src={constructorData.logo || './assets/logos/defaultlogo.webp'}
                      alt={`${constructor.Constructor.name} Logo`}
                      className="constructor-logo-image"
                    />
                    {/* {constructor.Constructor.name} */}
                  </td>
                  <td className="livery-container">
                    <img 
                      src={constructorData.car || './assets/cars/defaultcar.png'} 
                      alt={`${constructor.Constructor.name} Livery`} 
                      className="livery-image" 
                    />
                  </td>
                  <td>{constructor.points}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No standings available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConstructorStandings;