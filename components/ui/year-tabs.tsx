"use client";

import { useState, useRef, useEffect } from "react";

export function MoreYearsTrigger({
  years,
  onSelect,
}: {
  years: number[];
  onSelect: (year: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 py-1.5 text-sm font-medium rounded-full hover:bg-white transition"
      >
        More ⌄
      </button>
      {open && (
        <div className="absolute top-full mt-2 right-0 z-10 bg-white border rounded-md shadow-lg">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => {
                onSelect(year.toString());
                setOpen(false);
              }}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
