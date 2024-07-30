import React, { useState, useEffect } from "react";
import { fetchCustomers, updateCustomerFirstName, addCustomer, removeCustomer } from "./apiService";

function App() {
  const [customers, setCustomers] = useState([]);
  const [sortBy, setSortBy] = useState("FirstName");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [newFirstName, setNewFirstName] = useState("");
  const [customerIdToUpdate, setCustomerIdToUpdate] = useState("");

  const [addFirstName, setAddFirstName] = useState("");
  const [addLastName, setAddLastName] = useState("");
  const [addCompany, setAddCompany] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPhone, setAddPhone] = useState("");

  const [removeCustomerId, setRemoveCustomerId] = useState("");
  const [removeFirstName, setRemoveFirstName] = useState("");

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

  async function addNewCustomer() {

    if (!addFirstName || !addLastName) {
      alert("Please provide the customers first and last name");
      return;
    }

    addCustomer(addFirstName, addFirstName, addCompany, addEmail, addPhone);
  }

  async function removeExistingCustomer() {

    if (!removeCustomerId || !removeFirstName) {
      alert("Please provide the customers first and last name");
      return;
    }

    removeCustomer(removeCustomerId, removeFirstName);
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
            <li key={customer.CustomerID}>{customer.CustomerID} FirstName: {customer.FirstName}</li>
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

      <div>
        <h2>Add New Customer</h2>
        <input
          type="text"
          placeholder="First Name"
          value={addFirstName}
          onChange={(e) => setAddFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Last"
          value={addLastName}
          onChange={(e) => setAddLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={addCompany}
          onChange={(e) => setAddCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email Address"
          value={addEmail}
          onChange={(e) => setAddEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={addPhone}
          onChange={(e) => setAddPhone(e.target.value)}
        />
        <button onClick={addNewCustomer}>Add New Customer</button>
      </div>

      <div>
        <h2>Remove Customer</h2>
        <input
          type="text"
          placeholder="Customer ID"
          value={removeCustomerId}
          onChange={(e) => setRemoveCustomerId(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={removeFirstName}
          onChange={(e) => setRemoveFirstName(e.target.value)}
        />
        <button onClick={removeExistingCustomer}>Remove Customer</button>
      </div>
    </>
  );
}

export default App;
