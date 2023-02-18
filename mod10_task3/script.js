const msgbtn = document.querySelector('.msg-btn');
const geobtn = document.querySelector('.geo-btn');
const status = document.querySelector('.stts');
const chatArea = document.querySelector('.prt2');
const chatURL = "wss://echo-ws-service.herokuapp.com"

let websocket;


function writeToScreen(message,src) {
 // div для сообщения
  let pre = document.createElement("div");
 // делаем его красивым(ну в силу способностей) 
  pre.className="msg-class";
  
  // вывод сообщения и ответа делаем разным
  if (src == 0){
    pre.classList.add('msg-class-reqw')
  } else{
    pre.classList.add('msg-class-resp')
  }
  
  pre.innerHTML = message;
  chatArea.appendChild(pre);
  // при превышении высоты - прокрутить автоматом
  chatArea.scrollTop = chatArea.scrollHeight;
  
};

// Функция, выводящая текст об ошибке
const geoErr = () => {
  //status.textContent = 'Невозможно получить ваше местоположение';
  console.log('Невозможно получить местоположение');
}
//получение данных  
const geoSccss = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  link = `<a href = 'https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' target="_blank">i'm here!</a>`;
  console.log(link);
  writeToScreen(link,0);
}


geobtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    //status.textContent = 'Geolocation не поддерживается вашим браузером';
    console.log("Geolocation не поддерживается вашим браузером");
  } else {
    console.log('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(geoSccss, geoErr);
  }
});

msgbtn.addEventListener('click',() =>{
  websocket = new WebSocket(chatURL);
 //после открытия канала передаем сообщения
  websocket.onopen = function(evt) {
   let msg = document.querySelector('#txtMsg').value;
   
   writeToScreen (msg,0)
   websocket.send(msg);
    
   document.querySelector('#txtMsg').value=""; 
    
  };

  websocket.onmessage = function(evt) {
  //console.log('resp:'+ evt.data);  
   writeToScreen (evt.data,1); 
  };
     
});