import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ALGORITHMS, bubbleSortStepsGenerator, createAlgorithmContextArray, generateAlgorithmCodeString } from 'src/app/app.helpers';
import { AlgorithmContext, BubbleSortStep, Question, Quiz } from 'src/app/app.models';
import { CanvasService } from 'src/app/services/canvas.service';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { UiService } from 'src/app/services/ui.service';
import { InsertionSortStep, MergeSortStep } from '../../../app.models';
import { insertionSortStepsGenerator, mergeSortStepsGenerator } from '../../../app.helpers';

@Component({
  selector: 'app-insertion-sort',
  templateUrl: './insertion-sort.component.html',
  styleUrls: ['./insertion-sort.component.css']
})
export class InsertionSortComponent {
  currentStep: number = 0;
  array: number[] = [];
  code: string = '';
  steps: InsertionSortStep[] = [];
  MIN_NUMBER_VALUE: number = 0;
  MAX_NUMBER_VALUE: number = 100;
  ARRAY_SIZE: number = 10;
  NUMBER_OF_QUESTIONS: number = 5;

  @ViewChild('myCanvas', {static: false})
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  context: any = {} as any;

  displayedColumns: string[] = ['context-property', 'property-value'];
  dataSource: AlgorithmContext[] = [];

  insertionSortProperties: string[] = ['Current value?', 'Value of i: ', 'Value of j: ', 'Line that has been executed:', 'Number of swaps: ', 'If condition: ', 'Swap happened?'];
  insertionSortValues: string[] = ['', '', '', '', '', '', '', '', '', ''];

  WIDTH = 900;
  HEIGHT = 600;
  EL_WIDTH = 50;
  EL_HEIGHT = 50;

  step: InsertionSortStep = {
    array: undefined,
    currentValue: undefined,
    i: undefined,
    j: undefined,
    line: 0,
    numOfSwaps: 0,
    if_condition: undefined,
    swap_happened: undefined
  };

  setSortValues(step: any) {
    //current value, i, j, line, swaps, if_condition, swap_happened
    this.insertionSortValues[0] = step.currentValue;
    this.insertionSortValues[1] = step.i;
    this.insertionSortValues[2] = step.j;
    this.insertionSortValues[3] = step.line;
    this.insertionSortValues[4] = step.numOfSwaps;
    this.insertionSortValues[5] = step.if_condition;
    this.insertionSortValues[6] = step.swap_happened;
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
    this.array = this.randomizer.generateArrayOfInts(this.MIN_NUMBER_VALUE, this.MAX_NUMBER_VALUE, this.ARRAY_SIZE);
    this.steps = insertionSortStepsGenerator(this.array);
    this.code = generateAlgorithmCodeString(0, ALGORITHMS.INSERTION_SORT_CODE_ARRAY);  
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

  countIfConditionStates(steps: InsertionSortStep[], state: boolean): number {
    let numOfStates = 0;
    for (let step of steps) {
      if (step.if_condition == state)
        numOfStates++;
    }
    return numOfStates;
  }

  countIfConditionFalseTimesForSpecificElement(steps: InsertionSortStep[], elementValue: number): number {
    let ifConditionFalseTimes = 0;

    for (let step of steps) {
      if (step.array != undefined && step.if_condition == false && step.j != undefined && step.currentValue != undefined) {
        if (step.array[step.j] == elementValue || step.currentValue == elementValue)
          ifConditionFalseTimes++;
      }
    }

    return ifConditionFalseTimes;
  }

  testInitialization(): void {
    const quiz = new Quiz();

    quiz.array = this.randomizer.generateArrayOfInts(this.MIN_NUMBER_VALUE, this.MAX_NUMBER_VALUE, this.ARRAY_SIZE);
    quiz.code = generateAlgorithmCodeString(0, ALGORITHMS.INSERTION_SORT_CODE_ARRAY);
    quiz.type = "Insertion sort algorithm";
    quiz.questions = [];

    let steps: InsertionSortStep[] = insertionSortStepsGenerator(JSON.parse(JSON.stringify(quiz.array)));
    
    //first question
    let question = new Question();
    question.text = "How many times was the if condition in the inner loop true?";
    question.points = 2;


    const ifConditionTrueTimes = this.countIfConditionStates(steps, true);
    question.answer = ifConditionTrueTimes.toString();
    
    quiz.questions.push(question);

    //second question
    question = new Question();
    question.text = "How many times was the if condition in the inner loop false?";
    question.points = 2;
    question.answer = this.countIfConditionStates(steps, false).toString();
    
    quiz.questions.push(question);

    //third question
    question = new Question();
    question.text = "What is the overall number of swaps in this algorithm?";
    question.points = 2;

    let value = this.steps[this.steps.length - 1].numOfSwaps;

    if (value)
      question.answer = value.toString();
    
    quiz.questions.push(question);

    //fourth question
    question = new Question();
    question.points = 3;
    question.text = "How many times was the first element (ie. element " + quiz.array[0] + ") operand when if condition was false? Count all occurences of the element!"; 
    
    let numOfSwapsFirst = this.countIfConditionFalseTimesForSpecificElement(steps, quiz.array[0]);
    question.answer = numOfSwapsFirst.toString();

    quiz.questions.push(question);

    //fifth question
    question = new Question();
    question.points = 3;
    question.text = "How many times was the last element (ie. element " + quiz.array[quiz.array.length - 1] + ") operand when if condition was false? Count all occurences of the element!"; 
  
    question.answer = this.countIfConditionFalseTimesForSpecificElement(steps, quiz.array[quiz.array.length - 1]).toString();

    quiz.questions.push(question);

    //update question in ui service!
    this.uiService.toggleQuiz(quiz);
    console.log(quiz);

    this.router.navigateByUrl("/quiz");
  }

  showStep(step: InsertionSortStep):void {
    this.canvasService.clear(this.WIDTH, this.HEIGHT);

    if (step.array != undefined) {
      let arrayColors: string[] = [];
      for (let i = 0; i < step.array.length; i++)
        arrayColors.push('black');
      this.canvasService.drawArray(step.array, 20, 0.2*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, arrayColors);
    }

    if (step.i != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.i), 0.2*this.HEIGHT + 50, 'current_pos', 30, -30);
    }

    if (step.j != undefined) {
      let x_offset = this.canvasService.getElementX(step.j);
      if (step.j == -1)
        x_offset = 11;
      this.canvasService.drawPointer(x_offset, 0.2*this.HEIGHT + 110, 'j', 30, -3);
    }

    if (step.swap_happened != undefined && step.array != undefined) {
      let arrayColors: string[] = [];
      for (let i = 0; i < step.array.length; i++)
        arrayColors.push('black');
      if (step.i != undefined && step.j != undefined) {
        if (step.j + 1 != step.i) {
          arrayColors[step.i] = 'green';
          arrayColors[step.j + 1] = 'green';
        } else {
          arrayColors[step.i] = 'red';
        }
      }
      this.canvasService.drawArray(step.array, 20, 0.2*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, arrayColors);
    }
    
    if (step.line) {
      this.code = generateAlgorithmCodeString(step.line, ALGORITHMS.INSERTION_SORT_CODE_ARRAY);
    }

    this.setSortValues(step);
    this.dataSource = createAlgorithmContextArray(this.insertionSortProperties, this.insertionSortValues);
  }
}
