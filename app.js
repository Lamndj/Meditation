const app = () => {

    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    
    // SOUNDS
    
    const sounds = document.querySelectorAll(".sound-picker button")
    
    // TIME DISPLAY
    
    const timeSelect = document.querySelectorAll(".time-select button");
    const timeDisplay = document.querySelector(".time-display")

    // GET LENGTH OF THE CIRCLE OUTLINE

    const outlineLength = outline.getTotalLength(outline);
    
    // DURATION

    let fakeDuration = 600;
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // PLAY SOUND   

    play.addEventListener('click', () => {
        checkPlaying(song)
    })

    // SELECT TIMER

    timeSelect.forEach(option => {
        option.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        })
    })

    // SELECT SONG and CHANGE VIDEO

    sounds.forEach(option => {
        option.addEventListener("click", function(){
            const newSong = this.getAttribute("data-sound");
            const newVideo = this.getAttribute("data-video");
            video.src=newVideo;
            song.src = newSong;
            checkPlaying(song);
        })
    })

    const checkPlaying = (song) => {
        if(song.paused){
            song.play();
            play.src="./svg/pause.svg";
            video.play();
        } else{
            song.pause();
            play.src="./svg/play.svg";
            video.pause();
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed/60);

        // CIRCLE ANIMATION

        let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // TIME UPDATE

        timeDisplay.textContent = `${minutes}:${seconds}`

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            video.pause();
            play.src="./svg/play.svg";
        }
    }


}

app();