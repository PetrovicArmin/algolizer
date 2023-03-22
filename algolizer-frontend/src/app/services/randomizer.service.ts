import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  constructor() { }

  public randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  public generateArrayOfInts(minValue: number, maxValue: number, size: number): number[] {
    const arr: number[] = [];

    for (let i = 0; i < size; i++)
      arr.push(this.randomIntFromInterval(minValue, maxValue));

    return arr;
  }
}
