export interface Health {
    health: number;
    maxHealth: number;
}

  
export function renderHealth(
ctx: CanvasRenderingContext2D,
obj: Health & { x: number; y: number; width: number }
): void {
    const barWidth = obj.width;
    const barHeight = 16;
    const x = obj.x;
    const y = obj.y - barHeight - 10;
    const healthRatio = Math.max(0, Math.min(1, obj.health / obj.maxHealth));
    let healthColor = "limegreen";

    if (healthRatio < 0.5) {
        healthColor = "orange";
    }
    if (healthRatio < 0.25) {
        healthColor = "red";
    }

    ctx.save();
    // Color of the background
    ctx.fillStyle = "#333";
    ctx.fillRect(x, y, barWidth, barHeight);
    // Color of the health
    ctx.fillStyle = healthColor;
    ctx.fillRect(x, y, barWidth * healthRatio, barHeight);
    // Color of the border
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1;
    // Border of the health
    ctx.strokeRect(x, y, barWidth, barHeight);
    // Text of health in the middle
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(obj.health.toFixed(0).toString(), x + barWidth / 2, y + barHeight / 2);
    ctx.restore();
}