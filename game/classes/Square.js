export class Square {
  constructor(x, y, size, ctx) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.ctx = ctx;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    this.x += 1;
    this.y += 1;
  }
}
