const timeText = document.querySelector(".date-and-time .time");
const dateText = document.querySelector(".date-and-time .date");

const updateDateAndTime = () => {
  const currentDateAndTime = new Date();

  timeText.textContent = `${currentDateAndTime.getHours()}:${currentDateAndTime.getMinutes()}`;
  dateText.textContent = `${currentDateAndTime.getDate()} ${currentDateAndTime.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDateAndTime.getFullYear()}`;
};

updateDateAndTime();
setInterval(updateDateAndTime, 10000); //Update every 10s
