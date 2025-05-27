// "use client"

// import { useState, useMemo } from "react"
// import Link from "next/link"
// import {
//   ChevronLeft,
//   Calendar,
//   MapPin,
//   Trophy,
//   Users,
//   Clock,
//   Mountain,
//   Flag,
//   Info,
//   Download,
//   Search,
//   ChevronRight,
//   X,
//   Check,
//   Filter,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { fetchRaceProfile } from "@/lib/api-client"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export default async function RaceDetailPage({ params }: { params: { id: string } }) {
//   const raceId = Number.parseInt(params.id)
//   const raceNames = ["Johvika Laada rattarralli", "Tartu GP", "Tallinna Kriteerium", "Pärnu Rannarada", "Saaremaa Ring"]
//   const raceData = await fetchRaceProfile(raceId);
//   console.log("raceData:", raceData)

//   const raceName = raceNames[raceId % raceNames.length]
//   const raceDate = new Date(2025, 5 + raceId, 10 + raceId)
//   const temperature = 18 + (raceId % 10) // Random temperature between 18-27°C

//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [activeTab, setActiveTab] = useState("all")
//   const [selectedTeams, setSelectedTeams] = useState<string[]>([])

//   // Generate results based on the active tab
//   const allResults = generateRaceResults(
//     activeTab === "all" ? 300 : activeTab === "men" ? 200 : activeTab === "women" ? 150 : 100,
//     activeTab === "women",
//     activeTab === "juniors",
//   )

//   // Extract all unique teams for the filter dropdown
//   const allTeams = useMemo(() => {
//     const teams = new Set<string>()
//     allResults.forEach((result) => teams.add(result.team))
//     return Array.from(teams).sort()
//   }, [allResults])

//   // Filter results based on search term and selected teams
//   const filteredResults = useMemo(() => {
//     return allResults.filter((result) => {
//       const matchesSearch =
//         result.rider.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         result.team.toLowerCase().includes(searchTerm.toLowerCase())

//       const matchesTeam = selectedTeams.length === 0 || selectedTeams.includes(result.team)

//       return matchesSearch && matchesTeam
//     })
//   }, [allResults, searchTerm, selectedTeams])

//   // Pagination logic
//   const itemsPerPage = 100
//   const totalPages = Math.ceil(filteredResults.length / itemsPerPage)
//   const paginatedResults = filteredResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   // Handle team selection
//   const toggleTeam = (team: string) => {
//     setSelectedTeams((prev) => {
//       if (prev.includes(team)) {
//         return prev.filter((t) => t !== team)
//       } else {
//         return [...prev, team]
//       }
//     })
//     setCurrentPage(1) // Reset to first page when filter changes
//   }

//   // Clear all team filters
//   const clearTeamFilters = () => {
//     setSelectedTeams([])
//     setCurrentPage(1)
//   }

//   return (
//     <div className="min-h-screen dark:bg-gray-900">
//       {/* Decorative elements */}
//       <div className="cycling-wheel w-[600px] h-[600px] -top-[300px] -right-[300px]"></div>
//       <div className="cycling-wheel w-[400px] h-[400px] -bottom-[200px] -left-[200px]"></div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center mb-8">
//           <Link href="/races" className="mr-4">
//             <Button
//               variant="outline"
//               size="sm"
//               className="rounded-full flex items-center gap-1 hover:bg-white dark:text-white dark:border-gray-600 dark:hover:bg-gray-800"
//             >
//               <ChevronLeft className="h-4 w-4" />
//               Back to Races
//             </Button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           <div className="md:col-span-1">
//             <Card className="cycling-card sticky top-8 dark:bg-gray-800 dark:border-gray-700">
//               <div className="h-40 mono-gradient-dark relative flex items-center justify-center">
//                 <h1 className="text-2xl md:text-3xl font-bold text-white text-center px-4">{raceName}</h1>
//               </div>

//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                     <Calendar className="h-5 w-5 text-black dark:text-white" />
//                     <div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">Date</div>
//                       <div className="font-medium dark:text-white">{raceDate.toLocaleDateString()}</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                     <Trophy className="h-5 w-5 text-black dark:text-white" />
//                     <div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">Category</div>
//                       <div className="font-medium dark:text-white">CAT B</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                     <MapPin className="h-5 w-5 text-black dark:text-white" />
//                     <div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
//                       <div className="font-medium dark:text-white">Johvika, Estonia</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                     <span className="h-5 w-5 flex items-center justify-center text-black dark:text-white">🌡️</span>
//                     <div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">Temperature</div>
//                       <div className="font-medium dark:text-white">{temperature}°C</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                     <Users className="h-5 w-5 text-black dark:text-white" />
//                     <div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">Participants</div>
//                       <div className="font-medium dark:text-white">{allResults.length}</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8 pt-6 border-t dark:border-gray-700">
//                   <h3 className="font-bold mb-4 text-lg dark:text-white">Race Details</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                       <Mountain className="h-5 w-5 text-black dark:text-white" />
//                       <div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">Distance / Elevation</div>
//                         <div className="font-medium dark:text-white">120 km / 1,450 m</div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                       <Flag className="h-5 w-5 text-black dark:text-white" />
//                       <div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">Surface</div>
//                         <div className="font-medium dark:text-white">Asphalt</div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                       <Clock className="h-5 w-5 text-black dark:text-white" />
//                       <div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">Start Time</div>
//                         <div className="font-medium dark:text-white">10:00 AM</div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
//                       <Info className="h-5 w-5 text-black dark:text-white" />
//                       <div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">Organizer</div>
//                         <div className="font-medium dark:text-white">Johvika Cycling Club</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex gap-2">
//                     <Button className="flex-1 rounded-full bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//                       Register
//                     </Button>
//                     <Button variant="outline" className="rounded-full dark:text-white dark:border-gray-600">
//                       <Download className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="md:col-span-2 space-y-8">
//             <Card className="cycling-card dark:bg-gray-800 dark:border-gray-700">
//               <CardHeader className="pb-2 border-b dark:border-gray-700">
//                 <CardTitle className="text-xl flex items-center gap-2 dark:text-white">
//                   <Trophy className="h-5 w-5 text-black dark:text-white" />
//                   Race Results
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <Tabs
//                   defaultValue="all"
//                   onValueChange={(value) => {
//                     setActiveTab(value)
//                     setCurrentPage(1) // Reset to first page on tab change
//                     setSearchTerm("") // Clear search on tab change
//                     setSelectedTeams([]) // Clear team filters on tab change
//                   }}
//                 >
//                   <div className="p-4 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                       <TabsList className="bg-white dark:bg-gray-800 shadow rounded-full p-1">
//                         <TabsTrigger
//                           value="all"
//                           className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-gray-900"
//                         >
//                           All
//                         </TabsTrigger>
//                         <TabsTrigger
//                           value="men"
//                           className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-gray-900"
//                         >
//                           Men
//                         </TabsTrigger>
//                         <TabsTrigger
//                           value="women"
//                           className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-gray-900"
//                         >
//                           Women
//                         </TabsTrigger>
//                         <TabsTrigger
//                           value="juniors"
//                           className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-gray-900"
//                         >
//                           Juniors
//                         </TabsTrigger>
//                       </TabsList>

//                       <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
//                         <div className="relative w-full md:w-64">
//                           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                           <Input
//                             placeholder="Search riders or teams..."
//                             className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//                             value={searchTerm}
//                             onChange={(e) => {
//                               setSearchTerm(e.target.value)
//                               setCurrentPage(1) // Reset to first page on search
//                             }}
//                           />
//                         </div>

//                         <TeamFilter
//                           teams={allTeams}
//                           selectedTeams={selectedTeams}
//                           toggleTeam={toggleTeam}
//                           clearFilters={clearTeamFilters}
//                         />
//                       </div>
//                     </div>

//                     {/* Selected team filters */}
//                     {selectedTeams.length > 0 && (
//                       <div className="mt-3 flex flex-wrap gap-2">
//                         {selectedTeams.map((team) => (
//                           <Badge
//                             key={team}
//                             variant="secondary"
//                             className="flex items-center gap-1 px-2 py-1 rounded-full dark:bg-gray-800"
//                           >
//                             {team}
//                             <button
//                               onClick={() => toggleTeam(team)}
//                               className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
//                             >
//                               <X className="h-3 w-3" />
//                             </button>
//                           </Badge>
//                         ))}
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={clearTeamFilters}
//                           className="text-xs h-6 px-2 rounded-full"
//                         >
//                           Clear all
//                         </Button>
//                       </div>
//                     )}
//                   </div>

//                   <TabsContent value="all" className="mt-0">
//                     <ResultsTable
//                       results={paginatedResults}
//                       currentPage={currentPage}
//                       totalPages={totalPages}
//                       onPageChange={setCurrentPage}
//                       totalResults={filteredResults.length}
//                     />
//                   </TabsContent>

//                   <TabsContent value="men" className="mt-0">
//                     <ResultsTable
//                       results={paginatedResults}
//                       currentPage={currentPage}
//                       totalPages={totalPages}
//                       onPageChange={setCurrentPage}
//                       totalResults={filteredResults.length}
//                     />
//                   </TabsContent>

//                   <TabsContent value="women" className="mt-0">
//                     <ResultsTable
//                       results={paginatedResults}
//                       currentPage={currentPage}
//                       totalPages={totalPages}
//                       onPageChange={setCurrentPage}
//                       totalResults={filteredResults.length}
//                     />
//                   </TabsContent>

//                   <TabsContent value="juniors" className="mt-0">
//                     <ResultsTable
//                       results={paginatedResults}
//                       currentPage={currentPage}
//                       totalPages={totalPages}
//                       onPageChange={setCurrentPage}
//                       totalResults={filteredResults.length}
//                     />
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>

//             <Card className="cycling-card overflow-hidden dark:bg-gray-800 dark:border-gray-700">
//               <CardHeader className="pb-2 border-b dark:border-gray-700">
//                 <CardTitle className="text-xl flex items-center gap-2 dark:text-white">
//                   <MapPin className="h-5 w-5 text-black dark:text-white" />
//                   Race Map
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <div className="h-[400px] w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center">
//                       <MapPin className="h-12 w-12 text-black dark:text-white mx-auto mb-4 animate-pulse" />
//                       <p className="text-gray-600 dark:text-gray-300">Interactive race map will be displayed here</p>
//                     </div>
//                   </div>

//                   <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
//                     <div className="text-sm font-medium mb-1 dark:text-white">Race Statistics</div>
//                     <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
//                       <div className="text-gray-500 dark:text-gray-400">Distance:</div>
//                       <div className="dark:text-white">120 km</div>
//                       <div className="text-gray-500 dark:text-gray-400">Elevation:</div>
//                       <div className="dark:text-white">1,450 m</div>
//                       <div className="text-gray-500 dark:text-gray-400">Max Grade:</div>
//                       <div className="dark:text-white">12%</div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function TeamFilter({
//   teams,
//   selectedTeams,
//   toggleTeam,
//   clearFilters,
// }: {
//   teams: string[]
//   selectedTeams: string[]
//   toggleTeam: (team: string) => void
//   clearFilters: () => void
// }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="flex items-center gap-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//         >
//           <Filter className="h-4 w-4" />
//           <span>Teams</span>
//           {selectedTeams.length > 0 && (
//             <Badge variant="secondary" className="ml-1 rounded-full h-5 px-1.5 bg-gray-200 dark:bg-gray-700">
//               {selectedTeams.length}
//             </Badge>
//           )}
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-56 max-h-[60vh] overflow-auto">
//         <DropdownMenuLabel>Filter by Team</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {teams.map((team) => (
//           <DropdownMenuCheckboxItem
//             key={team}
//             checked={selectedTeams.includes(team)}
//             onCheckedChange={() => toggleTeam(team)}
//           >
//             <div className="flex items-center justify-between w-full">
//               <span className="truncate">{team}</span>
//               {selectedTeams.includes(team) && <Check className="h-4 w-4 ml-2" />}
//             </div>
//           </DropdownMenuCheckboxItem>
//         ))}
//         {selectedTeams.length > 0 && (
//           <>
//             <DropdownMenuSeparator />
//             <div className="px-2 py-1.5">
//               <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full text-xs h-8 rounded-sm">
//                 Clear all filters
//               </Button>
//             </div>
//           </>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// function ResultsTable({
//   results,
//   currentPage,
//   totalPages,
//   onPageChange,
//   totalResults,
// }: {
//   results: any[]
//   currentPage: number
//   totalPages: number
//   onPageChange: (page: number) => void
//   totalResults: number
// }) {
//   return (
//     <div>
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="sticky top-0 z-10 bg-white dark:bg-gray-800">
//             <tr className="bg-gray-50 dark:bg-gray-700">
//               <th className="text-left py-2 px-3 font-semibold text-gray-600 dark:text-gray-300 text-sm">Pos</th>
//               <th className="text-left py-2 px-3 font-semibold text-gray-600 dark:text-gray-300 text-sm">Rider</th>
//               <th className="text-left py-2 px-3 font-semibold text-gray-600 dark:text-gray-300 text-sm">Team</th>
//               <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-300 text-sm">Time</th>
//               <th className="text-right py-2 px-3 font-semibold text-gray-600 dark:text-gray-300 text-sm">Points</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.map((result, index) => (
//               <tr
//                 key={index}
//                 className="border-b last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <td className="py-1.5 px-3 text-sm">
//                   <span
//                     className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium ${
//                       result.position === 1
//                         ? "bg-black text-white"
//                         : result.position === 2
//                           ? "bg-gray-600 text-white"
//                           : result.position === 3
//                             ? "bg-gray-400 text-white"
//                             : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white"
//                     }`}
//                   >
//                     {result.position}
//                   </span>
//                 </td>
//                 <td className="py-1.5 px-3 text-sm">
//                   <Link
//                     href={`/riders/${result.riderId}`}
//                     className="font-medium text-black dark:text-white hover:underline flex items-center gap-1"
//                   >
//                     {result.position <= 10 && (
//                       <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs overflow-hidden">
//                         <span className="dark:text-white">P</span>
//                       </div>
//                     )}
//                     {result.rider}
//                   </Link>
//                 </td>
//                 <td className="py-1.5 px-3 text-sm">
//                   <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
//                     {result.team}
//                   </span>
//                 </td>
//                 <td className="py-1.5 px-3 text-center font-mono text-sm dark:text-white">{result.time}</td>
//                 <td className="py-1.5 px-3 text-right font-medium text-sm dark:text-white">{result.points}</td>
//               </tr>
//             ))}
//             {results.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
//                   No results match your filters
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Results count and pagination */}
//       <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t dark:border-gray-700">
//         <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
//           Showing {results.length > 0 ? (currentPage - 1) * 100 + 1 : 0} to {Math.min(currentPage * 100, totalResults)}{" "}
//           of {totalResults} results
//         </div>

//         {totalPages > 1 && (
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//               disabled={currentPage === 1}
//               className="rounded-full dark:text-white dark:border-gray-600"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             <div className="flex items-center space-x-1">
//               {[...Array(totalPages)].map((_, i) => {
//                 const page = i + 1
//                 // Show limited page numbers with ellipsis for better UX
//                 if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
//                   return (
//                     <Button
//                       key={page}
//                       variant={currentPage === page ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => onPageChange(page)}
//                       className="rounded-full w-8 h-8 p-0 dark:text-white dark:border-gray-600"
//                     >
//                       {page}
//                     </Button>
//                   )
//                 } else if (page === currentPage - 2 || page === currentPage + 2) {
//                   return (
//                     <span key={page} className="dark:text-white">
//                       ...
//                     </span>
//                   )
//                 }
//                 return null
//               })}
//             </div>

//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="rounded-full dark:text-white dark:border-gray-600"
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// function generateRaceResults(count: number, isWomen = false, isJunior = false) {
//   const teams = [
//     "Hawaii Express",
//     "SpordiklubI Velo",
//     "CFC",
//     "Veloline",
//     "Madista Team",
//     "Rakke Rattaklubi",
//     "Team Jõhvis",
//     "Sillamäe Team",
//     "EJK",
//     "Paralepa SK",
//     "Kalevi SK",
//     "Tartu Rattaklubi",
//     "Nõmme Rattaklubi",
//     "Pärnu Spordiklubi",
//     "Viljandi Rattaklubi",
//     "Tallinna Jalgrattaklubi",
//     "Saaremaa SK",
//     "Hiiumaa Rattaklubi",
//     "Võru Rattaklubi",
//     "Narva Energia",
//   ]

//   // Generate results
//   const results = []

//   for (let i = 0; i < count; i++) {
//     const position = i + 1
//     const riderId = i + 1

//     // Base time is 3 hours, 15 minutes
//     const baseMinutes = 195

//     // For more realistic time gaps:
//     // - First 10 riders: small gaps (0-30 seconds)
//     // - Next 20 riders: medium gaps (30-90 seconds)
//     // - Rest: larger gaps (1-10 minutes)
//     let additionalSeconds = 0

//     if (position <= 10) {
//       // Top 10 riders have small gaps
//       additionalSeconds = position === 1 ? 0 : (position - 1) * 3 + Math.floor(Math.random() * 5)
//     } else if (position <= 30) {
//       // Next 20 riders have medium gaps
//       additionalSeconds = 30 + (position - 10) * 3 + Math.floor(Math.random() * 10)
//     } else {
//       // Rest have larger gaps
//       additionalSeconds = 90 + (position - 30) * 6 + Math.floor(Math.random() * 30)
//     }

//     const totalSeconds = baseMinutes * 60 + additionalSeconds
//     const hours = Math.floor(totalSeconds / 3600)
//     const minutes = Math.floor((totalSeconds % 3600) / 60)
//     const seconds = totalSeconds % 60

//     const time = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

//     // Points based on position
//     const points = position <= 30 ? Math.max(0, 50 - (position - 1) * 1.5) : 0

//     // Create more varied rider names
//     const prefix = isWomen ? "W" : isJunior ? "J" : ""
//     const riderName = `${prefix}Rider ${riderId}`

//     // Distribute teams more realistically
//     // Top teams have more riders in top positions
//     let teamIndex
//     if (position <= 20) {
//       // Top 20 positions are dominated by top 5 teams
//       teamIndex = Math.floor(Math.random() * 5)
//     } else if (position <= 50) {
//       // Next 30 positions have more variety but still favor stronger teams
//       teamIndex = Math.floor(Math.random() * 10)
//     } else {
//       // Rest are distributed across all teams
//       teamIndex = Math.floor(Math.random() * teams.length)
//     }

//     results.push({
//       position,
//       riderId,
//       rider: riderName,
//       team: teams[teamIndex],
//       time,
//       points: Math.floor(points),
//     })
//   }

//   return results
// }

import { fetchRaceProfile } from "@/lib/api-client"
import RaceDetailClient from "./RaceDetailClient"

export default async function RaceDetailPage({ params }: { params: { id: string } }) {
  const raceId = Number.parseInt(params.id)
  const raceData = await fetchRaceProfile(raceId)

  return <RaceDetailClient raceData={raceData} />
}
