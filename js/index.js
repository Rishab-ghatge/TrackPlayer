// console.log('Connected');
// let currentSong = new Audio();
// let songs;
// let currFolder;

// function secondsToMinutesSeconds(seconds){
//   if (isNaN(seconds) || seconds < 0){
//     return "00:00";
//   }
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = Math.floor(seconds % 60);
  
//   const formattedMinutes = String(minutes).padStart(2, '0');
//   const formattedSeconds = String(remainingSeconds).padStart(2, '0');
//   return `${formattedMinutes}:${formattedSeconds}`;
// }

// async function getSongs(folder){
//   currFolder = folder;
//   let a = await fetch(`/${folder}/`)
//   let response = await a.text()

//   let div = document.createElement("div")
//   div.innerHTML = response;

//   let as = div.getElementsByTagName("a")
//   songs = []
//   for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     if(element.href.endsWith(".mp3")){
//       songs.push(element.href.split(`/${folder}/`)[1])
//     }
//   }

//   //Show all the songs in the playlist
//   let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
//   songUl.innerHTML = ""
//   for (const song of songs) {
//     songUl.innerHTML = songUl.innerHTML + `<li><img class="edit" src="Images/music.svg" alt="${song}">
//                                            <div class="info">
//                                              <div>${song.replaceAll("%20"," ")}</div>
//                                              <div></div>
//                                            </div>
//                                            <div class="playNow">
//                                              <span>play now</span>
//                                              <img src="Images/play.svg" alt="playNow">
//                                            </div> </li>`
//   }

//   //Attach an event listener to each song
//   Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
//     e.addEventListener("click",element=>{
//       console.log(e.querySelector(".info").firstElementChild.innerHTML)
//       playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
//     })
//   })

//   return songs
// }

// const playMusic = (track, pause = false) => {
//   currentSong.src = `/${currFolder}/` + track
//   if(!pause){
//     currentSong.play()
//     play.src = "Images/pause.svg"
//   }
//   document.querySelector(".songinfo").innerHTML = decodeURI(track)
//   document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
// }

// async function displayAlbums() {
//   // Fetch the contents of the 'songs' directory using the GitHub API
//   let apiUrl = 'https://api.github.com/repos/Rishab-ghatge/TrackPlayer/contents/songs';
//   let response = await fetch(apiUrl);
  
//   if (!response.ok) {
//     console.error("Error fetching the songs directory.");
//     return;
//   }

//   let folders = await response.json();
//   let cardContainer = document.querySelector(".cardContainer");

//   // Iterate through each folder
//   for (let folder of folders) {
//     if (folder.type === 'dir') {
//       let folderName = folder.name;  // The folder name

//       try {
//         // Get the metadata of each folder (info.json)
//         let infoResponse = await fetch(`https://Rishab-ghatge.github.io/TrackPlayer/songs/${folderName}/info.json`);
        
//         // Check if the info.json is found
//         if (infoResponse.ok) {
//           let folderInfo = await infoResponse.json();
//           console.log(folderInfo);
          
//           // Add the album card to the container
//           cardContainer.innerHTML += `<div data-folder="${folderName}" class="card">
//                                           <div class="play">
//                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
//                                               <circle cx="25" cy="25" r="25" fill="#1ed760" />
//                                               <polygon points="20 ,15 20,35 35,25" fill="black" />
//                                             </svg>
//                                           </div>
//                                           <img src="/songs/${folderName}/cover.jpeg" alt="cover">
//                                           <p class="r">${folderInfo.title}</p>
//                                           <p class="c">${folderInfo.description}</p>
//                                         </div>`;
//         }
//       } catch (error) {
//         console.error(`Error fetching or parsing info.json for folder ${folderName}:`, error);
//         // You can display a fallback message or skip the folder if it doesn't have the info.json
//       }
//     }
//   }

//   // Load the playlist whenever a card is clicked
//   Array.from(document.getElementsByClassName("card")).forEach(e => {
//     e.addEventListener("click", async item => {
//       songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
//       playMusic(songs[0]);
//     });
//   });
// }

// async function main(){
//   //Get the list of all songs
//   await getSongs("songs/latest")
//   playMusic(songs[0],true)

//   //Displaying all albums dynamically
//   displayAlbums()

//   //Attach an event listener to play, pause, next
//   let play = document.getElementById("play")
//   let previous = document.getElementById("previous")
//   let next = document.getElementById("next")

//   play.addEventListener("click", () => {
//     if(currentSong.paused){
//       currentSong.play()
//       play.src = "Images/pause.svg"
//     }
//     else{
//       currentSong.pause()
//       play.src = "Images/play.svg"
//     }
//   })

//   //listen for timeupdate event
//   currentSong.addEventListener("timeupdate", () => {
//     document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
//     document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
//   })

//   //Add an event listener to seek bar
//   document.querySelector(".seekbar").addEventListener("click", (e) => {
//     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
//     document.querySelector(".circle").style.left = percent + "%"
//     currentSong.currentTime = ((currentSong.duration) * percent) / 100
//   })

//   //Add an event listener to hamburger
//   document.querySelector(".hamburger").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "0"
//   })

//   //Add an event listener for closing the side bar
//   document.querySelector(".close").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "-110%"
//   })

//   //Add an event listener to previous and next song
//   previous.addEventListener("click", () => {
//     let index = songs.indexOf(currentSong.src.split("/").slice('-1')[0])
//     if((index - 1) >= 0){
//       playMusic(songs[index - 1])
//     }
//   })

//   next.addEventListener("click", () => {
//     let index = songs.indexOf(currentSong.src.split("/").slice('-1')[0])
//     if((index + 1) < songs.length){
//       playMusic(songs[index + 1])
//     }
//   })

//   //Add an event to volume
//   document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//     currentSong.volume = parseInt(e.target.value) / 100
//   })

//   //Add an event to mute the track
//   document.querySelector(".volume>img").addEventListener("click", e => {
//     if(e.target.src.includes("Images/volume.svg")){
//       e.target.src = e.target.src.replace("Images/volume.svg","Images/mute.svg")
//       currentSong.volume = 0
//       document.querySelector(".range").getElementsByTagName("input")[0].value = 0
//     }
//     else{
//       e.target.src = e.target.src.replace("Images/mute.svg","Images/volume.svg")
//       currentSong.volume = 0.10
//     }
//   })
// }

// main()


console.log('Connected');

let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

// async function getSongs(folder) {
//   currFolder = folder;
//   // Make sure the URL is correct
//   let a = await fetch(`https://raw.githubusercontent.com/Rishab-ghatge/TrackPlayer/main/${folder}/`);
//   let response = await a.text();

//   let div = document.createElement("div");
//   div.innerHTML = response;

//   let as = div.getElementsByTagName("a");
//   songs = [];
//   for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     if (element.href.endsWith(".mp3")) {
//       songs.push(element.href.split(`/${folder}/`)[1]);
//     }
//   }

//   // Show all the songs in the playlist
//   let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
//   songUl.innerHTML = "";
//   for (const song of songs) {
//     songUl.innerHTML = songUl.innerHTML + `<li><img class="edit" src="Images/music.svg" alt="${song}">
//                                            <div class="info">
//                                              <div>${song.replaceAll("%20", " ")}</div>
//                                              <div></div>
//                                            </div>
//                                            <div class="playNow">
//                                              <span>play now</span>
//                                              <img src="Images/play.svg" alt="playNow">
//                                            </div> </li>`;
//   }

//   // Attach an event listener to each song
//   Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
//     e.addEventListener("click", element => {
//       console.log(e.querySelector(".info").firstElementChild.innerHTML);
//       playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
//     });
//   });

//   return songs;
// }
async function getSongs(folder) {
  currFolder = folder;

  // Use GitHub API to get the contents of the folder
  const apiUrl = `https://api.github.com/repos/Rishab-ghatge/TrackPlayer/contents/${folder}`;
  let response = await fetch(apiUrl);
  
  if (!response.ok) {
    console.error("Error fetching the song directory.");
    return;
  }

  let files = await response.json();
  songs = [];

  // Filter for mp3 files and construct their raw URLs
  for (let file of files) {
    if (file.type === 'file' && file.name.endsWith('.mp3')) {
      // Construct the raw URL for the mp3 file
      songs.push(file.download_url);
    }
  }

  // Show all the songs in the playlist
  let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
  songUl.innerHTML = "";
  for (const song of songs) {
    songUl.innerHTML = songUl.innerHTML + `<li><img class="edit" src="Images/music.svg" alt="${song}">
                                           <div class="info">
                                             <div>${song.split('/').pop().replaceAll("%20", " ")}</div>
                                             <div></div>
                                           </div>
                                           <div class="playNow">
                                             <span>play now</span>
                                             <img src="Images/play.svg" alt="playNow">
                                           </div> </li>`;
  }

  // Attach an event listener to each song
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
      const songName = e.querySelector(".info").firstElementChild.innerHTML.trim();
      console.log(songName);
      playMusic(songName);
    });
  });

  return songs;
}

// const playMusic = (track, pause = false) => {
//   currentSong.src = `https://raw.githubusercontent.com/Rishab-ghatge/TrackPlayer/main/${currFolder}/` + track;
//   if (!pause) {
//     currentSong.play();
//     play.src = "Images/pause.svg";
//   }
//   document.querySelector(".songinfo").innerHTML = decodeURI(track);
//   document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
// };
// const playMusic = (track, pause = false) => {
//   // Extract song name from the full URL (if it's a URL)
//   const songName = track.split("/").pop(); // This will get the last part of the URL, which is the song name
  
//   currentSong.src = `https://raw.githubusercontent.com/Rishab-ghatge/TrackPlayer/main/${currFolder}/` + track;

//   if (!pause) {
//     currentSong.play();
//     play.src = "Images/pause.svg";
//   }

//   // Display the song name in the play bar
//   document.querySelector(".songinfo").innerHTML = songName; // Show only the song name
//   document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
// };
// const playMusic = (track, pause = false) => {
//   // Extract song name from the full URL (if it's a URL)
//   const songName = track.split("/").pop(); // Get the last part of the URL (song name)

//   currentSong.src = `https://raw.githubusercontent.com/Rishab-ghatge/TrackPlayer/main/${currFolder}/` + track;

//   if (!pause) {
//     currentSong.play();
//     play.src = "Images/pause.svg";
//   }

//   // Decode the song name to replace "%20" with spaces
//   const decodedSongName = decodeURIComponent(songName); // Decode URL encoding

//   // Display the decoded song name in the play bar
//   document.querySelector(".songinfo").innerHTML = decodedSongName;
//   document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
// };
let currentSongIndex = 0; // Add a variable to track the current song index

// const playMusic = (track, pause = false) => {
//   // Find the song name from the track
//   const songName = track.split("/").pop();
  
//   currentSong.src = `https://raw.githubusercontent.com/Rishab-ghatge/TrackPlayer/main/${currFolder}/` + track;

//   // Find and store the current song index
//   currentSongIndex = songs.indexOf(track); // Set the index of the current song

//   if (!pause) {
//     currentSong.play();
//     play.src = "Images/pause.svg";
//   }

//   // Decode the song name to replace "%20" with spaces
//   const decodedSongName = decodeURIComponent(songName); // Decode URL encoding

//   // Display the decoded song name in the play bar
//   document.querySelector(".songinfo").innerHTML = decodedSongName;
//   document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
// };
const playMusic = (track, pause = false) => {
  // Find the song name from the track (remove path, get just file name)
  const songName = track.split("/").pop();
  
  // Update the audio source to the new track
  currentSong.src = `https://raw.githubusercontent.com/Rishab-ghatge/TrackPlayer/main/${currFolder}/` + track;

  // Reset currentTime to 0 for a clean start when switching tracks
  currentSong.currentTime = 0;

  // Set the current song index after the song is updated
  currentSongIndex = songs.indexOf(track);

  // Ensure the song starts playing (if not paused)
  if (!pause) {
    currentSong.play();
    play.src = "Images/pause.svg";  // Change the play button to show "pause"
  }

  // Decode the song name to display it without URL encoding
  const decodedSongName = decodeURIComponent(songName);

  // Update the UI with the current song name
  document.querySelector(".songinfo").innerHTML = decodedSongName;
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};
async function displayAlbums() {
  // Base URL for GitHub Pages hosting
  const baseURL = "https://Rishab-ghatge.github.io/TrackPlayer"; // Replace with your GitHub username

  // Correct API URL pointing to the 'songs' directory in your repository
  let apiUrl = 'https://api.github.com/repos/Rishab-ghatge/TrackPlayer/contents/songs'; // Replace 'your-username' with your GitHub username

  let response = await fetch(apiUrl);

  if (!response.ok) {
    console.error("Error fetching the songs directory.");
    return;
  }

  let folders = await response.json();
  let cardContainer = document.querySelector(".cardContainer");

  // Iterate through each folder
  for (let folder of folders) {
    if (folder.type === 'dir') {
      let folderName = folder.name;

      try {
        // Get the metadata of each folder (info.json)
        let infoResponse = await fetch(`${baseURL}/songs/${folderName}/info.json`);
        
        if (infoResponse.ok) {
          let folderInfo = await infoResponse.json();

          // Add the album card to the container
          cardContainer.innerHTML += `<div data-folder="${folderName}" class="card">
                                          <div class="play">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
                                              <circle cx="25" cy="25" r="25" fill="#1ed760" />
                                              <polygon points="20 ,15 20,35 35,25" fill="black" />
                                            </svg>
                                          </div>
                                          <img src="${baseURL}/songs/${folderName}/cover.jpeg" alt="cover">
                                          <p class="r">${folderInfo.title}</p>
                                          <p class="c">${folderInfo.description}</p>
                                        </div>`;
        }
      } catch (error) {
        console.error(`Error fetching or parsing info.json for folder ${folderName}:`, error);
      }
    }
  }

  // Load the playlist whenever a card is clicked
  Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click", async item => {
      songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0]);
    });
  });
}

async function main() {
  // Get the list of all songs
  await getSongs("songs/latest");
  playMusic(songs[0], true);

  // Display all albums dynamically
  displayAlbums();

  // Attach an event listener to play, pause, next
  let play = document.getElementById("play");
  let previous = document.getElementById("previous");
  let next = document.getElementById("next");

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "Images/pause.svg";
    } else {
      currentSong.pause();
      play.src = "Images/play.svg";
    }
  });

  // Listen for timeupdate event
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Add an event listener to seek bar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // Add an event listener to hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  // Add an event listener for closing the side bar
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-110%";
  });

  // Add an event listener to previous and next song
  // previous.addEventListener("click", () => {
  //   let index = songs.indexOf(currentSong.src.split("/").slice('-1')[0]);
  //   if ((index - 1) >= 0) {
  //     playMusic(songs[index - 1]);
  //   }
  // });

  // next.addEventListener("click", () => {
  //   let index = songs.indexOf(currentSong.src.split("/").slice('-1')[0]);
  //   if ((index + 1) < songs.length) {
  //     playMusic(songs[index + 1]);
  //   }
  // });
  // previous.addEventListener("click", () => {
  //   // Go to the previous song if possible
  //   if (currentSongIndex > 0) {
  //     playMusic(songs[currentSongIndex - 1]);
  //   }
  // });
  
  // next.addEventListener("click", () => {
  //   // Go to the next song if possible
  //   if (currentSongIndex < songs.length - 1) {
  //     playMusic(songs[currentSongIndex + 1]);
  //   }
  // });
  previous.addEventListener("click", () => {
    if (currentSongIndex > 0) {
      // Go to the previous song and play it
      playMusic(songs[currentSongIndex - 1]);
    }
  });
  
  next.addEventListener("click", () => {
    if (currentSongIndex < songs.length - 1) {
      // Go to the next song and play it
      playMusic(songs[currentSongIndex + 1]);
    }
  });

  // Add an event to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    currentSong.volume = parseInt(e.target.value) / 100;
  });

  // Add an event to mute the track
  document.querySelector(".volume>img").addEventListener("click", (e) => {
    if (e.target.src.includes("Images/volume.svg")) {
      e.target.src = e.target.src.replace("Images/volume.svg", "Images/mute.svg");
      currentSong.volume = 0;
      document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
    } else {
      e.target.src = e.target.src.replace("Images/mute.svg", "Images/volume.svg");
      currentSong.volume = 0.10;
    }
  });
}

main();