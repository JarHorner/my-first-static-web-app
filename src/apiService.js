export const fetchCustomers = async (sortBy, order, page, limit) => {
  const queryParams = new URLSearchParams({
    sortBy,
    order,
    page: page.toString(),
    limit: limit.toString(),
  }).toString();

  const response = await fetch(
    `https://my-first-node-web-app.azurewebsites.net/customers/?${queryParams}`
  ).catch((error) => console.error("Error updating customer:", error));

    // const response = await fetch(
    //   `http://localhost:3005/customers?${queryParams}`
    // ).catch((error) => console.error("Error updating customer:", error));

  const data = await response.json();
  console.log(data);
  return data;
};

export const updateCustomerFirstName = async (id, firstName) => {
    const response = await fetch(
      `https://my-first-node-web-app.azurewebsites.net/customers/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer your_token" // Uncomment if authorization is needed
        },
        body: JSON.stringify( {firstName: firstName} )
      }
    ).catch((error) => console.error("Error updating customer:", error));

//   const response = await fetch(`http://localhost:3005/customers/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       // "Authorization": "Bearer your_token" // Uncomment if authorization is needed
//     },
//     body: JSON.stringify({ firstName: firstName }),
//   }).catch((error) => console.error("Error updating customer:", error));

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log(data);
  alert(data.message);
  window.location.reload();
};

export const addCustomer = async () => {};
