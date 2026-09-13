import type { MiniProjectOption } from "@/lib/types";

export const miniProjectOptions: MiniProjectOption[] = [
  {
    id: "vehicle-rental",
    title: "Vehicle Rental Management System",
    tagline: "A fleet of cars, bikes and trucks, rented out with type-specific pricing",
    scenario:
      "A vehicle rental company needs a console program to manage its fleet and bill customers. Different vehicle types are priced differently, and the company needs to track which vehicles are available versus currently rented out.",
    requirements: [
      "A base Vehicle class holding common data: vehicle ID, model name, daily rate, and availability status.",
      "At least two subclasses (e.g. Car and Bike — a third like Truck is welcome) that extend Vehicle and each override a calculateRentalCost(int days) method with their own pricing rule (e.g. cars add a per-day insurance fee, bikes are a flat daily rate, trucks add a heavy-load surcharge).",
      "A fleet manager class (e.g. RentalCompany) holding an array or ArrayList of Vehicle objects, with functions to: add a vehicle, list all available vehicles, search by vehicle ID, and mark a vehicle as rented/returned.",
      "A simple console menu (using Scanner) that lets a user: view available vehicles, rent one for a number of days, and see the generated bill.",
      "A discount rule for long rentals — e.g. 10% off the total if a vehicle is rented for more than 7 days.",
    ],
    suggestedClasses: [
      { name: "Vehicle (abstract or base class)", note: "id, model, dailyRate, isAvailable; an abstract or overridable calculateRentalCost(int days)" },
      { name: "Car, Bike (extends Vehicle)", note: "each overrides calculateRentalCost(...) with its own pricing logic" },
      { name: "RentalCompany", note: "holds the fleet (array/ArrayList<Vehicle>), and functions like addVehicle(), listAvailable(), rentVehicle(id, days)" },
      { name: "Main", note: "a Scanner-driven menu loop tying it all together" },
    ],
    concepts: [
      "Encapsulation (private fields, getters/setters)",
      "Constructors (default + parameterized)",
      "Inheritance + method overriding",
      "Runtime polymorphism (looping over Vehicle references, each calling its own overridden calculateRentalCost)",
      "Arrays / ArrayList of objects",
      "Functions with parameters and return values",
      "Loops + conditionals for menu logic and search",
      "Scanner-based console input",
    ],
    stretchGoals: [
      "Sort the fleet by daily rate before displaying it.",
      "Add a third vehicle type (Truck) with its own pricing rule.",
      "Track total revenue earned across all rentals so far.",
    ],
  },
  {
    id: "hospital-billing",
    title: "Hospital Patient & Billing System",
    tagline: "Different patient categories, each billed by their own rule",
    scenario:
      "A small hospital wants a console program to register patients under different categories and generate their final bill at discharge. Outpatients, inpatients, and emergency cases are all billed differently.",
    requirements: [
      "A base Patient class holding common data: patient ID, name, age, and number of days admitted (0 for a same-day visit).",
      "At least two subclasses (e.g. OPDPatient — billed per consultation, and IPDPatient — billed per day plus a room charge; a third like EmergencyPatient is welcome) that override a calculateBill() method with their own billing rule.",
      "A Hospital class holding an array or ArrayList of Patient objects, with functions to: register a new patient, list all currently admitted patients, search by patient ID, and generate a discharge bill.",
      "A simple console menu (using Scanner) to register patients and print bills.",
      "A discount rule for long admissions — e.g. a 5% reduction on the room charges for an IPD patient admitted more than 5 days.",
    ],
    suggestedClasses: [
      { name: "Patient (abstract or base class)", note: "id, name, age, daysAdmitted; an abstract or overridable calculateBill()" },
      { name: "OPDPatient, IPDPatient (extends Patient)", note: "each overrides calculateBill() with its own rule (consultation fee vs. per-day + room charge)" },
      { name: "Hospital", note: "holds all patients (array/ArrayList<Patient>), with registerPatient(), listPatients(), dischargePatient(id)" },
      { name: "Main", note: "a Scanner-driven menu loop tying it all together" },
    ],
    concepts: [
      "Encapsulation (private fields, getters/setters)",
      "Constructors (default + parameterized)",
      "Inheritance + method overriding",
      "Runtime polymorphism (looping over Patient references, each calling its own overridden calculateBill)",
      "Arrays / ArrayList of objects",
      "Functions with parameters and return values",
      "Loops + conditionals for menu logic and search",
      "Scanner-based console input",
    ],
    stretchGoals: [
      "Add a Doctor class associated with each patient (name + specialization) to practice a plain association relationship.",
      "Add a third patient category, e.g. EmergencyPatient, with a flat emergency fee plus treatment cost.",
      "Print a summary report of total hospital revenue across all discharged patients.",
    ],
  },
];
