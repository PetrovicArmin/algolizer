import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  elWidth: number = 0;
  elHeight: number = 0;
  x: number = 0;
  constructor() { }

  setCanvas(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = this.canvas;
  }

  setContext(context: CanvasRenderingContext2D) {
    this.ctx = context;
  }

  //implementirati neke najviše korištene reusable dijelove kanvasa
  //međutim, da li je moguće uraditi ovo tako da se tamo ispisuju vrijednosti, jer imamo referencu?

  drawArray(arr: number[], x: number, y: number, elWidth: number, elHeight: number, elementColors: string[]) {
    this.x = x;
    this.elWidth = elWidth; this.elHeight = elHeight;
    this.ctx.save();
    this.ctx.strokeStyle = "black";

    for (let i = 0; i < arr.length; i++) {
      this.ctx.strokeStyle = elementColors[i];
      this.ctx.strokeRect(x + i*(3+elWidth), y, elWidth, elHeight);
      this.ctx.font = "20px serif";
      this.ctx.fillText(arr[i].toString(), x + i*(3+elWidth) + elWidth/3.5, y + elHeight/1.5);
    }

    this.ctx.restore();
  }

  getElementX(i: number, x: number = this.x, elWidth:number = this.elWidth) {
    return x + i*(3+elWidth) + elWidth/2;
  }

  clear(width: number, height: number): void {
    this.ctx.clearRect(0,0, width, height);
  }

  //pozicija se odnosi na vrh strelice koju pravimo
  drawPointer(xPos: number, yPos: number, name: string, length: number, pointerRelativeX: number): void {
    this.ctx.save();
    this.ctx.strokeStyle = "black";
    this.ctx.fillStyle = "black";

    this.ctx.beginPath();
    this.ctx.moveTo(xPos, yPos);
    this.ctx.lineTo(xPos, yPos + length);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(xPos, yPos);
    this.ctx.lineTo(xPos-length/3, yPos+length/3);
    this.ctx.stroke();

    
    this.ctx.beginPath();
    this.ctx.moveTo(xPos, yPos);
    this.ctx.lineTo(xPos+length/3, yPos+length/3);
    this.ctx.stroke();

    this.ctx.font = "20px serif";
    this.ctx.fillText(name,xPos + pointerRelativeX - 3, yPos + length + 20);    

    this.ctx.restore();
  }
}
