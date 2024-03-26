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