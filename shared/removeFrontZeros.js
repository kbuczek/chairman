const removeFrontZeros = (unit) => (unit < 10 ? unit.substring(1) : unit);

export default removeFrontZeros;
