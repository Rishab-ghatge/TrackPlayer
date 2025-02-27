console.log('Connected');
let currentSong = new Audio();
let songs;
let currFolder;
function secondsToMinutesSeconds(seconds){
  if (isNaN(seconds) || seconds < 0){
        return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
  }

async function getSongs(folder){
  currFolder = folder;
  let a = await fetch(`/${folder}/`)
  let response = await a.text()

  let div = document.createElement("div")
  div.innerHTML = response;

  let as = div.getElementsByTagName("a")
  songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3")){
      songs.push(element.href.split(`/${folder}/`)[1])
    }
  }


   //Show all the songs in the playlist
   let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
   songUl.innerHTML = ""
   for (const song of songs) {
     songUl.innerHTML = songUl.innerHTML + `<li><img class="edit" src="Images/music.svg" alt="${song}">
                                           <div class="info">
                                             <div>${song.replaceAll("%20"," ")}</div>
                                             <div></div>
                                           </div>
                                           <div class="playNow">
                                             <span>play now</span>
                                             <img src="Images/play.svg" alt="playNow">
                                           </div> </li>`
     }
 
     //Attach an event listenr to each song
     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
       e.addEventListener("click",element=>{
         console.log(e.querySelector(".info").firstElementChild.innerHTML)
         playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
       })
     })
     
     return songs
  
}

const playMusic = (track,pause = false)=>{
  currentSong.src = `/${currFolder}/` + track
  if(!pause){
    currentSong.play()
    play.src = "Images/pause.svg"
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track)
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums(){
  let a = await fetch(`/songs/`)
  let response = await a.text()
  let div = document.createElement("div")
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a") 
  let cardContainer = document.querySelector(".cardContainer")
  let array =  Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
      const e = array[index];

    if(e.href.includes("/songs")){
      let folder = e.href.split("/").slice(-2)[0]
      // console.log(folder)
      //Get the meta data of the folder
      let a = await fetch(`/songs/${folder}/info.json`)
      let response = await a.json()
      // console.log(response)
      cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                                                          <div class="play">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
                                                              <circle cx="25" cy="25" r="25" fill="#1ed760" />
                                                              <polygon points="20 ,15 20,35 35,25" fill="black" />
                                                            </svg>
                                                          </div>
                                                          <img src="/songs/${folder}/cover.jpeg" alt="cover">
                                                          <p class="r">${response.title}</p>
                                                          <p class="c">${response.description}</p>
                                                        </div>`
    }
  }
       //Load the playlist whenever a card is clicked
       Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async item=>{
          songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
          playMusic(songs[0])
        })
       })
}

 async function main(){
  //Get the list of all songs
  await getSongs("songs/latest")
  playMusic(songs[0],true)


  //Displaying all albums dynamicalyy
  displayAlbums()

  

     //Attach an event listenr to play,pause,next
     let play = document.getElementById("play")
     let previous = document.getElementById("previous")
     let next = document.getElementById("next")

     play.addEventListener("click", ()=>{
      if(currentSong.paused){
        currentSong.play()
        play.src = "Images/pause.svg"
      }
      else{
        currentSong.pause()
        play.src = "Images/play.svg"
      }
     })

     //listen for timeupdate event
     currentSong.addEventListener("timeupdate",()=>{
      // console.log(currentSong.currentTime, currentSong.duration)
      document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
      document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
     })

     //Add an event listener to seek bar
     document.querySelector(".seekbar").addEventListener("click",(e)=>{
      let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
      document.querySelector(".circle").style.left = percent + "%"
      currentSong.currentTime = ((currentSong.duration) * percent) / 100
     })

     //Add an event listener to hamburger
     document.querySelector(".hamburger").addEventListener("click",()=>{
      document.querySelector(".left").style.left = "0"
     })

     //Add an event listener for closing the side bar
     document.querySelector(".close").addEventListener("click",()=>{
      document.querySelector(".left").style.left = "-110%"
     })

     //Add an event listener to previous and next song
     previous.addEventListener("click",()=>{
      console.log('Previous clicked');
      console.log(currentSong);
      let index = songs.indexOf(currentSong.src.split("/").slice('-1')[0])
      if((index - 1) >= 0){
        playMusic(songs[index - 1])
      }
     })

     next.addEventListener("click",()=>{
      console.log('Next clicked');
      let index = songs.indexOf(currentSong.src.split("/").slice('-1')[0])
      if((index + 1) < songs.length){
        playMusic(songs[index + 1])
      }
     })

     //Add an event to volume
     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        // console.log(e)
        currentSong.volume = parseInt(e.target.value)/100
     })

     //Add an event to mute the track
      document.querySelector(".volume>img").addEventListener("click",e=>{
        if(e.target.src.includes("Images/volume.svg")){
          e.target.src = e.target.src.replace("Images/volume.svg","Images/mute.svg")
          currentSong.volume = 0
          document.querySelector(".range").getElementsByTagName("input")[0].value = 0
        }
        else{
          e.target.src = e.target.src.replace("Images/mute.svg","Images/volume.svg")
          currentSong.volume = 0.10
        }
      })

}
main()


