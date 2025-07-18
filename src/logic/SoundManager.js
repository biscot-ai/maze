class SoundManager {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.sounds = {};
    this.isMuted = false;
  }

  async loadSound(name, url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sounds[name] = audioBuffer;
    } catch (error) {
      console.error(`Failed to load sound: ${name}`, error);
    }
  }

  playSound(name, loop = false) {
    if (this.isMuted || !this.sounds[name]) {
      return;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = this.sounds[name];
    source.connect(this.audioContext.destination);
    source.loop = loop;
    source.start(0);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }
}

const soundManager = new SoundManager();
export default soundManager;
