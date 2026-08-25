import type { Unit } from "@/lib/types";
import { unit1Topics } from "./unit1";
import { unit2Topics } from "./unit2";

export const units: Unit[] = [
  {
    id: "unit-1",
    number: 1,
    title: "Introduction & Foundations",
    subtitle: "OOP vs procedural, classes, objects, strings, arrays & control flow",
    duration: 6,
    color: "brand",
    topics: unit1Topics,
  },
  {
    id: "unit-2",
    number: 2,
    title: "The Four Pillars & Class Modelling",
    subtitle: "Encapsulation, abstraction, constructors, inheritance, polymorphism, UML",
    duration: 8,
    color: "cyan",
    topics: unit2Topics,
  },
  {
    id: "unit-3",
    number: 3,
    title: "Abstract Classes & Interfaces",
    subtitle: "Abstract classes, interfaces, inner classes, wrapper classes",
    duration: 6,
    color: "violet",
    topics: [],
    locked: true,
  },
  {
    id: "unit-4",
    number: 4,
    title: "Language Evolution & Design Patterns",
    subtitle: "Generics, lambdas, streams, Singleton, Composite, Decorator, Observer, State, Strategy",
    duration: 6,
    color: "emerald",
    topics: [],
    locked: true,
  },
  {
    id: "unit-5",
    number: 5,
    title: "Exceptions & I/O Streams",
    subtitle: "Try-catch-finally, custom exceptions, byte & character streams, file handling",
    duration: 4,
    color: "rose",
    topics: [],
    locked: true,
  },
];

export function getUnit(unitId: string) {
  return units.find((u) => u.id === unitId);
}

export function getTopic(unitId: string, topicId: string) {
  const unit = getUnit(unitId);
  return unit?.topics.find((t) => t.id === topicId);
}

export function getAdjacentTopics(unitId: string, topicId: string) {
  const unit = getUnit(unitId);
  if (!unit) return { prev: null, next: null, unit: null };
  const idx = unit.topics.findIndex((t) => t.id === topicId);
  return {
    unit,
    prev: idx > 0 ? unit.topics[idx - 1] : null,
    next: idx < unit.topics.length - 1 ? unit.topics[idx + 1] : null,
  };
}

export function totalTopicCount() {
  return units.reduce((sum, u) => sum + u.topics.length, 0);
}

export function totalQuizCount() {
  return units.reduce((sum, u) => sum + u.topics.reduce((s, t) => s + t.quiz.length, 0), 0);
}
