const bar = document.getElementById("bar");
const time = document.getElementById("time");
const dur = document.getElementById("dur");
const img = document.getElementById("img");

const params = new URLSearchParams(window.location.search)
const mood = params.get("mood")

img.innerHTML = '<img src="../assets/' + mood + 'Cat.jpg" class="h-50 w-50 rounded-full object-cover">'


const sound = new Howl({
    src: ['../assets/audio/' + mood + '.m4a'],
    html5: true
})

console.log(sound)

let ply = false

let min, sec;

function play() {
    if (!ply) {
        sound.play()
        min = Math.floor(sound.duration() / 60);
        min2 = Math.floor(sound.duration())
        console.log(min, sound.duration(), min2)
        while (min2 > 59) {
            min2 -= 60;
        }
        sec = min2
        console.log(sec)
        if (sec > 59) {
            sec = sec - 60;
            min++;
            ply = true
        }
        dur.innerText = min + ":" + sec
        bar.max = sound.duration();
    }
}

function pause() {
    sound.pause()
    console.log(sound.seek())
    ply = false
}

bar.addEventListener("input", (e) => {
    const value = e.target.value; // slider value
    const percent = value / 100;

    const duration = sound.duration();
    if (duration) {
        sound.seek(duration * percent);
    }
    sound.play()
    ply = true
});


setInterval(() => {
    if (sound.playing()) {
        const seek = sound.seek() || 0;
        const duration = sound.duration();
        bar.value = (seek / duration) * 100;
    }
}, 100);


setInterval(() => {
    if (sound.playing()) {
        const curTime = sound.seek(); // seconds (float)

        const minutes = Math.floor(curTime / 60);
        const seconds = Math.floor(curTime % 60);

        time.innerText =
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
}, 1000);
