"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RiderResult } from "@/lib/types";

type RiderResultsTableProps = {
  results: RiderResult[];
};

export default function RiderResultsTable({ results }: RiderResultsTableProps) {
  // Get all unique years
  const years = useMemo(
    () => Array.from(new Set(results.map(r => r.season))).sort((a, b) => b - a),
    [results]
  );
  const [selectedYear, setSelectedYear] = useState<number>(years[0] || new Date().getFullYear());

  // Filter results
  const filteredResults = results.filter(r => r.season === selectedYear);

  return (
    <>
    <CardHeader className="pb-2 border-b flex flex-row items-center justify-between">
      <CardTitle className="text-xl flex items-center gap-2">
        <Trophy className="h-5 w-5 text-black" />
        Results
      </CardTitle>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Year:</span>
        <Select value={selectedYear.toString()} onValueChange={val => setSelectedYear(Number(val))}>
          <SelectTrigger className="w-[100px] h-8 text-xs rounded-full bg-white">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Race</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Type</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-600">Position</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result, idx) => (
              <tr key={idx} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                {result.date ? result.date.split('-').slice(1).reverse().join('.') : ''}
                </td>
                <td className="py-3 px-4">
                  <Link href={`/races/${result.raceId ?? idx}`} className="font-medium text-black hover:underline">
                    {result.race}  
                     <span className="ml-1 text-gray-600 font-normal">
                        ({result.category})
                     </span>
                  </Link>
                </td>
                <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {result.type}
                    </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold shadow-sm
                        ${
                        result.position === 1
                            ? "bg-yellow-300/70 text-yellow-900 border border-yellow-300"
                            : result.position === 2
                            ? "bg-gray-300 text-gray-800 border border-gray-400"
                            : result.position === 3
                            ? "bg-amber-500/70 text-amber-900 border border-amber-600" : ""
                        }
                    `}>
                        {result.position}
                    </span>
                </td>

                <td className="py-3 px-4 text-right font-medium">{result.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
  );
}
