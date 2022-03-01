const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");
const uidElement = document.querySelector("user-id");

// Elements for sensor readings
const tempElement = document.getElementById("temp");
const set_tempElement = document.getElementById("set_temp");
const roomtempElement = document.getElementById("roomtemp");
const humElement = document.getElementById("hum");
const phElement = document.getElementById("ph");
const set_phElement = document.getElementById("set_ph");
const set_ph_fillElement = document.getElementById("set_ph_fill");
const TDSElement = document.getElementById("tds");
const set_tdsElement = document.getElementById("set_tds");
const pumpElement = document.getElementById("pump");
const heaterElement = document.getElementById("heater");
const pumptimeElement = document.getElementById("pumptime");
const dampnessElement = document.getElementById("dampness");

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var sensorsPath = '/UsersData/' + uid.toString() + '/Sensor Readings';
    var settingsPath = '/UsersData/' + uid.toString() + '/Settings';

    var dbPathTemp = sensorsPath + '/Water Tempurature';
    var dbPathSet_temp = settingsPath + '/set Water Tempurature';

    var dbPathRoomTemp = sensorsPath + '/Room Tempurature';
    var dbPathHum = sensorsPath + '/Humidity';

    var dbPathpH = sensorsPath + '/pH';
    var dbPathSet_ph = settingsPath + '/set pH';

    var dbPathTDS = sensorsPath + '/TDS';
    var dbPathSet_tds = settingsPath + '/set TDS';

    var dbPathPump = sensorsPath + '/Pump Status';
    var dbPathHeater = sensorsPath + '/Heater Status';
    var dbPathPumptime = sensorsPath + '/Pump Time';
    var dbPathDampness = sensorsPath + '/Root Dampness';

    // Database references
    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefSet_temp = firebase.database().ref().child(dbPathSet_temp);

    var dbRefRoomTemp = firebase.database().ref().child(dbPathRoomTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);

    var dbRefpH = firebase.database().ref().child(dbPathpH);
    var dbRefSet_ph = firebase.database().ref().child(dbPathSet_ph);
    
    var dbRefTDS = firebase.database().ref().child(dbPathTDS);
    var dbRefSet_tds = firebase.database().ref().child(dbPathSet_tds);

    var dbRefPump = firebase.database().ref().child(dbPathPump);
    var dbRefHeater = firebase.database().ref().child(dbPathHeater);
    var dbRefPumptime = firebase.database().ref().child(dbPathPumptime);
    var dbRefDampness = firebase.database().ref().child(dbPathDampness);

    // Update page with new readings
    dbRefTemp.on('value', snap => {tempElement.innerText = snap.val().toFixed(1);});
    dbRefSet_temp.on('value', snap => {set_tempElement.innerText = snap.val().toFixed(1);});

    dbRefRoomTemp.on('value', snap => {roomtempElement.innerText = snap.val().toFixed(1);});
    dbRefHum.on('value', snap => {humElement.innerText = snap.val().toFixed(2);});

    dbRefpH.on('value', snap => {phElement.innerText = snap.val().toFixed(2);});
    dbRefSet_ph.on('value', snap => {set_phElement.innerText = snap.val().toFixed(2); set_ph_fillElement.textContent= snap.val().toFixed(2);});

    dbRefTDS.on('value', snap => {TDSElement.innerText = snap.val().toFixed(0);});
    dbRefSet_tds.on('value', snap => {set_tdsElement.innerText = snap.val().toFixed(0);});

    dbRefPump.on('value', snap => {pumpElement.innerText = snap.val().toString();});
    dbRefHeater.on('value', snap => {heaterElement.innerText = snap.val().toString();});
    dbRefPumptime.on('value', snap => {pumptimeElement.innerText = snap.val().toString();});
    dbRefDampness.on('value', snap => {dampnessElement.innerText = snap.val().toString();});

  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}
