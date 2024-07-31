import React, { useState, useEffect, useContext  } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import {
  getCustomers,
  updateCustomerFirstName,
  addCustomer,
  removeCustomer,
} from "../services/api";

function Customer() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomers(sortBy, order, page, limit);
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }

    fetchCustomer();
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
    if (!removeCustomerId) {
      alert("Please provide the customers id");
      return;
    }

    removeCustomer(removeCustomerId);
  }

  return (
    <>
      <h1>Static Web Apps Database Connections</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <button onClick={() => setSortBy("FirstName")}>Sort by Name</button>
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
        <ul>
          {customers.map((customer) => (
            <li key={customer.CustomerID}>
              {customer.CustomerID} FirstName: {customer.FirstName}
            </li>
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
        <button onClick={removeExistingCustomer}>Remove Customer</button>
      </div>
    </>
  );
}
export default Customer;
