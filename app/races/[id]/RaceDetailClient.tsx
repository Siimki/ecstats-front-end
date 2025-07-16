"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Trophy,
  Users,
  Clock,
  Mountain,
  Flag,
  Info,
  Download,
  Search,
  ChevronRight,
  X,
  Check,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { RaceProfile } from "@/lib/types"

export default function RaceDetailClient({ raceData }: { raceData: RaceProfile }) {

  const raceDate = new Date(raceData.race.startTime)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const allResults = raceData.results.map(r => ({
    position: r.position === 0 ? "DNF" : r.position,
    riderId: r.riderId,
    rider: r.riderName,
    team: r.team,
    time: r.time ?? "-",
    points: r.points,
  }))

  const allTeams = useMemo(() => {
    const teams = new Set<string>()
    allResults.forEach((result) => teams.add(result.team))
    return Array.from(teams).sort()
  }, [allResults])

  const filteredResults = useMemo(() => {
    return allResults.filter((result) => {
      const riderName = result.rider ?? ""
      const teamName = result.team ?? ""
      const matchesSearch =
        riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teamName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTeam = selectedTeams.length === 0 || selectedTeams.includes(teamName)
      return matchesSearch && matchesTeam
    })
  }, [allResults, searchTerm, selectedTeams])

  const itemsPerPage = 100
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage)
  const paginatedResults = filteredResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleTeam = (team: string) => {
    setSelectedTeams((prev) => (prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]))
    setCurrentPage(1)
  }

  const clearTeamFilters = () => {
    setSelectedTeams([])
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> Back to home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <Card className="cycling-card sticky top-8">
              <div className="h-40 mono-gradient-dark flex items-center justify-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white text-center px-4">{raceData.race.name}</h1>
              </div>
              <CardContent className="p-6 space-y-4">
                <RaceInfo icon={<Calendar />} label="Date"   value={new Date(raceData.race.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })} />
                <RaceInfo icon={<Trophy />} label="Category" value={raceData.race.category} />
                <RaceInfo icon={<MapPin />} label="Location" value={raceData.race.location} />
                <RaceInfo icon={<span>🌡️</span>} label="Temperature" value={`${raceData.race.temperature}°C`} />
                <RaceInfo icon={<Users />} label="Participants" value={String(raceData.race.totalParticipants)} />
                <div className="pt-6 border-t">
                  <h3 className="font-bold mb-4 text-lg">Race Details</h3>
                  <RaceInfo icon={<Mountain />} label="Distance / Elevation" value={`${raceData.race.distance} km / ${raceData.race.elevation} m`} />
                  <RaceInfo icon={<Flag />} label="Surface" value={raceData.race.roughness ?? "Unknown"} />
                  <RaceInfo icon={<Clock />} label="Start Time" value={"Unknown"} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-8">
            <Tabs defaultValue="all" onValueChange={(value) => {
              setActiveTab(value)
              setCurrentPage(1)
              setSearchTerm("")
              setSelectedTeams([])
            }}>
              <div className="p-4 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <TabsList className="bg-white dark:bg-gray-800 shadow rounded-full p-1">
                    {['all', 'men', 'women', 'juniors'].map(tab => (
                      <TabsTrigger key={tab} value={tab} className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-gray-900">
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search riders or teams..."
                        className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setCurrentPage(1)
                        }}
                      />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                          <Filter className="h-4 w-4" />
                          <span>Teams</span>
                          {selectedTeams.length > 0 && (
                            <Badge variant="secondary" className="ml-1 rounded-full h-5 px-1.5 bg-gray-200 dark:bg-gray-700">
                              {selectedTeams.length}
                            </Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 max-h-[60vh] overflow-auto">
                        <DropdownMenuLabel>Filter by Team</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {allTeams.map((team) => (
                          <DropdownMenuCheckboxItem
                            key={team}
                            checked={selectedTeams.includes(team)}
                            onCheckedChange={() => toggleTeam(team)}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="truncate">{team}</span>
                              {selectedTeams.includes(team) && <Check className="h-4 w-4 ml-2" />}
                            </div>
                          </DropdownMenuCheckboxItem>
                        ))}
                        {selectedTeams.length > 0 && (
                          <>
                            <DropdownMenuSeparator />
                            <div className="px-2 py-1.5">
                              <Button variant="ghost" size="sm" onClick={clearTeamFilters} className="w-full text-xs h-8 rounded-sm">
                                Clear all filters
                              </Button>
                            </div>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {selectedTeams.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedTeams.map((team) => (
                      <Badge key={team} variant="secondary" className="flex items-center gap-1 px-2 py-1 rounded-full dark:bg-gray-800">
                        {team}
                        <button onClick={() => toggleTeam(team)} className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" onClick={clearTeamFilters} className="text-xs h-6 px-2 rounded-full">
                      Clear all
                    </Button>
                  </div>
                )}
              </div>

              <TabsContent value="all" className="mt-0">
                <ResultsTable
                  results={paginatedResults}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalResults={filteredResults.length}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

function RaceInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
      <div className="h-5 w-5 text-black dark:text-white">{icon}</div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        <div className="font-medium dark:text-white">{value}</div>
      </div>
    </div>
  )
}

function ResultsTable({
  results,
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
}: {
  results: any[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalResults: number
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-white dark:bg-gray-800">
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="text-left py-2 px-3 text-sm font-semibold">Pos</th>
              <th className="text-left py-2 px-3 text-sm font-semibold">Rider</th>
              <th className="text-left py-2 px-3 text-sm font-semibold">Team</th>
              <th className="text-center py-2 px-3 text-sm font-semibold">Time</th>
              <th className="text-right py-2 px-3 text-sm font-semibold">Points</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border-b last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
               <td className="py-1.5 px-3 text-sm">
  <span
    className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${
      result.position === 1
        ? "w-7 h-7 rounded-full bg-yellow-300/70 text-yellow-900 flex items-center justify-center font-semibold text-base shadow-sm border border-yellow-300"
        : result.position === 2
        ? "w-7 h-7 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-semibold text-base shadow-sm border border-gray-400"
        : result.position === 3
        ? "w-7 h-7 rounded-full bg-amber-500/70 text-amber-900 flex items-center justify-center font-semibold text-base shadow-sm border border-amber-600"
        : "bg-white text-black border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-500"
    }`}
  >
  {result.position}
  </span>
</td>

                <td className="py-1.5 px-3 text-sm">
                  <Link href={`/riders/${result.riderId}`} className="font-medium text-black dark:text-white hover:underline">
                    {result.rider}
                  </Link>
                </td>
                <td className="py-1.5 px-3 text-sm">
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                    {result.team}
                  </span>
                </td>
                <td className="py-1.5 px-3 text-center font-mono text-sm dark:text-white">{result.time}</td>
                <td className="py-1.5 px-3 text-right font-medium text-sm dark:text-white">{result.points}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No results match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
          Showing {results.length > 0 ? (currentPage - 1) * 100 + 1 : 0} to {Math.min(currentPage * 100, totalResults)} of {totalResults} results
        </div>

        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="rounded-full dark:text-white dark:border-gray-600">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => onPageChange(page)} className="rounded-full w-8 h-8 p-0 dark:text-white dark:border-gray-600">
                    {page}
                  </Button>
                )
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="dark:text-white">...</span>
              }
              return null
            })}
            <Button variant="outline" size="sm" onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-full dark:text-white dark:border-gray-600">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
