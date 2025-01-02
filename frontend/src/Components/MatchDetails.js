import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Api/axios';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axiosInstance.get(`/match/${id}`);
        setMatch(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Błąd podczas pobierania szczegółów meczu:', error);
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Ładowanie...</p>;
  }

  if (!match) {
    return <p className="text-center text-gray-500 mt-8">Mecz nie znaleziony.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        {match.team_1} vs {match.team_2}
      </h1>
      <p className="text-center text-gray-700 mb-8">
        Data: {new Date(match.match_date).toLocaleString()}
      </p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Bary transmitujące mecz:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {match.Bars && match.Bars.length > 0 ? (
          match.Bars.map((bar) => (
            <div
              key={bar.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {bar.name}
              </h3>
              <p className="text-gray-600">{bar.address}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            Brak barów transmitujących ten mecz.
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
