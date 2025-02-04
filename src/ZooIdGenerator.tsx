import React, { useState, useEffect } from "react";
import { generateId, GenerateIdOptions, CaseStyle } from "zoo-ids";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Defaults in constants (using consistent UPPERCASE_SNAKE_CASE)
const DEFAULT_NUM_ADJECTIVES: number = 1;
const DEFAULT_DELIMITER: string = "_";
const DEFAULT_CASE_STYLE: CaseStyle = "lowercase";

const CASE_STYLE_OPTIONS: CaseStyle[] = [
  "lowercase",
  "uppercase",
  "titlecase",
  "camelcase",
  "togglecase",
];

const ZooIdGenerator: React.FC = () => {
  // State variables for inputs
  const [seed, setSeed] = useState<string>("");
  const [numAdjectives, setNumAdjectives] = useState<number>(DEFAULT_NUM_ADJECTIVES);
  const [delimiter, setDelimiter] = useState<string>(DEFAULT_DELIMITER);
  const [caseStyle, setCaseStyle] = useState<CaseStyle>(DEFAULT_CASE_STYLE);
  const [generatedName, setGeneratedName] = useState<string>("");
  // For copying feedback
  const [copied, setCopied] = useState<boolean>(false);

  // Regenerate whenever any input changes
  useEffect(() => {
    // If seed is empty, pass null to generateId
    const seedOrNull: string | null = seed.trim() === "" ? null : seed.trim();
    const options: GenerateIdOptions = {
      numAdjectives,
      delimiter,
      caseStyle,
    };
    const newName: string = generateId(seedOrNull, options);
    setGeneratedName(newName);
  }, [seed, numAdjectives, delimiter, caseStyle]);

  // Copy the generated name on click
  const handleCopy = (): void => {
    if (!generatedName) return;
    navigator.clipboard.writeText(generatedName);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Label className="mb-1">Seed</Label>
            <Input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Enter seed (optional)"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Number of Adjectives</Label>
            <Input
              type="number"
              min={0}
              value={numAdjectives}
              onChange={(e) => setNumAdjectives(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Delimiter</Label>
            <Input
              type="text"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              placeholder="Enter delimiter"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-1">Case Style</Label>
            <select
              className="rounded-md border border-gray-300 p-2"
              value={caseStyle}
              onChange={(e) => setCaseStyle(e.target.value as CaseStyle)}
            >
              {CASE_STYLE_OPTIONS.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          {generatedName && (
            <>
              <Label className="font-bold text-lg">Generated Name</Label>
              <div
                onClick={handleCopy}
                className="font-mono text-lg cursor-pointer p-2 bg-gray-100 rounded-md text-center"
              >
                {generatedName}
              </div>
              {copied && (
                <div className="text-sm text-green-600 text-center">Copied!</div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ZooIdGenerator;
