import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PiRabbit } from "react-icons/pi";
import { LuBird } from "react-icons/lu";
import { GiTurtle } from "react-icons/gi";
import presetPrompts from "@/lib/presetPrompts";

const PopoutMenu = ({ activeMenu }) => {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(null);

  const handlePromptSelect = (index) => {
    setSelectedPromptIndex(index);
  };

  return (
    <div
      className={`absolute left-16 top-20 mt-4 ml-4 w-[25rem] h-[76%] bg-white shadow-lg p-4 border border-gray-300 rounded-lg z-10 overflow-y-auto transition-all duration-300 ease-in-out transform ${
        activeMenu ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      {activeMenu === "robot" ? (
        <>
        <h2 className="text-lg font-bold mb-2">Create a Prompt</h2>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 mt-2 text-sm font-medium">Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="model">Model</Label>
              <Select>
                <SelectTrigger
                  id="model"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genesis">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <PiRabbit className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Genesis
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="explorer">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <LuBird className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Explorer
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="quantum">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <GiTurtle className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Quantum
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">Temperature</Label>
              <Input id="temperature" type="number" placeholder="0.4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4 mt-8">
            <legend className="-ml-1 px-1 text-sm font-medium">Prompt</legend>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="You are a..."
                className="min-h-[9.5rem]"
              />
            </div>
          </fieldset>
          <div className="flex justify-center mt-2">
              <Button className="rounded-lg" type="submit">Save</Button>
            </div>
        </>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-2">Preset Prompts</h2>
          <div className="grid gap-3">
            {presetPrompts.map((preset, index) => (
              <div
                key={index}
                className={`p-2 border rounded-md hover:bg-gray-100 cursor-pointer ${
                  selectedPromptIndex === index ? "bg-gray-300" : ""
                }`}
                onClick={() => handlePromptSelect(index)}
              >
                <p className="font-medium">{preset.prompt}</p>
                <p className="text-sm text-gray-600">Model: {preset.model}</p>
                <p className="text-sm text-gray-600">Top K: {preset.topK}</p>
                <p className="text-sm text-gray-600">Top P: {preset.topP}</p>
                <p className="text-sm text-gray-600">
                  Temperature: {preset.temperature}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopoutMenu;
