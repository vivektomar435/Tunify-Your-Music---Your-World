 let song = document.querySelector("#song");
 let prvsg = document.querySelector("#prvsong");
 let playbtn = document.querySelector("#playbtn");
 let nxtsg = document.querySelector("#nextsong");
 let progressbar = document.getElementById("progressbar");
 let currenttimeE1 = document.getElementById("currtime");
 let durationE1 = document.getElementById("duration");
 let cover = document.getElementById("cover-image");
 let title = document.querySelector(".song-name");
 let singer = document.querySelector(".singer");
 let volumeSlider = document.querySelector(".sound-range");
 let volumeIcon = document.querySelector(".sound");
 let repeatbtn = document.querySelector("#repeat");
 let shuffbtn = document.querySelector("#shuffbtn");
 let songs1 = ["songs1/Aisa Banna Sawarna.mp3","songs1/Kali Kali Zulfon Ke.mp3","songs1/Tumhi Ho Bandhu.mp3","songs1/Itni Si Baat Hain.mp3","songs1/Камин.mp3","songs1/Rabb Manneya.mp3","songs1/Sahiba.mp3"];
 let songs2 = ["songs2/Avicii - The Nights.mp3","songs2/Tera Zikr.mp3","songs2/Rosa Linn - SNAP.mp3","songs2/Teri Jhuki Nazar (Lofi Flip).mp3","songs2/Raat Bhar.mp3"];
 let sa1 = [aisha0 , kali1, tum2, itni3, kamhn4 , rabb5 , sahiba6];
 let sa2 = [nights0, tera1, snap2, teri3 , raat4];
 let songs = [sa1 , sa2];
 let songsindex = 0;
 let songindex = 0;
 let isplaying = false;
 let isrepeat = false;
 let isshuffle = false;
 let shufflearray = [];
 let shuffleindex = 0;
 
//All songs selector

 let aisha = document.querySelector("#aisha");
 let kali  = document.querySelector("#kali");
 let tum   = document.querySelector("#tum");
 let itni  = document.querySelector("#itni");
 let kamhn = document.querySelector("#kamhn");
 let nights = document.querySelector("#nights");
 let tera  = document.querySelector("#tera");
 let snap  = document.querySelector("#snap");
 let teri  = document.querySelector("#teri");
 let rabb  = document.querySelector("#rabb");
 let sahiba = document.querySelector("#sahiba");
 let raat = document.querySelector("#raat");

 //play and pause button

 playbtn.addEventListener("click" , function(){
    if(isplaying == false){
       play();   
    }
    else{
       pause();
    }
 });

 //when song end

 song.addEventListener("ended", function () {
   if(isrepeat){
      song.currentTime = 0;
      song.play();
      return;
   }
   if(isshuffle){
   shuffleindex++;
   if(shuffleindex>=shufflearray.length){
      shufflearray = shuffleorder(songs[songsindex].length);
       shufflearray = shufflearray.filter(i => i !== songindex);
      shuffleindex = 0;
   }
   songindex = shufflearray[shuffleindex];
    if (!songs[songsindex][songindex]) return;
   songs[songsindex][songindex]();
   return;
   }
   else{
   //  playbtn.src = "icons-and-logo/player_icon3.png";
   //  playbtn.classList.remove("seds");
   //  isplaying = false;
   // if(songsindex == 0){
   //   if(songindex == songs[0].length-1){
   //    playbtn.src = "icons-and-logo/player_icon3.png";
   //    playbtn.classList.remove("seds");
   //    isplaying = false;
   //   }
   //  else{
   //   songindex++;
   //   songs[songsindex][songindex]();
   //   }
   // }
   // else if(songsindex == 1){
   //   if(songindex == songs[1].length-1){
   //    playbtn.src = "icons-and-logo/player_icon3.png";
   //    playbtn.classList.remove("seds");
   //    isplaying = false;
   //   }
   //  else{
   //   songindex++;
   //   songs[songsindex][songindex]();
   //   }
   // }

    if (songindex < songs[songsindex].length - 1) {
        songindex++;
        songs[songsindex][songindex]();
    } else {
        playbtn.src = "icons-and-logo/player_icon3.png";
        playbtn.classList.remove("seds");
        isplaying = false;
    }
 }});

 //progress bar and duration

 progressbar.value = 0;
 progressbar.style.setProperty("--value", 0);
 currenttimeE1.innerText = "0:00";

 song.addEventListener("loadedmetadata" , () => {
    durationE1.innerText = formatTime(song.duration);
    progressbar.max = 100;
     progressbar.value = 0;
    progressbar.style.setProperty("--value", 0);
 });
 song.addEventListener("timeupdate" , () => {
      if (!song.duration) return; 
    currenttimeE1.innerText = formatTime(song.currentTime);
    let percent = (song.currentTime / song.duration) * 100;
   progressbar.value = percent;
   progressbar.style.setProperty("--value", percent);
 });
 progressbar.addEventListener("input" , () => {
    let seektime = (progressbar.value / 100)*song.duration;
    song.currentTime = seektime;
 });
 function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
   return `${mins}:${secs}`;
 }

 //Play and pause function

 function play(){
     song.play();
         playbtn.src = "icons-and-logo/pause_icon.png";
         playbtn.classList.add("seds");
         isplaying = true;
 };

 function pause(){
     song.pause();
        playbtn.src = "icons-and-logo/player_icon3.png";
        playbtn.classList.remove("seds");
        isplaying = false;
 };

 document.addEventListener('keydown' , (e) => {
   if(e.code === 'Space'){
      if(isplaying){
         pause();
      }
      else{
         play();
      }
   }
 });

 //Sound control

 song.volume = 0.7;
 volumeSlider.value = 70;
 volumeSlider.style.setProperty("--vol", volumeSlider.value);

 volumeSlider.addEventListener("input",  () => {
   song.volume = volumeSlider.value/100;
   volumeSlider.style.setProperty("--vol", volumeSlider.value);

   if(song.volume == 0){
       volumeIcon.className = "fa-solid fa-volume-xmark sound dd";
   } else if(song.volume < 0.5){
      volumeIcon.className = "fa-solid fa-volume-low sound dd";
   }
   else{
       volumeIcon.className = "fa-solid fa-volume-high sound dd";
   }
 });

 let lastvolume = song.volume;

 volumeIcon.addEventListener("click" , ()=>{
   console.log("clicked");
 if(song.volume > 0){
   lastvolume = song.volume;
   song.volume = 0;
   volumeSlider.value = 0;
     volumeIcon.className = "fa-solid fa-volume-xmark sound dd";
     volumeSlider.style.setProperty("--vol", volumeSlider.value);
 }
 else{
   song.volume = lastvolume||0.7;
   volumeSlider.value = song.volume*100;
    volumeIcon.className = "fa-solid fa-volume-high sound dd";
    volumeSlider.style.setProperty("--vol", volumeSlider.value);
 }
 });

 //Repeat
 repeatbtn.addEventListener("click" , ()=>{
   if(isshuffle){
      isshuffle = !isshuffle;
     shuffbtn.classList.toggle("shuffbtn-active" , isshuffle);
     shuffbtn.style.opacity = "0.7";
     shuffbtn.style.filter = "none";
   }
   isrepeat = !isrepeat;
    repeatbtn.classList.toggle("repeat-active", isrepeat);
    if (isrepeat) {
        repeatbtn.style.opacity = "1";
   
    } else {
        repeatbtn.style.opacity = "0.7";
        repeatbtn.style.filter = "none";
    }
 });

 //Previous song button
 prvsg.addEventListener("click" , ()=> {
   if(songsindex == 0){
   if(songindex == 0){
      songs[0][songs[0].length-1]();
    }
 else{
    songindex--;
    songs[songsindex][songindex]();
      }}
 else if(songsindex == 1){
      if(songindex == 0){
         songs[1][songs[1].length-1]();
    }
 else{songindex--;
    songs[songsindex][songindex]();
   }}});

 //Next song button
 nxtsg.addEventListener("click" , () => {
   if(songsindex == 0){
   if(songindex == songs[0].length-1){
      songs[0][0]();
   }
  else{
   songindex++;
   songs[songsindex][songindex]();
   }}
 else if(songsindex == 1){
      if(songindex == songs[1].length-1){
         songs[1][0]();
      }
 else{
   songindex++;
   songs[songsindex][songindex]();
   }}});

   // Shuffle button
 function shuffleorder(length) {
   let ply = [];
   for(let i=0; i<length; i++){
      ply.push(i);
   }
   for(let i = ply.length-1; i>=0; i--){
      let j = Math.floor(Math.random()*(i+1));
      [ply[i],ply[j]] = [ply[j] , ply[i]];
   }
   return ply;
 }
  shuffbtn.addEventListener("click" , ()=>{
   if(isrepeat){
      isrepeat = !isrepeat;
    repeatbtn.classList.toggle("repeat-active", isrepeat);
     repeatbtn.style.opacity = "0.7";
        repeatbtn.style.filter = "none";
   }
    isshuffle = !isshuffle;
     shuffbtn.classList.toggle("shuffbtn-active" , isshuffle);
      if (isshuffle) {
        shuffbtn.style.opacity = "1";
        shufflearray = shuffleorder(songs[songsindex].length);
        shuffleindex = 0;
   
    } else {
        shuffbtn.style.opacity = "0.7";
        shuffbtn.style.filter = "none";
    }});

 

 //All Songs1

//  aisha.addEventListener("click" , function(){
//     song.src = songs1[0];
//     songsindex = 0;
//     songindex = 0;
//     cover.src = "songs1-cover-image/aisha banna.jpg";
//     title.innerText = aisha.querySelector(".card-title").textContent;
//     singer.innerText = aisha.querySelector(".card-info").textContent;
//     play();
//  });

 aisha.addEventListener("click" , aisha0);
 function aisha0() {
   playSong(
      aisha,songs1,0,"songs1-cover-image/aisha banna.jpg"
   );
 }
 

//  kali.addEventListener("click" , function(){
//     song.src = songs1[1];
//     songsindex = 0;
//     songindex = 1;
//     cover.src = "songs1-cover-image/kali - kali.jpg";
//     title.innerText = kali.querySelector(".card-title").textContent;
//     singer.innerText = kali.querySelector(".card-info").textContent;
//     play();
//  });

 kali.addEventListener("click" , kali1);
 function kali1() {
   playSong(
      kali,songs1,1,"songs1-cover-image/kali - kali.jpg"
   );
 }


//  tum.addEventListener("click" , function(){
//     song.src = songs1[2];
//     songsindex = 0;
//     songindex = 2;
//     cover.src = "songs1-cover-image/tum hi ho bandhu.jpg";
//     title.innerText = tum.querySelector(".card-title").textContent;
//     singer.innerText = tum.querySelector(".card-info").textContent;
//     play();
//  });

 tum.addEventListener("click" , tum2);
 function tum2() {
   playSong(
      tum,songs1,2,"songs1-cover-image/tum hi ho bandhu.jpg"
   );
 }


//  itni.addEventListener("click" , function(){
//     song.src = songs1[3];
//     songsindex = 0;
//     songindex = 3;
//     cover.src = "songs1-cover-image/itni si baat hai.jpg";
//     title.innerText = itni.querySelector(".card-title").textContent;
//     singer.innerText = itni.querySelector(".card-info").textContent;
//     play();
//  });

 itni.addEventListener("click" , itni3);
 function itni3() {
   playSong(
      itni,songs1,3,"songs1-cover-image/itni si baat hai.jpg"
   );
 }

//  kamhn.addEventListener("click" , function(){
//     song.src = songs1[4];
//     songsindex = 0;
//     songindex = 4;
//     cover.src = "songs1-cover-image/kamHn.jpg";
//     title.innerText = kamhn.querySelector(".card-title").textContent;
//     singer.innerText = kamhn.querySelector(".card-info").textContent;
//     play();
// });

 kamhn.addEventListener("click" , kamhn4);
 function kamhn4() {
   playSong(
      kamhn,songs1,4,"songs1-cover-image/kamHn.jpg"
   );
 }

// rabb.addEventListener("click" , function(){
//     song.src = songs1[5];
//     songsindex = 0;
//     songindex = 5;
//     cover.src = "songs1-cover-image/raab maneya.jpg";
//     title.innerText = rabb.querySelector(".card-title").textContent;
//     singer.innerText = rabb.querySelector(".card-info").textContent;
//     play();
//  });

 rabb.addEventListener("click" , rabb5);
 function rabb5() {
   playSong(
      rabb,songs1,5,"songs1-cover-image/raab maneya.jpg"
   );
 }

//  sahiba.addEventListener("click" , function(){
//     song.src = songs1[6];
//     songsindex = 0;
//     songindex = 6;
//     cover.src = "songs1-cover-image/sahiba.jpg";
//     title.innerText = sahiba.querySelector(".card-title").textContent;
//     singer.innerText = sahiba.querySelector(".card-info").textContent;
//     play();
//  });

 sahiba.addEventListener("click" , sahiba6);
 function sahiba6() {
   playSong(
      sahiba,songs1,6,"songs1-cover-image/sahiba.jpg"
   );
 }

//All songs2

// nights.addEventListener("click" , function(){
//     song.src = songs2[0];
//     songsindex = 1;
//     songindex = 0;
//     cover.src = "songs2-cover-image/the nights.jpg";
//     title.innerText = nights.querySelector(".card-title").textContent;
//     singer.innerText = nights.querySelector(".card-info").textContent;
//     play();
// });

 nights.addEventListener("click" , nights0);
 function nights0() {
   playSong(
      nights,songs2,0,"songs2-cover-image/the nights.jpg"
   );
 }

// tera.addEventListener("click" , function(){
//     song.src = songs2[1];
//     songsindex = 1;
//     songindex = 1;
//     cover.src = "songs2-cover-image/tera zikr.jpg";
//     title.innerText = tera.querySelector(".card-title").textContent;
//     singer.innerText = tera.querySelector(".card-info").textContent;
//     play();
// });

 tera.addEventListener("click" , tera1);
 function tera1() {
   playSong(
      tera,songs2,1,"songs2-cover-image/tera zikr.jpg"
   );
 }

// snap.addEventListener("click" , function(){
//     song.src = songs2[2];
//     songsindex = 1;
//     songindex = 2;
//     cover.src = "songs2-cover-image/snap.jpg";
//     title.innerText = snap.querySelector(".card-title").textContent;
//     singer.innerText = snap.querySelector(".card-info").textContent;
//     play();
// });

 snap.addEventListener("click" , snap2);
 function snap2() {
   playSong(
      snap,songs2,2,"songs2-cover-image/snap.jpg"
   );
 }

// teri.addEventListener("click" , function(){
//     song.src = songs2[3];
//     songsindex = 1;
//     songindex = 3;
//     cover.src = "songs2-cover-image/teri jhuki najar.jpg";
//     title.innerText = teri.querySelector(".card-title").textContent;
//     singer.innerText = teri.querySelector(".card-info").textContent;
//     play();
// });

 teri.addEventListener("click" , teri3);
 function teri3() {
   playSong(
      teri,songs2,3,"songs2-cover-image/teri jhuki najar.jpg"
   );
 }

 raat.addEventListener("click" , raat4);
 function raat4() {
   playSong(
      raat,songs2,4,"songs2-cover-image/raatbhar.jpg"
   );
 }

 // General function for song playing

function playSong(element, songsArray, index, coverPath) {
    song.src = songsArray[index];
   if(songsArray == songs1){
    songsindex = 0;
    }
    else{songsindex = 1;}
    songindex = index; 

    cover.src = coverPath;

    title.innerText = element.querySelector(".card-title").textContent;
    singer.innerText = element.querySelector(".card-info").textContent;

    play();
}

function openPremiumBanner() {
  document.getElementById('premiumOverlay').classList.add('active');
  document.querySelector('.main').classList.add('blurred');
  document.querySelector('.music-player').classList.add('blurred');
}

function closePremiumBanner() {
  document.getElementById('premiumOverlay').classList.remove('active');
  document.querySelector('.main').classList.remove('blurred');
  document.querySelector('.music-player').classList.remove('blurred');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('premiumOverlay')) {
    closePremiumBanner();
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePremiumBanner();
});

let tooltipWrap = document.querySelector('.tooltip-wrap');
let tooltipMsg  = document.querySelector('.tooltip-msg');

tooltipWrap.addEventListener('click', function(e) {
    e.stopPropagation();
    tooltipMsg.classList.toggle('tooltip-visible');
});

document.addEventListener('click', function() {
    tooltipMsg.classList.remove('tooltip-visible');
});
//Request a Song Feature

function openReqBanner() {
    document.getElementById('reqOverlay').classList.add('active');
    document.querySelector('.main').classList.add('blurred');
    document.querySelector('.music-player').classList.add('blurred');
}

function closeReqBanner() {
    document.getElementById('reqOverlay').classList.remove('active');
    document.querySelector('.main').classList.remove('blurred');
    document.querySelector('.music-player').classList.remove('blurred');
}

function handleReqOverlay(e) {
    if (e.target === document.getElementById('reqOverlay')) {
        closeReqBanner();
    }
}

function submitRequest() {
    let name = document.getElementById('reqName').value.trim();
    let song = document.getElementById('reqSong').value.trim();
    let singer = document.getElementById('reqSinger').value.trim();
    let msg = document.getElementById('reqMsg');

    if (!name || !song || !singer) {
        msg.style.color = '#e74c3c';
        msg.innerText = 'Please fill in all fields!';
        return;
    }

msg.style.color = '#aaaaaa';
 msg.innerText = 'Sending...';

let formData = new FormData();
formData.append('name', name);
formData.append('song', song);
formData.append('singer', singer);

fetch('https://script.google.com/macros/s/AKfycbzb-OlGX4IkwifQG-bxYw1ryl4bXxBSt_VMWd99tGgcfn0dAPLi7-1SKy1tNh2PWjxA3g/exec', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
})
.then(() => {
    msg.style.color = '#1bd760';
    msg.innerText = 'Request sent! Thank you';
    document.getElementById('reqName').value = '';
    document.getElementById('reqSong').value = '';
    document.getElementById('reqSinger').value = '';
})
.catch(() => {
    msg.style.color = '#e74c3c';
    msg.innerText = 'Something went wrong. Try again!';
});
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeReqBanner();
});
