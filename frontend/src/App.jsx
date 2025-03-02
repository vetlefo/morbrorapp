import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MorbrorAppen from './MorbrorAppen'; // Import MorbrorAppen

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/courses')
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <MorbrorAppen courses={courses} /> // Pass courses as props to MorbrorAppen
  );
}

export default App;