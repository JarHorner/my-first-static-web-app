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
        <ul>
          <li onClick={() => setLimit(10)}>10</li>
          <li onClick={() => setLimit(15)}>15</li>
          <li onClick={() => setLimit(20)}>20</li>
        </ul>
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
