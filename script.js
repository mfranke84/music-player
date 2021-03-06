const image = document.querySelector('img');
const music = document.querySelector('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const duration = document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEL = document.getElementById('current-time');
const durationEL = document.getElementById('duration');
const volume = document.getElementById('volume-container');
const volumeBar = document.getElementById('volume');
const volumeLvl = document.getElementById('volume-level');
const volumeBall = document.getElementById('volume-ball');
let volumePercent = 1;

// Music
const songs = [
    {
        name:'jacinto-1',
        displayName: 'Electric Chill machine',
        artist:'Jacinto Design',
    },
    {
        name:'jacinto-2',
        displayName: 'Seven Nation Army (remix)',
        artist:'Jacinto Design',
    },    {
        name:'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist:'Jacinto Design',
    },    {
        name:'metric-1',
        displayName: 'Front Row (Remix)',
        artist:'Metric/Jacinto Design',
    }
];

// Check if playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    // playBtn.title = "Pause";
    playBtn.setAttribute('title','Pause');
    music.play();
}

// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

// Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong(): playSong()));

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    volumePercent = Math.floor(music.volume*100);
    volumeBar.style.width = `${volumePercent}%`;
    volumeLvl.textContent = `${volumePercent}%`;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`; 
}

// CurrentSong
let songIndex = 0;

// Previous song
function prevSong(e){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length-1;
    }
    
    loadSong(songs[songIndex]);
    
    playSong();
}

// Next song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length-1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// On load - Select first song
loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgressBar(e){
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for the duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay switching the duration Element to avoid NaA
        if (durationSeconds){
            durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for the current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        
        // Delay switching the duration Element to avoid NaA
        if (currentSeconds){
            currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;
        }
        
        
    }
}

// Set progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = clickX/width * duration;
   
}

// Set volume
function setVolume(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    music.volume = clickX/width;
}

// Update volume bar
function updateVolumeBar(e){
    volumePercent = Math.floor(e.srcElement.volume*100);
    volumeBar.style.width = `${volumePercent}%`;
    volumeLvl.textContent = `${volumePercent}%`;
    volumeBall.style.marginLeft = `${volumePercent}%`;
}

// Write volume to volume wrapper
function showVolumeLevel(){

}

// Event listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
music.addEventListener('volumechange',updateVolumeBar)
progressContainer.addEventListener('click',setProgressBar);
volume.addEventListener('click',setVolume);