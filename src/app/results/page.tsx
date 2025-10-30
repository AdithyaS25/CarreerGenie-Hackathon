"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type StaticRole = {
  role: string;
  description: string;
  skills: string[];
  resources: string[];
};

export default function ResultsPage() {
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<string | StaticRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [topRoles, setTopRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const answers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");

        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });

        const data = await res.json();
        if (data.roadmap) {
          setRoadmap(data.roadmap);
          setIsFallback(data.llmFailed);
          setTopRoles(data.topRoles || []);

          if (data.topRoles?.length === 1) setSelectedRole(data.topRoles[0]);
        } else {
          setRoadmap([{ role: "N/A", description: "No roadmap found", skills: [], resources: [] }]);
          setIsFallback(true);
        }
      } catch (err) {
        console.error(err);
        setRoadmap([{ role: "N/A", description: "Error fetching roadmap", skills: [], resources: [] }]);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  const renderRoadmap = () => {
    if (typeof roadmap === "string") {
      return <p className="text-gray-300 whitespace-pre-line">{roadmap}</p>;
    } else if (Array.isArray(roadmap) && selectedRole) {
      const roleData = roadmap.find((r: StaticRole) => r.role === selectedRole);
      if (!roleData) return null;

      return (
        <div>
          <h3 className="text-2xl font-bold mb-3 text-[var(--accent)]">{roleData.role}</h3>
          <p className="mb-4 text-gray-300">{roleData.description}</p>

          <p className="font-semibold text-gray-100">Skills:</p>
          <ul className="list-disc list-inside mb-4 text-gray-400">
            {roleData.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <p className="font-semibold text-gray-100">Resources:</p>
          <ul className="list-disc list-inside text-[var(--accent)]">
            {roleData.resources.map((r) => (
              <li key={r}>
                <a href={r} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  {r}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[var(--accent-dim)] rounded-full blur-[150px] opacity-40 animate-pulse"></div>

      <h2 className="text-5xl font-bold mb-10 text-[var(--accent)] drop-shadow-[0_0_12px_var(--accent-dim)] text-center">
        Your Career Roadmap
      </h2>

      <Card className="w-full max-w-2xl p-6">
        {loading ? (
          <p className="text-center text-gray-400">Generating your roadmap...</p>
        ) : (
          <div>
            {isFallback && (
              <p className="text-sm text-red-500 mb-4 text-center font-semibold">
                ⚠ Using static fallback roadmap
              </p>
            )}

            {topRoles.length > 1 && (
              <div className="mb-4">
                <label className="font-semibold mr-2 text-gray-200">Select Role:</label>
                <select
                  value={selectedRole || ""}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
                >
                  <option value="">--Choose--</option>
                  {topRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {renderRoadmap()}

            <Button onClick={() => router.push("/quiz")} className="mt-6 w-full">
              Retake Quiz
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
