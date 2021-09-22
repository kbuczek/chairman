const fetchNoData = async (thisUrl, thisMethod) => {
  const response = await fetch(thisUrl, {
    method: thisMethod,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("cannot fetch data"); //error causes promise by async function to be rejected
  }
  const resData = await response.json();
  return resData;
};

export default fetchNoData;
