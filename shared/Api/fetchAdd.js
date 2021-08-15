const getTodos = async () => {
  const response = await fetch("http://10.0.2.2:5000/schedule/add");

  if (response.status !== 200) {
    throw new Error("cannot fetch data"); //error causes promise by async function to be rejected
  }

  const data = await response.json();
  return data;
};

export default getTodos;
