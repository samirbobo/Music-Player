let newPlaying = document.querySelector(".new-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playsoud_btn =document.querySelector(".playsoud-track");
let next_btn =document.querySelector(".next-track");
let prev_btn =document.querySelector(".prev-track");

let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let counterTime = document.querySelector(".counter-time");
console.log(counterTime)
let totalDuration = document.querySelector(".total-duration");
let wave = document.querySelector(".wave");
let random = document.querySelector(".fa-random");
let curent_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: 'img/man-1838330__480.jpg',
    name: 'Falling Down',
    artist: 'Wid Cards',
    music: 'music/falling-down-lyrics.mp3'
  },
  {
    img: 'img/download.jpeg',
    name: 'Faded',
    artist: 'Alan walker',
    music: 'music/faded-lyrics.mp3'
  },
  {
    img: 'img/download (1).jpeg',
    name: 'Rather 8e',
    artist: 'Clean Bandit',
    music: 'music/rather-be-lyrics-feat-jess-glynne (1).mp3'
  }
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();
  curent_track.src = music_list[track_index].music;
  curent_track.load();
  trackArt.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  trackName.textContent = music_list[track_index].name;
  trackArtist.textContent = music_list[track_index].artist
  newPlaying.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;
  updateTimer = setInterval(setUpdate, 1000);
  curent_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function  random_bg_color() {
  let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let a;
  function populate(a) {
    for(let i = 0; i < 6; i++) {
      let x = Math.floor(Math.random() * hex.length);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let color1 = populate("#");
  let color2 = populate("#");
  let angle = 'to right';
  let gradint = 'linear-gradient(' + angle + ',' + color1 + ',' + color2 + ')';
  document.body.style.background = gradint;
}

function reset() {
  counterTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  random.classList.add('randomActive');
}

function pauseRandom() {
  isRandom = false;
  random.classList.remove('randomActive');
}

function repeatTrack() {
  let cur_index = track_index;
  loadTrack(cur_index);
  playTrack();
}

function playsoudTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curent_track.play();
  isPlaying = true;
  trackArt.classList.add("rotate");
  wave.classList.add("loader");
  playsoud_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curent_track.pause();
  isPlaying = false;
  trackArt.classList.remove("rotate");
  wave.classList.remove("loader");
  playsoud_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}

function nextTrack() {
  if(track_index < music_list.length - 1 && isRandom === false ) {
    track_index += 1;
  }else if(track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  }else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if(track_index > 0 ) {
    track_index -= 1;
  }else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekTo = curent_track.duration * (seekSlider.value / 100);
  curent_track.currentTime = seekTo;
}
function setVolume() {
  curent_track.volume = volumeSlider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if(!isNaN(curent_track.duration)) {
    seekPosition = curent_track.currentTime * (100 / curent_track.duration);
    seekSlider.value = seekPosition;

    let  currentMinutes = Math.floor(curent_track.currentTime / 60);
    let  currentSeconde = Math.floor(curent_track.currentTime - currentMinutes * 60);
    let  durationMinutes = Math.floor(curent_track.duration / 60);
    let  durationSeconde = Math.floor(curent_track.duration - durationMinutes * 60);

    if(currentSeconde < 10) {currentSeconde = "0" + currentSeconde;}
    if(durationSeconde < 10) {durationSeconde = "0" + durationSeconde;}
    if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
    if(durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}

    counterTime.textContent = currentMinutes + ":" + currentSeconde;
    totalDuration.textContent = durationMinutes + ":" + durationSeconde
  }
}