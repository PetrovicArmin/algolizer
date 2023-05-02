import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ALGORITHMS, selectionSortStepsGenerator, createAlgorithmContextArray, generateAlgorithmCodeString } from 'src/app/app.helpers';
import { AlgorithmContext, SelectionSortStep, Question, Quiz } from 'src/app/app.models';
import { CanvasService } from 'src/app/services/canvas.service';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-selection-sort',
  templateUrl: './selection-sort.component.html',
  styleUrls: ['./selection-sort.component.css']
})
export class SelectionSortComponent {
  currentStep: number = 0;
  array: number[] = [];
  code: string = '';
  steps: SelectionSortStep[] = [];
  MIN_NUMBER_VALUE: number = 0;
  MAX_NUMBER_VALUE: number = 100;
  ARRAY_SIZE: number = 10;
  NUMBER_OF_QUESTIONS: number = 5;

  WIDTH = 800;
  HEIGHT = 300;
  EL_WIDTH = 50;
  EL_HEIGHT = 50;

  @ViewChild('myCanvas', {static: false})
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  context: any = {} as any;

  displayedColumns: string[] = ['context-property', 'property-value'];
  dataSource: AlgorithmContext[] = [];

  selectionSortProperties: string[] = ['Should swap elements?', 'i', 'j', 'Line that has been executed', 'Minimum element value?', 'Minimum position', "Number of swaps"];
  selectionSortValues: string[] = ['', '', '', '', '', '', ''];

  CANVAS_WIDTH = 800;
  CANVAS_HEIGHT = 280;
  constructor(
    private randomizer: RandomizerService,
    private canvasService: CanvasService,
    private router: Router,
    private uiService: UiService
  ) {}

  setSortValues(step: any) {
    this.selectionSortValues[0] = step.should_swap_elements;
    this.selectionSortValues[1] = step.i;
    this.selectionSortValues[2] = step.j;
    this.selectionSortValues[3] = step.line;
    this.selectionSortValues[4] = step.curr_min_element;
    this.selectionSortValues[5] = step.curr_min_position;
    this.selectionSortValues[6] = step.numberOfSwaps;
  } 


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.canvasService.setCanvas(this.canvas);
      this.canvasService.setContext(this.context);
    });
  }

  ngOnInit(): void {
    this.array = this.randomizer.generateArrayOfInts(this.MIN_NUMBER_VALUE, this.MAX_NUMBER_VALUE, this.ARRAY_SIZE);
    this.steps = selectionSortStepsGenerator(this.array);
    this.code = generateAlgorithmCodeString(0, ALGORITHMS.SELECTION_SORT_CODE_ARRAY);
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

  numberOfUnchangedSteps(steps: SelectionSortStep[]): number {
    let number: number = 0;
    for (let step of steps) {
      if (step.should_swap_elements != undefined && step.should_swap_elements == false)
        number++;
    }
    return number;
  }

  countElementInFirstIfStatement(steps: SelectionSortStep[], element: number): number {
    let number: number = 0;

    for (let step of steps) {
      if (step.arr != undefined && step.found_new_min_ind != undefined && step.j != undefined && step.curr_min_position != undefined) {
        if (element == step.arr[step.j] || element == step.arr[step.curr_min_position]) 
          number++;       
      } 
    }

    return number;
  }

  lastSwap(steps: SelectionSortStep[]): number | undefined{
    for (let i = steps.length - 1; i >= 0; i--) {
      if (steps[i].should_swap_elements != undefined && steps[i].should_swap_elements == true)
        return steps[i].i;
    } 
    return -1;
  }

  //ovo je ustvari odlazak na kviz, i nije close visualisation nego start quiz session!
  testInitialization(): void {

    //we need to define quiz with this
    const quiz = new Quiz();

    quiz.array = this.randomizer.generateArrayOfInts(this.MIN_NUMBER_VALUE, this.MAX_NUMBER_VALUE, this.ARRAY_SIZE);
    quiz.code = generateAlgorithmCodeString(0, ALGORITHMS.SELECTION_SORT_CODE_ARRAY);
    quiz.type = "Selection sort algorithm";
    quiz.questions = [];
    
    const steps: SelectionSortStep[] = selectionSortStepsGenerator(JSON.parse(JSON.stringify(quiz.array)));

    //first question
    let question = new Question();
    question.text = "How many swap operations will there be in selection sort for array given above?";
    question.points = 3;

    const numOfSwaps = steps[steps.length - 1].numberOfSwaps;
    
    if (numOfSwaps != undefined)
      question.answer = numOfSwaps?.toString();
    
    quiz.questions.push(question);

    //second question
    question = new Question();
    question.text = "How many times did the 'min_ind' variable remained unchanged?";
    question.points = 3;
    question.answer = this.numberOfUnchangedSteps(steps).toString();
    
    quiz.questions.push(question);

    //third question
    question = new Question();
    question.text = "How many times the first element (ie. number " + quiz.array[0] + ') can be found as an operand in first if statement? (Count duplicates also!)';
    question.points = 2;
    question.answer = this.countElementInFirstIfStatement(steps, quiz.array[0]).toString();
    
    quiz.questions.push(question);

    //fourth question
    question = new Question();
    question.text = "How many times the last element (ie. number " + quiz.array[quiz.array.length - 1] + ') can be found as an operand in first if statement? (Count duplicates also!)';
    question.points = 2;
    question.answer = this.countElementInFirstIfStatement(steps, quiz.array[quiz.array.length - 1]).toString();
        
    quiz.questions.push(question);

    //fifth question
    question = new Question();
    question.points = 3;
    question.text = "What is the last value of i for which there was a swap operation? (if DNE than input -1 as your answer)"; 
    let temp = this.lastSwap(steps)?.toString();

    if (temp != undefined)
      question.answer = temp;

    quiz.questions.push(question);

    //update question in ui service!
    this.uiService.toggleQuiz(quiz);
    console.log(quiz);

    this.router.navigateByUrl("/quiz");
  }

  

  showStep(step: any):void {
    this.canvasService.clear(this.WIDTH, this.HEIGHT);
    
    
    if (step.arr != undefined) {
      let arrayColors: string[] = [];
      for (let i = 0; i < step.arr.length; i++)
        arrayColors.push("black");
      
      if (step.found_new_min_ind != undefined) {
        if (step.found_new_min_ind == true) {
          arrayColors[step.j] = "green";
          arrayColors[step.curr_min_position] = "red";
        } else {
          arrayColors[step.j] = "red";
          arrayColors[step.curr_min_position] = "green";
        }
      }

      if (step.should_swap_elements != undefined) {
        if (step.should_swap_elements == true) {
          arrayColors[step.i] = "green";
          arrayColors[step.curr_min_position] = "green";
        } else {
          arrayColors[step.i] = "red";
          arrayColors[step.curr_min_position] = "red";
        }
      }

      this.canvasService.drawArray(step.arr, 20, 0.2*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, arrayColors);
    }

    if (step.line != undefined) {
      this.code = generateAlgorithmCodeString(step.line, ALGORITHMS.SELECTION_SORT_CODE_ARRAY);
    }

    if (step.i != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.i), 0.2*this.HEIGHT + 50, 'i', 30, 0);
    }

    if (step.j != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.j), 0.2*this.HEIGHT + 50, 'j', 30, 0);
    }

    if (step.curr_min_position != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.curr_min_position), 0.2*this.HEIGHT + 110, 'min_ind', 30, -15);
    }

    this.setSortValues(step);
    this.dataSource = createAlgorithmContextArray(this.selectionSortProperties, this.selectionSortValues);
  } 
}
