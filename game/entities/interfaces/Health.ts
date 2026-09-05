export interface Health {
    health: number;
    maxHealth: number;
}

  
export function renderHealth(
ctx: CanvasRenderingContext2D,
obj: Health & { x: number; y: number; width: number }
): void {
    const barWidth = obj.width;
    const barHeight = 8;
    const x = obj.x;
    const y = obj.y - barHeight - 10;
    const healthRatio = Math.max(0, Math.min(1, obj.health / obj.maxHealth));


    ctx.save();
    // Color of the background
    ctx.fillStyle = "#333";
    ctx.fillRect(x, y, barWidth, barHeight);
    // Color of the health
    ctx.fillStyle = "limegreen";
    ctx.fillRect(x, y, barWidth * healthRatio, barHeight);
    // Color of the border
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1;
    // Border of the health
    ctx.strokeRect(x, y, barWidth, barHeight);
    ctx.restore();
}