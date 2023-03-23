import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ALGORITHMS, bubbleSortStepsGenerator, createAlgorithmContextArray, generateAlgorithmCodeString } from 'src/app/app.helpers';
import { AlgorithmContext, BubbleSortStep, Question, Quiz } from 'src/app/app.models';
import { CanvasService } from 'src/app/services/canvas.service';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})
export class BubbleSortComponent implements OnInit, AfterViewInit{
  currentStep: number = 0;
  array: number[] = [];
  code: string = '';
  steps: BubbleSortStep[] = [];
  MIN_NUMBER_VALUE: number = 0;
  MAX_NUMBER_VALUE: number = 100;
  ARRAY_SIZE: number = 10;
  NUMBER_OF_QUESTIONS: number = 5;

  @ViewChild('myCanvas', {static: false})
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  context: any = {} as any;

  displayedColumns: string[] = ['context-property', 'property-value'];
  dataSource: AlgorithmContext[] = [];

  bubbleSortProperties: string[] = ['Is swapped', 'i', 'j', 'Line that has been executed', 'Should continue?', 'Should swap?', "Number of swaps"];
  bubbleSortValues: string[] = ['', '', '', '', '', '', ''];

  CANVAS_WIDTH = 800;
  CANVAS_HEIGHT = 280;
  EL_WIDTH = 50;
  EL_HEIGHT = 50;

  constructor(
    private randomizer: RandomizerService,
    private canvasService: CanvasService,
    private router: Router,
    private uiService: UiService
  ) {}


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.canvasService.setCanvas(this.canvas);
      this.canvasService.setContext(this.context);
    });
  }

  ngOnInit(): void {
    this.array = this.randomizer.generateArrayOfInts(this.MIN_NUMBER_VALUE, this.MAX_NUMBER_VALUE, this.ARRAY_SIZE);
    this.steps = bubbleSortStepsGenerator(this.array);
    this.code = generateAlgorithmCodeString(0, ALGORITHMS.BUBBLE_SORT_CODE_ARRAY);
  }

  nextStep(): void {
    if (this.currentStep >= this.steps.length - 1)
      return;
    this.currentStep++;
    this.showStep(this.steps[this.currentStep]);
  }

  previousStep(): void {
    if (this.currentStep <= 0)
      return;
    this.currentStep--;
    this.showStep(this.steps[this.currentStep]);
  }

  //ovo je ustvari odlazak na kviz, i nije close visualisation nego start quiz session!
  testInitialization(): void {
    //we need to define quiz with this
    const quiz = new Quiz();

    quiz.array = this.randomizer.generateArrayOfInts(this.MIN_NUMBER_VALUE, this.MAX_NUMBER_VALUE, this.ARRAY_SIZE);
    quiz.code = generateAlgorithmCodeString(0, ALGORITHMS.BUBBLE_SORT_CODE_ARRAY);
    quiz.type = "Bubble sort algorithm";
    quiz.questions = [];
    
    const steps = bubbleSortStepsGenerator(JSON.parse(JSON.stringify(quiz.array)));

    //first question
    let question = new Question();
    question.text = "How many swap operations will there be in bubble sort for array given above?";
    question.points = 4;

    const numOfSwaps = steps[steps.length - 1].numOfSwaps;
    
    if (numOfSwaps != undefined)
      question.answer = numOfSwaps?.toString();
    
    quiz.questions.push(question);

    //second question
    question = new Question();
    question.text = "How many swap operations include first number in array as its operand? (ie. number " + quiz.array[0] + ')?';
    question.points = 2;
    question.answer = this.numberOfOperandsInSwap(steps, quiz.array[0]).toString();
    
    quiz.questions.push(question);

    //third question
    question = new Question();
    question.text = "How many swap operations include last number in array as its operand? (ie. number " + quiz.array[quiz.array.length - 1] + ')?';
    question.points = 2;
    question.answer = this.numberOfOperandsInSwap(steps, quiz.array[quiz.array.length - 1]).toString();
    
    quiz.questions.push(question);

    //fourth question
    question = new Question();
    let iPos = this.randomizer.randomIntFromInterval(0,3);
    let jPos = this.randomizer.randomIntFromInterval(0,9);
    question.points = 1;
    question.text = "On which position (0-indexed) will first number in array end up for (i,j) = (" + iPos.toString() + ", " + jPos.toString() + ")? (It is meant for you to find position before swap operation in that iteration)"; 
    question.answer = this.positionOfElementInIteration(steps, iPos, jPos, quiz.array[0], false).toString();

    quiz.questions.push(question);

    //fifth question
    question = new Question();
    question.points = 1;
    iPos = this.randomizer.randomIntFromInterval(0,2);
    jPos = this.randomizer.randomIntFromInterval(0,5);
    question.text = "On which position (0-indexed) will last number in array end up for (i,j) = (" + iPos.toString() + ", " + jPos.toString() + ")? (It is meant for you to find position before swap operation in that iteration)"; 
    question.answer = this.positionOfElementInIteration(steps, iPos, jPos, quiz.array[quiz.array.length - 1], true).toString();

    quiz.questions.push(question);

    //update question in ui service!
    this.uiService.toggleQuiz(quiz);
    console.log(quiz);

    this.router.navigateByUrl("/quiz");
  }

  positionOfElementInIteration(steps: BubbleSortStep[], iPos: any, jPos: any, element: any, reverse: boolean) {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].i == iPos && steps[i].j == jPos) {
        return this.findPosition(steps[i].arr, element, reverse);
      }
    }
    return -1;
  }

  private findPosition(array: any, element: any, reverse: boolean) {
    if (!reverse) 
      for (let i = 0; i < array.length; i++)
        if (array[i] == element)
          return i;
    else 
      for (let i = array.length - 1; i >= 0; i--) 
        if (array[i] == element)
          return i;
    return -1;
  }
        

  numberOfOperandsInSwap(steps: BubbleSortStep[], element: number) {
    let previousNumberOfSwaps: number | undefined = 0;
    let result: number = 0;

    for (let i = 0; i < steps.length; i++) {
      if (steps[i].numOfSwaps != previousNumberOfSwaps) {
        let index: any = steps[i].i;
        let array: any = steps[i].arr;

        if (array[index] == element || array[index+1] == element) 
          result += 1;

        previousNumberOfSwaps = steps[i].numOfSwaps;
      }
    }

    return result;
  }

  showStep(step: any):void {
    this.canvasService.clear(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    let colors: string[] = [];
    for (let i = 0; i < this.array.length; i++)
      colors.push("black");
    if (step.j != undefined) {
      this.bubbleSortValues[2] = step.j;
      let color = "red";
      if (step?.comparisonStatus?.shouldChange === true) {
        color = "green";
      }
      colors[step.j] = color;
      colors[step.j + 1] = color;
      this.canvasService.drawPointer(this.canvasService.getElementX(step.j), this.CANVAS_HEIGHT/2 + 20, "j", 30, 0);
    } else {
      this.bubbleSortValues[2] = '';
    }
    
    if (step.isSwapped != null && step.isSwapped != undefined) {
      this.bubbleSortValues[0] = step.isSwapped;
    } else {
      this.bubbleSortValues[0] = '';
    }

    if (step.isSwappedStatus != null && step.isSwappedStatus != undefined) {
      if (step.isSwappedStatus.shouldContinue)
        this.bubbleSortValues[4] = 'Yes';
      else 
        this.bubbleSortValues[4] = 'No';
    } else {
      this.bubbleSortValues[4] = '';
    }

    if (step.comparisonStatus != null && step.comparisonStatus != undefined) {
      if (step.comparisonStatus.shouldChange)
        this.bubbleSortValues[5] = 'Yes';
      else 
        this.bubbleSortValues[5] = 'No';
    } else {
      this.bubbleSortValues[5] = '';
    }

    if (step.numOfSwaps != undefined && step.numOfSwaps != null) {
      this.bubbleSortValues[6] = step.numOfSwaps;
    } else {
      this.bubbleSortValues[6] = '';
    }

    if (step.i != undefined) {
      this.bubbleSortValues[1] = step.i;
      this.canvasService.drawPointer(this.canvasService.getElementX(this.array.length - step.i - 1), this.CANVAS_HEIGHT/2 + 20, "arr.len - i - 1", 30, -30);
    } else {
      this.bubbleSortValues[1] = '';
    }

    if (step.line) {
      this.bubbleSortValues[3] = step.line;
      this.code = generateAlgorithmCodeString(step.line, ALGORITHMS.BUBBLE_SORT_CODE_ARRAY);
    } else {
      this.bubbleSortValues[3] = '';
    }

    this.canvasService.drawArray(step.arr, 20, this.CANVAS_HEIGHT/2 - 30, this.EL_WIDTH, this.EL_HEIGHT, colors);

    this.dataSource = createAlgorithmContextArray(this.bubbleSortProperties, this.bubbleSortValues);
  } 
}
