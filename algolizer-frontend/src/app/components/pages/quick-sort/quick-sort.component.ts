import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ALGORITHMS, bubbleSortStepsGenerator, createAlgorithmContextArray, generateAlgorithmCodeString } from 'src/app/app.helpers';
import { AlgorithmContext, BubbleSortStep, Question, Quiz } from 'src/app/app.models';
import { CanvasService } from 'src/app/services/canvas.service';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { UiService } from 'src/app/services/ui.service';
import { MergeSortStep, QuickSortStep } from '../../../app.models';
import { mergeSortStepsGenerator, quickSortStepsGenerator } from '../../../app.helpers';

@Component({
  selector: 'app-quick-sort',
  templateUrl: './quick-sort.component.html',
  styleUrls: ['./quick-sort.component.css']
})
export class QuickSortComponent implements OnInit, AfterViewInit {
  currentStep: number = 0;
  array: number[] = [];
  code: string = '';
  steps: QuickSortStep[] = [];
  MIN_NUMBER_VALUE: number = 0;
  MAX_NUMBER_VALUE: number = 100;
  ARRAY_SIZE: number = 10;
  NUMBER_OF_QUESTIONS: number = 5;

  @ViewChild('myCanvas', {static: false})
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  context: any = {} as any;

  displayedColumns: string[] = ['context-property', 'property-value'];
  dataSource: AlgorithmContext[] = [];

  quickSortProperties: string[] = ['Going back?', 'Going forward?', 'Base case?', 'Line that has been executed:', 'Value of i:', 'Adding element to an : ', 'Recursion depth: '];
  quickSortValues: string[] = ['', '', '', '', '', '', ''];

  WIDTH = 900;
  HEIGHT = 600;
  EL_WIDTH = 50;
  EL_HEIGHT = 50;

  step: QuickSortStep = {
    array: [],
    left_array: [],
    right_array: [],
    sorted_array: [],
    going_back: false,
    going_forward: false,
    recursion_depth: -1,
    line: 0,
    baseCase: undefined,
    greaterThanPivot: undefined,
    i: undefined,
    pivot: undefined
  };

  setSortValues(step: any) {
    //back, forward, case, line, value of i, pivot value, recursion, 
    this.quickSortValues[0] = step.going_back;
    this.quickSortValues[1] = step.going_forward;
    this.quickSortValues[2] = step.baseCase;
    this.quickSortValues[3] = step.line;
    this.quickSortValues[4] = step.i;
    this.quickSortValues[5] = "";
    if (step.greaterThanPivot != undefined)
      this.quickSortValues[5] = step.greaterThanPivot == true ? "right array": "left array";
    this.quickSortValues[6] = step.recursion_depth;
  } 
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.canvasService.setCanvas(this.canvas);
      this.canvasService.setContext(this.context);
    });
  }

  constructor(
    private uiService: UiService,
    private canvasService: CanvasService,
    private router: Router,
    private randomizer: RandomizerService
  ) {}

  ngOnInit(): void {
    //this.array = [25,52,13,91,12,82,27,86,2,25];
    this.array = this.randomizer.generateArrayOfInts(this.MIN_NUMBER_VALUE, this.MAX_NUMBER_VALUE, this.ARRAY_SIZE);
    quickSortStepsGenerator(this.array, this.steps, this.step);
    this.code = generateAlgorithmCodeString(0, ALGORITHMS.QUICK_SORT_CODE_ARRAY);  
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

  findRecursionDepth(steps: QuickSortStep[]): number {
    let biggestRecursion: number = -2;

    for (let step of steps) 
      if (step.recursion_depth && step.recursion_depth > biggestRecursion) 
        biggestRecursion = step.recursion_depth;

    return biggestRecursion - 1;
  }

  numOfPushOperations(steps: QuickSortStep[], greaterThanPivot: boolean, recursionLevel: number) {
    let numOfPushes = 0;

    for (let step of steps) {
      if (step.recursion_depth != undefined && step.recursion_depth == recursionLevel) {
        if (step.greaterThanPivot != undefined && step.greaterThanPivot == greaterThanPivot)
          numOfPushes++;
      }
    }

    return numOfPushes;
  }

  numOfBaseCases(steps: QuickSortStep[], arraySize: number) {
    let numOfBaseCases = 0;

    for (let step of steps) {
      if (step.array != undefined && step.baseCase != undefined && step.baseCase == true && step.array.length == arraySize)
        numOfBaseCases++;
    }

    return numOfBaseCases;
  }

  testInitialization(): void {
    const quiz = new Quiz();

    //quiz.array = [25,52,13,91,12,82,27,86,2,25];
    quiz.array = this.randomizer.generateArrayOfInts(this.MIN_NUMBER_VALUE, this.MAX_NUMBER_VALUE, this.ARRAY_SIZE);
    quiz.code = generateAlgorithmCodeString(0, ALGORITHMS.QUICK_SORT_CODE_ARRAY);
    quiz.type = "Quick sort algorithm";
    quiz.questions = [];

    let step: QuickSortStep = {
      array: [],
      baseCase: undefined,
      going_back: false,
      going_forward: false,
      greaterThanPivot: undefined,
      i: undefined,
      left_array: [],
      right_array: [],
      line: 0,
      pivot: undefined,
      recursion_depth: -1,
      sorted_array: []
    };

    let steps: QuickSortStep[] = [];
    
    quickSortStepsGenerator(JSON.parse(JSON.stringify(quiz.array)), steps, step);

    //first question
    let question = new Question();
    question.text = "What is the max depth of the recursion (do not count situations where array length is less than 2):";
    question.points = 2;

    const recursionDepth = this.findRecursionDepth(steps);
    question.answer = recursionDepth.toString();
    
    quiz.questions.push(question);

    //second question
    question = new Question();
    question.text = "Number of push operations to 'left_array' on recursion level of 1?";
    question.points = 2;
    question.answer = this.numOfPushOperations(steps, false, 1).toString();
    
    quiz.questions.push(question);

    //third question
    question = new Question();
    question.text = "Number of push operations to 'right_array' on maximum recursion level?";
    question.points = 2;
    question.answer = this.numOfPushOperations(steps, true, recursionDepth).toString();
    
    quiz.questions.push(question);

    //fourth question
    question = new Question();
    question.points = 3;
    question.text = "How many times there were a base case with array size of 1?"; 
    question.answer = this.numOfBaseCases(steps, 1).toString();

    quiz.questions.push(question);

    //fifth question
    question = new Question();
    question.points = 3;
    question.text = "How many times there were a base case with array size of 0?"; 
    question.answer = this.numOfBaseCases(steps, 0).toString();

    quiz.questions.push(question);

    //update question in ui service!
    this.uiService.toggleQuiz(quiz);
    console.log(quiz);

    this.router.navigateByUrl("/quiz");
  }

  showStep(step: QuickSortStep):void {
    this.canvasService.clear(this.WIDTH, this.HEIGHT);

    if (step.array != undefined) {
      let arrayColors: string[] = [];
      for (let i = 0; i < step.array.length; i++)
        arrayColors.push('black');
      this.canvasService.drawArray(step.array, 20, 0.2*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, arrayColors);
      if (step.array.length == 0)
        this.canvasService.drawPointer(this.canvasService.getElementX(1), 0.2*this.HEIGHT + 50, 'Empty array', 0, -15);
    }

    if (step.i != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.i), 0.2*this.HEIGHT + 50, 'i', 30, -5);
    }

    if (step.array != undefined && step.pivot != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.array.length - 1), 0.2*this.HEIGHT + 50, 'pivot', 30, -15);
    }

    if (step.left_array != undefined) {
      let leftArrayColors: string[] = [];
      let color = 'black';

      if (step.greaterThanPivot != undefined && !step.greaterThanPivot)
        color = 'green';

      for (let i = 0; i < step.left_array.length; i++)
        leftArrayColors.push(color);
      
      this.canvasService.drawArray(step.left_array, 20, 0.4*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, leftArrayColors);
      this.canvasService.drawPointer(this.canvasService.getElementX(0) - 17, 0.4*this.HEIGHT + 50, 'Left array', 0, -5);
    }

    if (step.right_array != undefined) {
      let rightArrayColors: string[] = [];
      let color = 'black';

      if (step.greaterThanPivot != undefined && step.greaterThanPivot)
        color = 'green';

      for (let i = 0; i < step.right_array.length; i++)
        rightArrayColors.push(color);

      this.canvasService.drawArray(step.right_array, 20, 0.6*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, rightArrayColors);
      this.canvasService.drawPointer(this.canvasService.getElementX(0) - 17, 0.6*this.HEIGHT + 50, 'Right array', 0, -5);
    }

    if (step.sorted_array != undefined) {
      let sortedArrayColors: string[] = [''].fill("black", 0, step.sorted_array.length);
      this.canvasService.drawArray(step.sorted_array, 20, 0.8*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, sortedArrayColors);
      this.canvasService.drawPointer(this.canvasService.getElementX(0) - 17, 0.8*this.HEIGHT + 50, 'Sorted array', 0, -5);
    }

    if (step.line) {
      this.code = generateAlgorithmCodeString(step.line, ALGORITHMS.QUICK_SORT_CODE_ARRAY);
    }


    this.setSortValues(step);
    this.dataSource = createAlgorithmContextArray(this.quickSortProperties, this.quickSortValues);
  }

}
