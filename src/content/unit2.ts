import type { Topic } from "@/lib/types";

export const unit2Topics: Topic[] = [
  {
    id: "encapsulation",
    title: "Encapsulation",
    tagline: "Pillar 1 — bundling data with the code that guards it",
    minutes: 14,
    blocks: [
      {
        kind: "p",
        text: "**Encapsulation** is the practice of bundling an object's data (fields) together with the methods that operate on it, and restricting direct access to that data from outside the class. In Java, this is implemented with **access modifiers** — mark fields `private`, and expose controlled access through `public` getter/setter methods.",
      },
      {
        kind: "callout",
        variant: "analogy",
        title: "A pill capsule",
        text: "The medicine (data) is sealed inside a capsule (the class). You interact with the capsule as a whole — you don't get to touch the raw powder directly. The capsule's coating (private fields + public methods) is what makes it safe and predictable to use.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Without encapsulation — anything can corrupt the object",
        code: `class BankAccount {
    public double balance;   // exposed — any code anywhere can do this:
}

BankAccount acc = new BankAccount();
acc.balance = -5000;   // negative balance — nothing prevents it`,
      },
      {
        kind: "code",
        lang: "java",
        caption: "With encapsulation — the class enforces its own rules",
        code: `class BankAccount {
    private double balance;   // hidden from the outside world

    public BankAccount(double openingBalance) {
        if (openingBalance < 0) throw new IllegalArgumentException("Cannot open with negative balance");
        this.balance = openingBalance;
    }

    public double getBalance() {          // controlled read access
        return balance;
    }

    public void deposit(double amount) {   // controlled write access
        if (amount <= 0) throw new IllegalArgumentException("Deposit must be positive");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
        balance -= amount;
    }
}

BankAccount acc = new BankAccount(1000);
acc.withdraw(5000);   // throws — the rule is enforced every single time, everywhere`,
      },
      { kind: "heading", text: "Java's Access Modifiers" },
      {
        kind: "compare",
        headers: ["Modifier", "Same class", "Same package", "Subclass (other package)", "Everywhere"],
        rows: [
          ["private", "✅", "❌", "❌", "❌"],
          ["default (none)", "✅", "✅", "❌", "❌"],
          ["protected", "✅", "✅", "✅", "❌"],
          ["public", "✅", "✅", "✅", "✅"],
        ],
      },
      {
        kind: "callout",
        variant: "tip",
        title: "Default convention",
        text: "Fields → private. Methods meant for outside use → public. Everything else stays as tight as possible. This is the \"principle of least access\": expose only what other classes genuinely need.",
      },
      {
        kind: "callout",
        variant: "exam",
        title: "Encapsulation ≠ just \"using getters and setters\"",
        text: "A class with private fields and a public getter/setter for EVERY field that just blindly returns/assigns the value gives zero real protection — it's encapsulation in name only. True encapsulation means the setters/methods enforce actual invariants (like the balance check above). Examiners specifically reward answers that mention validation logic, not just private + getter/setter syntax.",
      },
    ],
    quiz: [
      {
        id: "q-encap-1",
        question: "Why is 'private field + public getter/setter with no validation' considered weak encapsulation?",
        type: "mcq",
        options: [
          "Because private fields are slower than public ones",
          "Because it hides the data but provides no real protection of the object's invariants — any value can still be set",
          "Because Java does not allow this pattern",
          "Because getters and setters must always be private",
        ],
        correctIndex: 1,
        explanation: "The purpose of encapsulation is not hiding for its own sake — it's guaranteeing the object always stays in a valid state, which requires the methods to actually validate input.",
      },
    ],
  },

  {
    id: "abstraction",
    title: "Abstraction",
    tagline: "Pillar 2 — showing what it does, hiding how it does it",
    minutes: 12,
    blocks: [
      {
        kind: "p",
        text: "**Abstraction** means exposing only the essential features of an object while hiding the internal implementation details. Where encapsulation hides *data*, abstraction hides *complexity of behaviour* — the user of a class should be able to use it without knowing how it works internally.",
      },
      {
        kind: "callout",
        variant: "analogy",
        title: "Driving a car",
        text: "You press the accelerator to speed up. You don't need to know about fuel injection timing, spark plugs, or the combustion cycle. The car exposes a simple pedal (interface); the engine's complexity (implementation) is completely hidden from the driver.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Abstraction in everyday code — you already use it constantly",
        code: `ArrayList<Integer> list = new ArrayList<>();
list.add(5);
Collections.sort(list);
// You call sort() and trust it works.
// You never see the actual sorting algorithm (it's Timsort internally) — that's abstraction.`,
      },
      { kind: "heading", text: "How Java implements it: two tools" },
      {
        kind: "p",
        text: "Java gives you two language features specifically to *enforce* abstraction: **abstract classes** and **interfaces** (both covered in full detail in Unit 3). For now, understand the core mechanism: define WHAT a method should do (its signature/contract), and defer HOW it does it to whichever subclass implements it.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "A taste of abstract classes — the full topic is next unit",
        code: `abstract class Shape {
    abstract double area();   // WHAT — no body, no implementation here

    void describe() {          // shared behaviour, fully implemented
        System.out.println("This shape has area " + area());
    }
}

class Circle extends Shape {
    double radius;
    Circle(double r) { radius = r; }

    double area() {             // HOW — Circle decides the actual formula
        return Math.PI * radius * radius;
    }
}

Shape s = new Circle(5);
s.describe();   // caller never needs to know HOW area() is computed`,
      },
      {
        kind: "compare",
        headers: ["", "Abstraction", "Encapsulation"],
        rows: [
          ["Hides", "Implementation complexity / logic", "Internal data / state"],
          ["Achieved with", "Abstract classes, interfaces", "Access modifiers (private + getters/setters)"],
          ["Question it answers", "\"What can this object do?\"", "\"How is this object's data protected?\""],
          ["Design-time vs run-time focus", "Design-level — defines a contract", "Implementation-level — defends the state"],
        ],
      },
      {
        kind: "callout",
        variant: "exam",
        title: "The #1 confused pair in every OOP exam",
        text: "Abstraction and encapsulation are often used almost interchangeably by beginners — resist that. A one-line way to keep them apart: encapsulation is about ACCESS CONTROL (can you touch the data?), abstraction is about DETAIL HIDING (do you need to know the mechanism?). A class can have strong encapsulation with zero abstraction (all details forced through methods, but every method fully visible with no abstract contract), and vice versa.",
      },
    ],
    quiz: [
      {
        id: "q-abstract-1",
        question: "One-liner: What does abstraction hide?",
        type: "mcq",
        options: [
          "The object's private data fields",
          "The implementation details of HOW something is done, while exposing WHAT it does",
          "The class name from other classes",
          "Compile-time errors",
        ],
        correctIndex: 1,
        explanation: "Abstraction is about hiding complexity of behaviour/implementation, letting the caller rely on a simple contract (like Shape.area()) without knowing the underlying formula or algorithm.",
      },
    ],
  },

  {
    id: "constructors",
    title: "Constructors",
    tagline: "Guaranteeing every object is born valid",
    minutes: 13,
    blocks: [
      {
        kind: "p",
        text: "A **constructor** is a special method that runs automatically when an object is created with `new`, and its job is to initialize the object's fields into a valid starting state. It has the exact same name as the class and **no return type** — not even `void`.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Default vs. parameterized constructors",
        code: `class Employee {
    String name;
    double salary;

    // No-argument (default) constructor
    Employee() {
        name = "Unknown";
        salary = 0;
    }

    // Parameterized constructor
    Employee(String name, double salary) {
        this.name = name;      // 'this' distinguishes the field from the parameter
        this.salary = salary;
    }
}

Employee e1 = new Employee();                    // uses default -> "Unknown", 0
Employee e2 = new Employee("Rohan", 55000);        // uses parameterized`,
      },
      {
        kind: "callout",
        variant: "pitfall",
        title: "The moment you write ANY constructor, the free default one disappears",
        text: "Java only auto-generates a no-argument constructor if you define ZERO constructors yourself. The instant you write Employee(String name, double salary), calling new Employee() will no longer compile unless you explicitly also write a no-arg constructor.",
      },
      { kind: "heading", text: "Constructor Overloading" },
      {
        kind: "p",
        text: "A class can have multiple constructors as long as their **parameter lists differ** (in count or type) — this is constructor overloading, a specific case of compile-time polymorphism (next topic).",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Chaining constructors with this(...)",
        code: `class Rectangle {
    double length, width;

    Rectangle() {
        this(1, 1);              // calls the two-arg constructor below
    }

    Rectangle(double side) {
        this(side, side);         // square — reuse the two-arg constructor
    }

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
}`,
      },
      {
        kind: "callout",
        variant: "tip",
        title: "this(...) must be the FIRST statement",
        text: "When one constructor calls another with this(...), that call must be the very first line in the constructor body. This avoids duplicated initialization logic across overloaded constructors — a form of DRY (Don't Repeat Yourself) inside a class.",
      },
      { kind: "heading", text: "Array/Vector of Objects, constructed" },
      {
        kind: "code",
        lang: "java",
        caption: "Initializing an array of objects with a parameterized constructor (as in Lab Experiment 3)",
        code: `class BankAccount {
    String customerName;
    String accountNo;
    double balance;

    BankAccount(String customerName, String accountNo, double balance) {
        this.customerName = customerName;
        this.accountNo = accountNo;
        this.balance = balance;
    }
}

BankAccount[] accounts = new BankAccount[3];
accounts[0] = new BankAccount("Aditi", "AC001", 15000);
accounts[1] = new BankAccount("Rohan", "AC002", 8200);
accounts[2] = new BankAccount("Meera", "AC003", 42000);
// Each array slot holds a reference to its own independently constructed object`,
      },
    ],
    quiz: [
      {
        id: "q-constructor-1",
        question: "A class defines only: Employee(String name, double salary) { ... }. What happens when you call new Employee()?",
        type: "mcq",
        options: [
          "It works — Java always provides a free no-arg constructor",
          "Compilation error — no matching constructor found",
          "It runs but leaves all fields null",
          "It throws a runtime exception",
        ],
        correctIndex: 1,
        explanation: "Java only generates a default no-arg constructor automatically if the class defines no constructors at all. Defining any constructor removes that free default.",
      },
    ],
  },

  {
    id: "inheritance",
    title: "Inheritance",
    tagline: "Reusing and specializing behaviour through an is-a relationship",
    minutes: 16,
    blocks: [
      {
        kind: "p",
        text: "**Inheritance** lets a new class (**subclass** / derived class) acquire the fields and methods of an existing class (**superclass** / base class), using the `extends` keyword. It models an **\"is-a\"** relationship: a `CarInsurance` *is a* kind of policy built on top of a `BankAccount` relationship, a `SavingsAccount` *is an* `Account`.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Basic inheritance",
        code: `class Account {
    protected String customerName;
    protected double balance;

    Account(String customerName, double balance) {
        this.customerName = customerName;
        this.balance = balance;
    }

    void deposit(double amount) {
        balance += amount;
    }

    void displayBalance() {
        System.out.println(customerName + "'s balance: " + balance);
    }
}

class SavingsAccount extends Account {   // SavingsAccount IS-A Account
    double interestRate;

    SavingsAccount(String customerName, double balance, double interestRate) {
        super(customerName, balance);     // must call superclass constructor first
        this.interestRate = interestRate;
    }

    void applyInterest() {
        balance += balance * interestRate / 100;   // reuses inherited field
    }
}

SavingsAccount acc = new SavingsAccount("Aditi", 10000, 5);
acc.deposit(2000);        // inherited method, works unchanged
acc.applyInterest();      // new behaviour, specific to SavingsAccount
acc.displayBalance();     // inherited method`,
      },
      {
        kind: "callout",
        variant: "tip",
        title: "protected exists specifically for inheritance",
        text: "private fields of Account would be completely invisible inside SavingsAccount. protected grants access to subclasses (even in other packages) while still blocking unrelated outside classes — the middle ground between private and public.",
      },
      { kind: "heading", text: "super — reaching into the parent" },
      {
        kind: "list",
        items: [
          "**super(...)** — calls the parent's constructor. Must be the first statement in the subclass constructor (implicitly inserted by the compiler if you omit it).",
          "**super.method()** — calls the parent's version of a method you've overridden, instead of your own override.",
          "**super.field** — accesses a parent field, rarely needed if using protected correctly.",
        ],
      },
      { kind: "heading", text: "Java allows single inheritance of classes only" },
      {
        kind: "p",
        text: "A class can `extends` only ONE other class (unlike C++, which permits multiple class inheritance). This is a deliberate design choice to avoid the **Diamond Problem** — ambiguity when two parent classes both define a method with the same signature. Java sidesteps this entirely for classes; multiple inheritance of *behaviour contracts* is instead achieved safely through interfaces (Unit 3), which carry no conflicting state.",
      },
      {
        kind: "diagram",
        name: "uml-relations",
      },
      {
        kind: "callout",
        variant: "pitfall",
        title: "Inheritance is not always the right tool",
        text: "Overusing inheritance for code reuse alone (rather than a genuine is-a relationship) creates fragile, deeply nested hierarchies. If the relationship is really \"has-a\" (a Car has an Engine, not is-an Engine), prefer Composition — covered in the Modelling Classes topic.",
      },
    ],
    quiz: [
      {
        id: "q-inherit-1",
        question: "Why does Java NOT allow a class to extend two classes at once?",
        type: "mcq",
        options: [
          "It would make compilation too slow",
          "To avoid the Diamond Problem — ambiguity when two parents define conflicting members",
          "Java simply forgot to add this feature",
          "Because interfaces already do this, so it would be redundant",
        ],
        correctIndex: 1,
        explanation: "Multiple class inheritance creates ambiguity about which parent's version of a member wins. Java restricts classes to single inheritance and handles multiple contracts safely via interfaces instead.",
      },
    ],
  },

  {
    id: "polymorphism",
    title: "Polymorphism",
    tagline: "One name, many forms — compile-time and run-time",
    minutes: 16,
    blocks: [
      {
        kind: "p",
        text: "**Polymorphism** ('many forms') means the same method name or the same reference type can trigger different behaviour depending on context. Java has two flavours, resolved at two different times.",
      },
      { kind: "heading", text: "Compile-time (Static) Polymorphism — Overloading" },
      {
        kind: "p",
        text: "Multiple methods share the same name but differ in their parameter list. The compiler decides which one to call by matching argument types **at compile time** — before the program even runs.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Method overloading",
        code: `class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}

Calculator c = new Calculator();
c.add(2, 3);        // compiler picks add(int, int) — decided at compile time
c.add(2.5, 3.5);     // compiler picks add(double, double)
c.add(1, 2, 3);      // compiler picks add(int, int, int)`,
      },
      { kind: "heading", text: "Run-time (Dynamic) Polymorphism — Overriding" },
      {
        kind: "p",
        text: "A subclass redefines a method it inherited, using the **exact same signature**. Which version actually runs is decided **at run time**, based on the real object type — not the reference's declared type. This is the mechanism behind treating many different subclasses uniformly through one parent reference.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Method overriding + dynamic dispatch",
        code: `class Insurance {
    double calculatePremium() {
        return 1000;   // generic default
    }
}

class LifeInsurance extends Insurance {
    @Override
    double calculatePremium() {
        return 3000;   // age/sum-assured based logic in reality
    }
}

class CarInsurance extends Insurance {
    @Override
    double calculatePremium() {
        return 5000;
    }
}

Insurance[] policies = { new LifeInsurance(), new CarInsurance(), new Insurance() };

for (Insurance p : policies) {
    // p's declared type is always Insurance, but the ACTUAL object decides which
    // calculatePremium() runs — this is run-time polymorphism / dynamic dispatch.
    System.out.println(p.calculatePremium());
}
// prints: 3000, 5000, 1000`,
      },
      {
        kind: "callout",
        variant: "analogy",
        title: "A universal remote button labelled 'Power'",
        text: "The same 'Power' button (method call) does something different depending on which device (actual object) is connected — turn on a TV, or turn on a speaker. The remote (the Insurance reference) doesn't need to know which device it's really talking to; each device supplies its own behaviour for the same button.",
      },
      {
        kind: "diagram",
        name: "polymorphism",
      },
      {
        kind: "compare",
        headers: ["", "Overloading (compile-time)", "Overriding (run-time)"],
        rows: [
          ["Relationship", "Same class (or subclass adding new variants)", "Superclass ↔ subclass"],
          ["Signature", "Must differ (params)", "Must be identical"],
          ["Decided by", "Compiler, using reference type", "JVM, using actual object type"],
          ["Also called", "Static binding", "Dynamic binding / dynamic dispatch"],
          ["Return type rule", "Can differ freely", "Must be same or a covariant subtype"],
        ],
      },
      {
        kind: "callout",
        variant: "exam",
        title: "@Override is not required — but always use it",
        text: "The @Override annotation doesn't change runtime behaviour, but it makes the compiler verify you actually matched the parent's signature exactly. Without it, a typo (e.g. calculatepremium) silently creates a brand-new, unrelated method instead of overriding — a bug that's very hard to spot without the annotation's safety net.",
      },
    ],
    quiz: [
      {
        id: "q-poly-1",
        question: "Insurance p = new LifeInsurance(); — which calculatePremium() runs when you call p.calculatePremium(), and when is that decision made?",
        type: "mcq",
        options: [
          "Insurance's version, decided at compile time",
          "LifeInsurance's version, decided at compile time",
          "LifeInsurance's version, decided at run time based on the actual object",
          "It causes a compilation error",
        ],
        correctIndex: 2,
        explanation: "Overridden methods use dynamic dispatch: the JVM looks at the actual object on the heap (LifeInsurance) at run time, regardless of the reference's declared type (Insurance).",
      },
      {
        id: "q-poly-2",
        question: "One-liner: What decides which overloaded method gets called?",
        type: "mcq",
        options: [
          "The JVM, at run time, based on the real object",
          "The compiler, at compile time, based on argument types",
          "Random selection",
          "The order the methods are written in the file",
        ],
        correctIndex: 1,
        explanation: "Overload resolution is entirely a compile-time decision based on matching the number/types of arguments against the available method signatures.",
      },
    ],
  },

  {
    id: "object-references",
    title: "Passing Objects by Reference",
    tagline: "What actually crosses a method boundary",
    minutes: 11,
    blocks: [
      {
        kind: "p",
        text: "Java is, technically, always **pass-by-value**. But for object parameters, the \"value\" being passed is a **copy of the reference** (the heap address) — not a copy of the object itself. This subtlety causes one of the most common sources of confusion for students moving from C/C++.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Mutating through a copied reference DOES affect the original object",
        code: `class Counter {
    int value = 0;
}

void increment(Counter c) {
    c.value++;    // follows the copied reference to the SAME object, mutates it
}

Counter counter = new Counter();
increment(counter);
System.out.println(counter.value);   // 1 — the original object WAS changed`,
      },
      {
        kind: "code",
        lang: "java",
        caption: "Reassigning the parameter does NOT affect the caller's variable",
        code: `void reassign(Counter c) {
    c = new Counter();   // c now points to a brand-new object,
    c.value = 99;         // but only inside this method
}

Counter counter = new Counter();
reassign(counter);
System.out.println(counter.value);   // 0 — caller's reference is untouched`,
      },
      {
        kind: "callout",
        variant: "analogy",
        title: "Passing a house address on a sticky note",
        text: "You hand someone a photocopy of your house's address (the reference is copied). They can walk to that house and repaint a wall (mutate the object — you'll see the new paint too). But if they write a DIFFERENT address on their own copy of the sticky note (reassign the parameter), your original note — and the house it points to — is completely unaffected.",
      },
      {
        kind: "compare",
        headers: ["Action inside the method", "Visible to caller after the call?"],
        rows: [
          ["Mutating a field: obj.field = x;", "✅ Yes — same object on the heap"],
          ["Calling a mutating method: obj.setX(5);", "✅ Yes — same object on the heap"],
          ["Reassigning the parameter: obj = new Thing();", "❌ No — only the local copy of the reference changes"],
        ],
      },
      {
        kind: "callout",
        variant: "exam",
        title: "The precise phrase examiners want",
        text: "Java passes object references BY VALUE. Never write \"Java passes objects by reference\" as a standalone claim — it is imprecise and commonly marked wrong. The correct phrasing: \"the reference itself is copied; both the original and the copy point to the same object.\"",
      },
    ],
    quiz: [
      {
        id: "q-refs-1",
        question: "A method receives an object parameter and calls obj.setName(\"X\") on it. Does this change reflect in the caller's original object?",
        type: "truefalse",
        options: ["True", "False"],
        correctIndex: 0,
        explanation: "Yes — the parameter is a copy of the reference, but it still points to the SAME object on the heap, so any mutation through that reference is visible to the caller.",
      },
    ],
  },

  {
    id: "uml-modelling",
    title: "Modelling Classes with UML",
    tagline: "Association, Generalization, Composition & Aggregation",
    minutes: 15,
    blocks: [
      {
        kind: "p",
        text: "Before writing code, professional teams sketch a **class diagram** — a UML picture of classes, their attributes/methods, and how classes relate to each other. The four relationships in your syllabus describe increasingly strong forms of \"how do two classes connect.\"",
      },
      {
        kind: "diagram",
        name: "uml-relations",
      },
      { kind: "heading", text: "1. Association — a general \"uses\" relationship" },
      {
        kind: "p",
        text: "Two classes are aware of and interact with each other, but neither owns nor is a specialized form of the other. A `Teacher` and a `Student` are associated (a teacher teaches students) without either containing or being a subtype of the other.",
      },
      {
        kind: "code",
        lang: "java",
        code: `class Teacher {
    String name;
}

class Student {
    String name;
    Teacher advisor;   // association: Student references a Teacher
}`,
      },
      { kind: "heading", text: "2. Generalization — the \"is-a\" relationship" },
      {
        kind: "p",
        text: "This is simply inheritance, viewed from the modelling side: a specific class (subclass) is a specialized version of a more general class (superclass). `SavingsAccount` generalizes to `Account`. Drawn as a solid line with a **hollow triangle arrowhead** pointing at the parent.",
      },
      { kind: "heading", text: "3. Aggregation — a weak \"has-a\" (parts can outlive the whole)" },
      {
        kind: "p",
        text: "One class contains a reference to another, but the contained object has an **independent lifecycle** — it can exist before, after, or separately from the container. A `Department` has `Professor`s, but if the `Department` is dissolved, the `Professor`s still exist and can join elsewhere. Drawn with a **hollow diamond** at the \"whole\" end.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Aggregation — Professor objects are created independently and merely referenced",
        code: `class Professor {
    String name;
    Professor(String name) { this.name = name; }
}

class Department {
    String deptName;
    List<Professor> professors = new ArrayList<>();

    void addProfessor(Professor p) {   // Professor was created OUTSIDE, just linked in
        professors.add(p);
    }
}

Professor drRao = new Professor("Dr. Rao");   // exists independently
Department cs = new Department();
cs.addProfessor(drRao);
// If 'cs' is deleted, drRao still exists — could join another department`,
      },
      { kind: "heading", text: "4. Composition — a strong \"has-a\" (parts die with the whole)" },
      {
        kind: "p",
        text: "The strongest containment relationship: the contained object's lifecycle is entirely owned by the container. If the container is destroyed, its composed parts are destroyed with it. A `House` is composed of `Room`s — a Room does not meaningfully exist outside its House. Drawn with a **filled/solid diamond**.",
      },
      {
        kind: "code",
        lang: "java",
        caption: "Composition — the Engine is created INSIDE the Car and cannot outlive it",
        code: `class Engine {
    int horsepower;
    Engine(int hp) { this.horsepower = hp; }
}

class Car {
    private final Engine engine;   // created and owned entirely by Car

    Car(int hp) {
        this.engine = new Engine(hp);   // Engine's lifecycle == Car's lifecycle
    }
}
// There is no way for outside code to get an Engine reference before a Car exists,
// and when the Car object is garbage-collected, so is its Engine.`,
      },
      {
        kind: "compare",
        headers: ["Relationship", "Strength", "Lifecycle", "UML notation", "Example"],
        rows: [
          ["Association", "Weakest — just \"knows about\"", "Fully independent", "Plain line", "Student ↔ Teacher"],
          ["Generalization", "is-a (inheritance)", "N/A — a type relationship", "Line + hollow triangle", "SavingsAccount → Account"],
          ["Aggregation", "has-a (weak ownership)", "Part can outlive whole", "Line + hollow diamond", "Department ◇— Professor"],
          ["Composition", "has-a (strong ownership)", "Part dies with whole", "Line + filled diamond", "Car ◆— Engine"],
        ],
      },
      {
        kind: "callout",
        variant: "exam",
        title: "The fastest way to tell Aggregation from Composition in an exam",
        text: "Ask: \"If I delete the container object right now, does the contained object still make sense on its own?\" Yes → Aggregation. No, it would be meaningless/orphaned → Composition. Also check the constructor: if the part is passed IN from outside, it's aggregation; if it's created with new INSIDE the container's own constructor, it's composition.",
      },
    ],
    quiz: [
      {
        id: "q-uml-1",
        question: "A Library class holds a List<Book>. Books are added by passing in Book objects that were created elsewhere, and continue to exist even if removed from the library. Which relationship is this?",
        type: "mcq",
        options: ["Generalization", "Composition", "Aggregation", "Encapsulation"],
        correctIndex: 2,
        explanation: "Because the Book objects have an independent lifecycle from the Library (created outside, survive removal), this is Aggregation — a weak has-a relationship, shown with a hollow diamond.",
      },
      {
        id: "q-uml-2",
        question: "Which UML relationship corresponds directly to Java's 'extends' keyword?",
        type: "mcq",
        options: ["Association", "Aggregation", "Composition", "Generalization"],
        correctIndex: 3,
        explanation: "Generalization is the modelling term for an is-a / inheritance relationship, drawn with a hollow-triangle arrow toward the superclass.",
      },
    ],
  },
];
