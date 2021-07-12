import removeFrontZeros from "./removeFrontZeros";

const convertDate = (inputDate) => {
  let weekDays = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  let months = [
    "Styczenia",
    "Lutego",
    "Marca",
    "Kwietnia",
    "Maja",
    "Czerwca",
    "Lipca",
    "Sierpienia",
    "Września",
    "Października",
    "Listopada",
    "Grudnia",
  ];
  let date = inputDate.split("-");
  let day = date[0];
  let month = date[1] - 1;
  let year = date[2];
  let weekday = weekDays[new Date(Date.UTC(year, month, day)).getUTCDay()];

  return (
    weekday + ", " + removeFrontZeros(day) + " " + months[month] + " " + year
  );
};

export default convertDate;
