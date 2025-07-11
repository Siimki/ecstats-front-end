"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, BarChart3, Thermometer, Trophy, Users, Calendar, Clock, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StatisticsPage() {
  const [selectedStat, setSelectedStat] = useState("fastest-races")
  const [selectedYear, setSelectedYear] = useState("all")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm" className="rounded-full dark:text-white dark:border-gray-600">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold dark:text-white">Statistics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <Card className="cycling-card sticky top-8 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2 border-b dark:border-gray-700">
              <CardTitle className="text-xl flex items-center gap-2 dark:text-white">
                <BarChart3 className="h-5 w-5 text-black dark:text-white" />
                Statistics Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y dark:divide-gray-700">
                <StatCategoryItem
                  icon={<Zap className="h-4 w-4" />}
                  title="Fastest Estonian Races"
                  description="Races with highest average speeds"
                  value="fastest-races"
                  selectedValue={selectedStat}
                  onChange={setSelectedStat}
                />
                <StatCategoryItem
                  icon={<Thermometer className="h-4 w-4" />}
                  title="Hottest Estonian Races"
                  description="Races with highest temperatures"
                  value="hottest-races"
                  selectedValue={selectedStat}
                  onChange={setSelectedStat}
                />
                <StatCategoryItem
                  icon={<Trophy className="h-4 w-4" />}
                  title="Most Wins"
                  description="Riders with most race victories"
                  value="most-wins"
                  selectedValue={selectedStat}
                  onChange={setSelectedStat}
                />
                <StatCategoryItem
                  icon={<Users className="h-4 w-4" />}
                  title="Most Podiums"
                  description="Riders with most podium finishes"
                  value="most-podiums"
                  selectedValue={selectedStat}
                  onChange={setSelectedStat}
                />
                <StatCategoryItem
                  icon={<Calendar className="h-4 w-4" />}
                  title="Most Participations"
                  description="Riders with most race participations"
                  value="most-participations"
                  selectedValue={selectedStat}
                  onChange={setSelectedStat}
                />
                <StatCategoryItem
                  icon={<Clock className="h-4 w-4" />}
                  title="Longest Races"
                  description="Races with longest distances"
                  value="longest-races"
                  selectedValue={selectedStat}
                  onChange={setSelectedStat}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card className="cycling-card dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2 border-b dark:border-gray-700 flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2 dark:text-white">
                {selectedStat === "fastest-races" && <Zap className="h-5 w-5 text-black dark:text-white" />}
                {selectedStat === "hottest-races" && <Thermometer className="h-5 w-5 text-black dark:text-white" />}
                {selectedStat === "most-wins" && <Trophy className="h-5 w-5 text-black dark:text-white" />}
                {selectedStat === "most-podiums" && <Users className="h-5 w-5 text-black dark:text-white" />}
                {selectedStat === "most-participations" && <Calendar className="h-5 w-5 text-black dark:text-white" />}
                {selectedStat === "longest-races" && <Clock className="h-5 w-5 text-black dark:text-white" />}
                {selectedStat === "fastest-races" && "Fastest Estonian Races"}
                {selectedStat === "hottest-races" && "Hottest Estonian Races"}
                {selectedStat === "most-wins" && "Most Wins"}
                {selectedStat === "most-podiums" && "Most Podiums"}
                {selectedStat === "most-participations" && "Most Participations"}
                {selectedStat === "longest-races" && "Longest Races"}
              </CardTitle>

              <div className="flex items-center">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[120px] h-8 text-xs rounded-full bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Rank</th>
                      {(selectedStat === "fastest-races" ||
                        selectedStat === "hottest-races" ||
                        selectedStat === "longest-races") && (
                        <>
                          <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Race</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Date</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">
                            {selectedStat === "fastest-races" && "Avg Speed"}
                            {selectedStat === "hottest-races" && "Temperature"}
                            {selectedStat === "longest-races" && "Distance"}
                          </th>
                        </>
                      )}
                      {(selectedStat === "most-wins" ||
                        selectedStat === "most-podiums" ||
                        selectedStat === "most-participations") && (
                        <>
                          <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Rider</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Team</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">
                            {selectedStat === "most-wins" && "Wins"}
                            {selectedStat === "most-podiums" && "Podiums"}
                            {selectedStat === "most-participations" && "Participations"}
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {generateStatData(selectedStat, selectedYear).map((item, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="py-3 px-4 dark:text-white">{index + 1}</td>
                        {(selectedStat === "fastest-races" ||
                          selectedStat === "hottest-races" ||
                          selectedStat === "longest-races") && (
                          <>
                            <td className="py-3 px-4">
                              <Link href={`/races/${item.id}`} className="font-medium hover:underline dark:text-white">
                                {item.name}
                              </Link>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{item.date}</td>
                            <td className="py-3 px-4 text-right font-medium dark:text-white">
                              {selectedStat === "fastest-races" && `${item.value} km/h`}
                              {selectedStat === "hottest-races" && `${item.value}°C`}
                              {selectedStat === "longest-races" && `${item.value} km`}
                            </td>
                          </>
                        )}
                        {(selectedStat === "most-wins" ||
                          selectedStat === "most-podiums" ||
                          selectedStat === "most-participations") && (
                          <>
                            <td className="py-3 px-4">
                              <Link href={`/riders/${item.id}`} className="font-medium hover:underline dark:text-white">
                                {item.name}
                              </Link>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{item.team}</td>
                            <td className="py-3 px-4 text-right font-medium dark:text-white">{item.value}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="cycling-card dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2 border-b dark:border-gray-700">
              <CardTitle className="text-xl flex items-center gap-2 dark:text-white">
                <BarChart3 className="h-5 w-5 text-black dark:text-white" />
                Visualization
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-black dark:text-white mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Interactive chart visualization will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCategoryItem({
  icon,
  title,
  description,
  value,
  selectedValue,
  onChange,
}: {
  icon: React.ReactNode
  title: string
  description: string
  value: string
  selectedValue: string
  onChange: (value: string) => void
}) {
  const isSelected = value === selectedValue

  return (
    <button
      className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        isSelected ? "bg-gray-50 dark:bg-gray-700" : ""
      }`}
      onClick={() => onChange(value)}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isSelected
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3
            className={`font-medium ${isSelected ? "text-black dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </button>
  )
}

// Helper function to generate mock statistics data
function generateStatData(statType: string, year: string) {
  if (statType === "fastest-races") {
    // Hardcoded real data from your query
    return [
      { id: 197, name: "Filter Temposari VI etapp", date: "2022-08-13", value: 51.09 },
      { id: 205, name: "Filter Temposari III etapp", date: "2024-06-05", value: 50.47 },
      { id: 206, name: "Filter Temposari IV etapp", date: "2024-06-12", value: 50.16 },
      { id: 58,  name: "Eesti Meistrivõistlused 2022 - Mehed - Kuremaa", date: "2022-06-22", value: 50.10 },
      { id: 62,  name: "Eesti Meistrivõistlused 2024 - Mehed - Varbuse", date: "2024-06-18", value: 50.09 },
      { id: 60,  name: "Eesti Meistrivõistlused 2023 - Mehed - Viljandi", date: "2023-06-20", value: 49.63 },
      { id: 200, name: "Filter Temposari III etapp", date: "2023-05-24", value: 49.52 },
      { id: 202, name: "Filter Temposari V etapp", date: "2023-06-14", value: 49.40 },
      { id: 188, name: "Filter Temposari III etapp", date: "2021-05-19", value: 49.37 },
      { id: 195, name: "Filter Temposari IV etapp", date: "2022-06-01", value: 49.22 },
    ]
  }

  if (statType === "hottest-races") {
    return [
      { id: 107, name: "19. Rakke Rattamaraton", date: "2019-07-28", value: 31.0 },
      { id: 66,  name: "Eesti Meistrivõistlused 2022 - Mehed", date: "2022-06-26", value: 30.0 },
      { id: 250, name: "9. Tallinna Rahvasõit", date: "2019-06-08", value: 29.0 },
      { id: 117, name: "21. Mulgi Rattamaraton", date: "2021-07-17", value: 29.0 },
      { id: 60,  name: "Eesti Meistrivõistlused 2023 - Mehed - Viljandi", date: "2023-06-20", value: 29.0 },
      { id: 61,  name: "Eesti Meistrivõistlused 2023 - Naised - Viljandi", date: "2023-06-20", value: 29.0 },
      { id: 230, name: "3. Lähte Rattamaraton", date: "2017-08-12", value: 29.0 },
      { id: 252, name: "19. Elva Rattamaraton", date: "2019-07-27", value: 29.0 },
      { id: 100, name: "Škoda Laagri 18. Rakke Rattamaraton", date: "2018-07-15", value: 29.0 },
      { id: 69,  name: "Eesti Meistrivõistlused 2022 - Naised", date: "2022-06-26", value: 28.0 },
    ]
  }

  if (statType === "longest-races") {
    return [
      { id: 66, name: "Eesti Meistrivõistlused 2022 - Mehed", date: "2022-06-26", value: 164.0 },
      { id: 65, name: "Eesti Meistrivõistlused 2023 - Mehed", date: "2023-06-25", value: 162.8 },
      { id: 64, name: "Eesti Meistrivõistlused 2024 - Mehed", date: "2024-06-22", value: 158.2 },
      { id: 10, name: "34. Tartu Rattaralli", date: "2015-05-31", value: 142.0 },
      { id: 13, name: "31. Tartu Rattaralli", date: "2012-05-27", value: 137.0 },
      { id: 9,  name: "35. Tartu Rattaralli", date: "2016-05-29", value: 135.0 },
      { id: 8,  name: "36. Tartu Rattaralli", date: "2017-05-28", value: 135.0 },
      { id: 12, name: "32. Tartu Rattaralli", date: "2013-06-02", value: 135.0 },
      { id: 14, name: "30. Tartu Rattaralli", date: "2011-05-29", value: 135.0 },
      { id: 7,  name: "37. Tartu Rattaralli", date: "2018-05-27", value: 134.6 },
    ]
  }

  if (statType === "most-wins") {
    return [
      { id: 14, name: "Gert JÕEÄÄR", team: "", value: 47 },
      { id: 146, name: "Caspar AUSTA", team: "", value: 15 },
      { id: 5, name: "Markus PAJUR", team: "", value: 14 },
      { id: 3671, name: "Josten VAIDEM", team: "", value: 14 },
      { id: 3665, name: "Peeter PRUUS", team: "", value: 13 },
      { id: 9189, name: "Martin LOO", team: "", value: 11 },
      { id: 159, name: "Taavi KANNIMÄE", team: "", value: 11 },
      { id: 39, name: "Peeter TARVIS", team: "", value: 10 },
      { id: 4532, name: "Ivo SUUR", team: "", value: 10 },
      { id: 1, name: "Norman VAHTRA", team: "", value: 8 },
    ]
  }

  if (statType === "most-podiums") {
    return [
      { id: 14, name: "Gert JÕEÄÄR", team: "", value: 94 },
      { id: 39, name: "Peeter TARVIS", team: "", value: 69 },
      { id: 3671, name: "Josten VAIDEM", team: "", value: 46 },
      { id: 146, name: "Caspar AUSTA", team: "", value: 35 },
      { id: 6729, name: "Kert MARTMA", team: "", value: 24 },
      { id: 159, name: "Taavi KANNIMÄE", team: "", value: 24 },
      { id: 5, name: "Markus PAJUR", team: "", value: 23 },
      { id: 3665, name: "Peeter PRUUS", team: "", value: 23 },
      { id: 4532, name: "Ivo SUUR", team: "", value: 22 },
      { id: 9189, name: "Martin LOO", team: "", value: 21 },
    ]
  }

  if (statType === "most-participations") {
    return [
      { id: 8139, name: "Marek PANI", team: "", value: 148 },
      { id: 438,  name: "Madis SILDVEE", team: "", value: 146 },
      { id: 256,  name: "Janelle UIBOKAND", team: "", value: 145 },
      { id: 7446, name: "Rene KÜBAR", team: "", value: 143 },
      { id: 576,  name: "Hardi HEINSAR", team: "", value: 140 },
      { id: 14,   name: "Gert JÕEÄÄR", team: "", value: 137 },
      { id: 39,   name: "Peeter TARVIS", team: "", value: 130 },
      { id: 159,  name: "Taavi KANNIMÄE", team: "", value: 130 },
      { id: 7761, name: "Tarmo NEEMELA", team: "", value: 128 },
      { id: 3755, name: "Raino EINROOS", team: "", value: 126 },
    ]
  }

  return []
}
