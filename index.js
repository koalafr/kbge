/*
 **	Alex kedidi @ koalabear studios
 **	Created	03/01/2021
 ** KoalaBear Game Engine
 **	kbge
 ** version 0.0.8
 */

"use strict";

class KBGEngine {
  constructor(fps, update, render) {
    this.fps = fps;
    this.update = update;
    this.render = render;
    this.frameCount = 0;
    this.startTime = 0;
    this._step = this.step.bind(this);
  }
  play() {
    this.stop = false;
    this.fpsInterval = 1000 / this.fps;
    this.then = window.performance.now();
    this.startTime = this.then;
    this._step();
  }
  stop() {
    this.stop = true;
  }
  step(newtime) {
    if (this.stop) return;
    window.requestAnimationFrame(this._step);
    this.now = newtime;
    this.elapsed = this.now - this.then;
    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.frameCount++;
      this.update();
      this.render();
      //lateupdate
    }
  }
  getFrameCount() {
    return this.frameCount;
  }
}

module.exports = KBGEngine;