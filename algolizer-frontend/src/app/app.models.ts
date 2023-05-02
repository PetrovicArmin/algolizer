export enum ProblemType {
    MERGE_SORT = "Merge sort algorithm",
    QUICK_SORT = "Quick sort algorithm",
    BUBBLE_SORT = "Bubble sort algorithm",
    INSERTION_SORT = "Insertion sort algorithm",
    SELECTION_SORT = "Selection sort algorithm",
    BINARY_SEARCH = "Binary search on sorted array",
    LINKED_LIST_OPERATIONS = "Linked list operations",
    QUEUE_BFS = "Queue algorithms analysis",
    STACK_DFS = "Stack algorithms analysis", 
    BST_OPERATIONS = "Binary search tree algorithms",
    AVL_OPERATIONS = "Binary search tree AVL balancing",
    EDMONDS_KARP = "Edmonds karp maximum flow algorithm",
    DIJKSTRA = "Dijkstra shortest path finder",
    KRUSKAL = "Kruskal minimum spanning tree",
    HEAP_OPERATIONS = "Heap structure algorithms",
    HASH_MAP_OPERATIONS = "Hashing structures and algorithms",
    RECURSION = "Recursion based algorithms"
};

export class BubbleSortStep {
    isSwapped: boolean | undefined;
    i: number | undefined;
    j: number | undefined;
    arr: number[] | undefined;
    numOfSwaps: number | undefined;
    line: number | undefined;
    comparisonStatus: any;
    isSwappedStatus: any;
};

export class SelectionSortStep {
    line: number | undefined;
    arr: number[] | undefined;
    i: number | undefined;
    j: number | undefined;
    curr_min_position: number | undefined;
    found_new_min_ind: boolean | undefined;
    curr_min_element: number | undefined;
    should_swap_elements: boolean | undefined;
    numberOfSwaps: number = 0;
};

export class MergeSortStep {
    array: number[] | undefined;
    left_array: number[] | undefined;
    right_array: number[] | undefined;
    sorted_array: number[] | undefined;
    mid_position: number | undefined;
    left_arr_position: number | undefined;
    right_arr_position: number | undefined;
    if_condition: undefined;
    going_back: boolean | undefined;
    going_forward: boolean | undefined;
    merging: boolean | undefined;
    recursion_depth: number | undefined;
    line: number | undefined;
    numOfFalse: number | undefined;
    numOfTrue: number | undefined;
};

export class QuickSortStep {
    array: number[] | undefined;
    left_array: number[] | undefined;
    right_array: number[] | undefined;
    sorted_array: number[] | undefined;
    pivot: number | undefined;
    greaterThanPivot: boolean | undefined;
    i: number | undefined;
    baseCase: boolean | undefined;
    line: number | undefined;
    recursion_depth: number = -1;
    going_back: boolean | undefined;
    going_forward: boolean | undefined;
};

export class InsertionSortStep {
    array: number[] | undefined;
    i: number | undefined;
    j: number | undefined;
    numOfSwaps: number | undefined;
    line: number | undefined;
    currentValue: number | undefined;
    if_condition: boolean | undefined;
    swap_happened: boolean | undefined;
    //ako bude još nešto trebalo, nije problem dodati.
}

export interface AlgorithmContext {
    contextProperty: string;
    propertyValue: string;
};

export class Quiz {
    questions: Question[];
    type: string;
    code: string;
    array: number[];
    earnedPoints: number;

    constructor() {
        this.earnedPoints = 0;
        this.questions = [];
        this.type = "";
        this.code = "";
        this.array = [];
    }
};

export class Question {
    text: string;
    answer: string;
    points: number;
    userInput: string;
    correct: boolean;

    constructor() {
        this.correct = false;
        this.text = "";
        this.answer = "0";
        this.points = 0;
        this.userInput = "";
    }
}