"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function RankingsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 20

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Rankings</h1>
      </div>

      <div className="relative mb-6">
        <Input
          placeholder="Search riders..."
          className="pl-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1) // Reset to first page on search
          }}
        />
      </div>

      <Tabs defaultValue="men">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="men" className="flex-1">
            Men
          </TabsTrigger>
          <TabsTrigger value="women" className="flex-1">
            Women
          </TabsTrigger>
          <TabsTrigger value="juniors" className="flex-1">
            Juniors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="men">
          <RankingTable category="men" currentPage={currentPage} searchTerm={searchTerm} itemsPerPage={itemsPerPage} />
        </TabsContent>

        <TabsContent value="women">
          <RankingTable
            category="women"
            currentPage={currentPage}
            searchTerm={searchTerm}
            itemsPerPage={itemsPerPage}
          />
        </TabsContent>

        <TabsContent value="juniors">
          <RankingTable
            category="juniors"
            currentPage={currentPage}
            searchTerm={searchTerm}
            itemsPerPage={itemsPerPage}
          />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
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
            {[...Array(5)].map((_, i) => {
              const page = i + 1
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
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))}
            disabled={currentPage === 5}
            className="rounded-full dark:text-white dark:border-gray-600"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function RankingTable({
  category,
  currentPage,
  searchTerm,
  itemsPerPage,
}: { category: string; currentPage: number; searchTerm: string; itemsPerPage: number }) {
  const teams = [
    "Hawaii Express",
    "SpordiklubI Velo",
    "CFC",
    "Veloline",
    "Madista Team",
    "Rakke Rattaklubi",
    "Team Jõhvis",
    "Sillamäe Team",
    "EJK",
  ]

  // Generate 100 riders for pagination
  const allRiders = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Rider ${i + 1}`,
    team: teams[i % teams.length],
    points: 156 - i * 5,
  }))

  // Filter by search term
  const filteredRiders = allRiders.filter(
    (rider) =>
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.team.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRiders = filteredRiders.slice(startIndex, startIndex + itemsPerPage)

  return (
    <Card className="border-2 border-black rounded-lg dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Top {category} riders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2 font-bold dark:text-white">Rank</th>
                <th className="text-left py-2 font-bold dark:text-white">Rider</th>
                <th className="text-left py-2 font-bold dark:text-white">Team</th>
                <th className="text-right py-2 font-bold dark:text-white">Points</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRiders.map((rider, i) => (
                <tr key={rider.id} className="border-b last:border-0 dark:border-gray-700">
                  <td className="py-2 dark:text-white">{startIndex + i + 1}</td>
                  <td className="py-2">
                    <Link href={`/riders/${rider.id}`} className="hover:underline dark:text-white">
                      {rider.name}
                    </Link>
                  </td>
                  <td className="py-2 dark:text-gray-300">{rider.team}</td>
                  <td className="py-2 text-right dark:text-white">{rider.points} pts</td>
                </tr>
              ))}
              {paginatedRiders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No riders match your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
