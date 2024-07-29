
export const fetchData = async () => {
    const response = await fetch('https://my-first-node-web-app.azurewebsites.net/api/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  };