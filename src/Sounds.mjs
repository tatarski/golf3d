export function playSound(soundName, volume = 0.5){
  const audio = new Audio("./music/golf ball hit.wav");
  audio.volume = volume;
  audio.play();
}