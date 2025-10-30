"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "How much do you enjoy writing code and building software?",
  "Do you enjoy designing user interfaces and improving user experiences?",
  "How interested are you in analyzing data and drawing insights?",
  "Do you enjoy managing and maintaining servers or backend systems?",
  "How fascinated are you by AI, machine learning, and emerging technologies?",
  "Are you keen on cybersecurity and protecting systems from threats?",
  "Do you enjoy planning, organizing, and guiding projects as a product manager?",
  "How interested are you in automating workflows and optimizing deployments?",
];

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(Math.round(((current + 1) / questions.length) * 100));
  }, [current]);

  const handleChange = (val: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = val;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => current < questions.length - 1 && setCurrent(current + 1);
  const prevQuestion = () => current > 0 && setCurrent(current - 1);

  const handleSubmit = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/results");
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Subtle floating glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[var(--accent-dim)] rounded-full blur-[150px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--accent-dim)] rounded-full blur-[180px] opacity-40 animate-pulse"></div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-10 text-[var(--accent)] drop-shadow-[0_0_12px_rgba(0,255,255,0.4)] text-center"
      >
        Career Path Quiz
      </motion.h2>

      {/* Progress Bar */}
      <div className="w-full max-w-lg bg-gray-900/60 border border-gray-700/60 rounded-2xl p-6 shadow-lg backdrop-blur-md mb-8 card">
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-3 bg-[var(--accent)] rounded-full shadow-[0_0_15px_var(--accent-dim)]"
          ></motion.div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-3 font-medium tracking-wide">
          Question {current + 1} of {questions.length} ({progress}%)
        </p>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-lg relative h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 card bg-gray-900/70 border border-gray-700/70 text-gray-100 p-8 shadow-xl backdrop-blur-xl flex flex-col justify-between text-center"
          >
            <p className="font-semibold text-lg leading-relaxed tracking-wide">
              {questions[current]}
            </p>

            <input
              type="range"
              min={0}
              max={10}
              value={answers[current]}
              onChange={(e) => handleChange(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer mt-5 h-2 bg-gray-700 rounded-lg appearance-none"
            />
            <div className="text-right text-sm text-gray-400 mt-2">{answers[current]}</div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevQuestion}
                disabled={current === 0}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  current === 0
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black shadow-[0_0_15px_var(--accent-dim)]"
                }`}
              >
                Previous
              </button>

              {current < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  disabled={answers[current] === 0}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    answers[current] === 0
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-[var(--accent)] text-black hover:scale-105 shadow-[0_0_20px_var(--accent-dim)]"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={answers.includes(0)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    answers.includes(0)
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-black hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  }`}
                >
                  See Results
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
