import type { BankQuestion } from "@/lib/types";

// M2 Lab scope: Strings + casting programs, inheritance + runtime
// polymorphism, abstract classes + interfaces. Mirrors the M1 lab paper
// shape (two 5-mark questions, no choice): a programming problem and a
// class-based case study. Every solution below was compiled and run.
export const labQuestionsM2: BankQuestion[] = [
  // ---------------------------------------------------------------------
  // Strings & Casting  (programming-problem style)
  // ---------------------------------------------------------------------
  {
    id: "m2-lab-1",
    kind: "lab",
    topic: "Strings & Casting",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Write a Java program that reads a sentence using Scanner and displays: (a) the number of words, (b) the number of vowels (a, e, i, o, u — in either case), (c) the words of the sentence in reverse order. Use String methods and loops appropriately.",
    sampleIO: `Enter a sentence: Object oriented programming is fun
Words: 5
Vowels: 11
Reversed word order: fun is programming oriented Object`,
    answer: [
      "Read the whole line with `nextLine()` (not `next()`), then `trim().split(\"\\\\s+\")` gives the words in an array — its length is the word count.",
      "For vowels, loop over every character, convert it to lower case, and test it with `\"aeiou\".indexOf(c) != -1`.",
      "For reverse order, loop over the words array from the last index down to 0, appending a space between words.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a sentence: ");
        String sentence = sc.nextLine().trim();

        String[] words = sentence.split("\\\\s+");

        int vowels = 0;
        for (int i = 0; i < sentence.length(); i++) {
            char c = Character.toLowerCase(sentence.charAt(i));
            if ("aeiou".indexOf(c) != -1) {
                vowels++;
            }
        }

        StringBuilder reversed = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            reversed.append(words[i]);
            if (i > 0) reversed.append(" ");
        }

        System.out.println("Words: " + words.length);
        System.out.println("Vowels: " + vowels);
        System.out.println("Reversed word order: " + reversed);
    }
}`,
    },
  },
  {
    id: "m2-lab-2",
    kind: "lab",
    topic: "Strings & Casting",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Write a program that reads a line of text and displays: (a) whether it is a palindrome, ignoring spaces and letter case, (b) the number of uppercase letters, lowercase letters, digits and other characters in it.",
    sampleIO: `Enter text: Was it a car or a cat I saw
Palindrome
Uppercase: 2
Lowercase: 17
Digits: 0
Others: 8`,
    answer: [
      "Classify each character with `Character.isUpperCase()`, `isLowerCase()` and `isDigit()` — anything left over (including spaces) counts as 'other'.",
      "Build a cleaned copy of the text with spaces removed and every letter lower-cased, then compare it with its own reverse (`new StringBuilder(s).reverse().toString()`).",
      "Use `equals()`, not `==`, to compare the two strings.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter text: ");
        String text = sc.nextLine();

        int upper = 0, lower = 0, digits = 0, others = 0;
        StringBuilder cleaned = new StringBuilder();

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (Character.isUpperCase(c)) upper++;
            else if (Character.isLowerCase(c)) lower++;
            else if (Character.isDigit(c)) digits++;
            else others++;

            if (c != ' ') cleaned.append(Character.toLowerCase(c));
        }

        String forward = cleaned.toString();
        String backward = new StringBuilder(forward).reverse().toString();

        System.out.println(forward.equals(backward) ? "Palindrome" : "Not a palindrome");
        System.out.println("Uppercase: " + upper);
        System.out.println("Lowercase: " + lower);
        System.out.println("Digits: " + digits);
        System.out.println("Others: " + others);
    }
}`,
    },
  },
  {
    id: "m2-lab-3",
    kind: "lab",
    topic: "Strings & Casting",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Write a program that reads a person's full name (first, middle and last name separated by spaces) and displays: (a) the name in the form `SURNAME, F. M.` using the initials of the first and middle names, (b) the whole name in capital letters, (c) the total number of letters in the name (excluding spaces).",
    sampleIO: `Enter full name (first middle last): aditi rao sharma
Formatted: SHARMA, A. R.
Capitals: ADITI RAO SHARMA
Letters: 14`,
    answer: [
      "`split(\"\\\\s+\")` gives the name parts; the surname is the LAST element, and every element before it contributes an initial (`charAt(0)`).",
      "`toUpperCase()` returns a new String — Strings are immutable, so use the returned value.",
      "Count letters by looping over the characters and skipping the spaces.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter full name (first middle last): ");
        String fullName = sc.nextLine().trim();

        String[] parts = fullName.split("\\\\s+");
        String surname = parts[parts.length - 1];

        StringBuilder formatted = new StringBuilder(surname.toUpperCase() + ",");
        for (int i = 0; i < parts.length - 1; i++) {
            formatted.append(" ").append(Character.toUpperCase(parts[i].charAt(0))).append(".");
        }

        int letters = 0;
        for (int i = 0; i < fullName.length(); i++) {
            if (fullName.charAt(i) != ' ') letters++;
        }

        System.out.println("Formatted: " + formatted);
        System.out.println("Capitals: " + fullName.toUpperCase());
        System.out.println("Letters: " + letters);
    }
}`,
    },
  },
  {
    id: "m2-lab-4",
    kind: "lab",
    topic: "Strings & Casting",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt:
      "Write a program that reads a word and, using a `StringBuffer`, displays (a) the word reversed and (b) the word with all of its vowels removed.",
    sampleIO: `Enter a word: Programming
Reversed: gnimmargorP
Without vowels: Prgrmmng`,
    answer: [
      "`StringBuffer` has a ready-made `reverse()` method — create a separate StringBuffer for each result so the original is untouched.",
      "When deleting characters with `deleteCharAt(i)`, loop BACKWARDS from the last index; deleting while moving forwards shifts the remaining characters and skips some.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a word: ");
        String word = sc.next();

        StringBuffer reversed = new StringBuffer(word);
        reversed.reverse();

        StringBuffer noVowels = new StringBuffer(word);
        for (int i = noVowels.length() - 1; i >= 0; i--) {
            char c = Character.toLowerCase(noVowels.charAt(i));
            if ("aeiou".indexOf(c) != -1) {
                noVowels.deleteCharAt(i);
            }
        }

        System.out.println("Reversed: " + reversed);
        System.out.println("Without vowels: " + noVowels);
    }
}`,
    },
  },
  {
    id: "m2-lab-5",
    kind: "lab",
    topic: "Strings & Casting",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt:
      "Write a program that reads a decimal marks value (double) and an integer character code. Using type casting, display: (a) the marks truncated to a whole number, (b) the marks rounded to the nearest whole number, (c) the character the code represents, (d) the character that comes immediately after it.",
    sampleIO: `Enter marks (decimal): 78.6
Enter a character code: 65
Truncated marks: 78
Rounded marks: 79
Character: A
Next character: B`,
    answer: [
      "`(int) marks` is an explicit narrowing cast — it truncates (78.6 becomes 78), it does not round. Use `Math.round(marks)` for rounding.",
      "`(char) code` converts an int to the character with that code. For the next character, cast `code + 1` — arithmetic on an int gives an int, so the cast is needed again.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter marks (decimal): ");
        double marks = sc.nextDouble();
        System.out.print("Enter a character code: ");
        int code = sc.nextInt();

        int truncated = (int) marks;
        long rounded = Math.round(marks);
        char symbol = (char) code;
        char next = (char) (code + 1);

        System.out.println("Truncated marks: " + truncated);
        System.out.println("Rounded marks: " + rounded);
        System.out.println("Character: " + symbol);
        System.out.println("Next character: " + next);
    }
}`,
    },
  },
  {
    id: "m2-lab-6",
    kind: "lab",
    topic: "Strings & Casting",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "A group of friends splits a restaurant bill. Write a program that reads the total bill (int) and the number of friends (int), and displays: (a) each person's share as a decimal number (make sure integer division does not cut off the decimal part), (b) the share truncated to a whole number using explicit casting, (c) the amount left over after everyone pays the truncated share, (d) the message `Exact split` if the bill divides evenly, otherwise `Uneven split`.",
    sampleIO: `Enter total bill: 2500
Enter number of friends: 3
Share (decimal): 833.3333333333334
Share (whole): 833
Left over: 1
Uneven split`,
    answer: [
      "`bill / friends` with two ints is INTEGER division and loses the decimals. Cast one operand BEFORE dividing: `(double) bill / friends`.",
      "Casting the whole expression instead — `(double) (bill / friends)` — is too late: the division has already truncated.",
      "Left over = `bill - wholeShare * friends`. The split is exact only when that is 0.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter total bill: ");
        int bill = sc.nextInt();
        System.out.print("Enter number of friends: ");
        int friends = sc.nextInt();

        double exactShare = (double) bill / friends;   // cast BEFORE dividing
        int wholeShare = (int) exactShare;
        int leftover = bill - wholeShare * friends;

        System.out.println("Share (decimal): " + exactShare);
        System.out.println("Share (whole): " + wholeShare);
        System.out.println("Left over: " + leftover);
        System.out.println(leftover == 0 ? "Exact split" : "Uneven split");
    }
}`,
    },
  },

  // ---------------------------------------------------------------------
  // Inheritance  (case-study style)
  // ---------------------------------------------------------------------
  {
    id: "m2-lab-7",
    kind: "lab",
    topic: "Inheritance",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "A company pays two kinds of employees. Create a base class `Employee` with data members name, id and basic salary, a constructor, a method `calculateSalary()` that returns the basic salary, and a method `display()`. Create two subclasses: `Manager`, which adds a bonus of 20% of the basic salary, and `Developer`, which adds overtime pay (overtime hours × rate per hour). Each subclass must call the base-class constructor using `super(...)` and override `calculateSalary()`. In `main`, create one Manager and one Developer and display their details with their total salary.",
    sampleIO: "ID: 101, Name: Rohan Mehta\nTotal salary: 72000.0\n\nID: 102, Name: Aditi Rao\nTotal salary: 55000.0",
    answer: [
      "Make the base-class fields `protected` so the subclasses can use `basicSalary` directly in their overriding `calculateSalary()`.",
      "`display()` is written ONCE in Employee, yet it prints the right salary for each subclass — because `calculateSalary()` inside it is resolved at run time to the overriding version (runtime polymorphism).",
    ],
    solutionCode: {
      lang: "java",
      code: `class Employee {
    protected String name;
    protected int id;
    protected double basicSalary;

    Employee(String name, int id, double basicSalary) {
        this.name = name;
        this.id = id;
        this.basicSalary = basicSalary;
    }

    double calculateSalary() {
        return basicSalary;
    }

    void display() {
        System.out.println("ID: " + id + ", Name: " + name);
        System.out.println("Total salary: " + calculateSalary());
    }
}

class Manager extends Employee {
    Manager(String name, int id, double basicSalary) {
        super(name, id, basicSalary);
    }

    @Override
    double calculateSalary() {
        return basicSalary + 0.20 * basicSalary;
    }
}

class Developer extends Employee {
    private int overtimeHours;
    private double ratePerHour;

    Developer(String name, int id, double basicSalary, int overtimeHours, double ratePerHour) {
        super(name, id, basicSalary);
        this.overtimeHours = overtimeHours;
        this.ratePerHour = ratePerHour;
    }

    @Override
    double calculateSalary() {
        return basicSalary + overtimeHours * ratePerHour;
    }
}

public class Main {
    public static void main(String[] args) {
        Manager m = new Manager("Rohan Mehta", 101, 60000);
        Developer d = new Developer("Aditi Rao", 102, 45000, 20, 500);

        m.display();
        System.out.println();
        d.display();
    }
}`,
    },
  },
  {
    id: "m2-lab-8",
    kind: "lab",
    topic: "Inheritance",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "A library charges a late fee depending on the type of member. Create a base class `Member` (name, memberId) with a method `calculateFine(int daysLate)` that returns 0, and a method `displayFine(int daysLate)` that prints the member's name, id and fine. Create `StudentMember` (fine = Rs 2 per day late) and `FacultyMember` (fine = Rs 1 per day late, but never more than Rs 50), each overriding `calculateFine()`. In `main`, read the number of days late using Scanner, create one member of each type, and display both fines.",
    sampleIO: `Enter number of days late: 70
Aditi Rao (ID 2001) owes Rs 140.0
Dr. Mehta (ID 9001) owes Rs 50.0`,
    answer: [
      "Only `displayFine()` is written in the base class; it calls `calculateFine()`, and Java picks the overriding version from the real object type.",
      "The faculty cap is a one-liner with `Math.min(daysLate, 50)`.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

class Member {
    protected String name;
    protected int memberId;

    Member(String name, int memberId) {
        this.name = name;
        this.memberId = memberId;
    }

    double calculateFine(int daysLate) {
        return 0;
    }

    void displayFine(int daysLate) {
        System.out.println(name + " (ID " + memberId + ") owes Rs " + calculateFine(daysLate));
    }
}

class StudentMember extends Member {
    StudentMember(String name, int memberId) {
        super(name, memberId);
    }

    @Override
    double calculateFine(int daysLate) {
        return 2 * daysLate;
    }
}

class FacultyMember extends Member {
    FacultyMember(String name, int memberId) {
        super(name, memberId);
    }

    @Override
    double calculateFine(int daysLate) {
        return Math.min(daysLate, 50);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of days late: ");
        int days = sc.nextInt();

        Member student = new StudentMember("Aditi Rao", 2001);
        Member faculty = new FacultyMember("Dr. Mehta", 9001);

        student.displayFine(days);
        faculty.displayFine(days);
    }
}`,
    },
  },
  {
    id: "m2-lab-9",
    kind: "lab",
    topic: "Inheritance",
    marks: 5,
    difficulty: "Easy",
    exam: ["M2"],
    prompt:
      "Create a class `Person` (name, age), a class `Student` that extends `Person` (adds rollNo and course), and a class `GraduateStudent` that extends `Student` (adds thesisTopic). Every constructor must print a message saying which class's constructor is running. Each class must have a `display()` method that first calls its parent's `display()` using `super.display()` and then prints its own fields. In `main`, create a `GraduateStudent` and call `display()`.",
    sampleIO: "Person constructor running\nStudent constructor running\nGraduateStudent constructor running\n\nName: Aditi Rao, Age: 23\nRoll No: 4501, Course: M.Tech CSE\nThesis topic: Graph Neural Networks",
    answer: [
      "Look at the order of the constructor messages: Person, then Student, then GraduateStudent. Each constructor's first line is `super(...)`, so the chain always runs from the top of the hierarchy downwards.",
      "`super.display()` must come FIRST in each `display()` so the output reads from the general details to the specific ones.",
    ],
    solutionCode: {
      lang: "java",
      code: `class Person {
    protected String name;
    protected int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Person constructor running");
    }

    void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

class Student extends Person {
    protected int rollNo;
    protected String course;

    Student(String name, int age, int rollNo, String course) {
        super(name, age);
        this.rollNo = rollNo;
        this.course = course;
        System.out.println("Student constructor running");
    }

    @Override
    void display() {
        super.display();
        System.out.println("Roll No: " + rollNo + ", Course: " + course);
    }
}

class GraduateStudent extends Student {
    private String thesisTopic;

    GraduateStudent(String name, int age, int rollNo, String course, String thesisTopic) {
        super(name, age, rollNo, course);
        this.thesisTopic = thesisTopic;
        System.out.println("GraduateStudent constructor running");
    }

    @Override
    void display() {
        super.display();
        System.out.println("Thesis topic: " + thesisTopic);
    }
}

public class Main {
    public static void main(String[] args) {
        GraduateStudent g = new GraduateStudent("Aditi Rao", 23, 4501, "M.Tech CSE", "Graph Neural Networks");
        System.out.println();
        g.display();
    }
}`,
    },
  },
  {
    id: "m2-lab-10",
    kind: "lab",
    topic: "Inheritance",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt:
      "Create a class `Rectangle` with protected data members length and width and a method `area()`. Create a subclass `Cuboid` that adds a height, with methods `volume()` (reusing the inherited `area()`) and `surfaceArea()`. Read the three dimensions using Scanner and display the volume and the surface area.",
    sampleIO: `Enter length, width and height: 4 3 2
Volume: 24.0
Surface area: 52.0`,
    answer: [
      "`protected` lets `Cuboid` use `length` and `width` directly in `surfaceArea()`, while code outside the hierarchy still cannot touch them.",
      "`volume()` is just `area() * height` — the base-class area of the bottom face times the height. Surface area = 2 × (lw + wh + lh).",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

class Rectangle {
    protected double length;
    protected double width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    double area() {
        return length * width;
    }
}

class Cuboid extends Rectangle {
    private double height;

    Cuboid(double length, double width, double height) {
        super(length, width);
        this.height = height;
    }

    double volume() {
        return area() * height;
    }

    double surfaceArea() {
        return 2 * (length * width + width * height + length * height);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter length, width and height: ");
        double l = sc.nextDouble();
        double w = sc.nextDouble();
        double h = sc.nextDouble();

        Cuboid c = new Cuboid(l, w, h);
        System.out.println("Volume: " + c.volume());
        System.out.println("Surface area: " + c.surfaceArea());
    }
}`,
    },
  },
  {
    id: "m2-lab-11",
    kind: "lab",
    topic: "Inheritance",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Create a base class `BankAccount` with accountNo, holderName and balance, and methods `deposit(double)`, `withdraw(double)` (print `Insufficient balance` if the amount exceeds the balance) and `display()`. Create a subclass `SavingsAccount` that adds an interest rate and an `addInterest()` method, and overrides `withdraw()` so the balance can never fall below a minimum of Rs 1000. In `main`, create a savings account, deposit, make one withdrawal that is allowed and one that would break the minimum, add interest, and display the account after each step.",
    sampleIO: "SB1001 | Aditi Rao | Balance: 7000.0\nSB1001 | Aditi Rao | Balance: 4000.0\nWithdrawal refused: minimum balance of Rs 1000.0 must be maintained\nSB1001 | Aditi Rao | Balance: 4000.0\nSB1001 | Aditi Rao | Balance: 4160.0",
    answer: [
      "In the overriding `withdraw()`, check the minimum-balance rule first; if the withdrawal is allowed, delegate to the parent with `super.withdraw(amount)` instead of repeating its code.",
      "Interest is `balance * rate / 100`. Trace the balance on paper step by step before running the program — it is the quickest way to check your output.",
    ],
    solutionCode: {
      lang: "java",
      code: `class BankAccount {
    protected String accountNo;
    protected String holderName;
    protected double balance;

    BankAccount(String accountNo, String holderName, double balance) {
        this.accountNo = accountNo;
        this.holderName = holderName;
        this.balance = balance;
    }

    void deposit(double amount) {
        balance += amount;
    }

    void withdraw(double amount) {
        if (amount > balance) {
            System.out.println("Insufficient balance");
        } else {
            balance -= amount;
        }
    }

    void display() {
        System.out.println(accountNo + " | " + holderName + " | Balance: " + balance);
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate;
    private static final double MINIMUM_BALANCE = 1000;

    SavingsAccount(String accountNo, String holderName, double balance, double interestRate) {
        super(accountNo, holderName, balance);
        this.interestRate = interestRate;
    }

    @Override
    void withdraw(double amount) {
        if (balance - amount < MINIMUM_BALANCE) {
            System.out.println("Withdrawal refused: minimum balance of Rs " + MINIMUM_BALANCE + " must be maintained");
        } else {
            super.withdraw(amount);
        }
    }

    void addInterest() {
        balance += balance * interestRate / 100;
    }
}

public class Main {
    public static void main(String[] args) {
        SavingsAccount acc = new SavingsAccount("SB1001", "Aditi Rao", 5000, 4);

        acc.deposit(2000);
        acc.display();

        acc.withdraw(3000);
        acc.display();

        acc.withdraw(4500);
        acc.display();

        acc.addInterest();
        acc.display();
    }
}`,
    },
  },

  // ---------------------------------------------------------------------
  // Polymorphism
  // ---------------------------------------------------------------------
  {
    id: "m2-lab-12",
    kind: "lab",
    topic: "Polymorphism",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Create a base class `Shape` with a method `area()` that returns 0, a method `name()` that returns \"Shape\", and a method `describe()` that prints the shape's name and area. Create subclasses `Circle`, `Rectangle` and `Triangle` that override `name()` and `area()`. In `main`, create an array of `Shape` references holding one object of each subclass, use a single loop to call `describe()` on each, and finally print the total area of all the shapes.",
    sampleIO: "Circle area = 12.56\nRectangle area = 24.0\nTriangle area = 12.0\nTotal area = 48.56",
    answer: [
      "The array is declared as `Shape[]`, yet each element holds a different subclass object. `s.describe()` and `s.area()` run each object's OWN version — this is runtime polymorphism.",
      "`describe()` is written once in `Shape`; it calls `name()` and `area()`, which Java resolves to the overriding methods.",
    ],
    solutionCode: {
      lang: "java",
      code: `class Shape {
    String name() {
        return "Shape";
    }

    double area() {
        return 0;
    }

    void describe() {
        System.out.println(name() + " area = " + area());
    }
}

class Circle extends Shape {
    private double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    String name() { return "Circle"; }

    @Override
    double area() { return 3.14 * radius * radius; }
}

class Rectangle extends Shape {
    private double length, width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    @Override
    String name() { return "Rectangle"; }

    @Override
    double area() { return length * width; }
}

class Triangle extends Shape {
    private double base, height;

    Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    String name() { return "Triangle"; }

    @Override
    double area() { return 0.5 * base * height; }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Rectangle(4, 6), new Triangle(3, 8) };

        double total = 0;
        for (Shape s : shapes) {
            s.describe();
            total += s.area();
        }
        System.out.println("Total area = " + total);
    }
}`,
    },
  },
  {
    id: "m2-lab-13",
    kind: "lab",
    topic: "Polymorphism",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "An online shop accepts different payment methods. Create a base class `Payment` with a method `finalAmount(double amount)` that returns the amount unchanged and a method `getName()`. Create subclasses `CardPayment` (adds a 2% transaction fee), `UpiPayment` (a flat discount of Rs 10) and `CashOnDelivery` (adds a flat handling charge of Rs 40). Read an order amount using Scanner. Using one array of `Payment` references and one loop, display what the customer pays under each method, and finally print which method is the cheapest.",
    sampleIO: `Enter order amount: 1500
Card: 1530.0
UPI: 1490.0
Cash on delivery: 1540.0
Cheapest: UPI`,
    answer: [
      "Create the objects as `Payment[] methods = { new CardPayment(), new UpiPayment(), new CashOnDelivery() };` — one loop handles all three because they share the `Payment` type.",
      "To find the cheapest, keep a reference to the best method so far and compare `finalAmount()` values as you loop.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

class Payment {
    String getName() { return "Payment"; }

    double finalAmount(double amount) { return amount; }
}

class CardPayment extends Payment {
    @Override
    String getName() { return "Card"; }

    @Override
    double finalAmount(double amount) { return amount + amount * 0.02; }
}

class UpiPayment extends Payment {
    @Override
    String getName() { return "UPI"; }

    @Override
    double finalAmount(double amount) { return amount - 10; }
}

class CashOnDelivery extends Payment {
    @Override
    String getName() { return "Cash on delivery"; }

    @Override
    double finalAmount(double amount) { return amount + 40; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter order amount: ");
        double amount = sc.nextDouble();

        Payment[] methods = { new CardPayment(), new UpiPayment(), new CashOnDelivery() };

        Payment cheapest = methods[0];
        for (Payment p : methods) {
            double pay = p.finalAmount(amount);
            System.out.println(p.getName() + ": " + pay);
            if (pay < cheapest.finalAmount(amount)) {
                cheapest = p;
            }
        }
        System.out.println("Cheapest: " + cheapest.getName());
    }
}`,
    },
  },
  {
    id: "m2-lab-14",
    kind: "lab",
    topic: "Polymorphism",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt:
      "Write a class `AreaCalculator` with three overloaded methods named `area`: one taking a radius (circle), one taking a length and a width (rectangle), and one taking three sides (triangle, using Heron's formula). Call all three from `main` and display the results.",
    sampleIO: "Circle (r = 2): 12.56\nRectangle (5 x 3): 15.0\nTriangle (3, 4, 5): 6.0",
    answer: [
      "Overloaded methods share a name but differ in their parameter list — here 1, 2 and 3 parameters. The compiler picks the right one from the number of arguments (compile-time polymorphism).",
      "Heron's formula: with s = (a + b + c) / 2, area = `Math.sqrt(s * (s - a) * (s - b) * (s - c))`.",
    ],
    solutionCode: {
      lang: "java",
      code: `class AreaCalculator {
    double area(double radius) {
        return 3.14 * radius * radius;
    }

    double area(double length, double width) {
        return length * width;
    }

    double area(double a, double b, double c) {
        double s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}

public class Main {
    public static void main(String[] args) {
        AreaCalculator calc = new AreaCalculator();
        System.out.println("Circle (r = 2): " + calc.area(2));
        System.out.println("Rectangle (5 x 3): " + calc.area(5, 3));
        System.out.println("Triangle (3, 4, 5): " + calc.area(3, 4, 5));
    }
}`,
    },
  },
  {
    id: "m2-lab-15",
    kind: "lab",
    topic: "Polymorphism",
    marks: 3,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Create a base class `Pet` with a method `sound()`. Create subclasses `Dog` (overrides `sound()` and has an extra method `fetch()`) and `Cat` (overrides `sound()` and has an extra method `scratch()`). Store a Dog, a Cat and a plain Pet in an array of `Pet` references. Loop through the array: call `sound()` on every element and — using `instanceof` with an explicit downcast — also call `fetch()` for dogs and `scratch()` for cats.",
    sampleIO: "Woof\nDog fetches the ball\nMeow\nCat scratches the sofa\nSome generic sound",
    answer: [
      "A `Pet` reference can only see `Pet`'s methods. To call `fetch()` you must downcast: `((Dog) p).fetch()`.",
      "Test with `instanceof` first — downcasting a plain Pet to Dog would throw a `ClassCastException` at run time.",
    ],
    solutionCode: {
      lang: "java",
      code: `class Pet {
    void sound() { System.out.println("Some generic sound"); }
}

class Dog extends Pet {
    @Override
    void sound() { System.out.println("Woof"); }

    void fetch() { System.out.println("Dog fetches the ball"); }
}

class Cat extends Pet {
    @Override
    void sound() { System.out.println("Meow"); }

    void scratch() { System.out.println("Cat scratches the sofa"); }
}

public class Main {
    public static void main(String[] args) {
        Pet[] pets = { new Dog(), new Cat(), new Pet() };

        for (Pet p : pets) {
            p.sound();
            if (p instanceof Dog) {
                ((Dog) p).fetch();
            } else if (p instanceof Cat) {
                ((Cat) p).scratch();
            }
        }
    }
}`,
    },
  },

  // ---------------------------------------------------------------------
  // Abstract Classes & Interfaces
  // ---------------------------------------------------------------------
  {
    id: "m2-lab-16",
    kind: "lab",
    topic: "Abstract Classes & Interfaces",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "A training institute offers online and classroom courses. Create an abstract class `Course` with data members courseName and weeks, a constructor, an abstract method `calculateFee()`, and a concrete method `display()` that prints the course name, duration and fee. Create `OnlineCourse` (fee = Rs 1500 per week) and `ClassroomCourse` (fee = Rs 2500 per week plus a fixed Rs 3000 lab charge). In `main`, hold both objects in `Course` references and display them. Show, as a comment, the line that would not compile if you tried to create a `Course` object directly.",
    sampleIO: "Java Basics (6 weeks) - Fee: Rs 9000.0\nData Structures (8 weeks) - Fee: Rs 23000.0",
    answer: [
      "`abstract double calculateFee();` has no body — each subclass MUST supply one, or it cannot be instantiated.",
      "The constructor of an abstract class still runs, via the subclass's `super(...)` call, to set up the shared fields.",
      "`new Course(...)` is a compile-time error because Course is abstract; a `Course` REFERENCE holding a subclass object is fine.",
    ],
    solutionCode: {
      lang: "java",
      code: `abstract class Course {
    protected String courseName;
    protected int weeks;

    Course(String courseName, int weeks) {
        this.courseName = courseName;
        this.weeks = weeks;
    }

    abstract double calculateFee();

    void display() {
        System.out.println(courseName + " (" + weeks + " weeks) - Fee: Rs " + calculateFee());
    }
}

class OnlineCourse extends Course {
    OnlineCourse(String courseName, int weeks) {
        super(courseName, weeks);
    }

    @Override
    double calculateFee() {
        return weeks * 1500;
    }
}

class ClassroomCourse extends Course {
    ClassroomCourse(String courseName, int weeks) {
        super(courseName, weeks);
    }

    @Override
    double calculateFee() {
        return weeks * 2500 + 3000;
    }
}

public class Main {
    public static void main(String[] args) {
        Course c1 = new OnlineCourse("Java Basics", 6);
        Course c2 = new ClassroomCourse("Data Structures", 8);

        c1.display();
        c2.display();

        // Course c3 = new Course("Test", 1);   // compile error: Course is abstract
    }
}`,
    },
  },
  {
    id: "m2-lab-17",
    kind: "lab",
    topic: "Abstract Classes & Interfaces",
    marks: 3,
    difficulty: "Easy",
    exam: ["M2"],
    prompt:
      "Define an interface `Drawable` with a method `draw()`. Implement it in two classes, `Circle` and `Square`, each printing its own drawing message. In `main`, store both objects in an array of `Drawable` references and call `draw()` on each one in a loop.",
    sampleIO: "Drawing a circle\nDrawing a square",
    answer: [
      "Methods declared in an interface are implicitly `public`, so the implementing methods must also be declared `public` — otherwise the compiler reports weaker access.",
      "A `Drawable` reference can hold any object whose class implements `Drawable`.",
    ],
    solutionCode: {
      lang: "java",
      code: `interface Drawable {
    void draw();
}

class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

class Square implements Drawable {
    public void draw() {
        System.out.println("Drawing a square");
    }
}

public class Main {
    public static void main(String[] args) {
        Drawable[] shapes = { new Circle(), new Square() };
        for (Drawable d : shapes) {
            d.draw();
        }
    }
}`,
    },
  },
  {
    id: "m2-lab-18",
    kind: "lab",
    topic: "Abstract Classes & Interfaces",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "A railway app issues tickets. Create an abstract class `Ticket` with passenger name and distance (km), a constructor, an abstract method `calculateFare()` and a concrete method `printTicket(String type)`. Create an interface `Refundable` with a method `refundAmount()`. Implement `SleeperTicket` (fare = Rs 1.2 per km; refund = 50% of the fare) and `ACTicket` (fare = Rs 2.5 per km plus Rs 100 reservation charge; refund = 75% of the fare). Both classes must extend `Ticket` AND implement `Refundable`. In `main`, read the distance using Scanner, create one ticket of each type, and display the fare and refund for both.",
    sampleIO: `Enter distance in km: 200
Sleeper ticket for Aditi Rao (200.0 km)
Fare: Rs 240.0
Refund: Rs 120.0
AC ticket for Rohan Mehta (200.0 km)
Fare: Rs 600.0
Refund: Rs 450.0`,
    answer: [
      "A class can extend ONE class and implement MANY interfaces: `class SleeperTicket extends Ticket implements Refundable` — the `extends` part always comes first.",
      "`calculateFare()` is an abstract METHOD of the class; `refundAmount()` is an interface method, so its implementation must be `public`.",
      "Compute the refund from `calculateFare()` instead of repeating the fare formula.",
    ],
    solutionCode: {
      lang: "java",
      code: `import java.util.Scanner;

abstract class Ticket {
    protected String passenger;
    protected double distance;

    Ticket(String passenger, double distance) {
        this.passenger = passenger;
        this.distance = distance;
    }

    abstract double calculateFare();

    void printTicket(String type) {
        System.out.println(type + " ticket for " + passenger + " (" + distance + " km)");
        System.out.println("Fare: Rs " + calculateFare());
    }
}

interface Refundable {
    double refundAmount();
}

class SleeperTicket extends Ticket implements Refundable {
    SleeperTicket(String passenger, double distance) {
        super(passenger, distance);
    }

    @Override
    double calculateFare() {
        return distance * 1.2;
    }

    @Override
    public double refundAmount() {
        return calculateFare() * 0.5;
    }
}

class ACTicket extends Ticket implements Refundable {
    ACTicket(String passenger, double distance) {
        super(passenger, distance);
    }

    @Override
    double calculateFare() {
        return distance * 2.5 + 100;
    }

    @Override
    public double refundAmount() {
        return calculateFare() * 0.75;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter distance in km: ");
        double km = sc.nextDouble();

        SleeperTicket s = new SleeperTicket("Aditi Rao", km);
        ACTicket a = new ACTicket("Rohan Mehta", km);

        s.printTicket("Sleeper");
        System.out.println("Refund: Rs " + s.refundAmount());
        a.printTicket("AC");
        System.out.println("Refund: Rs " + a.refundAmount());
    }
}`,
    },
  },
  {
    id: "m2-lab-19",
    kind: "lab",
    topic: "Abstract Classes & Interfaces",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "A smartphone can play music and make calls. Define two interfaces: `MusicPlayer` (methods `play()` and `stop()`) and `Phone` (method `call(String number)`). Create a class `SmartPhone` that implements both, with a brand name and a boolean `playing` state; `stop()` should print a message saying music stopped only if music was actually playing, otherwise it should say nothing is playing. In `main`, create one SmartPhone, then refer to it through a `MusicPlayer` reference and a `Phone` reference in turn, and use them to play, stop and call.",
    sampleIO: "Pixel: nothing is playing\nPixel: music started\nPixel: calling 98200 12345\nPixel: music stopped",
    answer: [
      "`class SmartPhone implements MusicPlayer, Phone` — one class, two contracts, which is how Java gets the benefit of multiple inheritance without the Diamond Problem.",
      "Through a `MusicPlayer` reference you can only call `play()` and `stop()`; through a `Phone` reference only `call()`. The reference type decides what you can call.",
    ],
    solutionCode: {
      lang: "java",
      code: `interface MusicPlayer {
    void play();
    void stop();
}

interface Phone {
    void call(String number);
}

class SmartPhone implements MusicPlayer, Phone {
    private String brand;
    private boolean playing = false;

    SmartPhone(String brand) {
        this.brand = brand;
    }

    @Override
    public void play() {
        playing = true;
        System.out.println(brand + ": music started");
    }

    @Override
    public void stop() {
        if (playing) {
            playing = false;
            System.out.println(brand + ": music stopped");
        } else {
            System.out.println(brand + ": nothing is playing");
        }
    }

    @Override
    public void call(String number) {
        System.out.println(brand + ": calling " + number);
    }
}

public class Main {
    public static void main(String[] args) {
        SmartPhone phone = new SmartPhone("Pixel");

        MusicPlayer mp = phone;   // sees only play() and stop()
        Phone ph = phone;         // sees only call()

        mp.stop();
        mp.play();
        ph.call("98200 12345");
        mp.stop();
    }
}`,
    },
  },
  {
    id: "m2-lab-20",
    kind: "lab",
    topic: "Abstract Classes & Interfaces",
    marks: 5,
    difficulty: "Medium",
    exam: ["M2"],
    prompt:
      "Create an abstract class `Notification` with a recipient, a constructor, an abstract method `send(String message)` and a concrete method `log()` that prints `Notification prepared for <recipient>`. Create `EmailNotification` (prints `Email to <recipient>: <message>`) and `SmsNotification` (prints `SMS to <recipient>: <message>`, but cuts the message down to its first 20 characters if it is longer). In `Main`, write a static method `broadcast(Notification[] list, String message)` that logs and sends the message through every notification in the array. Test it with one email and one SMS.",
    sampleIO: "Notification prepared for aditi@example.com\nEmail to aditi@example.com: Your assignment submission is due tomorrow at 5 PM\nNotification prepared for 98200 12345\nSMS to 98200 12345: Your assignment subm",
    answer: [
      "`broadcast()` takes the ABSTRACT type as its parameter, so it works for any current or future notification type without being changed.",
      "For the SMS, test `message.length() > 20` and use `substring(0, 20)`.",
    ],
    solutionCode: {
      lang: "java",
      code: `abstract class Notification {
    protected String recipient;

    Notification(String recipient) {
        this.recipient = recipient;
    }

    abstract void send(String message);

    void log() {
        System.out.println("Notification prepared for " + recipient);
    }
}

class EmailNotification extends Notification {
    EmailNotification(String recipient) {
        super(recipient);
    }

    @Override
    void send(String message) {
        System.out.println("Email to " + recipient + ": " + message);
    }
}

class SmsNotification extends Notification {
    SmsNotification(String recipient) {
        super(recipient);
    }

    @Override
    void send(String message) {
        String shortened = message.length() > 20 ? message.substring(0, 20) : message;
        System.out.println("SMS to " + recipient + ": " + shortened);
    }
}

public class Main {
    static void broadcast(Notification[] list, String message) {
        for (Notification n : list) {
            n.log();
            n.send(message);
        }
    }

    public static void main(String[] args) {
        Notification[] list = {
            new EmailNotification("aditi@example.com"),
            new SmsNotification("98200 12345")
        };
        broadcast(list, "Your assignment submission is due tomorrow at 5 PM");
    }
}`,
    },
  },
];
