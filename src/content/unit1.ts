import type { Topic } from "@/lib/types";

export const unit1Topics: Topic[] = [
  {
    id: "paradigm-shift",
    title: "Why Object-Oriented?",
    tagline: "Procedural vs. OOP, and the mental model shift",
    minutes: 12,
    blocks: [
      {
        kind: "p",
        text: "Every program manipulates two things: **data** and the **functions** that act on that data. The entire debate between procedural and object-oriented programming comes down to one question: *who owns the data?*",
      },
      { kind: "heading", text: "The Procedural World" },
      {
        kind: "p",
        text: "In procedural languages like C, data and functions are **separate**. You define a `struct Student` to hold data, and then write free-floating functions like `printStudent(Student s)` or `updateMarks(Student s)` that operate on it from the outside. Nothing stops any function anywhere in the program from reaching in and mutating that data directly.",
      },
      {
        kind: "code",
        lang: "cpp",
        caption: "Procedural style — data and behaviour live apart",
        code: `struct Student {
    string name;
    int marks;
};

void printStudent(Student s) {
    cout << s.name << " scored " << s.marks;
}

int main() {
    Student s1 = {"Aditi", 87};
    s1.marks = 200;      // nobody stops this invalid mark
    printStudent(s1);
}`,
      },
      {
        kind: "p",
        text: "This works fine for small scripts. It falls apart as programs grow: any of the 500 functions in a large codebase could be silently corrupting your data, and there is no single place responsible for keeping it valid.",
      },
      { kind: "heading", text: "The Object-Oriented World" },
      {
        kind: "p",
        text: "OOP fuses data and the functions that operate on it into a single unit — an **object**. The data (fields) is usually hidden, and the only way to touch it is through the object's own functions (methods). The object becomes responsible for keeping itself valid.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Same idea, object-oriented style — the object guards its own data",
        code: `class Student {
    private String name;
    private int marks;

    public Student(String name, int marks) {
        this.name = name;
        setMarks(marks);
    }

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            throw new IllegalArgumentException("Marks must be 0-100");
        }
        this.marks = marks;
    }

    public void print() {
        System.out.println(name + " scored " + marks);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Aditi", 87);
        s1.setMarks(200);   // throws immediately — invalid state is impossible
    }
}`,
      },
      {
        kind: "callout",
        variant: "analogy",
        title: "Think of it like an ATM, not a bank ledger",
        text: "A paper ledger (procedural) lets anyone with a pen edit any balance. An ATM (object-oriented) is the *only* door to your balance — it enforces rules like \"cannot withdraw more than you have\" every single time, because the rule lives inside the machine, not in the hope that every clerk remembers it.",
      },
      { kind: "heading", text: "Four Reasons Teams Move to OOP" },
      {
        kind: "list",
        items: [
          "**Modularity** — a class is a self-contained unit you can build, test and debug in isolation.",
          "**Reusability** — inheritance and composition let you reuse existing classes instead of rewriting logic.",
          "**Maintainability** — bugs are localized. If `Student` behaves wrongly, the bug is inside the `Student` class, not scattered across 500 functions.",
          "**Real-world mapping** — a `Car`, `Employee` or `BankAccount` maps naturally to a class, which makes large systems easier to *reason about*, not just easier to write.",
        ],
      },
      {
        kind: "compare",
        headers: ["Aspect", "Procedural", "Object-Oriented"],
        rows: [
          ["Unit of design", "Function", "Class / Object"],
          ["Data access", "Global or passed around freely", "Encapsulated, controlled via methods"],
          ["Focus", "\"What steps happen\" (algorithm-first)", "\"What things exist and what they can do\" (model-first)"],
          ["Growth", "Gets tangled as it scales", "Scales via new classes, minimal ripple effect"],
          ["Example languages", "C, Pascal, Fortran", "Java, C++, Python, C#"],
        ],
      },
      {
        kind: "callout",
        variant: "pitfall",
        title: "OOP is not \"automatically better\"",
        text: "For a 20-line script, a procedural approach is often faster to write. OOP earns its cost on systems that grow, are maintained by teams, or model complex real-world entities. Do not force classes onto trivial one-off scripts.",
      },
    ],
    quiz: [
      {
        id: "q-paradigm-1",
        question: "What is the core structural difference between procedural and object-oriented programming?",
        type: "mcq",
        options: [
          "OOP programs run faster than procedural programs",
          "OOP bundles data and the functions operating on it into one unit; procedural keeps them separate",
          "Procedural languages cannot use loops",
          "OOP does not allow the use of functions",
        ],
        correctIndex: 1,
        explanation: "The defining shift is encapsulation: binding data and behaviour together inside an object, instead of passing raw data between independent functions.",
      },
    ],
  },

  {
    id: "classes-objects",
    title: "Classes & Objects",
    tagline: "The blueprint and the thing built from it",
    minutes: 15,
    blocks: [
      {
        kind: "p",
        text: "A **class** is a blueprint — it defines what fields (data) and methods (behaviour) something will have, but it does not itself occupy memory for that data. An **object** is a concrete instance of that blueprint, created at runtime, with its own copy of the fields.",
      },
      {
        kind: "callout",
        variant: "analogy",
        title: "Cookie cutter vs. cookies",
        text: "The cookie cutter (class) defines the shape. Every cookie (object) you stamp out has that shape, but each one is a separate physical cookie — eat one, and the others are untouched. Similarly, changing `object1.name` never affects `object2.name`.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Defining a class and creating two independent objects",
        code: `class Car {
    // fields (instance variables) — state
    String brand;
    int speed;

    // method — behaviour
    void accelerate() {
        speed += 10;
        System.out.println(brand + " is now at " + speed + " km/h");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car();   // object 1
        car1.brand = "Tata";
        car1.accelerate();      // Tata is now at 10 km/h

        Car car2 = new Car();   // object 2 — completely separate memory
        car2.brand = "Kia";
        car2.accelerate();      // Kia is now at 10 km/h, NOT 20

        System.out.println(car1.speed); // 10 — car2's changes never touched car1
    }
}`,
      },
      { kind: "heading", text: "What `new` actually does" },
      {
        kind: "list",
        ordered: true,
        items: [
          "The JVM allocates memory on the **heap** big enough for one `Car`'s fields.",
          "Every field gets a default value first (`0`, `false`, or `null` for objects/Strings).",
          "The constructor runs, initializing the fields.",
          "`new Car()` evaluates to a **reference** (an address) to that memory, which gets stored in the variable `car1`.",
        ],
      },
      {
        kind: "callout",
        variant: "tip",
        title: "A variable never holds an object — it holds a reference to one",
        text: "`Car car1` is a pointer-like reference on the stack. The actual `Car` data lives on the heap. This single fact explains almost every \"weird\" behaviour students see with objects, arrays, and method parameters — covered in depth in the topic *Passing Objects by Reference*.",
      },
      { kind: "heading", text: "Primitive Types vs. Object (Reference) Types" },
      {
        kind: "p",
        text: "Java splits every type into two families. **Primitives** (`int`, `double`, `char`, `boolean`, `byte`, `short`, `long`, `float`) store the actual value directly and are not objects — they have no methods. **Reference types** (every class, including `String`, arrays, and your own classes) store an address pointing to the real data on the heap.",
      },
      {
        kind: "compare",
        headers: ["", "Primitive (e.g. int)", "Reference (e.g. Car, String)"],
        rows: [
          ["Stored on stack", "The actual value", "The address only"],
          ["Default value", "0 / false", "null"],
          ["Copy on assignment", "Copies the value", "Copies the address (both point to same object)"],
          ["Has methods?", "No", "Yes"],
        ],
      },
      {
        kind: "code",
        lang: "java",
        caption: "Primitive object types Java gives you for free",
        code: `int age = 21;            // primitive — 4 bytes, holds 21 directly
double gpa = 8.7;         // primitive
char grade = 'A';         // primitive
boolean passed = true;    // primitive

Integer boxedAge = 21;    // wrapper class — an actual object wrapping an int
String name = "Aditi";    // reference type — String is a class, not a primitive`,
      },
      {
        kind: "callout",
        variant: "exam",
        title: "Frequently tested distinction",
        text: "\"Is String a primitive type?\" — **No.** It is one of the most common trick questions. `String` is a full class in `java.lang`, which is why you can call `.length()`, `.toUpperCase()` etc. on it — primitives never have methods.",
      },
    ],
    quiz: [
      {
        id: "q-classes-1",
        question: "Two objects, car1 and car2, are created from the same class. You change car1.speed. What happens to car2.speed?",
        type: "mcq",
        options: [
          "It changes to match car1.speed",
          "It stays exactly as it was — each object has its own independent copy of instance fields",
          "The program throws an error",
          "Both become 0",
        ],
        correctIndex: 1,
        explanation: "Each object created with `new` gets its own separate block of memory on the heap. Fields are per-instance unless declared `static`.",
      },
      {
        id: "q-classes-2",
        question: "Which of these is NOT a primitive type in Java?",
        type: "mcq",
        options: ["int", "boolean", "String", "double"],
        correctIndex: 2,
        explanation: "String is a reference type (a class). Java's 8 primitives are byte, short, int, long, float, double, char, and boolean.",
      },
    ],
  },

  {
    id: "strings",
    title: "Strings, StringBuilder & StringBuffer",
    tagline: "Why 'immutable' matters and when to stop using +",
    minutes: 14,
    blocks: [
      {
        kind: "p",
        text: "`String` in Java is a class, and every `String` object is **immutable** — once created, its character sequence can never change. Every operation that looks like it \"modifies\" a string (`concat`, `toUpperCase`, `replace`, `+`) actually creates and returns a brand-new `String` object.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "The classic trap",
        code: `String s = "hello";
s.toUpperCase();          // creates "HELLO" ... and throws it away!
System.out.println(s);    // still prints "hello"

s = s.toUpperCase();      // correct: reassign the reference
System.out.println(s);    // prints "HELLO"`,
      },
      {
        kind: "callout",
        variant: "analogy",
        title: "A String is like a printed page, not a whiteboard",
        text: "You cannot edit a printed page — you print a whole new page with the correction and throw the old one in the bin. A whiteboard (StringBuilder, below) you can erase and rewrite in place, which is far cheaper if you're editing repeatedly.",
      },
      { kind: "heading", text: "Why immutability is a *feature*, not a limitation" },
      {
        kind: "list",
        items: [
          "**Safety** — strings can be shared freely (e.g. as HashMap keys) without fear that one part of the program corrupts it for another.",
          "**The String Pool** — Java caches string literals in a special pool. `\"cat\" == \"cat\"` is `true` because both literals point to the *same* pooled object — impossible to do safely if Strings were mutable.",
          "**Thread safety** — an immutable object can be shared across threads with zero synchronization.",
        ],
      },
      {
        kind: "code",
        lang: "java",
        caption: "Common String operations",
        code: `String name = "Object Oriented Programming";
System.out.println(name.length());          // 26
System.out.println(name.charAt(0));          // 'O'
System.out.println(name.substring(0, 6));    // "Object"
System.out.println(name.indexOf("Oriented")); // 7
System.out.println(name.toLowerCase());
System.out.println(name.replace("Oriented", "Based"));
System.out.println(name.split(" ").length);  // 4
System.out.println(name.equals("object oriented programming")); // false, case-sensitive
System.out.println(name.equalsIgnoreCase("object oriented programming")); // true`,
      },
      { kind: "heading", text: "The cost of concatenation in a loop" },
      {
        kind: "p",
        text: "Because every `+` on Strings builds a *new* object, concatenating inside a loop is quietly quadratic — each iteration copies everything built so far into an even bigger new String.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Slow: creates ~1000 throwaway String objects",
        code: `String result = "";
for (int i = 0; i < 1000; i++) {
    result += i + ",";   // new String object every single iteration
}`,
      },
      {
        kind: "code",
        lang: "java",
        caption: "Fast: StringBuilder mutates one internal buffer",
        code: `StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i).append(",");   // same object, resized buffer, no throwaway copies
}
String result = sb.toString();  // convert to String only once, at the end`,
      },
      {
        kind: "compare",
        headers: ["", "String", "StringBuilder", "StringBuffer"],
        rows: [
          ["Mutable?", "No", "Yes", "Yes"],
          ["Thread-safe?", "N/A (immutable)", "No", "Yes (synchronized methods)"],
          ["Speed", "Slow for repeated edits", "Fastest", "Slower than StringBuilder due to locking"],
          ["Use when", "Value rarely changes", "Building/editing in a single thread", "Building/editing shared across threads"],
        ],
      },
      {
        kind: "callout",
        variant: "exam",
        title: "Rule of thumb",
        text: "Default to **StringBuilder**. Reach for **StringBuffer** only when multiple threads genuinely mutate the same buffer concurrently — which is rare in typical coursework.",
      },
    ],
    quiz: [
      {
        id: "q-strings-1",
        question: "What does the following print?\n\nString s = \"abc\";\ns.concat(\"def\");\nSystem.out.println(s);",
        type: "mcq",
        options: ["abc", "abcdef", "def", "Compilation error"],
        correctIndex: 0,
        explanation: "String is immutable. concat() returns a new String which is discarded here since it's never assigned back to s.",
      },
      {
        id: "q-strings-2",
        question: "True or False: StringBuffer is generally faster than StringBuilder in a single-threaded program.",
        type: "truefalse",
        options: ["True", "False"],
        correctIndex: 1,
        explanation: "False — StringBuffer's methods are synchronized (thread-safe), which adds locking overhead that StringBuilder does not pay in a single-threaded context.",
      },
    ],
  },

  {
    id: "arrays-vectors",
    title: "Arrays & Vectors",
    tagline: "Fixed-size, raw speed vs. dynamic, managed growth",
    minutes: 14,
    blocks: [
      {
        kind: "p",
        text: "An **array** is the most primitive collection: a fixed-size, contiguous block of memory holding elements of one type, indexed from `0`. Its size is decided at creation and can never change.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Array basics",
        code: `int[] marks = new int[5];       // 5 slots, all default to 0
marks[0] = 90;
marks[4] = 78;

int[] scores = {85, 90, 78, 92, 88};   // array literal
System.out.println(scores.length);      // 5 (a field, not a method!)

for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}

// enhanced for-loop (read-only iteration)
for (int s : scores) {
    System.out.println(s);
}`,
      },
      {
        kind: "callout",
        variant: "pitfall",
        title: "ArrayIndexOutOfBoundsException",
        text: "scores[5] on a 5-element array crashes at runtime — valid indices are 0 to length-1. Unlike some languages, Java always bounds-checks array access, so this fails loudly rather than corrupting memory silently.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "2D arrays — an array of arrays",
        code: `int[][] grid = new int[3][3];
grid[1][2] = 7;

int[][] board = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};`,
      },
      { kind: "heading", text: "The problem arrays don't solve: growth" },
      {
        kind: "p",
        text: "What if you don't know how many students will enrol? With a plain array you'd have to guess a size, and either waste memory or overflow it. **Vector** (and its modern, non-synchronized cousin **ArrayList**) solves this: a dynamically resizable array that grows automatically as you add elements.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Vector — dynamic, synchronized, legacy but still in the syllabus & JDK",
        code: `import java.util.Vector;

Vector<String> students = new Vector<>();
students.add("Aditi");
students.add("Rohan");
students.add("Meera");
students.remove("Rohan");

System.out.println(students.size());        // 2, grows/shrinks automatically
System.out.println(students.get(0));         // "Aditi"
System.out.println(students.contains("Meera")); // true

for (String name : students) {
    System.out.println(name);
}`,
      },
      {
        kind: "compare",
        headers: ["", "Array", "Vector / ArrayList"],
        rows: [
          ["Size", "Fixed at creation", "Grows and shrinks automatically"],
          ["Holds", "Primitives or objects", "Objects only (primitives get auto-boxed)"],
          ["Speed", "Fastest — minimal overhead", "Slightly slower — resizing & boxing overhead"],
          ["Thread-safe?", "N/A", "Vector: yes (synchronized). ArrayList: no"],
          ["Common use today", "Fixed, performance-critical data", "Everyday general-purpose lists"],
        ],
      },
      {
        kind: "callout",
        variant: "tip",
        title: "Vector vs ArrayList",
        text: "Vector predates the Collections Framework and synchronizes every method, which is usually unnecessary overhead. Modern Java code almost always prefers ArrayList unless multiple threads genuinely share the same list — but the syllabus specifically calls out Vector, so know its API (add, remove, get, size, contains) alongside ArrayList's identical usage pattern.",
      },
    ],
    quiz: [
      {
        id: "q-arrays-1",
        question: "int[] a = new int[4]; What is a[2] before any assignment?",
        type: "mcq",
        options: ["null", "undefined / garbage value", "0", "Compilation error"],
        correctIndex: 2,
        explanation: "Java always initializes array elements to their type's default — 0 for int, 0.0 for double, false for boolean, and null for object types.",
      },
      {
        id: "q-arrays-2",
        question: "What is the key advantage of a Vector over a plain array?",
        type: "mcq",
        options: [
          "Vectors are always faster than arrays",
          "Vectors can dynamically grow and shrink in size",
          "Vectors can store primitive types more efficiently",
          "Arrays cannot store objects",
        ],
        correctIndex: 1,
        explanation: "Dynamic resizing is the defining benefit — you no longer need to know the collection size upfront.",
      },
    ],
  },

  {
    id: "control-flow",
    title: "Operators, Decision Making & Looping",
    tagline: "The building blocks — a rapid, structured recap",
    minutes: 10,
    blocks: [
      {
        kind: "p",
        text: "You've met these in your prerequisite course on computational thinking. Here's the OOP-course-speed recap, plus the two or three gotchas that consistently trip students in exams.",
      },
      { kind: "heading", text: "Operators" },
      {
        kind: "compare",
        headers: ["Category", "Operators", "Example"],
        rows: [
          ["Arithmetic", "+  -  *  /  %", "17 % 5 evaluates to 2"],
          ["Relational", "==  !=  >  <  >=  <=", "5 >= 5 is true"],
          ["Logical", "&&  ||  !", "(a > 0) && (b > 0)"],
          ["Assignment", "=  +=  -=  *=  /=", "score += 10"],
          ["Increment/Decrement", "++  --", "count++ vs ++count"],
          ["Ternary", "condition ? a : b", "int max = (a > b) ? a : b;"],
        ],
      },
      {
        kind: "callout",
        variant: "pitfall",
        title: "count++ vs ++count is not cosmetic",
        text: "int x = 5; int y = x++; leaves y = 5 (post-increment returns the OLD value, then increments). int y = ++x; leaves y = 6 (pre-increment increments FIRST, then returns). This distinction is a favourite one-mark exam question.",
      },
      { kind: "heading", text: "Decision Making" },
      {
        kind: "code",
        lang: "java",
        caption: "if / else-if / switch",
        code: `int marks = 76;

if (marks >= 90) {
    System.out.println("A+");
} else if (marks >= 75) {
    System.out.println("A");
} else if (marks >= 60) {
    System.out.println("B");
} else {
    System.out.println("Needs improvement");
}

// modern switch expression (Java 14+)
String grade = switch ((marks / 10)) {
    case 10, 9 -> "A+";
    case 8, 7 -> "A";
    case 6 -> "B";
    default -> "Needs improvement";
};`,
      },
      { kind: "heading", text: "Looping" },
      {
        kind: "code",
        lang: "java",
        caption: "for, while, do-while",
        code: `for (int i = 1; i <= 5; i++) {
    System.out.println("for: " + i);
}

int i = 1;
while (i <= 5) {
    System.out.println("while: " + i);
    i++;
}

int j = 1;
do {
    System.out.println("do-while: " + j);
    j++;
} while (j <= 5);   // runs at least once, even if condition starts false`,
      },
      {
        kind: "callout",
        variant: "exam",
        title: "Why do-while matters",
        text: "do-while guarantees the body runs at least once BEFORE the condition is checked. This is the standard answer whenever a question asks you to design a menu-driven program: you must show the menu at least once, even before validating any input.",
      },
      {
        kind: "callout",
        variant: "tip",
        title: "break vs. continue",
        text: "break exits the loop entirely. continue skips only the current iteration and moves to the next one. Mixing these up is the #2 cause of infinite loops in lab submissions.",
      },
    ],
    quiz: [
      {
        id: "q-flow-1",
        question: "int x = 5; int y = x++ + ++x; What is y?",
        type: "mcq",
        options: ["10", "11", "12", "13"],
        correctIndex: 2,
        explanation: "x++ returns 5 then x becomes 6. ++x then makes x 7 and returns 7. y = 5 + 7 = 12.",
      },
    ],
  },
];
