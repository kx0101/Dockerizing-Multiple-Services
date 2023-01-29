import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Fib = () => {
  const [seenIndeces, setSeenIndeces] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');


  useEffect(() => {
    const fetchValues = async () => {
      const dbValues = await axios.get('/api/values/current');
      setValues(dbValues);
    };

    const fetchIndeces = async () => {
      const dbSeenIndeces = await axios.get('/api/values/all');
      setSeenIndeces(dbSeenIndeces);
    }

    fetchValues();
    fetchIndeces();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/values', {
      index
    })

    setIndex('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index: </label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indeces I have seen: </h3>
      {seenIndeces.map(({ number }) => number).join(', ')}

      <h3>Calculated values: </h3>
      {Object.values(values).map(key => {
        return (
          <div key={key}>
            For index {key} I calculated values[key]
          </div>
        )
      })}
    </div>
  )
}
