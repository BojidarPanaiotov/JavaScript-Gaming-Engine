import { IBaseGameObject } from "../abstraction/gameObject/BaseGameObject";

export class Debuger {
  showObjectStats(obj: IBaseGameObject): void {
    const ctx = game.ctx;
    const padding = 12;
    const lineHeight = 18;
    const x = padding;
    const y = padding;
    const objectCenterX = obj.collider?.gameObject.x + obj.collider?.gameObject.width / 2;
    const objectCenterY = obj.collider?.gameObject.y + obj.collider?.gameObject.height / 2;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#111";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`X: ${obj.x.toFixed(0)}`, x, y);
    ctx.fillText(`Y: ${obj.y.toFixed(0)}`, x, y + lineHeight);
    ctx.fillText(`W: ${obj.width.toFixed(0)}`, x, y + lineHeight * 2);
    ctx.fillText(`H: ${obj.height.toFixed(0)}`, x, y + lineHeight * 3);
    ctx.fillText(`Center: X: ${objectCenterX.toFixed(0)}, Y: ${objectCenterY.toFixed(0)}`, x, y + lineHeight * 4);
    ctx.restore();
  }

  showCollisionBorders(): void {
    game.gameObjects.forEach((obj) => {
      obj.collider.renderBorder();
    });
  }
}
