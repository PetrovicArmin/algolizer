export const ALGORITHMS = {
    BUBBLE_SORT_CODE_ARRAY: [
        '    function bubbleSort(arr) {',
        '        let isSwapped = false;',
        '        for (let i = 0; i < arr.length; i++) {',
        '            isSwapped = false;',
        '            for(let j = 0; j < arr.length - i - 1; j++){',
        '                if(arr[j] > arr[j + 1]) {',
        '                    swap(arr[j], arr[j+1]);',
        '                    isSwapped = true;',
        '                }',
        '            }',
        '            if(!isSwapped) break;',
        '        }',
        '    }'
    ] as string[],
    MERGE_SORT_CODE_ARRAY: [
        '    function mergeSort(arr) {',
        '        if (arr.length <= 1) ',
        '            return arr',
        '        let mid = Math.floor(arr.length / 2);',
        '',
        '        let left = mergeSort(arr.slice(0, mid));',
        '        let right = mergeSort(arr.slice(mid));',
        '',
        '        let sortedArr = [];',
        '        while (left.length && right.length) {',
        '            if (left[0] < right[0])',
        '                sortedArr.push(left.shift())',
        '            else', 
        '                sortedArr.push(right.shift())',
        '        }',
        '        return [...sortedArr, ...left, ...right]',
        '  }'
    ] as string[],
    INSERTION_SORT_CODE_ARRAY: [
        '    function insertionSort(arr) {',
        '        for (let i = 1; i < arr.length; i++) {',
        '           let currentValue = arr[i];',
        '           let j;',
        '           for (j = i - 1; j >= 0; j--) {',
        '               if (arr[j] <= currentValue)',
        '                   break;',
        '               arr[j + 1] = arr[j];',
        '           }',
        '           arr[j + 1] = currentValue;',
        '        }',
        '        return arr;',
        '    }',
    ] as string[],
    QUICK_SORT_CODE_ARRAY: [
        '   function quickSort(arr) {',
        '       if (arr.length <= 1)',
        '           return arr;',
        '    ',
        '       const pivot = arr[arr.length - 1];',
        '       let left_array = []; let right_array = [];',
        '    ',
        '       for (let i = 0; i < arr.length - 1; i++)',
        '           arr[i] < pivot ? left_array.push(arr[i]) : right_array.push(arr[i]);',
        '    ',
        '       left_array = quickSort(left_array);',
        '',
        '       right_array = quickSort(right_array);',
        '    ',
        '       return [...left_array, pivot, ...right_array];',
        '}   ',
    ] as string[],
    SELECTION_SORT_CODE_ARRAY: [
        '    function selectionSort(arr) {',
        '        for (let i = 0; i < arr.length; i++) {',
        '           let min_ind = i;',
        '           for (let j = i + 1; j < arr.length; j++)',
        '               if (arr[j] < arr[min_ind])',
        '                   min_ind = j;',
        '    ',
        '           if (min_ind !== i)',
        '               swap(arr[i], arr[min_ind]);',
        '        }',
        '        return arr;',
        '    }',
    ]
};



export const quiz_statistics: QuizResults[] = [
    {
        algorithm_name: "Selection sort algorithm",
        correct_answers: 3,
        earned_points: 10,
        max_points: 13,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Selection sort algorithm",
        correct_answers: 2,
        earned_points: 8,
        max_points: 13,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Selection sort algorithm",
        correct_answers: 5,
        earned_points: 13,
        max_points: 13,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Selection sort algorithm",
        correct_answers: 1,
        earned_points: 3,
        max_points: 13,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Selection sort algorithm",
        correct_answers: 4,
        earned_points: 11,
        max_points: 13,
        num_of_questions: 5,
        user_id: 2
    },
    {
        algorithm_name: "Insertion sort algorithm",
        correct_answers: 2,
        earned_points: 6,
        max_points: 15,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Insertion sort algorithm",
        correct_answers: 1,
        earned_points: 3,
        max_points: 14,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Insertion sort algorithm",
        correct_answers: 5,
        earned_points: 14,
        max_points: 14,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Insertion sort algorithm",
        correct_answers: 3,
        earned_points: 8,
        max_points: 15,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Insertion sort algorithm",
        correct_answers: 4,
        earned_points: 13,
        max_points: 15,
        num_of_questions: 5,
        user_id: 2
    },
    {
        algorithm_name: "Bubble sort algorithm",
        correct_answers: 3,
        earned_points: 7,
        max_points: 11,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Bubble sort algorithm",
        correct_answers: 4,
        earned_points: 10,
        max_points: 11,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Bubble sort algorithm",
        correct_answers: 1,
        earned_points: 3,
        max_points: 11,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Bubble sort algorithm",
        correct_answers: 3,
        earned_points: 6,
        max_points: 11,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Bubble sort algorithm",
        correct_answers: 5,
        earned_points: 11,
        max_points: 11,
        num_of_questions: 5,
        user_id: 2
    },
    {
        algorithm_name: "Merge sort algorithm",
        correct_answers: 3,
        earned_points: 10,
        max_points: 13,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Merge sort algorithm",
        correct_answers: 2,
        earned_points: 8,
        max_points: 13,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Merge sort algorithm",
        correct_answers: 5,
        earned_points: 13,
        max_points: 13,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Merge sort algorithm",
        correct_answers: 1,
        earned_points: 3,
        max_points: 13,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Merge sort algorithm",
        correct_answers: 4,
        earned_points: 11,
        max_points: 13,
        num_of_questions: 5,
        user_id: 2
    },
    {
        algorithm_name: "Quick sort algorithm",
        correct_answers: 3,
        earned_points: 10,
        max_points: 13,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Quick sort algorithm",
        correct_answers: 2,
        earned_points: 8,
        max_points: 13,
        num_of_questions: 5,
        user_id: 0
    },
    {
        algorithm_name: "Quick sort algorithm",
        correct_answers: 5,
        earned_points: 13,
        max_points: 13,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Quick sort algorithm",
        correct_answers: 1,
        earned_points: 3,
        max_points: 13,
        num_of_questions: 5,
        user_id: 1
    },
    {
        algorithm_name: "Quick sort algorithm",
        correct_answers: 4,
        earned_points: 11,
        max_points: 13,
        num_of_questions: 5,
        user_id: 2
    },
];


export const generateAlgorithmCodeString = (pointerIndex: number, algorithmArray: string[]): string => {
    let finalString = "";
    for (let i = 0; i < algorithmArray.length; i++) {
        if (i == pointerIndex) 
            finalString += "\n--->" + algorithmArray[i].substring(4);
        else 
            finalString += "\n" + algorithmArray[i];
    }
    finalString = finalString.substring(1);
    return finalString;
};

import { AlgorithmContext, BubbleSortStep, InsertionSortStep, QuickSortStep, QuizResults, SelectionSortStep } from "./app.models";

export const createAlgorithmContextArray = (contextProperties: string[], contextValues: string[]): AlgorithmContext[] => {
    let contextArray: AlgorithmContext[] = [];

    for (let i = 0; i < contextProperties.length; i++) {
        contextArray.push({
            contextProperty: contextProperties[i],
            propertyValue: contextValues[i]
        });
    }

    return contextArray;
}

const push = (steps: any[], step: any) => {
    steps.push(JSON.parse(JSON.stringify(step)));
}

const deepArray = (arr: number[] | undefined) => {
    return JSON.parse(JSON.stringify(arr));
}

//vraćanja moraju biti ispravna radi rekurzije
//steps objekat / niz će biti izgrađen kroz rekurziju, jer se cijelo vrijeme radi o istoj referenci
//odnosno, o različitim referencama na isti objekat!


export const quickSortStepsGenerator = (arr: number[], steps: QuickSortStep[], step: QuickSortStep): any => {
    step = {
        array: deepArray(arr),
        baseCase: undefined,
        going_back: false,
        going_forward: false,
        greaterThanPivot: undefined,
        i: undefined,
        left_array: undefined,
        right_array: undefined,
        line: 0,
        pivot: undefined,
        recursion_depth: step.recursion_depth + 1,
        sorted_array: undefined
    };

    push(steps, step);


    if (arr.length <= 1) { 
        step.baseCase = true;
        step.going_back = true;
        step.line = 2;
        
        push(steps, step);
        return arr;
    }



    const pivot = arr[arr.length - 1]; 

    step.line = 4;
    step.pivot = pivot;

    push(steps, step);

    let left_array: number[] = []; let right_array: number[] = [];

    step.line = 5;
    
    push(steps, step);

    for (let i = 0; i < arr.length - 1; i++) {
        step.line = 7;
        step.i = i;
        
        push(steps, step);

        step.line = 8;
        
//        arr[i] < pivot ? left_array.push(arr[i]) : right_array.push(arr[i]);

        if (arr[i] < pivot) {
            step.greaterThanPivot = false;
            left_array.push(arr[i]);
            step.left_array = deepArray(left_array);
            
            push(steps, step);
        } else {
            step.greaterThanPivot = true;
            right_array.push(arr[i]);
            step.right_array = deepArray(right_array);

            push(steps, step);
        }

        step.greaterThanPivot = undefined;
    }   
    
    step.i = undefined;
    step.going_forward = true;
    step.line = 10;

    push(steps, step);
    
    left_array = quickSortStepsGenerator(left_array, steps, step);

    step.going_forward = false;
    step.line = 11;
    step.left_array = deepArray(left_array);
    
    push(steps, step);

    step.going_forward = true;
    step.line = 12;
    
    push(steps, step);

    right_array = quickSortStepsGenerator(right_array, steps, step);

    step.going_forward = false;
    step.line = 13;
    step.right_array = deepArray(right_array);

    push(steps, step);

    let finalArray = [...left_array, pivot, ...right_array];

    step.going_back = true;
    step.line = 14;
    step.sorted_array = deepArray(finalArray);

    push(steps, step);

    return finalArray;
}

export const insertionSortStepsGenerator = (arr: number[]): InsertionSortStep[] => {
    let step: InsertionSortStep = {
        array: deepArray(arr),
        currentValue: undefined,
        i: undefined,
        j: undefined,
        line: 0,
        numOfSwaps: 0,
        if_condition: undefined,
        swap_happened: undefined
    };

    let steps: InsertionSortStep[] = [];

    push(steps, step);

    for (let i = 1; i < arr.length; i++) {

        step.line = 1;
        step.i = i;

        push(steps, step);

        let currentValue = arr[i];

        step.currentValue = currentValue;
        step.line = 2;

        push(steps, step);

        let j;

        step.j = undefined;
        step.line = 3;

        for (j = i - 1; j >= 0; j--) {
          step.line = 4;
          step.j = j;

          push(steps, step);

          if (arr[j] <= currentValue) {
            step.line = 5;
            step.if_condition = true;
            push(steps, step);
            step.if_condition = undefined;
            break;
          }

          step.line = 5;
          step.if_condition = false;
          
          push(steps, step);

          step.if_condition = undefined;

          arr[j + 1] = arr[j];

          step.array = deepArray(arr);
          step.line = 7;

          push(steps, step);
        }
        step.j = j;
        console.log(j);

        arr[j + 1] = currentValue;

        step.line = 9;
        step.array = deepArray(arr);
        
        push(steps, step);

        if (j + 1 != i) {
            step.line = 10;
            if (step.numOfSwaps != undefined)
                step.numOfSwaps = step.numOfSwaps + 1;
            step.swap_happened = true;
            
            push(steps, step);
            step.swap_happened = undefined;
        } else {
            step.line = 10;
            step.swap_happened = false;
            push(steps, step);
            step.swap_happened = undefined;
        }
      }

      step.line = 11;
      step.i = undefined;
      step.j = undefined;
      step.currentValue = undefined;
      
      push(steps, step);
      return steps;
}

export const mergeSortStepsGenerator = (arr: number[], steps: any[], step: any): any => {
    step = {
        array: deepArray(arr),
        left_array: undefined,
        right_array: undefined,
        sorted_array: undefined,
        mid_position: undefined,
        left_arr_position: undefined,
        right_arr_position: undefined,
        going_back: false,
        going_forward: false,
        merging: false,
        recursion_depth: step.recursion_depth + 1,
        line: 0,
        numOfFalse: step.numOfFalse,
        numOfTrue: step.numOfTrue
    };

    push(steps, step);

    if (arr.length <= 1) {
        step.going_back = true;
        step.line = 2;
        push(steps, step);
        step.going_back = false;
        return {
            sortedArr:arr,
            numOfFalse: step.numOfFalse,
            numOfTrue: step.numOfTrue
        };
    } 

    let mid = Math.floor(arr.length / 2);

    step.mid_position = mid;
    step.line = 3;
    push(steps, step);
  
    step.line = 5;
    step.going_forward = true;
    push(steps, step);
    step.going_forward = false;

    let result = mergeSortStepsGenerator(arr.slice(0, mid), steps, step);

    let left = result.sortedArr;
    step.numOfFalse = result.numOfFalse;
    step.numOfTrue = result.numOfTrue;

    step.left_array = deepArray(left);
    step.line = 5;
    push(steps, step);

    step.line = 6;
    step.going_forward = true;
    push(steps, step);
    step.going_forward = false;

    result = mergeSortStepsGenerator(arr.slice(mid), steps, step);
    let right = result.sortedArr;
    step.numOfFalse = result.numOfFalse;
    step.numOfTrue = result.numOfTrue;

    step.right_array = deepArray(right);
    step.line = 6;
    push(steps, step);

    let sortedArr: number[] = [];

    step.sorted_array = deepArray(sortedArr);
    step.line = 8;
    step.merging = true;

    push(steps, step);

    let left_position = 0;
    let right_position = 0;
    step.left_arr_position = 0;
    step.right_arr_position = 0;

    while (left.length && right.length) {

        if (left[0] < right[0]) {
            step.numOfTrue += 1;
            step.line = 10;
            step.if_condition = true;
            push(steps, step);

            sortedArr.push(left.shift());
            left_position += 1;

            step.line = 11;
            step.if_condition = undefined;
            step.sorted_array = deepArray(sortedArr);
            step.left_arr_position = left_position;
            push(steps, step);
        }
        else {
            step.numOfFalse += 1;
            step.line = 10;
            step.if_condition = false;
            push(steps, step);

            sortedArr.push(right.shift());
            right_position += 1;

            step.line = 13;
            step.if_condition = undefined;
            step.sorted_array = deepArray(sortedArr);
            step.right_arr_position = right_position;
            push(steps, step);
        }
    }

    sortedArr = [...sortedArr, ...left, ...right];

    step.line = 15;
    step.sorted_array = deepArray(sortedArr);
    step.going_back = true;

    push(steps, step);

    step.going_back = false;

    return {
        sortedArr: sortedArr,
        numOfFalse: step.numOfFalse,
        numOfTrue: step.numOfTrue
    };
};

export const selectionSortStepsGenerator = (arr: number[]): SelectionSortStep[] => {
    let step: SelectionSortStep = {
        arr: deepArray(arr),
        curr_min_element: undefined,
        curr_min_position: undefined,
        found_new_min_ind: undefined,
        i: undefined,
        j: undefined,
        line: 0,
        should_swap_elements: undefined,
        numberOfSwaps: 0
    };

    let steps: SelectionSortStep[] = [];

    push(steps, step);

    for (let i = 0; i < arr.length; i++) {
        step.curr_min_position = undefined;
        step.curr_min_element = undefined;
        step.i = i;
        step.line = 1;
        
        push(steps, step);

        let min_ind = i;

        step.curr_min_position = min_ind;
        step.curr_min_element = arr[min_ind];
        step.line = 2;
        
        push(steps, step);

        for (let j = i + 1; j < arr.length; j++)  {
            
            step.line = 3;
            step.j = j;
            
            push(steps, step);
            
            step.line = 4;

            if (arr[j] < arr[min_ind]){
                step.found_new_min_ind = true;    
                push(steps, step);
                step.found_new_min_ind = undefined;

                min_ind = j;  

                step.line = 5;
                step.curr_min_position = min_ind;
                step.curr_min_element = arr[min_ind];
            } else {
                step.found_new_min_ind = false;
                push(steps, step);
                step.found_new_min_ind = undefined;
            }

        }

        step.j = undefined;
        step.line = 7;

        if (min_ind !== i) {
            step.should_swap_elements = true;
            push(steps, step);
            step.should_swap_elements = undefined;

            [arr[i], arr[min_ind]] = [arr[min_ind], arr[i]]

            step.numberOfSwaps = step.numberOfSwaps + 1;
            step.line = 8;
            step.arr = deepArray(arr);
            
            push(steps, step);
        } else {
            step.should_swap_elements = false;
            push(steps, step);
            step.should_swap_elements = undefined;
        }  
    }

    step.i = undefined;
    step.line = 10;

    push(steps, step);

    return steps;
}

export const bubbleSortStepsGenerator = (arr: number[]): BubbleSortStep[] => {      
    let falseCondition = true;
    let steps: BubbleSortStep[] = [];
    let step = {
        isSwapped: undefined as unknown as boolean,
        i: undefined as unknown as number,
        j: undefined as unknown as number | undefined, 
        arr: arr,
        numOfSwaps: 0,
        line: 0,
        comparisonStatus: undefined as unknown as any,
        isSwappedStatus: undefined as unknown as any
    } as BubbleSortStep;

    push(steps, step);
    
    let isSwapped=false;

    step.isSwapped = false;
    step.line = 1; 
    step.arr = deepArray(step.arr);

    push(steps, step);

    for(let i = 0; i < arr.length; i++){   
      
      step.i = i;
      step.line = 2;  
      step.arr = deepArray(step.arr);
      push(steps, step);

      isSwapped = false;
      
      step.isSwapped = false;
      step.line = 3;
      step.arr = deepArray(step.arr);
      push(steps, step);

      for(let j = 0; j < arr.length - i - 1; j++){
        
        step.j = j;
        step.line = 4;
        step.arr = deepArray(step.arr);
        push(steps, step);

        falseCondition = true;

          if(arr[j] > arr[j + 1]){
            falseCondition = false;

            step.comparisonStatus = {
                first: j,
                second: j+1,
                shouldChange: true
            }
            step.line = 5;
            step.arr = deepArray(step.arr);
            push(steps, step);

            let temp = arr[j]
            arr[j] = arr[j+1];
            arr[j+1] = temp;

            step.line = 7;
            if (step.numOfSwaps != undefined)
                step.numOfSwaps += 1;
            step.arr = deepArray(step.arr);
            step.arr = arr;
            step.isSwapped = true;
            push(steps, step);

            isSwapped = true;
            step.comparisonStatus = undefined;
          }

          if (falseCondition) {
            step.comparisonStatus = {
                first: j,
                second: j+1,
                shouldChange: false
            }
            step.line = 5;
            step.arr = deepArray(step.arr);
            push(steps, step);
            step.comparisonStatus = false;
          }          
      }

      if(!isSwapped) {
        step.isSwappedStatus = {
            shouldContinue: false
        };        
        step.line = 10;
        step.arr = deepArray(step.arr);
        push(steps, step);
        step.isSwappedStatus = undefined;

        step.line = 12;
        step.arr = deepArray(step.arr);
        push(steps, step);
        break;    
      } else {
        step.isSwappedStatus = {
            shouldContinue: true
        };
        step.line = 10;
        step.j = undefined;
        step.arr = deepArray(step.arr);
        push(steps, step);
        step.isSwappedStatus = undefined;
      }

    }
    return steps;
}

