export function object(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

export function paint(ctx, tZ) {
    if (this.i != null) { return; }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * tZ, this.y * tZ, this.x, this.y);
}