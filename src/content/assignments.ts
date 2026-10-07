import type { Assignment } from "@/lib/types";

// Assignments 1 and 2 replace Lab Experiments 5 (exception handling) and
// 6 (file handling) from the lab syllabus. Sample runs below come from
// compiling and executing reference solutions.

export const submissionRules: string[] = [
  "**One document per assignment** (PDF or Word), uploaded on Microsoft Teams under the matching assignment. Suggested file name: `A1_<RollNo>_<Name>` or `A2_<RollNo>_<Name>`.",
  "**Paste the complete source code as text** inside the document for every program — not as a screenshot.",
  "**Every output screenshot must be a full-screen capture.** Your entire desktop, not a cropped window, with the **system clock (date and time) visible** in the taskbar.",
  "**Each screenshot must prove you compiled and ran the program yourself.** On the command line, the `javac` command, the `java` command and the output must all be visible together. In an IDE, the editor with your code and the Run/console output must be visible together.",
  "**Print your full name and roll number as the first line of every program's output**, so it appears in every screenshot.",
  "**All screenshots will be thoroughly checked.** Cropped screenshots, screenshots without the time, output that does not match the code, or screenshots that do not show the program being compiled and run will not be accepted as proof of execution.",
];

export const assignments: Assignment[] = [
  {
    id: "assignment-1",
    number: 1,
    title: "Exception Handling",
    topic: "Replaces Lab Experiment 5",
    marks: 5,
    summary:
      "Three short programs on handling errors in Java: built-in exceptions, throw and throws, and a user-defined exception.",
    concepts: [
      "try / catch / finally",
      "ArithmeticException",
      "InputMismatchException",
      "throw vs throws",
      "Checked vs unchecked exceptions",
      "User-defined exceptions (extends Exception)",
    ],
    parts: [
      {
        id: "A",
        title: "Safe Division",
        statement:
          "Write a program that reads two integers using `Scanner` and prints the result of dividing the first by the second.",
        requirements: [
          "If the denominator is zero, catch the `ArithmeticException` and print a clear message instead of letting the program crash.",
          "If the user types something that is not a whole number, catch the `InputMismatchException` and print a clear message.",
          "Add a `finally` block that prints `Division attempt finished` every time, whether or not an error occurred.",
        ],
        screenshots: [
          "A normal division (for example 20 divided by 4).",
          "Division by zero.",
          "Non-numeric input (for example typing `abc`).",
        ],
        sampleRun: `Name: <your full name> | Roll No: <your roll no>
Enter numerator: 20
Enter denominator: 0
Error: Division by zero is not allowed.
Division attempt finished`,
      },
      {
        id: "B",
        title: "Eligibility Check",
        statement:
          "Write a method `checkEligibility(int age)` that checks whether a person is eligible to vote (age 18 or above). If the age is below 18, the method must throw an `Exception` whose message tells the person how many more years they must wait.",
        requirements: [
          "Declare the method with the `throws` keyword, and use `throw` inside it.",
          "In `main`, read the age with `Scanner` and call the method inside a `try-catch` block. Print the exception's message when it is thrown, and print `Eligible to vote` otherwise.",
        ],
        screenshots: ["An age of 18 or above.", "An age below 18."],
        sampleRun: `Name: <your full name> | Roll No: <your roll no>
Enter age: 15
Not eligible to vote. Wait 3 more year(s).`,
      },
      {
        id: "C",
        title: "Insufficient Balance",
        statement:
          "Create a user-defined exception class `InsufficientBalanceException` that extends `Exception`. It must store the *shortfall* (the requested amount minus the available balance) and expose it through a getter.",
        requirements: [
          "Create a `BankAccount` class with an account number, holder name and balance, and a `withdraw(double amount)` method that throws `InsufficientBalanceException` when the amount is more than the balance. (You may reuse your Bank Account class from Lab Experiment 3.)",
          "In `main`, create an account with an opening balance, read a withdrawal amount from the user, and call `withdraw`.",
          "If the withdrawal succeeds, print the new balance. If it fails, catch the exception and print its message together with the shortfall.",
          "A `finally` block must print `Transaction ended` in both cases.",
        ],
        screenshots: ["A withdrawal that succeeds.", "A withdrawal that fails and shows the shortfall."],
        sampleRun: `Name: <your full name> | Roll No: <your roll no>
Enter withdrawal amount: 8000
Insufficient balance. Short by: 3000.0
Transaction ended`,
      },
    ],
  },
  {
    id: "assignment-2",
    number: 2,
    title: "File Handling",
    topic: "Replaces Lab Experiment 6",
    marks: 5,
    summary:
      "Two programs that work with files: copy an image using byte streams, and process a text file using buffered reading.",
    concepts: [
      "Byte streams: FileInputStream and FileOutputStream",
      "Copying through a byte[] buffer",
      "BufferedReader and FileReader",
      "FileNotFoundException and IOException",
      "Closing streams (finally or try-with-resources)",
    ],
    parts: [
      {
        id: "A",
        title: "Copy an Image",
        statement:
          "Write a program that copies an image file (any `.jpg` or `.png` of your choice) from one location to another using byte-oriented streams.",
        requirements: [
          "Read the source path and the destination path from the user with `Scanner`.",
          "Use `FileInputStream` and `FileOutputStream`, copying through a `byte[]` buffer rather than one byte at a time.",
          "After copying, print the number of bytes copied, and print the size of the source file next to the size of the copy so the two can be compared.",
          "Handle `FileNotFoundException` and `IOException` with meaningful messages, and make sure both streams are closed (in a `finally` block or with try-with-resources).",
        ],
        screenshots: [
          "The program running successfully, showing the bytes copied and both file sizes.",
          "A full-screen File Explorer window showing the original image and the copy side by side in Details view (so the sizes are visible), with the clock visible.",
          "A run with a wrong source path, showing your error message instead of a crash.",
        ],
        sampleRun: `Name: <your full name> | Roll No: <your roll no>
Enter source image path: photo.png
Enter destination path: photo_copy.png
Copied 20169 bytes.
Source size: 20169 bytes | Copy size: 20169 bytes`,
      },
      {
        id: "B",
        title: "Word Count and Search",
        statement:
          "Create a text file named `notes.txt` containing at least 5 lines of your own writing; the first line must be your name and roll number. Write a program that processes this file using buffered reading.",
        requirements: [
          "Write a method `countWords(String path)` that reads the file with `BufferedReader` and returns the total number of words.",
          "Write a method `searchWord(String path, String word)` that reports how many times the word occurs (ignoring case) and on which line numbers.",
          "In `main`, read the word to search for from the user, then display the total word count and the search result. Handle `FileNotFoundException` and `IOException`.",
        ],
        screenshots: [
          "A search for a word that is present in the file.",
          "A search for a word that is not in the file.",
          "A full-screen screenshot of `notes.txt` open in a text editor, with the clock visible.",
        ],
        sampleRun: `Name: <your full name> | Roll No: <your roll no>
Total words: 31
Enter word to search: java
'java' found 3 time(s) on line(s): [2, 4, 5]`,
      },
    ],
  },
];
