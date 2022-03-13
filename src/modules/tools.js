/**
 * Today's date only in ISO format
 */
const todayISODate = new Date().toISOString().substr(0, 10);

/**
 * TODO: add description
 *
 * @returns
 */
const getTodayIndex = () => {
  // NOTE: doesn't work on Sundays
  // TODO: ^ fix it!
  const weekDayIndex = new Date().getDay() - 1;
  return weekDayIndex;
};


// Päivämäärä muodossa 0000-00-00
let dateNow = new Date();
let todayDate = dateNow.toISOString().substr(0, 10);
console.log(todayDate);
console.log("https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=" + todayDate);

// Kellonaika
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "Huomenta! ";


  if(hh > 12 && hh < 18){
      session = "Päivää! ";
  }
  else if(hh > 18){
    session = "Iltaa! ";
  }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   ss = (ss < 10) ? "0" + ss : ss;

   let timeNow = session + hh + ":" + mm + ":" + ss + " ";

  document.getElementById("clock").innerText = timeNow;
  let t = setTimeout(function() { currentTime(); }, 1000);

}

currentTime();




export {getTodayIndex, todayISODate, todayDate};
