export function playRandomSoundEffect(volume = 0.5) {
  const soundFiles = [
    "./music/golf ball hit 1.wav",
    "./music/golf ball hit 2.wav",
    "./music/golf ball hit 3.wav",
    "./music/golf ball hit 4.wav",
  ];

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  const randomIndex = getRandomIndex(soundFiles.length);
  const soundFile = soundFiles[randomIndex];

  const audio = new Audio(soundFile);
  audio.volume = volume;
  audio.play();
}
export function playMusic(musicFile) {
    var audio = new Audio('./music/song.mp3');
    if (audio) {
      audio.src = musicFile;
      audio.loop = true;
      audio.play();
  };
}
//export function playSoundEffect(soundEffectFile) {
 // const soundEffectsElement = document.getElementById("soundEffects");
 // soundEffectsElement.src = soundEffectFile;
 // soundEffectsElement.play();

  // Lower music volume temporarily when sound effect plays
//  const originalVolume = musicElement.volume;
 // musicElement.volume = originalVolume * 0.5; // Adjust factor for desired volume reduction
//  soundEffectsElement.onended = function() {
  //  musicElement.volume = originalVolume;
  //};
//}

//export function toggleUnderwaterEffect(isUnderwater) {
 // const musicElement = document.getElementById("backgroundMusic");
 // const biquadFilter = musicElement.setFilterType("biquad");
 // if (isUnderwater) {
 //   biquadFilter.type = "lowpass";
 //   biquadFilter.frequency.setValueAtTime(2000, musicElement.currentTime); // Adjust frequency for underwater effect
 // } else {
//    biquadFilter.type = "allpass"; // Remove filter for normal sound
//  }
//}
