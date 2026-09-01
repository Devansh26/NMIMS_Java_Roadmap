import type { BankQuestion } from "@/lib/types";

// M1 (10 marks) scope — Theory: Chapter 1 (full) + Chapter 2 (Encapsulation,
// Abstraction, Constructors only) + Conditions. Kept deliberately easy/medium.
export const theoryQuestions: BankQuestion[] = [
  {
    id: "th-1",
    kind: "theory",
    topic: "OOP Basics",
    marks: 5,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Differentiate between Procedural and Object-Oriented Programming. Support your answer with a suitable example.",
    answer: [
      "Procedural: data and functions are separate — functions act on data passed to them from outside (e.g. printStudent(Student s) in C).",
      "OOP: data and the functions that operate on it are bundled together inside an object (e.g. a Student class with its own print() method).",
      "Procedural: data is usually global or freely passed around, so it's easy for any function to corrupt it. OOP: data is encapsulated and only changed through the object's own methods.",
      "Procedural focuses on 'what steps happen' (algorithm-first). OOP focuses on 'what things exist and what they can do' (model-first).",
      "Example languages — Procedural: C, Pascal. OOP: Java, C++, Python.",
    ],
  },
  {
    id: "th-2",
    kind: "theory",
    topic: "OOP Basics",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "List and briefly explain any three benefits of using Object-Oriented Programming.",
    answer: [
      "Modularity — a class is a self-contained unit that can be built, tested, and debugged in isolation.",
      "Reusability — inheritance and composition let you reuse existing classes instead of rewriting logic.",
      "Maintainability — bugs stay localized to the class that owns the misbehaving data, not scattered across many functions.",
      "Real-world mapping — entities like Car, Employee, BankAccount map naturally to classes, making large systems easier to reason about.",
    ],
  },
  {
    id: "th-3",
    kind: "theory",
    topic: "OOP Basics",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "Define Object-Oriented Programming and name its four main pillars.",
    answer: [
      "OOP is a programming paradigm that organizes software design around objects — units that bundle data (fields) with the behaviour (methods) that operates on that data.",
      "The four pillars: Encapsulation, Abstraction, Inheritance, Polymorphism.",
    ],
  },
  {
    id: "th-4",
    kind: "theory",
    topic: "Classes & Objects",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "What is the difference between a class and an object? Illustrate with an example.",
    answer: [
      "A class is a blueprint/template — it defines what fields and methods something will have, but occupies no memory for object data by itself.",
      "An object is a concrete instance of a class, created at runtime with new, with its own copy of the fields.",
      "Example: class Car defines brand and speed. Car car1 = new Car(); and Car car2 = new Car(); are two independent objects built from the same blueprint.",
    ],
  },
  {
    id: "th-5",
    kind: "theory",
    topic: "Classes & Objects",
    marks: 5,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Using a Java code example, explain why two objects of the same class have completely independent copies of their instance variables.",
    promptCode: {
      lang: "java",
      code: `class Car {
    String brand;
    int speed;
}

Car car1 = new Car();
car1.brand = "Tata";
car1.speed = 40;

Car car2 = new Car();
car2.brand = "Kia";
car2.speed = 60;

System.out.println(car1.speed); // ?`,
    },
    answer: [
      "Each call to new allocates a fresh, separate block of memory on the heap for that object's fields — this is a new memory location every time, not a shared one.",
      "car1 and car2 are two different references pointing to two different heap blocks, so changing car2.speed never touches car1's memory.",
      "Output: car1.speed prints 40 — completely unaffected by car2's changes.",
    ],
  },
  {
    id: "th-6",
    kind: "theory",
    topic: "Classes & Objects",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "What happens, step by step, when the statement `Car car1 = new Car();` executes?",
    answer: [
      "1. The JVM allocates heap memory large enough to hold one Car object's fields.",
      "2. Every field is first set to its default value (0, false, or null).",
      "3. The constructor runs and initializes the fields.",
      "4. new Car() evaluates to a reference (address) to that memory, which gets stored in the variable car1.",
    ],
  },
  {
    id: "th-7",
    kind: "theory",
    topic: "Data Types",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Differentiate between primitive data types and reference (object) types in Java, with one example of each.",
    answer: [
      "Primitive types (int, double, char, boolean, byte, short, long, float) store the actual value directly and have no methods.",
      "Reference types (any class, including String, arrays, and user-defined classes) store an address pointing to the real data on the heap, and have methods.",
      "Example: int age = 21; is primitive. String name = \"Aditi\"; is a reference type.",
    ],
  },
  {
    id: "th-8",
    kind: "theory",
    topic: "Data Types",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "Is String a primitive data type in Java? Justify your answer.",
    answer: [
      "No. String is a class defined in java.lang, making it a reference type.",
      "Justification: primitives never have methods, but String objects support methods like .length(), .toUpperCase(), .charAt() — proof it is an object, not a primitive.",
    ],
  },
  {
    id: "th-9",
    kind: "theory",
    topic: "Strings",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Explain why String objects are immutable in Java, and state the output of the following code with reasoning.",
    promptCode: {
      lang: "java",
      code: `String s = "hello";
s.concat(" world");
System.out.println(s);`,
    },
    answer: [
      "A String is immutable: once created, its character sequence can never change. Every method that looks like it modifies a String (concat, toUpperCase, replace) actually builds and returns a brand-new String object, leaving the original untouched.",
      "Here, s.concat(\" world\") creates a new String \"hello world\" — but it is never assigned back to s, so it is discarded.",
      "Output: hello",
    ],
  },
  {
    id: "th-10",
    kind: "theory",
    topic: "Strings",
    marks: 5,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Differentiate between String, StringBuilder, and StringBuffer. In what situation would you prefer StringBuilder over String?",
    answer: [
      "String: immutable, so every 'edit' creates a new object; simplest to use but slow if changed repeatedly.",
      "StringBuilder: mutable, fastest, but not thread-safe (its methods are not synchronized).",
      "StringBuffer: mutable like StringBuilder, but thread-safe because its methods are synchronized — which makes it slower than StringBuilder in a single-threaded program.",
      "Prefer StringBuilder when building or editing text repeatedly in a loop (e.g. concatenating inside a for loop) — using String there would silently create hundreds of throwaway objects, which is quietly quadratic in cost.",
    ],
  },
  {
    id: "th-11",
    kind: "theory",
    topic: "Arrays & Vectors",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "What is the key difference between an Array and a Vector in Java?",
    answer: [
      "An array has a fixed size decided at creation — it can never grow or shrink.",
      "A Vector is dynamically resizable — it automatically grows and shrinks as elements are added or removed, at the cost of some overhead compared to a plain array.",
    ],
  },
  {
    id: "th-12",
    kind: "theory",
    topic: "Arrays & Vectors",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "State the default value stored in every element of `int[] a = new int[5];` before any assignment. What about `boolean[] b = new boolean[5];`?",
    answer: [
      "Java always initializes array elements to their type's default value.",
      "int[] a → every element defaults to 0.",
      "boolean[] b → every element defaults to false.",
    ],
  },
  {
    id: "th-13",
    kind: "theory",
    topic: "Operators",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "Differentiate between the pre-increment (++x) and post-increment (x++) operators with an example.",
    answer: [
      "Post-increment (x++) returns the OLD value first, then increments x.",
      "Pre-increment (++x) increments x FIRST, then returns the new value.",
      "Example: int x = 5; int y = x++; → y is 5, x becomes 6. int x = 5; int y = ++x; → y is 6, x becomes 6.",
    ],
  },
  {
    id: "th-14",
    kind: "theory",
    topic: "Operators",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt: "Evaluate the following code step by step and state the final value of y.",
    promptCode: { lang: "java", code: "int x = 5;\nint y = x++ + ++x;" },
    answer: [
      "x++ evaluates to the current value of x, which is 5, then x becomes 6.",
      "++x increments x first: x becomes 7, and the expression evaluates to 7.",
      "y = 5 + 7 = 12.",
    ],
  },
  {
    id: "th-15",
    kind: "theory",
    topic: "Conditions",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "Differentiate between an if-else-if ladder and a switch statement. When would you prefer one over the other?",
    answer: [
      "if-else-if evaluates boolean conditions (can be ranges, complex expressions, multiple variables) — flexible but can get long.",
      "switch compares one variable against a fixed set of constant values (int, char, String, enum) — cleaner and more readable when checking a single variable against many discrete options.",
      "Prefer switch for menu-driven programs or fixed discrete choices (e.g. day number → day name); prefer if-else-if for range checks or conditions involving multiple variables (e.g. grading based on a mark range).",
    ],
  },
  {
    id: "th-16",
    kind: "theory",
    topic: "Conditions",
    marks: 5,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Write the general syntax of an if-else-if ladder and explain its execution flow using a grading-system example (marks to grade).",
    promptCode: {
      lang: "java",
      code: `int marks = 76;

if (marks >= 90) {
    System.out.println("A+");
} else if (marks >= 75) {
    System.out.println("A");
} else if (marks >= 60) {
    System.out.println("B");
} else {
    System.out.println("Needs improvement");
}`,
    },
    answer: [
      "Execution flow: conditions are tested top to bottom. As soon as one condition evaluates to true, its block runs and the REST of the ladder is skipped entirely — even if a later condition would also be true.",
      "In the example, marks = 76 fails the first check (>= 90), passes the second (>= 75), so \"A\" is printed and the remaining else-if/else branches are never evaluated.",
    ],
  },
  {
    id: "th-17",
    kind: "theory",
    topic: "Conditions",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "What is the purpose of the `default` case in a switch statement?",
    answer: [
      "default runs when none of the specified case values match the switch expression — it acts as a catch-all fallback, similar to the final else in an if-else-if ladder.",
      "It is optional, but including it is good practice to handle unexpected/invalid input gracefully.",
    ],
  },
  {
    id: "th-18",
    kind: "theory",
    topic: "Loops",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Differentiate between a while loop and a do-while loop. Give one real-life scenario where do-while is more appropriate.",
    answer: [
      "while checks the condition BEFORE running the body — if the condition is false initially, the body never runs.",
      "do-while checks the condition AFTER running the body — the body always runs at least once, even if the condition starts false.",
      "Scenario: showing a menu to a user. You must display the menu at least once before you can even check whether they want to exit, which is exactly what do-while guarantees.",
    ],
  },
  {
    id: "th-19",
    kind: "theory",
    topic: "Loops",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "What is the difference between the break and continue statements inside a loop?",
    answer: [
      "break exits the loop immediately and completely — control jumps to the first statement after the loop.",
      "continue skips only the rest of the CURRENT iteration and moves on to the next iteration of the loop.",
    ],
  },
  {
    id: "th-20",
    kind: "theory",
    topic: "Encapsulation",
    marks: 5,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Define Encapsulation. Using a Java code example, explain how private fields together with public getter/setter methods achieve it.",
    promptCode: {
      lang: "java",
      code: `class BankAccount {
    private double balance;

    public BankAccount(double openingBalance) {
        if (openingBalance < 0) throw new IllegalArgumentException("Cannot open with negative balance");
        this.balance = openingBalance;
    }

    public double getBalance() { return balance; }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
        balance -= amount;
    }
}`,
    },
    answer: [
      "Encapsulation is the practice of bundling an object's data with the methods that operate on it, and restricting direct access to that data from outside the class — implemented in Java using access modifiers.",
      "Here, balance is private, so no outside code can write acc.balance = -500 directly.",
      "The only way to change balance is through withdraw(), which enforces the rule 'cannot withdraw more than the balance' every single time — the class guards its own data instead of trusting outside code to behave.",
    ],
  },
  {
    id: "th-21",
    kind: "theory",
    topic: "Encapsulation",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "\"A class with private fields and a public getter/setter for every field, but no validation logic, is weak encapsulation.\" Justify this statement.",
    answer: [
      "Making fields private only hides the data — it does not, by itself, protect the object's invariants.",
      "If every setter blindly assigns whatever value it is given (setBalance(double b) { this.balance = b; }), any invalid value (e.g. a negative balance) can still be set from outside — the class provides no real safety.",
      "True encapsulation requires the setters/methods to validate input and enforce rules, not just hide fields behind syntax.",
    ],
  },
  {
    id: "th-22",
    kind: "theory",
    topic: "Abstraction",
    marks: 5,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "Define Abstraction. How is it different from Encapsulation? Explain with an example.",
    answer: [
      "Abstraction means exposing only the essential features of an object while hiding the internal implementation details — the user of a class should be able to use it without knowing HOW it works internally.",
      "Difference: Encapsulation hides DATA (access control, via private fields). Abstraction hides implementation COMPLEXITY (detail hiding, via a simple contract/interface).",
      "Example: calling Collections.sort(list) — you trust it sorts correctly without ever seeing the underlying sorting algorithm. That hidden complexity is abstraction.",
    ],
  },
  {
    id: "th-23",
    kind: "theory",
    topic: "Abstraction",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Give one real-world analogy to explain abstraction, and clearly identify what is exposed and what remains hidden.",
    answer: [
      "Analogy: Driving a car. You press the accelerator pedal to speed up.",
      "Exposed (the abstraction): the simple pedal interface — press to go faster.",
      "Hidden (the implementation): fuel injection timing, spark plugs, the combustion cycle — complexity the driver never needs to know about to use the car correctly.",
    ],
  },
  {
    id: "th-24",
    kind: "theory",
    topic: "Constructors",
    marks: 5,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "What is a constructor? Explain the difference between a default constructor and a parameterized constructor with a Java example.",
    promptCode: {
      lang: "java",
      code: `class Employee {
    String name;
    double salary;

    Employee() {                          // default (no-argument) constructor
        name = "Unknown";
        salary = 0;
    }

    Employee(String name, double salary) { // parameterized constructor
        this.name = name;
        this.salary = salary;
    }
}`,
    },
    answer: [
      "A constructor is a special method that runs automatically when an object is created with new, and initializes the object's fields into a valid starting state. It shares the class's name and has no return type.",
      "A default (no-argument) constructor takes no parameters and typically sets fields to fixed/default values.",
      "A parameterized constructor accepts arguments so the caller can supply initial values at the moment of creation.",
      "Example: new Employee() uses the default constructor → \"Unknown\", 0. new Employee(\"Rohan\", 55000) uses the parameterized one.",
    ],
  },
  {
    id: "th-25",
    kind: "theory",
    topic: "Constructors",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "A class defines only `Employee(String name, double salary) { ... }` and no other constructor. What happens when code tries `new Employee();`? Explain why.",
    answer: [
      "This is a compilation error — no matching constructor found.",
      "Java only auto-generates a free no-argument constructor if the class defines ZERO constructors itself. The moment any constructor is written explicitly, that free default disappears, and new Employee() no longer compiles unless a no-arg constructor is also written explicitly.",
    ],
  },
  {
    id: "th-26",
    kind: "theory",
    topic: "Constructors",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt: "What is constructor overloading? How is it different from constructor chaining using this(...)?",
    answer: [
      "Constructor overloading: a class has multiple constructors with the same name but different parameter lists (differing in number or type of parameters) — the compiler picks the right one based on the arguments supplied.",
      "Constructor chaining with this(...): one constructor calls another constructor of the SAME class as its first statement, to reuse initialization logic instead of duplicating it.",
      "They work together — overloading provides the multiple constructors, and this(...) lets the simpler ones delegate to a more complete one.",
    ],
  },
];

// M1 (10 marks) scope — Lab: Scanner, conditions, all datatypes, and plain
// functions/variables only (no classes/objects yet — that starts after M1).
export const labQuestions: BankQuestion[] = [
  {
    id: "lab-1",
    kind: "lab",
    topic: "Scanner & Datatypes",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Write a Java program that reads your name (String), age (int), and CGPA (double) using Scanner, and prints them in one formatted sentence.",
    sampleIO: "Enter name: Aditi\nEnter age: 20\nEnter CGPA: 8.7\n→ Aditi is 20 years old with a CGPA of 8.7",
    answer: [
      "Create one Scanner object for System.in and reuse it for every read.",
      "Use sc.nextLine() for the String, sc.nextInt() for the int, and sc.nextDouble() for the double — read in the same order you prompt.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.print("Enter CGPA: ");
        double cgpa = sc.nextDouble();

        System.out.println(name + " is " + age + " years old with a CGPA of " + cgpa);
    }
}`,
    },
  },
  {
    id: "lab-2",
    kind: "lab",
    topic: "Datatypes",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Write a Java program that declares one variable of each primitive data type (byte, short, int, long, float, double, char, boolean), assigns a sensible value to each, and prints all of them.",
    answer: [
      "Remember the literal suffixes: L for long (100L), f for float (5.5f) — otherwise Java treats them as int/double by default and refuses to compile.",
      "char values are written in single quotes ('A'), not double quotes.",
    ],
    solutionCode: {
      lang: "java",
      code: `public class Main {
    public static void main(String[] args) {
        byte b = 10;
        short s = 200;
        int i = 50000;
        long l = 10000000000L;
        float f = 5.5f;
        double d = 19.99;
        char c = 'A';
        boolean flag = true;

        System.out.println("byte: " + b);
        System.out.println("short: " + s);
        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("float: " + f);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("boolean: " + flag);
    }
}`,
    },
  },
  {
    id: "lab-3",
    kind: "lab",
    topic: "Scanner & Conditions",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "Write a program that reads two integers using Scanner and prints the larger of the two.",
    sampleIO: "Enter first number: 12\nEnter second number: 27\n→ Larger number: 27",
    answer: ["Read both integers first, then compare with a single if-else — no need for a third variable."],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter first number: ");
        int a = sc.nextInt();
        System.out.print("Enter second number: ");
        int b = sc.nextInt();

        if (a > b) {
            System.out.println("Larger number: " + a);
        } else {
            System.out.println("Larger number: " + b);
        }
    }
}`,
    },
  },
  {
    id: "lab-4",
    kind: "lab",
    topic: "Conditions",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "Write a program to read three integers using Scanner and print the largest among them using if-else.",
    answer: [
      "Compare the first two, then compare the winner against the third — avoids writing every pairwise combination.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();

        int largest;
        if (a >= b && a >= c) {
            largest = a;
        } else if (b >= a && b >= c) {
            largest = b;
        } else {
            largest = c;
        }

        System.out.println("Largest: " + largest);
    }
}`,
    },
  },
  {
    id: "lab-5",
    kind: "lab",
    topic: "Conditions",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt: "Write a program to check whether a number entered by the user is even or odd.",
    answer: ["Use the modulus operator: n % 2 == 0 means even."],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        if (n % 2 == 0) {
            System.out.println(n + " is Even");
        } else {
            System.out.println(n + " is Odd");
        }
    }
}`,
    },
  },
  {
    id: "lab-6",
    kind: "lab",
    topic: "Conditions",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt: "Write a program to check whether a given year is a leap year.",
    answer: [
      "A year is a leap year if it is divisible by 4, AND (not divisible by 100 OR divisible by 400).",
      "Watch operator precedence — combine the conditions with parentheses so && and || group correctly.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a year: ");
        int year = sc.nextInt();

        boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);

        if (isLeap) {
            System.out.println(year + " is a leap year");
        } else {
            System.out.println(year + " is not a leap year");
        }
    }
}`,
    },
  },
  {
    id: "lab-7",
    kind: "lab",
    topic: "Conditions (switch)",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Write a program that reads a number from 1 to 7 and prints the corresponding day of the week, using a switch statement.",
    answer: ["Include a default case to handle any number outside the 1–7 range gracefully."],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number (1-7): ");
        int day = sc.nextInt();

        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            case 4: System.out.println("Thursday"); break;
            case 5: System.out.println("Friday"); break;
            case 6: System.out.println("Saturday"); break;
            case 7: System.out.println("Sunday"); break;
            default: System.out.println("Invalid input");
        }
    }
}`,
    },
  },
  {
    id: "lab-8",
    kind: "lab",
    topic: "Conditions",
    marks: 5,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Write a simple calculator program: read two numbers and an operator (+, -, *, /) from the user, and print the result. Handle division by zero.",
    answer: [
      "Read the operator as a char (or single-character String) and branch with switch or if-else.",
      "Check the denominator before dividing — print a message instead of letting it crash.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter first number: ");
        double a = sc.nextDouble();
        System.out.print("Enter second number: ");
        double b = sc.nextDouble();
        System.out.print("Enter operator (+, -, *, /): ");
        char op = sc.next().charAt(0);

        double result = 0;
        boolean valid = true;

        switch (op) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/':
                if (b == 0) {
                    System.out.println("Error: division by zero");
                    valid = false;
                } else {
                    result = a / b;
                }
                break;
            default:
                System.out.println("Invalid operator");
                valid = false;
        }

        if (valid) System.out.println("Result: " + result);
    }
}`,
    },
  },
  {
    id: "lab-9",
    kind: "lab",
    topic: "Functions & Variables",
    marks: 3,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Write a program with a method `int square(int n)` that returns the square of a number. Call it from main using a Scanner-read value.",
    answer: [
      "A method with a non-void return type must use return to send a value back to the caller.",
      "square() can be declared static so it can be called directly from main without creating an object.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    static int square(int n) {
        return n * n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        System.out.println("Square: " + square(n));
    }
}`,
    },
  },
  {
    id: "lab-10",
    kind: "lab",
    topic: "Functions & Variables",
    marks: 5,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Write a program with a method `boolean isPrime(int n)` that checks whether a number is prime. Call it from main for a Scanner-read number.",
    answer: [
      "A number is prime if it is greater than 1 and has no divisors other than 1 and itself.",
      "Loop from 2 up to n/2 (or up to sqrt(n) for efficiency) — if any of those divides n exactly, it isn't prime.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i <= n / 2; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        if (isPrime(n)) {
            System.out.println(n + " is Prime");
        } else {
            System.out.println(n + " is Not Prime");
        }
    }
}`,
    },
  },
  {
    id: "lab-11",
    kind: "lab",
    topic: "Functions & Variables",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Write a program with a method `long factorial(int n)` that uses a loop to compute the factorial of a number, called from main.",
    answer: [
      "Use long (not int) for the result — factorials grow very fast and overflow int quickly (e.g. 13! already exceeds int's range).",
      "0! and 1! are both defined as 1 — handle that as the loop's starting accumulator value.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    static long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        System.out.println(n + "! = " + factorial(n));
    }
}`,
    },
  },
  {
    id: "lab-12",
    kind: "lab",
    topic: "Functions & Variables",
    marks: 2,
    difficulty: "Easy",
    exam: ["M1"],
    prompt:
      "Write a program demonstrating the difference between a method with a return type and a void method — one method that adds two numbers and returns the sum, and one that just prints a greeting.",
    answer: [
      "A void method performs an action but sends nothing back — it is called as a standalone statement.",
      "A method with a return type must produce a value via return, which the caller can store in a variable or use directly (e.g. inside println).",
    ],
    solutionCode: {
      lang: "java",
      code: `public class Main {
    static int add(int a, int b) {
        return a + b;   // returns a value
    }

    static void printGreeting() {
        System.out.println("Hello, welcome to Java!"); // no return value
    }

    public static void main(String[] args) {
        printGreeting();               // called as a statement
        int sum = add(4, 7);           // return value captured in a variable
        System.out.println("Sum: " + sum);
    }
}`,
    },
  },
  {
    id: "lab-13",
    kind: "lab",
    topic: "Conditions + Functions",
    marks: 5,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Write a program with a method `char getGrade(int marks)` that returns a grade (A/B/C/D/F) based on marks entered via Scanner.",
    answer: [
      "Order the if-else-if checks from highest threshold to lowest — once one condition matches, the rest are skipped automatically.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    static char getGrade(int marks) {
        if (marks >= 90) return 'A';
        else if (marks >= 75) return 'B';
        else if (marks >= 60) return 'C';
        else if (marks >= 40) return 'D';
        else return 'F';
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter marks: ");
        int marks = sc.nextInt();
        System.out.println("Grade: " + getGrade(marks));
    }
}`,
    },
  },
  {
    id: "lab-14",
    kind: "lab",
    topic: "Datatypes",
    marks: 3,
    difficulty: "Medium",
    exam: ["M1"],
    prompt:
      "Write a program to demonstrate implicit and explicit type casting in Java (e.g. int to double, and double to int), and print the results.",
    answer: [
      "Implicit (widening) casting happens automatically when going from a smaller type to a larger one — int to double loses no information.",
      "Explicit (narrowing) casting requires you to write the target type in parentheses, e.g. (int) d — and it truncates the decimal part, it does not round.",
    ],
    solutionCode: {
      lang: "java",
      code: `public class Main {
    public static void main(String[] args) {
        int i = 10;
        double d = i;          // implicit widening: int -> double
        System.out.println("Implicit int to double: " + d);

        double pi = 3.99;
        int truncated = (int) pi;   // explicit narrowing: double -> int
        System.out.println("Explicit double to int: " + truncated); // 3, not 4 — truncated, not rounded
    }
}`,
    },
  },
];
