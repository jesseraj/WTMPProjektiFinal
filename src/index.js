import FazerData from './modules/fazer-data';
import {fetchData} from './modules/network';
import {getTodayIndex, todayDate} from './modules/tools';
import HSLData from './modules/hsl-data';

//---------------------------------------------------------------------------------------------------------

let language = 'fi';

const renderMenu = (data, targetId) => {
  const ulElement = document.querySelector('#' + targetId);
  ulElement.innerHTML = '';
  for (const item of data) {
    const listElement = document.createElement('li');
    listElement.textContent = item;
    ulElement.appendChild(listElement);
    listElement.classList.add('sodexo-item');
  }
};

//---------------------------------------------------------------------------------------------------------

const init = () => {

//---------------------------------------------------------------------------------------------------------
 // Render Fazer
 fetchData(FazerData.dataUrlFi, {}, 'fazer-php').then(data => {
   console.log('fazer', data);
   const courses = FazerData.parseDayMenu(data.LunchMenus, getTodayIndex());
   renderMenu(courses, 'fazer');
 });

//---------------------------------------------------------------------------------------------------------
  // Playing with hsl data
  fetchData(HSLData.apiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/graphql'},
    body: HSLData.getQueryForNextRidesByStopId(2132207)
  }).then(response => {

    console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);
    const stop = response.data.stop;

    let time = new Date((stop.stoptimesWithoutPatterns[0].realtimeArrival + stop.stoptimesWithoutPatterns[0].serviceDay) * 1000);
    let time2 = new Date((stop.stoptimesWithoutPatterns[1].realtimeArrival + stop.stoptimesWithoutPatterns[1].serviceDay) * 1000);
    let time3 = new Date((stop.stoptimesWithoutPatterns[2].realtimeArrival + stop.stoptimesWithoutPatterns[2].serviceDay) * 1000);
    let time4 = new Date((stop.stoptimesWithoutPatterns[3].realtimeArrival + stop.stoptimesWithoutPatterns[3].serviceDay) * 1000);
    let time5 = new Date((stop.stoptimesWithoutPatterns[4].realtimeArrival + stop.stoptimesWithoutPatterns[4].serviceDay) * 1000);

    document.querySelector('#hsl-data').innerHTML = `
    <h3 id="hsl-item">
      ${stop.name}
    </h3>
    <h3 id="hsl-item">
      ${stop.name}
    </h3>
    <h3 id="hsl-item">
      ${stop.name}
    </h3>
    <h3 id="hsl-item">
      ${stop.name}
    </h3>
    <h3 id="hsl-item">
      ${stop.name}
    </h3>
    `;


    document.querySelector('#hsl-data2').innerHTML = `
    <h3 id="hsl-item">
      ${stop.stoptimesWithoutPatterns[0].headsign}
    </h3>
    <h3 id="hsl-item">
      ${stop.stoptimesWithoutPatterns[1].headsign}
    </h3>
    <h3 id="hsl-item">
      ${stop.stoptimesWithoutPatterns[2].headsign}
    </h3>
    <h3 id="hsl-item">
      ${stop.stoptimesWithoutPatterns[3].headsign}
    </h3>
    <h3 id="hsl-item">
      ${stop.stoptimesWithoutPatterns[4].headsign}
    </h3>
    `;

    document.querySelector('#hsl-data3').innerHTML = `
    <h3 id="hsl-item">
      ${time.toLocaleString('fi-FI').substr(13, 6)}
    </h3>
    <h3 id="hsl-item">
      ${time2.toLocaleString('fi-FI').substr(13, 6)}
    </h3>
    <h3 id="hsl-item">
      ${time3.toLocaleString('fi-FI').substr(13, 6)}
    </h3>
    <h3 id="hsl-item">
      ${time4.toLocaleString('fi-FI').substr(13, 6)}
    </h3>
    <h3 id="hsl-item">
      ${time5.toLocaleString('fi-FI').substr(13, 6)}
    </h3>
    `;

  });

//---------------------------------------------------------------------------------------------------------
};
init();

// Pagerefresh minuutin välein hsl jutuille..., mikään muu ei toiminut!
setTimeout(function() {
  location.reload();
}, 60000);

