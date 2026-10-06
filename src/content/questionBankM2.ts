import type { BankQuestion } from "@/lib/types";

// M2 (10 marks) scope — Theory only (Lab to follow):
// Strings, Inheritance, Abstraction (abstract classes + interfaces),
// Polymorphism, Casting. Sized to the Test-I/II paper format: 2-mark short
// bits and 3-mark descriptive questions. All code-trace answers were
// verified by compiling and running the snippets.
export const theoryQuestionsM2: BankQuestion[] = [
  // ---------------------------------------------------------------------
  // Strings
  // ---------------------------------------------------------------------
  {
    id: "m2-th-1",
    kind: "theory",
    topic: "Strings",
    marks: 2,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Differentiate between `==` and `.equals()` when comparing two Strings.",
    answer: [
      "`==` compares references — it is true only if both variables point to the exact same object in memory.",
      "`.equals()` compares the actual character content of the two Strings.",
      "Example: `new String(\"hi\") == new String(\"hi\")` is false (two separate objects), but `new String(\"hi\").equals(new String(\"hi\"))` is true.",
    ],
  },
  {
    id: "m2-th-2",
    kind: "theory",
    topic: "Strings",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "State the output of the following code and explain the result of each comparison.",
    promptCode: {
      lang: "java",
      code: `String s1 = "java";
String s2 = "java";
String s3 = new String("java");

System.out.println(s1 == s2);
System.out.println(s1 == s3);
System.out.println(s1.equals(s3));`,
    },
    answer: [
      "Output: true, false, true (one per line).",
      "s1 == s2 is true: identical string literals share a single object in the String Pool, so both variables hold the same reference.",
      "s1 == s3 is false: `new String(\"java\")` always creates a separate object on the heap, even though its content is identical.",
      "s1.equals(s3) is true: equals() compares content, not references.",
    ],
  },
  {
    id: "m2-th-3",
    kind: "theory",
    topic: "Strings",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "For the String declared below, state the value returned by each of the four calls.",
    promptCode: {
      lang: "java",
      code: `String s = "programming";

// (a) s.length()
// (b) s.charAt(4)
// (c) s.substring(3, 7)
// (d) s.indexOf('m')`,
    },
    answer: [
      "(a) 11 — the number of characters.",
      "(b) 'r' — indexing starts at 0, so index 4 is the fifth character (p-r-o-g-r).",
      "(c) \"gram\" — substring(start, end) includes the start index but excludes the end index (indices 3 to 6).",
      "(d) 6 — indexOf returns the index of the FIRST occurrence of the character.",
    ],
  },
  {
    id: "m2-th-4",
    kind: "theory",
    topic: "Strings",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "Trace the following code step by step and state what is printed. Why is the result not \"HELLO WORLD23\"?",
    promptCode: {
      lang: "java",
      code: `String s = "Hello";
s.concat(" World");
s = s.toUpperCase();
s = s + 2 + 3;
System.out.println(s);`,
    },
    answer: [
      "Output: HELLO23",
      "Strings are immutable: `s.concat(\" World\")` builds a new String but its result is never assigned back, so it is discarded and s is still \"Hello\".",
      "`s = s.toUpperCase();` is assigned back, so s becomes \"HELLO\".",
      "`s + 2 + 3` evaluates left to right as String concatenation: \"HELLO\" + 2 gives \"HELLO2\", then + 3 gives \"HELLO23\".",
    ],
  },
  {
    id: "m2-th-5",
    kind: "theory",
    topic: "Strings",
    marks: 2,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "What does `System.out.println(1 + 2 + \"3\" + 4 + 5);` print? Explain how the result is obtained.",
    answer: [
      "Output: 3345",
      "The expression is evaluated left to right. 1 + 2 are both ints, so they are added: 3.",
      "3 + \"3\" involves a String, so + becomes concatenation: \"33\". After that, every remaining + is also concatenation: \"334\", then \"3345\".",
    ],
  },
  {
    id: "m2-th-6",
    kind: "theory",
    topic: "Strings",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "Trace the following StringBuffer code and state the final output. Show the value after each step.",
    promptCode: {
      lang: "java",
      code: `StringBuffer sb = new StringBuffer("OOP");
sb.append(" rocks");
sb.insert(0, "Java ");
sb.delete(5, 9);
System.out.println(sb);`,
    },
    answer: [
      "After append: \"OOP rocks\".",
      "After insert(0, \"Java \"): \"Java OOP rocks\".",
      "After delete(5, 9): removes the characters at indices 5 to 8 (\"OOP \"), leaving \"Java rocks\".",
      "Output: Java rocks. Unlike String, StringBuffer is mutable, so all three calls modified the same object in place.",
    ],
  },

  // ---------------------------------------------------------------------
  // Inheritance
  // ---------------------------------------------------------------------
  {
    id: "m2-th-7",
    kind: "theory",
    topic: "Inheritance",
    marks: 2,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Define inheritance. Name the keyword used in Java and the terms used for the two classes involved.",
    answer: [
      "Inheritance is the mechanism by which a new class acquires the fields and methods of an existing class, modelling an is-a relationship and promoting code reuse.",
      "Keyword: `extends`.",
      "The existing class is the superclass (parent / base class); the new class is the subclass (child / derived class).",
    ],
  },
  {
    id: "m2-th-8",
    kind: "theory",
    topic: "Inheritance",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Explain the three uses of the `super` keyword with a short Java example.",
    answer: [
      "`super(...)` calls a constructor of the immediate superclass; it must be the first statement in the subclass constructor.",
      "`super.method()` calls the superclass's version of a method that the subclass has overridden.",
      "`super.field` accesses a superclass field that is hidden by a subclass field of the same name.",
    ],
    solutionCode: {
      lang: "java",
      code: `class Person {
    String name;
    Person(String name) { this.name = name; }
    void greet() { System.out.println("Hello, " + name); }
}

class Student extends Person {
    int roll;

    Student(String name, int roll) {
        super(name);                 // 1. parent constructor
        this.roll = roll;
    }

    void greet() {
        super.greet();               // 2. parent's version of greet()
        System.out.println("Parent's name field: " + super.name);  // 3. parent field
        System.out.println("Roll no: " + roll);
    }
}`,
    },
  },
  {
    id: "m2-th-9",
    kind: "theory",
    topic: "Inheritance",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Why does Java not allow a class to extend two classes? How can a class still inherit behaviour from more than one source?",
    answer: [
      "Multiple class inheritance causes the Diamond Problem: if two parents both define a method with the same signature, the compiler has no rule for which version the child should inherit — the call becomes ambiguous.",
      "Java avoids this for classes by allowing only single inheritance (one `extends`).",
      "A class can still gain behaviour from several sources by implementing multiple interfaces (`implements A, B`), since interfaces declare contracts rather than carrying conflicting state.",
    ],
  },
  {
    id: "m2-th-10",
    kind: "theory",
    topic: "Inheritance",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "State the output of the following code and explain the order in which the constructors run.",
    promptCode: {
      lang: "java",
      code: `class A { A() { System.out.println("A"); } }
class B extends A { B() { System.out.println("B"); } }
class C extends B { C() { System.out.println("C"); } }

// in main:
new C();`,
    },
    answer: [
      "Output: A, B, C (one per line).",
      "When an object of C is created, C's constructor begins by calling its superclass constructor — Java inserts an implicit `super()` as the first statement if you do not write one.",
      "That chain climbs to the top: A's constructor finishes first, then B's, and C's body runs last. Constructors always run from the top of the hierarchy down.",
    ],
  },
  {
    id: "m2-th-11",
    kind: "theory",
    topic: "Inheritance",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Name the types of inheritance Java supports through classes and give a one-line example of each.",
    answer: [
      "Single: one subclass extends one superclass — `class B extends A`.",
      "Multilevel: a chain of inheritance — `class C extends B`, where B itself extends A.",
      "Hierarchical: several subclasses extend the same superclass — `class B extends A` and `class C extends A`.",
      "Multiple inheritance is not supported with classes; it is achieved only through interfaces.",
    ],
  },
  {
    id: "m2-th-12",
    kind: "theory",
    topic: "Inheritance",
    marks: 2,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Can a subclass directly access the private members of its superclass? How can it still work with them?",
    answer: [
      "No. Private members are accessible only inside the class that declares them, even though they are part of every subclass object.",
      "The subclass can reach them indirectly through public or protected getter/setter methods of the superclass — or the superclass can declare the member `protected` so subclasses may access it directly.",
    ],
  },
  {
    id: "m2-th-13",
    kind: "theory",
    topic: "Inheritance",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Differentiate between inheritance (is-a) and composition (has-a) with one example of each. When would you prefer composition?",
    answer: [
      "Inheritance (is-a): a subclass is a specialised kind of its superclass — `class SavingsAccount extends Account`.",
      "Composition (has-a): a class holds an object of another class as a field — `class Car { private Engine engine; }`. A Car has an Engine; it is not an Engine.",
      "Prefer composition when the relationship is really \"has-a\" rather than \"is-a\", because inheritance used only for code reuse creates tight coupling and fragile hierarchies. Composition keeps classes loosely coupled and easy to change.",
    ],
  },

  // ---------------------------------------------------------------------
  // Abstraction (abstract classes + interfaces)
  // ---------------------------------------------------------------------
  {
    id: "m2-th-14",
    kind: "theory",
    topic: "Abstraction",
    marks: 2,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "What is an abstract class? Can an object of an abstract class be created?",
    answer: [
      "An abstract class is a class declared with the `abstract` keyword. It may contain abstract methods (no body) as well as ordinary, fully implemented methods, and it acts as an incomplete base class for its subclasses.",
      "No — `new Shape()` for an abstract class Shape is a compile-time error. However, a reference of the abstract type can hold an object of a concrete subclass: `Shape s = new Circle();`.",
    ],
  },
  {
    id: "m2-th-15",
    kind: "theory",
    topic: "Abstraction",
    marks: 2,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "What is an abstract method? State two rules that apply to it.",
    answer: [
      "An abstract method is declared with the `abstract` keyword and has no body — only a signature ending in a semicolon, e.g. `abstract double area();`.",
      "Rule 1: a class that contains an abstract method must itself be declared abstract.",
      "Rule 2: the first concrete (non-abstract) subclass must override and implement every inherited abstract method.",
    ],
  },
  {
    id: "m2-th-16",
    kind: "theory",
    topic: "Abstraction",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "Differentiate between an abstract class and an interface (any three points).",
    answer: [
      "Methods: an abstract class can mix abstract and fully implemented methods; interface methods are abstract by default (Java 8+ also allows `default` and `static` methods).",
      "Variables: an abstract class can have ordinary instance variables; interface variables are implicitly `public static final` constants.",
      "Constructors: an abstract class can have constructors; an interface cannot.",
      "Inheritance: a class can extend only one abstract class but can implement many interfaces.",
      "Typical use: abstract class when subclasses share state and code; interface to define a capability or contract that unrelated classes can promise to provide.",
    ],
  },
  {
    id: "m2-th-17",
    kind: "theory",
    topic: "Abstraction",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "State the output of the following code. Why would `new Shape()` not compile, and how does this code demonstrate abstraction?",
    promptCode: {
      lang: "java",
      code: `abstract class Shape {
    abstract double area();
    void show() { System.out.println("Area = " + area()); }
}

class Square extends Shape {
    double side = 4;
    double area() { return side * side; }
}

// in main:
Shape s = new Square();
s.show();`,
    },
    answer: [
      "Output: Area = 16.0",
      "`new Shape()` does not compile because Shape is abstract and incomplete — area() has no body, so there would be nothing to run.",
      "Abstraction: show() is written once in Shape and relies only on the contract `area()`. It never knows HOW the area is computed — Square supplies the formula. The caller only deals with the Shape reference.",
    ],
  },
  {
    id: "m2-th-18",
    kind: "theory",
    topic: "Abstraction",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Explain, with a Java example, how interfaces allow a class to take on behaviour from more than one source.",
    answer: [
      "A class can implement any number of interfaces, listed after `implements` and separated by commas.",
      "Each interface declares a contract; the class must provide a public implementation of every method from all of them.",
      "In the example, Duck is both Flyable and Swimmable. This works safely because interfaces carry no conflicting state, unlike multiple class inheritance.",
    ],
    solutionCode: {
      lang: "java",
      code: `interface Flyable  { void fly(); }
interface Swimmable { void swim(); }

class Duck implements Flyable, Swimmable {
    public void fly()  { System.out.println("Duck flies"); }
    public void swim() { System.out.println("Duck swims"); }
}`,
    },
  },
  {
    id: "m2-th-19",
    kind: "theory",
    topic: "Abstraction",
    marks: 2,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "A concrete subclass extends an abstract class but implements only some of its abstract methods. What happens? How can it be fixed?",
    answer: [
      "Compilation error — a non-abstract class must implement every abstract method it inherits.",
      "Fix 1: implement all the remaining abstract methods in the subclass.",
      "Fix 2: declare the subclass itself `abstract`, leaving the remaining methods for its own subclasses to implement.",
    ],
  },
  {
    id: "m2-th-20",
    kind: "theory",
    topic: "Abstraction",
    marks: 2,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "Can an abstract class have a constructor? If yes, when does it run and why is it useful?",
    answer: [
      "Yes. An abstract class cannot be instantiated directly, but its constructor still runs whenever a subclass object is created, via the subclass's implicit or explicit `super(...)` call.",
      "It is used to initialize the fields that are common to all subclasses, so that code is written once in the base class.",
    ],
  },

  // ---------------------------------------------------------------------
  // Polymorphism
  // ---------------------------------------------------------------------
  {
    id: "m2-th-21",
    kind: "theory",
    topic: "Polymorphism",
    marks: 2,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Define polymorphism. Name its two types in Java and the mechanism behind each.",
    answer: [
      "Polymorphism (\"many forms\") means the same method name or the same reference type can produce different behaviour depending on context.",
      "Compile-time (static) polymorphism — achieved through method overloading.",
      "Run-time (dynamic) polymorphism — achieved through method overriding.",
    ],
  },
  {
    id: "m2-th-22",
    kind: "theory",
    topic: "Polymorphism",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Differentiate between method overloading and method overriding (any three points).",
    answer: [
      "Where: overloading happens within one class (or between a class and its subclass adding variants); overriding needs a superclass–subclass relationship.",
      "Signature: overloaded methods must differ in their parameter list; an overriding method must have the identical signature.",
      "Resolved: overloading is resolved by the compiler at compile time (static binding); overriding is resolved by the JVM at run time based on the actual object (dynamic binding).",
      "Return type: may differ freely for overloading; must be the same (or a covariant subtype) for overriding.",
    ],
  },
  {
    id: "m2-th-23",
    kind: "theory",
    topic: "Polymorphism",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "State the output of the following code and name the concept it demonstrates.",
    promptCode: {
      lang: "java",
      code: `class Animal { void sound() { System.out.println("Some sound"); } }
class Cat extends Animal { void sound() { System.out.println("Meow"); } }
class Cow extends Animal { void sound() { System.out.println("Moo"); } }

// in main:
Animal[] zoo = { new Cat(), new Cow(), new Animal() };
for (Animal a : zoo) {
    a.sound();
}`,
    },
    answer: [
      "Output: Meow, Moo, Some sound (one per line).",
      "Every element is declared as Animal, but the version of sound() that runs is chosen by the ACTUAL object at run time, not the reference type.",
      "This is run-time polymorphism (dynamic method dispatch) through method overriding — one loop treats all the animals uniformly while each behaves in its own way.",
    ],
  },
  {
    id: "m2-th-24",
    kind: "theory",
    topic: "Polymorphism",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "State the output of the four calls below and explain how the compiler picks each overloaded method.",
    promptCode: {
      lang: "java",
      code: `class Printer {
    void print(int x)    { System.out.println("int"); }
    void print(double x) { System.out.println("double"); }
    void print(String x) { System.out.println("String"); }
}

// in main:
Printer p = new Printer();
p.print(5);
p.print(5.0);
p.print("5");
p.print('5');`,
    },
    answer: [
      "Output: int, double, String, int (one per line).",
      "The compiler matches the argument types to the parameter types at compile time: 5 is an int, 5.0 is a double, \"5\" is a String.",
      "`'5'` is a char, and no print(char) exists. The compiler picks the closest widening conversion — char widens to int before double — so print(int) is chosen.",
    ],
  },
  {
    id: "m2-th-25",
    kind: "theory",
    topic: "Polymorphism",
    marks: 2,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Can a method be overloaded by changing only its return type? Justify.",
    answer: [
      "No. Overloaded methods must differ in their parameter list (number, type, or order of parameters).",
      "The compiler chooses a method from its name and the arguments at the call site, not from how the result is used. Declaring `int add(int a, int b)` and `double add(int a, int b)` together is a compile-time error (\"method already defined\") because the call `add(2, 3)` would be ambiguous.",
    ],
  },
  {
    id: "m2-th-26",
    kind: "theory",
    topic: "Polymorphism",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "State any three rules that must be followed while overriding a method.",
    answer: [
      "The method name and parameter list must be exactly the same as in the superclass.",
      "The return type must be the same, or a subtype of it (covariant return).",
      "The access modifier cannot be more restrictive than the superclass method's (a public method cannot be overridden as private).",
      "private, static, and final methods cannot be overridden.",
      "Use `@Override` so the compiler verifies the override and catches signature typos.",
    ],
  },
  {
    id: "m2-th-27",
    kind: "theory",
    topic: "Polymorphism",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "State the output of the following code and explain why the two results come from different classes.",
    promptCode: {
      lang: "java",
      code: `class P {
    int x = 10;
    void show() { System.out.println("P.show"); }
}
class Q extends P {
    int x = 20;
    void show() { System.out.println("Q.show"); }
}

// in main:
P ref = new Q();
System.out.println(ref.x);
ref.show();`,
    },
    answer: [
      "Output: 10, then Q.show.",
      "Methods are polymorphic: `ref.show()` is resolved at run time by the actual object (a Q), so Q's overriding version runs.",
      "Fields are NOT polymorphic: `ref.x` is resolved at compile time from the reference type (P), so P's field x (10) is read, not Q's x (20).",
    ],
  },

  // ---------------------------------------------------------------------
  // Casting
  // ---------------------------------------------------------------------
  {
    id: "m2-th-28",
    kind: "theory",
    topic: "Casting",
    marks: 2,
    difficulty: "Easy",
    exam: ["M2"],
    prompt: "Differentiate between implicit (widening) and explicit (narrowing) type casting with one example each.",
    answer: [
      "Implicit (widening): a smaller type is converted to a larger one automatically, with no loss of data — `int i = 5; double d = i;` (d becomes 5.0).",
      "Explicit (narrowing): a larger type is converted to a smaller one; the programmer must write the cast, and data may be lost — `double d = 5.7; int i = (int) d;` (i becomes 5, the decimal part is truncated).",
    ],
  },
  {
    id: "m2-th-29",
    kind: "theory",
    topic: "Casting",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "State the output of the following code and identify the kind of conversion in each statement.",
    promptCode: {
      lang: "java",
      code: `int a = 10;
double d = a;

double x = 9.99;
int y = (int) x;

char c = 'A';
int code = c;

int n = 66;
char ch = (char) n;

System.out.println(d + " " + y + " " + code + " " + ch);`,
    },
    answer: [
      "Output: 10.0 9 65 B",
      "`double d = a;` — implicit widening (int to double): 10 becomes 10.0.",
      "`(int) x` — explicit narrowing (double to int): the fraction is truncated, not rounded, so 9.99 becomes 9.",
      "`int code = c;` — implicit widening (char to int): the character code of 'A' is 65.",
      "`(char) n` — explicit narrowing (int to char): the character with code 66 is 'B'.",
    ],
  },
  {
    id: "m2-th-30",
    kind: "theory",
    topic: "Casting",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "Explain upcasting and downcasting in inheritance with a suitable example.",
    answer: [
      "Upcasting: treating a subclass object through a superclass reference — `Animal a = new Dog();`. It is implicit and always safe because every Dog is an Animal; the catch is that only Animal's members are visible through the reference.",
      "Downcasting: converting a superclass reference back to a subclass type — `Dog d = (Dog) a;`. It requires an explicit cast and works only if the real object is actually a Dog; otherwise a ClassCastException is thrown at run time.",
      "Downcasting is how you regain access to subclass-specific members (like `d.bark()`) after an upcast.",
    ],
  },
  {
    id: "m2-th-31",
    kind: "theory",
    topic: "Casting",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "For each marked line, state whether it compiles and whether it runs successfully. Give the reason for each.",
    promptCode: {
      lang: "java",
      code: `class Animal { }
class Dog extends Animal {
    void bark() { System.out.println("Woof"); }
}

// in main:
Animal a = new Dog();
a.bark();                  // Line 1
((Dog) a).bark();          // Line 2

Animal b = new Animal();
Dog d = (Dog) b;           // Line 3`,
    },
    answer: [
      "Line 1: compile-time error. The compiler checks the reference type, and Animal has no bark() method — even though the real object is a Dog.",
      "Line 2: compiles and runs, printing Woof. The explicit downcast to Dog is valid because the actual object is a Dog.",
      "Line 3: compiles (Dog and Animal are related, so the cast is allowed) but throws ClassCastException at run time, because b refers to a plain Animal, not a Dog.",
    ],
  },
  {
    id: "m2-th-32",
    kind: "theory",
    topic: "Casting",
    marks: 2,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "State the value of (a) `(byte) 130` and (b) `(int) -3.99`. Explain both.",
    answer: [
      "(a) -126. A byte holds -128 to 127, so 130 does not fit. The value wraps around: 130 - 256 = -126.",
      "(b) -3. Casting a floating-point value to int truncates the decimal part (towards zero); it does not round.",
    ],
  },
  {
    id: "m2-th-33",
    kind: "theory",
    topic: "Casting",
    marks: 2,
    difficulty: "Medium",
    exam: ["M2"],
    prompt: "How can a ClassCastException be avoided before downcasting? Show the pattern.",
    answer: [
      "Test the real type first with the `instanceof` operator, and downcast only when it returns true.",
      "`obj instanceof Dog` is true only if the object that obj refers to is a Dog (or a subclass of Dog).",
    ],
    solutionCode: {
      lang: "java",
      code: `Animal a = new Animal();

if (a instanceof Dog) {
    Dog d = (Dog) a;      // safe: only reached when a really is a Dog
    d.bark();
} else {
    System.out.println("Not a Dog - cast skipped");
}`,
    },
  },
];
