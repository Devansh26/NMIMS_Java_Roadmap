import type { QuizBankQuestion } from "@/lib/types";

// Quiz (10 marks, ~20 questions x 0.5 marks, in-class on Sat 19 Sept).
// Deliberately excludes M1 scope (encapsulation/abstraction/constructors/
// OOP-paradigm/strings/arrays) except light, unavoidable touches on
// conditions/loops as building blocks for the newer topics.
export const quizBankQuestions: QuizBankQuestion[] = [
  // ---------------------------------------------------------------------
  // Conditions
  // ---------------------------------------------------------------------
  {
    id: "qb-cond-1",
    topic: "Conditions",
    type: "mcq",
    question: "What does the following print?",
    code: {
      lang: "java",
      code: `int x = 10;
if (x > 5)
    System.out.println("A");
    System.out.println("B");`,
    },
    options: ["Only \"A\"", "Both print — \"A\" then \"B\"", "Only \"B\"", "Compilation error"],
    correctIndex: 1,
    explanation:
      "Without braces, only the single statement right after if belongs to it. The second println is NOT part of the if — it runs unconditionally, so both A and B print.",
  },
  {
    id: "qb-cond-2",
    topic: "Conditions",
    type: "mcq",
    question: "Which operator requires BOTH conditions to be true for the overall expression to be true?",
    options: ["||", "&&", "!", "^"],
    correctIndex: 1,
    explanation: "&& is logical AND — the whole expression is true only if both operands are true.",
  },
  {
    id: "qb-cond-3",
    topic: "Conditions",
    type: "mcq",
    question: "What is the value of result?",
    code: { lang: "java", code: `int a = 5, b = 10;\nString result = (a > b) ? "A wins" : "B wins";` },
    options: ["A wins", "B wins", "Compilation error", "null"],
    correctIndex: 1,
    explanation: "a > b is false, so the ternary operator evaluates to the value after the colon: \"B wins\".",
  },
  {
    id: "qb-cond-4",
    topic: "Conditions",
    type: "mcq",
    question: "In a switch statement, what happens if break is omitted at the end of a matching case?",
    options: [
      "Compilation error",
      "The switch exits immediately",
      "Execution \"falls through\" and continues into the next case's statements",
      "The default case runs instead",
    ],
    correctIndex: 2,
    explanation: "Without break, control falls through and keeps executing the following case's statements too, regardless of whether their label matches.",
  },
  {
    id: "qb-cond-5",
    topic: "Conditions",
    type: "mcq",
    question: "What does this print?",
    code: {
      lang: "java",
      code: `int marks = 65;
if (marks >= 90) System.out.println("A");
else if (marks >= 75) System.out.println("B");
else if (marks >= 60) System.out.println("C");
else System.out.println("D");`,
    },
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
    explanation: "marks (65) fails >= 90 and >= 75, but passes >= 60, so \"C\" prints and the rest of the ladder is skipped.",
  },
  {
    id: "qb-cond-6",
    topic: "Conditions",
    type: "mcq",
    question: "Which expression correctly checks if n is between 10 and 20, inclusive?",
    options: ["n >= 10 || n <= 20", "n >= 10 && n <= 20", "n > 10 && n < 20", "n == 10 && n == 20"],
    correctIndex: 1,
    explanation: "Both bounds must hold at once, so && is required; || would be true for almost any number.",
  },
  {
    id: "qb-cond-7",
    topic: "Conditions",
    type: "mcq",
    question: "What does this print?",
    code: {
      lang: "java",
      code: `int x = 7;
switch (x % 2) {
    case 0: System.out.println("Even"); break;
    case 1: System.out.println("Odd"); break;
    default: System.out.println("Unknown");
}`,
    },
    options: ["Even", "Odd", "Unknown", "Compilation error"],
    correctIndex: 1,
    explanation: "7 % 2 is 1, which matches case 1, printing \"Odd\".",
  },
  {
    id: "qb-cond-8",
    topic: "Conditions",
    type: "mcq",
    question: "Which of these types CANNOT be used as a switch expression's type in standard Java?",
    options: ["int", "String", "char", "double"],
    correctIndex: 3,
    explanation: "switch supports byte, short, char, int, String, and enum — floating-point types like double (and float, long) are not allowed.",
  },
  {
    id: "qb-cond-9",
    topic: "Conditions",
    type: "mcq",
    question: "What does this print?",
    code: {
      lang: "java",
      code: `int a = 5;
if (a > 0) {
    if (a > 10) {
        System.out.println("Big positive");
    } else {
        System.out.println("Small positive");
    }
} else {
    System.out.println("Non-positive");
}`,
    },
    options: ["Big positive", "Small positive", "Non-positive", "Nothing"],
    correctIndex: 1,
    explanation: "a (5) is > 0 but not > 10, so the inner else runs: \"Small positive\".",
  },
  {
    id: "qb-cond-10",
    topic: "Conditions",
    type: "mcq",
    question: "What does this print?",
    code: {
      lang: "java",
      code: `boolean flag = false;
if (!flag) {
    System.out.println("Yes");
} else {
    System.out.println("No");
}`,
    },
    options: ["Yes", "No", "true", "Compilation error"],
    correctIndex: 0,
    explanation: "! negates flag: !false is true, so the if-branch runs and prints \"Yes\".",
  },

  // ---------------------------------------------------------------------
  // Loops
  // ---------------------------------------------------------------------
  {
    id: "qb-loop-1",
    topic: "Loops",
    type: "mcq",
    question: "How many times does the loop body execute?",
    code: { lang: "java", code: `for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}` },
    options: ["4", "5", "6", "Infinite"],
    correctIndex: 1,
    explanation: "i takes the values 0, 1, 2, 3, 4 — five iterations in total.",
  },
  {
    id: "qb-loop-2",
    topic: "Loops",
    type: "mcq",
    question: "What does this print?",
    code: { lang: "java", code: `int i = 0;\nwhile (i < 3) {\n    System.out.print(i + " ");\n    i++;\n}` },
    options: ["0 1 2 ", "1 2 3 ", "0 1 2 3 ", "Infinite loop"],
    correctIndex: 0,
    explanation: "The loop runs while i < 3, printing 0, 1, 2 before i becomes 3 and the loop exits.",
  },
  {
    id: "qb-loop-3",
    topic: "Loops",
    type: "mcq",
    question: "Which loop guarantees its body executes at least once, even if the condition is false to begin with?",
    options: ["for", "while", "do-while", "enhanced for (for-each)"],
    correctIndex: 2,
    explanation: "do-while checks its condition AFTER the body runs, so the body always executes at least once.",
  },
  {
    id: "qb-loop-4",
    topic: "Loops",
    type: "mcq",
    question: "What does the continue statement do inside a loop?",
    options: [
      "Exits the loop entirely",
      "Skips the rest of the current iteration and moves to the next one",
      "Restarts the loop from the very beginning",
      "Pauses the loop until a key is pressed",
    ],
    correctIndex: 1,
    explanation: "continue jumps straight to the next iteration's condition check, skipping whatever code follows it in the current pass.",
  },
  {
    id: "qb-loop-5",
    topic: "Loops",
    type: "mcq",
    question: "What does this print?",
    code: { lang: "java", code: `for (int i = 1; i <= 5; i++) {\n    if (i == 3) break;\n    System.out.print(i + " ");\n}` },
    options: ["1 2 ", "1 2 3 ", "1 2 3 4 5 ", "Nothing"],
    correctIndex: 0,
    explanation: "break exits the loop entirely the moment i == 3, before that iteration's print runs — so only 1 and 2 are printed.",
  },
  {
    id: "qb-loop-6",
    topic: "Loops",
    type: "mcq",
    question: "What does this print?",
    code: { lang: "java", code: `for (int i = 1; i <= 5; i++) {\n    if (i % 2 == 0) continue;\n    System.out.print(i + " ");\n}` },
    options: ["2 4 ", "1 3 5 ", "1 2 3 4 5 ", "Nothing"],
    correctIndex: 1,
    explanation: "continue skips the print only for even i, so the odd numbers 1, 3, 5 are printed.",
  },
  {
    id: "qb-loop-7",
    topic: "Loops",
    type: "mcq",
    question: "What happens when this code runs?",
    code: { lang: "java", code: `int i = 0;\nwhile (i < 5);\n{\n    System.out.println(i);\n    i++;\n}` },
    options: [
      "Prints 0 1 2 3 4",
      "Prints nothing — it loops forever",
      "Compilation error",
      "Prints 0 only",
    ],
    correctIndex: 1,
    explanation:
      "The semicolon right after while(i < 5) makes the loop's body an empty statement. i is never incremented, so the loop runs forever without ever reaching the block below — nothing is ever printed.",
  },
  {
    id: "qb-loop-8",
    topic: "Loops",
    type: "mcq",
    question: "Which loop is best suited when the exact number of iterations is known in advance?",
    options: ["for", "while", "do-while", "None — all are equally suited"],
    correctIndex: 0,
    explanation: "for bundles initialization, condition, and increment together, making a known iteration count easiest to express and read.",
  },
  {
    id: "qb-loop-9",
    topic: "Loops",
    type: "mcq",
    question: "What does this print?",
    code: {
      lang: "java",
      code: `for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 2; j++) {
        System.out.print(i + "" + j + " ");
    }
}`,
    },
    options: ["11 12 21 22 ", "11 22 ", "12 21 ", "1 2 1 2 "],
    correctIndex: 0,
    explanation: "For each i (1, 2), the inner loop runs j = 1, 2, producing 11, 12, then 21, 22.",
  },
  {
    id: "qb-loop-10",
    topic: "Loops",
    type: "mcq",
    question: "What happens when a for-loop's condition is left empty, e.g. for (int i = 0; ; i++) { ... }?",
    options: [
      "Compilation error",
      "The loop runs zero times",
      "The loop runs infinitely, unless something inside it (like a break) stops it",
      "The loop runs exactly once",
    ],
    correctIndex: 2,
    explanation: "An empty condition is treated as always true, so the loop repeats forever unless a break (or return/exception) exits it.",
  },

  // ---------------------------------------------------------------------
  // this Keyword
  // ---------------------------------------------------------------------
  {
    id: "qb-this-1",
    topic: "this Keyword",
    type: "mcq",
    question: "What does the this keyword refer to inside an instance method?",
    options: ["The class itself, as a concept", "The current object the method was called on", "The superclass", "A static helper variable"],
    correctIndex: 1,
    explanation: "this is a reference to the specific object on which the currently-executing method or constructor was invoked.",
  },
  {
    id: "qb-this-2",
    topic: "this Keyword",
    type: "mcq",
    question: "Why is this used in the constructor below?",
    code: { lang: "java", code: `class Student {\n    String name;\n    Student(String name) {\n        this.name = name;\n    }\n}` },
    options: [
      "To call the superclass constructor",
      "To distinguish the instance field from the parameter that shares its name",
      "To create a new object",
      "It's purely decorative — it does nothing here",
    ],
    correctIndex: 1,
    explanation: "The parameter 'name' shadows the field. this.name unambiguously reaches the field, while plain 'name' would refer to the parameter.",
  },
  {
    id: "qb-this-3",
    topic: "this Keyword",
    type: "mcq",
    question: "What does this(...) — written with parentheses — do inside a constructor?",
    options: [
      "Calls a method literally named \"this\"",
      "Calls another constructor of the same class",
      "Calls the superclass's constructor",
      "Refers to the current object's field named this",
    ],
    correctIndex: 1,
    explanation: "this(...) is constructor chaining: it delegates to a different constructor overload defined in the same class.",
  },
  {
    id: "qb-this-4",
    topic: "this Keyword",
    type: "mcq",
    question: "If a constructor uses this(...) to call another constructor, where must that call appear?",
    options: ["Anywhere in the constructor", "As the very last statement", "As the very first statement", "Only inside an if block"],
    correctIndex: 2,
    explanation: "Java requires this(...) (like super(...)) to be the first statement in the constructor body.",
  },
  {
    id: "qb-this-5",
    topic: "this Keyword",
    type: "mcq",
    question: "Can this be used inside a static method?",
    options: [
      "Yes, always",
      "No — a static method has no current object for this to refer to",
      "Only if the class has exactly one instance",
      "Only inside main()",
    ],
    correctIndex: 1,
    explanation: "Static methods belong to the class, not to any object, so there is no \"current object\" for this to point to — using it is a compile error.",
  },
  {
    id: "qb-this-6",
    topic: "this Keyword",
    type: "mcq",
    question: "What does new Box().printSide(9) print?",
    code: {
      lang: "java",
      code: `class Box {
    int side = 5;
    void printSide(int side) {
        System.out.println(side);
        System.out.println(this.side);
    }
}`,
    },
    options: ["5 then 5", "9 then 9", "9 then 5", "5 then 9"],
    correctIndex: 2,
    explanation: "The parameter 'side' shadows the field. Plain side prints the parameter (9); this.side reaches past the shadow to the field (5).",
  },
  {
    id: "qb-this-7",
    topic: "this Keyword",
    type: "mcq",
    question: "Which statement about this is FALSE?",
    options: [
      "this refers to the object on which the current method was called",
      "this can be passed as an argument to another method",
      "this can only be used to access static fields, never instance fields",
      "this cannot be reassigned to point to a different object",
    ],
    correctIndex: 2,
    explanation: "This is backwards — this exists specifically to access the current object's INSTANCE members; it has nothing special to do with static fields.",
  },
  {
    id: "qb-this-8",
    topic: "this Keyword",
    type: "mcq",
    question: "After new Rectangle() runs, what are the values of l and w?",
    code: {
      lang: "java",
      code: `class Rectangle {
    double l, w;
    Rectangle() { this(1, 1); }
    Rectangle(double l, double w) { this.l = l; this.w = w; }
}`,
    },
    options: ["0, 0", "1, 1", "Compilation error", "null, null"],
    correctIndex: 1,
    explanation: "The no-arg constructor delegates via this(1, 1) to the two-arg constructor, which sets both fields to 1.",
  },
  {
    id: "qb-this-9",
    topic: "this Keyword",
    type: "mcq",
    question: "Passing this as an argument to another method or object is typically used to:",
    options: [
      "Delete the current object",
      "Give the other object a reference to the current object, e.g. so it can call back into it later",
      "Convert the object into a String",
      "Create a static copy of the current object",
    ],
    correctIndex: 1,
    explanation: "Handing out 'this' lets another piece of code hold onto and later interact with the exact current object — a common pattern for callbacks/listeners.",
  },
  {
    id: "qb-this-10",
    topic: "this Keyword",
    type: "mcq",
    question: "A constructor is written as Student(String studentName) { name = studentName; } — the parameter name differs from the field name. Is this legal without using this?",
    options: [
      "No, it will not compile",
      "Yes, but this is still required for it to work",
      "Yes — there's no ambiguity here since the names are different, so this isn't needed",
      "It compiles but always assigns null",
    ],
    correctIndex: 2,
    explanation: "this is only needed to resolve a naming CLASH. When the parameter and field have different names, plain assignment is completely unambiguous.",
  },

  // ---------------------------------------------------------------------
  // Inheritance
  // ---------------------------------------------------------------------
  {
    id: "qb-inherit-1",
    topic: "Inheritance",
    type: "mcq",
    question: "Which keyword is used for a class to inherit from another class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    correctIndex: 1,
    explanation: "A class inherits from another using extends; implements is reserved for interfaces.",
  },
  {
    id: "qb-inherit-2",
    topic: "Inheritance",
    type: "mcq",
    question: "Can a Java class extend more than one class directly?",
    options: [
      "Yes, always",
      "No — Java allows only single inheritance for classes",
      "Yes, but only up to two parent classes",
      "Only if both parent classes are abstract",
    ],
    correctIndex: 1,
    explanation: "Java classes support single inheritance only, precisely to avoid the ambiguity of the Diamond Problem.",
  },
  {
    id: "qb-inherit-3",
    topic: "Inheritance",
    type: "mcq",
    question: "What does new Dog().sound() print?",
    code: {
      lang: "java",
      code: `class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    void sound() { System.out.println("Bark"); }
}`,
    },
    options: ["Some sound", "Bark", "Compilation error", "Both are printed"],
    correctIndex: 1,
    explanation: "Dog overrides sound(), so calling it on a Dog object runs Dog's version: \"Bark\".",
  },
  {
    id: "qb-inherit-4",
    topic: "Inheritance",
    type: "mcq",
    question: "What does the super keyword refer to?",
    options: [
      "The current object itself",
      "A member (field, method, or constructor) of the immediate parent class",
      "A static utility class built into Java",
      "The topmost class in Java, Object",
    ],
    correctIndex: 1,
    explanation: "super lets a subclass explicitly reach its immediate superclass's constructor or overridden methods/fields.",
  },
  {
    id: "qb-inherit-5",
    topic: "Inheritance",
    type: "mcq",
    question: "What gets printed by new B()?",
    code: { lang: "java", code: `class A {\n    A() { System.out.println("A constructor"); }\n}\nclass B extends A {\n    B() { System.out.println("B constructor"); }\n}` },
    options: ["\"B constructor\" only", "\"A constructor\" only", "\"A constructor\" then \"B constructor\"", "\"B constructor\" then \"A constructor\""],
    correctIndex: 2,
    explanation: "Java implicitly calls the superclass's no-arg constructor first (as if super() were the first line of B's constructor), so A's constructor runs before B's.",
  },
  {
    id: "qb-inherit-6",
    topic: "Inheritance",
    type: "mcq",
    question: "Which access modifier on a superclass field allows a subclass in a DIFFERENT package to access it directly?",
    options: ["private", "default (no modifier)", "protected", "None of these allow it"],
    correctIndex: 2,
    explanation: "protected is specifically designed to grant access to subclasses, even across package boundaries, while still blocking unrelated classes.",
  },
  {
    id: "qb-inherit-7",
    topic: "Inheritance",
    type: "mcq",
    question: "What kind of relationship does inheritance model between a subclass and its superclass?",
    options: ["has-a", "is-a", "uses-a", "part-of"],
    correctIndex: 1,
    explanation: "Inheritance models \"is-a\" — a SavingsAccount is-a Account, a Dog is-an Animal.",
  },
  {
    id: "qb-inherit-8",
    topic: "Inheritance",
    type: "mcq",
    question: "Why does Java NOT allow a class to extend two classes at once?",
    options: [
      "It would make compilation too slow",
      "To avoid ambiguity when two parents define conflicting members (the Diamond Problem)",
      "Because Java has no concept of a parent class",
      "It actually does allow this",
    ],
    correctIndex: 1,
    explanation: "If two parents both defined a member with the same signature, there'd be no clear rule for which one the subclass inherits — Java sidesteps this entirely.",
  },
  {
    id: "qb-inherit-9",
    topic: "Inheritance",
    type: "mcq",
    question: "What happens here?",
    code: { lang: "java", code: `class Vehicle {\n    protected int speed;\n}\nclass Car extends Vehicle {\n    void show() {\n        System.out.println(speed);\n    }\n}` },
    options: [
      "Compilation error — speed is private to Vehicle",
      "Prints 0 — the inherited protected field defaults to 0 and is accessible directly",
      "Compilation error — must write super.speed",
      "Prints a garbage/undefined value",
    ],
    correctIndex: 1,
    explanation: "protected fields are inherited and can be accessed directly by name in the subclass; like any int field, it defaults to 0 if never set.",
  },
  {
    id: "qb-inherit-10",
    topic: "Inheritance",
    type: "mcq",
    question: "A subclass constructor does not explicitly call super(...), and the superclass has a no-argument constructor available. What happens?",
    options: [
      "Compilation error, always",
      "The compiler automatically inserts a call to the superclass's no-argument constructor",
      "The superclass's fields are simply never initialized",
      "The program compiles but crashes at runtime",
    ],
    correctIndex: 1,
    explanation: "If a constructor doesn't call this(...) or super(...) explicitly, Java inserts an implicit super() call as the first line, as long as the superclass has an accessible no-arg constructor.",
  },

  // ---------------------------------------------------------------------
  // Functions (methods)
  // ---------------------------------------------------------------------
  {
    id: "qb-func-1",
    topic: "Functions",
    type: "mcq",
    question: "What is the correct term for the actual values passed into a method when it is called (as opposed to the variables declared in its signature)?",
    options: ["parameters", "arguments", "return values", "identifiers"],
    correctIndex: 1,
    explanation: "Parameters are the placeholders declared in the method's definition; arguments are the real values supplied at the call site.",
  },
  {
    id: "qb-func-2",
    topic: "Functions",
    type: "mcq",
    question: "A method declared with a non-void return type must:",
    options: [
      "Print its result to the console",
      "Send back a value matching its declared return type, using the return keyword",
      "Always take at least one parameter",
      "Be declared static",
    ],
    correctIndex: 1,
    explanation: "A non-void return type is a promise: the method must produce and return a matching value on every path.",
  },
  {
    id: "qb-func-3",
    topic: "Functions",
    type: "mcq",
    question: "What is method overloading?",
    options: [
      "Redefining a parent class's method in a subclass",
      "Multiple methods in the same class sharing a name but differing in their parameter list",
      "Calling a method from within itself",
      "Marking a method as private",
    ],
    correctIndex: 1,
    explanation: "Overloading is defining several methods with the same name in one class, distinguished by the number or type of their parameters — resolved at compile time.",
  },
  {
    id: "qb-func-4",
    topic: "Functions",
    type: "mcq",
    question: "Given void add(int a, int b) already exists, which of these is a VALID overload of it?",
    options: [
      "void add(int x, int y)",
      "int add(int a, int b)",
      "void add(double a, double b)",
      "void addNumbers(int a, int b)",
    ],
    correctIndex: 2,
    explanation: "Overloading needs a different parameter list. Options A and B have the identical parameter types (int, int) — a duplicate signature, which won't compile regardless of renamed parameters or a different return type. Option D isn't even named 'add', so it isn't an overload of it at all.",
  },
  {
    id: "qb-func-5",
    topic: "Functions",
    type: "mcq",
    question: "What does this print?",
    code: { lang: "java", code: `static int square(int n) { return n * n; }\n\npublic static void main(String[] args) {\n    int result = square(5);\n    System.out.println(result);\n}` },
    options: ["5", "10", "25", "Compilation error"],
    correctIndex: 2,
    explanation: "square(5) returns 5 * 5 = 25.",
  },
  {
    id: "qb-func-6",
    topic: "Functions",
    type: "mcq",
    question: "A method declared void greet() with no return statement inside it will:",
    options: [
      "Cause a compilation error",
      "Return null automatically",
      "Simply run to completion without returning any value",
      "Return 0",
    ],
    correctIndex: 2,
    explanation: "void methods are allowed to have no return statement at all — they just finish executing and control returns to the caller with nothing.",
  },
  {
    id: "qb-func-7",
    topic: "Functions",
    type: "mcq",
    question: "What does \"call by value\" mean when a primitive (like an int) is passed to a method?",
    options: [
      "The method receives a copy of the value — changes inside the method don't affect the caller's variable",
      "The method can directly modify the caller's original variable",
      "Only objects are call-by-value; primitives are call-by-reference",
      "It just means the method call doesn't cost any memory",
    ],
    correctIndex: 0,
    explanation: "Java always passes a copy of the value for primitives; any change to the parameter inside the method is local and never reflected back in the caller.",
  },
  {
    id: "qb-func-8",
    topic: "Functions",
    type: "mcq",
    question: "Which keyword lets a method be called without first creating an object of its class (e.g. Math.max(...))?",
    options: ["final", "static", "public", "void"],
    correctIndex: 1,
    explanation: "static methods belong to the class itself rather than to any instance, so they can be called directly via ClassName.methodName(...).",
  },
  {
    id: "qb-func-9",
    topic: "Functions",
    type: "mcq",
    question: "Both int max(int a, int b) and double max(double a, double b) exist in a class. Which runs for the call max(3, 4)?",
    options: ["The int version", "The double version", "Compilation error — ambiguous call", "Whichever was declared first in the file"],
    correctIndex: 0,
    explanation: "The compiler prefers the exact/closest match for the given argument types — since 3 and 4 are int literals, the int overload is chosen without needing any widening.",
  },
  {
    id: "qb-func-10",
    topic: "Functions",
    type: "mcq",
    question: "What is wrong with the following method?",
    code: { lang: "java", code: `void printSum(int a, int b) {\n    return a + b;\n}` },
    options: [
      "Nothing — this compiles and works fine",
      "A void method cannot use return with a value",
      "Parameters must always be objects, not primitives",
      "Method names are not allowed to start with \"print\"",
    ],
    correctIndex: 1,
    explanation: "A method declared void must not return a value; return a + b; here is a type mismatch and fails to compile.",
  },

  // ---------------------------------------------------------------------
  // Scanner
  // ---------------------------------------------------------------------
  {
    id: "qb-scan-1",
    topic: "Scanner",
    type: "mcq",
    question: "Which package must be imported to use the Scanner class?",
    options: ["java.io", "java.util", "java.lang", "java.scanner"],
    correctIndex: 1,
    explanation: "Scanner lives in java.util, so the program needs import java.util.Scanner;.",
  },
  {
    id: "qb-scan-2",
    topic: "Scanner",
    type: "mcq",
    question: "Which Scanner method reads an entire line of text, including any spaces in it?",
    options: ["next()", "nextLine()", "nextInt()", "read()"],
    correctIndex: 1,
    explanation: "nextLine() reads everything up to (and consuming) the next newline, spaces included; next() stops at the first whitespace.",
  },
  {
    id: "qb-scan-3",
    topic: "Scanner",
    type: "mcq",
    question: "How does sc.next() behave differently from sc.nextLine()?",
    options: [
      "next() reads only a single whitespace-delimited token (one word); nextLine() reads the whole line, spaces included",
      "They behave identically in every situation",
      "next() only works for reading integers",
      "nextLine() can never be used after nextInt()",
    ],
    correctIndex: 0,
    explanation: "next() stops as soon as it hits whitespace, returning just one 'word'; nextLine() keeps reading until the end of the line.",
  },
  {
    id: "qb-scan-4",
    topic: "Scanner",
    type: "mcq",
    question:
      "For input '25' (Enter) then 'Aditi' (Enter), what does this print?",
    code: {
      lang: "java",
      code: `Scanner sc = new Scanner(System.in);
int age = sc.nextInt();
String name = sc.nextLine();
System.out.println("Name: [" + name + "]");`,
    },
    options: ["Name: [Aditi]", "Name: [] (empty)", "Compilation error", "Name: [25Aditi]"],
    correctIndex: 1,
    explanation:
      "nextInt() reads only the digits '25' and leaves the trailing newline character in the input buffer. The very next nextLine() call then reads just that leftover empty remainder, not 'Aditi'.",
  },
  {
    id: "qb-scan-5",
    topic: "Scanner",
    type: "mcq",
    question: "How do you fix the leftover-newline problem from the previous question, so name correctly captures \"Aditi\"?",
    options: [
      "Call an extra sc.nextLine() right after sc.nextInt() to consume the leftover newline, before the real read",
      "Call sc.nextInt() a second time",
      "It cannot be fixed — Scanner is fundamentally broken for this case",
      "Create a brand new Scanner object before every single read",
    ],
    correctIndex: 0,
    explanation: "An extra, discarded sc.nextLine() call consumes exactly the leftover newline, so the following nextLine() correctly reads the next real line of input.",
  },
  {
    id: "qb-scan-6",
    topic: "Scanner",
    type: "mcq",
    question: "Which Scanner method would you use to read a decimal value like 8.75?",
    options: ["nextInt()", "nextDouble()", "next()", "nextLine() only"],
    correctIndex: 1,
    explanation: "nextDouble() parses the next token as a double, which correctly handles decimal values like 8.75.",
  },
  {
    id: "qb-scan-7",
    topic: "Scanner",
    type: "mcq",
    question: "If sc.nextInt() is called but the user types a non-numeric value like \"abc\", what typically happens?",
    options: ["NullPointerException", "InputMismatchException is thrown", "NumberFormatException is thrown", "ArrayIndexOutOfBoundsException"],
    correctIndex: 1,
    explanation: "Scanner's numeric methods (nextInt, nextDouble, etc.) throw InputMismatchException when the next token doesn't match the requested type.",
  },
  {
    id: "qb-scan-8",
    topic: "Scanner",
    type: "mcq",
    question: "Which of these correctly creates a Scanner that reads from the keyboard (standard input)?",
    options: ["new Scanner(System.out)", "new Scanner(System.in)", "new Scanner(Input.in)", "Scanner.create(System.in)"],
    correctIndex: 1,
    explanation: "System.in is the standard input stream; System.out is for output and cannot be scanned from.",
  },
  {
    id: "qb-scan-9",
    topic: "Scanner",
    type: "mcq",
    question: "What does sc.hasNextInt() do?",
    options: [
      "Reads and returns the next integer",
      "Checks (without consuming) whether the next token in the input can be read as an int",
      "Closes the Scanner",
      "Skips over the next integer in the input",
    ],
    correctIndex: 1,
    explanation: "hasNextInt() is a look-ahead check — it reports true/false without actually consuming the token, commonly used to validate input before calling nextInt().",
  },
  {
    id: "qb-scan-10",
    topic: "Scanner",
    type: "mcq",
    question: "Is it good practice to call sc.close() once you're done reading from a Scanner wrapped around System.in?",
    options: [
      "It's optional but generally recommended to release resources — though closing System.in can prevent any further reads later in the same program",
      "It is mandatory, or the program will fail to compile",
      "It automatically restarts the Scanner for reuse",
      "It has no effect whatsoever, ever",
    ],
    correctIndex: 0,
    explanation: "Closing a Scanner over System.in also closes the underlying System.in stream, so do it once, at the very end, if at all — not between reads.",
  },
];
