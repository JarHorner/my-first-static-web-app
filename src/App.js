import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/message`)).json();
      setData(text);
    })();
  });

  async function list() {
    const endpoint = "/data-api/rest/Customer";
    const response = await fetch(endpoint);
    const data = await response.json();
    console.table(data.value);
  }

  async function get() {
    const id = 1;
    const endpoint = `/data-api/rest/Customer/CustomerId`;
    const response = await fetch(`${endpoint}/${id}`);
    const result = await response.json();
    console.table(result.value);
  }

  async function update() {
    const id = 1;
    const data = {
      FirstName: "Molly",
    };

    const endpoint = "/data-api/rest/Customer/Id";
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.table(result.value);
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

    const endpoint = `/data-api/rest/Person/`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.table(result.value);
  }

  async function del() {
    const id = 3;
    const endpoint = "/data-api/rest/Customer/Id";
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
      <div>{data}</div>
      <h1>Static Web Apps Database Connections</h1>
      <blockquote>
        Open the console in the browser developer tools to see the API
        responses.
      </blockquote>
      <div>
        <button id="list" onclick={list()}>
          List
        </button>
        <button id="get" onclick={get()}>
          Get
        </button>
        <button id="update" onclick={update()}>
          Update
        </button>
        <button id="create" onclick={create()}>
          Create
        </button>
        <button id="delete" onclick={del()}>
          Delete
        </button>
      </div>
    </>
  );
}

export default App;
