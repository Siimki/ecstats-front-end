"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


  
export default function RacesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock data - in a real app, this would come from an API with pagination
  const races = generateMockRaces(30)

  // Filter races based on search term and category
  const filteredRaces = races.filter((race) => {
    const matchesSearch = race.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || race.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const itemsPerPage = 20
  const totalPages = Math.ceil(filteredRaces.length / itemsPerPage)
  const paginatedRaces = filteredRaces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm" className="rounded-full dark:text-white dark:border-gray-600">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold dark:text-white">Races</h1>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search races..."
            className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value)
              setCurrentPage(1) // Reset to first page on filter change
            }}
          >
            <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="CAT A">CAT A</SelectItem>
              <SelectItem value="CAT B">CAT B</SelectItem>
              <SelectItem value="CAT C">CAT C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {paginatedRaces.map((race) => (
          <RaceCard key={race.id} race={race} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full dark:text-white dark:border-gray-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1
                // Show limited page numbers with ellipsis for better UX
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="rounded-full w-8 h-8 p-0 dark:text-white dark:border-gray-600"
                    >
                      {page}
                    </Button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="dark:text-white">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full dark:text-white dark:border-gray-600"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function RaceCard({ race }: { race: any }) {
  return (
    <Card className="cycling-card hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="dark:text-white">{race.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Category: {race.category}</p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Date: {race.date.toLocaleDateString()}</p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Temperature: {race.temperature}°C</p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Participants: {race.participantCount}</p>
          </div>
          {/* Link to the race details page */}
          <Link href={`/races/${race.id}`}>
            <div className="border-2 border-black dark:border-white w-12 h-12 flex items-center justify-center rotate-45 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <span className="text-xl -rotate-45 dark:text-white">P</span>
            </div>
          </Link>
        </div>

        <h4 className="font-semibold mb-2 dark:text-white">Results:</h4>
        <ul className="space-y-1">
          {race.topResults.map((result: any, index: number) => (
            <li key={index} className="dark:text-gray-300">
              {index + 1}.{" "}
              <Link href={`/riders/${result.riderId}`} className="hover:underline text-primary dark:text-blue-400">
                {result.riderName}
              </Link>{" "}
              {result.team} - {result.time}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <Link href={`/races/${race.id}`}>
            <Button
              variant="outline"
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:text-white dark:border-gray-600"
            >
              View full results
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to generate mock race data
function generateMockRaces(count: number) {
  const raceNames = [
    "Johvika Laada rattarralli",
    "Tartu GP",
    "Tallinna Kriteerium",
    "Pärnu Rannarada",
    "Saaremaa Ring",
    "Otepää Mägede Ralli",
    "Viljandi Järve Ring",
    "Narva Piiri Sõit",
    "Haapsalu Rannarada",
    "Kuressaare Kriteerium",
  ]

  const teams = ["HWX", "KJK", "VRK", "CFC", "VEL", "MTM"]
  const categories = ["CAT A", "CAT B", "CAT C"]

  return Array.from({ length: count }, (_, i) => {
    const id = i + 1
    const nameIndex = i % raceNames.length
    const participantCount = [7, 500, 3000, 120, 250, 80, 1500][i % 7]
    const temperature = Math.floor(Math.random() * 15) + 10 // 10-25°C

    // Generate top 5 results
    const topResults = Array.from({ length: 5 }, (_, j) => {
      const minutes = 60 + j * 2 + Math.floor(Math.random() * 2)
      const seconds = Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")

      return {
        riderId: id * 10 + j,
        riderName: `Rider ${id * 10 + j}`,
        team: teams[j % teams.length],
        time: `${minutes}:${seconds}`,
      }
    })

    return {
      id,
      name: raceNames[nameIndex],
      date: new Date(2025, 5 + (i % 5), 10 + (i % 20)),
      category: categories[i % categories.length],
      temperature,
      participantCount,
      topResults,
    }
  })
}
