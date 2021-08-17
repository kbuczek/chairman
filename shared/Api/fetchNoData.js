const fetchNoData = async (thisUrl, thisMethod) => {
  const response = await fetch(thisUrl, {
    method: thisMethod,
    // mode: "cors",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("cannot fetch data"); //error causes promise by async function to be rejected
  }
  const resData = await response.json();
  // console.log("RESPONSE", resData);
  return resData;
};

export default fetchNoData;
