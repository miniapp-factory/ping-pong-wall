"use client";

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Question {
  text: string;
  options: { text: string; animal: Animal }[];
}

const questions: Question[] = [
  {
    text: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
  {
    text: "Which activity do you enjoy most?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting", animal: "fox" },
      { text: "Running in a wheel", animal: "hamster" },
      { text: "Riding", animal: "horse" },
    ],
  },
  {
    text: "What is your preferred environment?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    text: "How do you like to communicate?",
    options: [
      { text: "Purrs", animal: "cat" },
      { text: "Barks", animal: "dog" },
      { text: "Whines", animal: "fox" },
      { text: "Squeaks", animal: "hamster" },
      { text: "Neighs", animal: "horse" },
    ],
  },
  {
    text: "What is your personality like?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Clever", animal: "fox" },
      { text: "Energetic", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Animal[]>([]);
  const [result, setResult] = useState<Animal | null>(null);

  const handleAnswer = (animal: Animal) => {
    const newAnswers = [...answers, animal];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const scores: Record<Animal, number> = {
        cat: 0,
        dog: 0,
        fox: 0,
        hamster: 0,
        horse: 0,
      };
      newAnswers.forEach((a) => {
        scores[a] += 1;
      });
      const max = Math.max(...Object.values(scores));
      const topAnimals = Object.entries(scores)
        .filter(([, v]) => v === max)
        .map(([k]) => k as Animal);
      setResult(topAnimals[0]); // pick first if tie
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const imageSrc = `/${result}.png`;
    const animalNames: Record<Animal, string> = {
      cat: "Cat",
      dog: "Dog",
      fox: "Fox",
      hamster: "Hamster",
      horse: "Horse",
    };
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">
          You are most similar to a {animalNames[result]}!
        </h2>
        <img
          src={imageSrc}
          alt={animalNames[result]}
          width={512}
          height={512}
          className="size-[512px]"
        />
        <Share text={`I am a ${animalNames[result]}! ${url}`} />
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = questions[current];
  const shuffledOptions = shuffleArray(question.options);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{question.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt.animal)}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
