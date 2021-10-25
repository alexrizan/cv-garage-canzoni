export class YoutubeConroller {
  private player: any;

  constructor(player: any) {
    this.player = player;
  }

  play() {
    try {
      this.player?.playVideo();
    } catch (e) {
      console.log(e);
    }
  }

  setCurrentTime(seconds: number) {
    try {
      this.player?.seekTo(seconds, true);
    } catch (e) {
      console.log(e);
    }
  }

  pause() {
    try {
      this.player?.pauseVideo();
    } catch (e) {
      console.log(e);
    }
  }

  stop() {
    try {
      this.player?.stopVideo();
    } catch (e) {
      console.log(e);
    }
  }

  replay() {
    try {
      this.setCurrentTime(1);
    } catch (e) {
      console.log(e);
    }
  }
}
