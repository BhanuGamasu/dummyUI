import React, { useState, useEffect } from "react";

const Create = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const userId = "66daf93570ec392374f8407b"; // Replace with actual user ID or get it dynamically

  // Function to fetch user data from API using _id
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3900/getUserData?id=${userId}`
      ); // Use the _id as the query parameter
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.success) {
        setUserData(data.data); // Assuming `data.data` contains the user object
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h1>Create Component</h1>
      {error && <p className="text-red-500">{error}</p>}
      {userData ? (
        <div>
          <h2>User Data</h2>
          <p>Name: {userData.name}</p>
          <p>Mobile: {userData.mobile}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Create;
