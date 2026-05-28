const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'roadmapData.json');
let rawdata = fs.readFileSync(filePath);
let roadmap = JSON.parse(rawdata);

// Find Level 1
const level1 = roadmap.levels.find(l => l.id === 'level_1');

// Add Module 9
level1.modules.push({
    "id": "module_9",
    "title": "Module 9 - Java & Object Oriented Programming",
    "description": "Learn Java fundamentals, classes, objects, inheritance, and polymorphism.",
    "topics": ["Java Basics", "Classes & Objects", "Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
    "output": "Library Management System CLI",
    "tasks": [
        {
            "id": "m9_t1",
            "title": "Java Fundamentals",
            "phase": "Phase 1: Concepts",
            "type": "Learning",
            "xp": 80,
            "difficulty": "Medium",
            "estimatedTime": "45 min",
            "content": {
                "explanation": "Java is a statically typed, object-oriented language. Understand JVM, JDK, and JRE.",
                "instructions": "Write your first 'Hello World' in Java and understand the public static void main syntax.",
                "example": "public class Main { public static void main(String[] args) { System.out.println(\"Hello World\"); } }"
            }
        },
        {
            "id": "m9_t2",
            "title": "Classes and Objects",
            "phase": "Phase 1: Concepts",
            "type": "Learning",
            "xp": 100,
            "difficulty": "Medium",
            "estimatedTime": "1 hour",
            "content": {
                "explanation": "Classes are blueprints, and objects are instances of those blueprints.",
                "instructions": "Create a 'Car' class with attributes (color, brand) and methods (drive, brake). Instantiate two objects.",
                "example": "Car myCar = new Car(); myCar.color = \"Red\";"
            }
        },
        {
            "id": "m9_t3",
            "title": "Inheritance & Polymorphism",
            "phase": "Phase 2: Practice",
            "type": "Practice",
            "xp": 120,
            "difficulty": "Hard",
            "estimatedTime": "1.5 hours",
            "content": {
                "explanation": "Inheritance allows a class to inherit properties from another. Polymorphism allows methods to do different things based on the object.",
                "instructions": "Create a base class 'Animal' and subclasses 'Dog' and 'Cat' that override the 'makeSound' method.",
                "example": "class Dog extends Animal { @Override void makeSound() { System.out.println(\"Bark\"); } }"
            }
        },
        {
            "id": "m9_t4",
            "title": "Library System CLI",
            "phase": "Phase 3: Building",
            "type": "Project",
            "xp": 200,
            "difficulty": "Hard",
            "estimatedTime": "2 hours",
            "content": {
                "explanation": "Apply OOP concepts to build a small application.",
                "instructions": "Build a command-line Library Management System using Java where users can add books, borrow books, and return books using classes and lists.",
                "example": "List<Book> library = new ArrayList<>();"
            }
        }
    ]
});

// Add Module 10
level1.modules.push({
    "id": "module_10",
    "title": "Module 10 - Data Structures & Algorithms",
    "description": "Introduction to fundamental Data Structures like Stacks, Queues, Linked Lists and basic Algorithms.",
    "topics": ["Time & Space Complexity", "Arrays", "Linked Lists", "Stacks & Queues", "Searching & Sorting"],
    "output": "DSA Concept Implementations",
    "tasks": [
        {
            "id": "m10_t1",
            "title": "Time & Space Complexity",
            "phase": "Phase 1: Concepts",
            "type": "Learning",
            "xp": 100,
            "difficulty": "Medium",
            "estimatedTime": "45 min",
            "content": {
                "explanation": "Big O notation describes the performance of an algorithm.",
                "instructions": "Understand O(1), O(n), O(n^2), and O(log n). Analyze the complexity of a simple loop vs nested loops.",
                "example": "A single loop from 1 to N is O(N)."
            }
        },
        {
            "id": "m10_t2",
            "title": "Linked Lists Basics",
            "phase": "Phase 1: Concepts",
            "type": "Learning",
            "xp": 120,
            "difficulty": "Hard",
            "estimatedTime": "1 hour",
            "content": {
                "explanation": "A linked list is a linear data structure where elements are not stored at contiguous memory locations.",
                "instructions": "Implement a Singly Linked List in Java or JS with insertAtEnd and printList methods.",
                "example": "class Node { int data; Node next; }"
            }
        },
        {
            "id": "m10_t3",
            "title": "Stacks & Queues",
            "phase": "Phase 2: Practice",
            "type": "Practice",
            "xp": 150,
            "difficulty": "Medium",
            "estimatedTime": "1.5 hours",
            "content": {
                "explanation": "Stack follows LIFO (Last In First Out). Queue follows FIFO (First In First Out).",
                "instructions": "Implement a Stack using an Array. Then, use the stack to solve the 'Valid Parentheses' problem.",
                "example": "stack.push(1); int top = stack.pop();"
            }
        },
        {
            "id": "m10_t4",
            "title": "Sorting Algorithms",
            "phase": "Phase 3: Building",
            "type": "Project",
            "xp": 200,
            "difficulty": "Hard",
            "estimatedTime": "2 hours",
            "content": {
                "explanation": "Sorting rearranges elements in a specific order.",
                "instructions": "Implement Bubble Sort, Selection Sort, and Insertion Sort. Compare their execution times on a large array.",
                "example": "for(int i=0; i<n-1; i++) { if(arr[j] > arr[j+1]) swap(arr[j], arr[j+1]); }"
            }
        }
    ]
});

fs.writeFileSync(filePath, JSON.stringify(roadmap, null, 4));
console.log('Successfully added Module 9 and Module 10 to Level 1');
