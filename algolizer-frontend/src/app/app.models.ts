export enum ProblemType {
    MERGE_SORT = "Merge sort algorithm",
    QUICK_SORT = "Quick sort algorithm",
    BUBBLE_SORT = "Bubble sort algorithm",
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