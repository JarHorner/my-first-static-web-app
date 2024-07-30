import React, { useState, useEffect } from "react";
import { fetchCustomers, updateCustomerFirstName } from "./apiService";

function App() {
  const [customers, setCustomers] = useState([]);
  const [sortBy, setSortBy] = useState("FirstName");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [newFirstName, setNewFirstName] = useState("");
  const [customerIdToUpdate, setCustomerIdToUpdate] = useState("");

  useEffect(() => {
    fetchCustomers(sortBy, order, page, limit)
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [sortBy, order, page, limit]);

  const updateFirstName = () => {
    if (!customerIdToUpdate || !newFirstName) {
      alert("Please provide a customer ID and a new first name");
      return;
    }

    updateCustomerFirstName(customerIdToUpdate, newFirstName);
  };

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
      <h1>Static Web Apps Database Connections</h1>
      <div>
        <button onClick={() => setSortBy("FirstName")}>Sort by Name</button>
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
        <ul>
          {customers.map((customer) => (
            <li key={customer.CustomerID}>{customer.FirstName}</li>
          ))}
        </ul>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>
          Previous Page
        </button>
      </div>

      <div>
        <h2>Update Customer First Name</h2>
        <input
          type="text"
          placeholder="Customer ID"
          value={customerIdToUpdate}
          onChange={(e) => setCustomerIdToUpdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="New First Name"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <button onClick={updateFirstName}>Update First Name</button>
      </div>
    </>
  );
}

export default App;
