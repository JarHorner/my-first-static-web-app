import React, { useState, useEffect } from "react";
import { fetchData } from './apiService';

function App() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   (async function () {
  //     const { text } = await (await fetch(`/api/message`)).json();
  //     setData(text);
  //   })();
  // });

  useEffect(() => {
    fetchData()
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  async function list() {
    const endpoint = "/data-api/rest/Customer";
    const response = await fetch(endpoint);
    const data = await response.json();
    console.table(data.value);
  }

  async function get() {
    const id = 1;
    const endpoint = `/data-api/rest/Customer/CustomerID`;
    const response = await fetch(`${endpoint}/${id}`);
    const result = await response.json();
    console.table(result.value);
  }

  async function update() {
    const id = 1;
    const data = {
      FirstName: "David",
    };

    const endpoint = "/data-api/rest/Customer/CustomerID";

    console.log("Preparing to send update request...");
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer your_token" // Uncomment if authorization is needed
        },
        body: JSON.stringify(data),
      });

      console.log("Request sent. Awaiting response...");

      if (!response.ok) {
        // Handle server errors
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.table(result.value);
    } catch (error) {
      // Handle network or other errors
      console.error("Failed to update the customer:", error);
    }
  }

  async function create() {
    const data = {
      CustomerID: 161,
      NameStyle: false,
      Title: "Mr.",
      FirstName: "Jarret",
      MiddleName: "A.",
      LastName: "Horner",
      Suffix: null,
      CompanyName: "Winners",
      SalesPerson: "adventure-works\\pamela0",
      EmailAddress: "jarret0@Winners.com",
      Phone: "245-555-0173",
      PasswordHash: "L/Rlwxzp4w7RWmEgXX+/A7cXaePEPcp+KwQhl2fJL7w=",
      PasswordSalt: "1KjXYs4=",
      rowguid: "3F5AE95E-B87D-4AED-95B4-C3797AFCB74F",
      ModifiedDate: "2005-08-01T00:00:00",
    };

    const endpoint = `/data-api/rest/Customer/`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.table(result.value);
  }

  async function del() {
    const id = 161;
    const endpoint = "/data-api/rest/Customer/CustomerID";
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Record deleted: ${id}`);
    } else {
      console.log(response);
    }
  }

  return (
    <>
      {/* <div>{data}</div> */}
      <h1>Static Web Apps Database Connections</h1>
      <blockquote>
        Open the console in the browser developer tools to see the API
        responses.
      </blockquote>
      <div>
        <button id="list" onClick={list}>
          List
        </button>
        <button id="get" onClick={get}>
          Get
        </button>
        <button id="update" onClick={update}>
          Update
        </button>
        <button id="create" onClick={create}>
          Create
        </button>
        <button id="delete" onClick={del}>
          Delete
        </button>
      </div>
      <div className="App">
        <h1>Data from API</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
