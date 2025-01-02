import React, { useState, useEffect } from 'react';
import axiosInstance from '../Api/axios';
import { Link } from 'react-router-dom';

const MatchesList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axiosInstance.get('/match');
        setMatches(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania meczów:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lista Meczów</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {match.team_1} vs {match.team_2}
            </h2>
            <h3 className="text-md font-semibold text-gray-800 mb-4">
              Sport: {match.sport}
            </h3>
            <p className="text-gray-600 mb-4">
              Data: {new Date(match.match_date).toLocaleString()}
            </p>
            <Link
              to={`/match/${match.id}`}
              className="block text-center bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Zobacz szczegóły
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesList;
