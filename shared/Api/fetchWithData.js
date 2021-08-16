const fetchWithData = async (thisUrl, thisMethod, thisData) => {
  // console.log("FETCH", thisData);
  // var data = new FormData();

  // for (const [key, value] of Object.entries(thisData)) {
  //   data.append(key, value);
  // }
  // console.log("DATA", data);

  const response = await fetch(thisUrl, {
    method: thisMethod,
    // mode: "cors",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: data,
    body: JSON.stringify(thisData),
  });

  if (response.status !== 200) {
    throw new Error("cannot fetch data"); //error causes promise by async function to be rejected
  }
  const resData = await response.json();
  console.log("RESPONSE", resData);
};

export default fetchWithData;
