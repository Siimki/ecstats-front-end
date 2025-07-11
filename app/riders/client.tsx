"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RidersTop100 } from "@/lib/types"
import { fetchRidersByQuery } from "@/lib/api-client"

type Props = {
  top100: RidersTop100[]
}

export default function RidersClient({ top100 }: Props) {
  const [query, setQuery] = useState("")
  const [riders, setRiders] = useState<RidersTop100[]>(top100)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim() === "") {
        setRiders(top100)
        return
      }

      setLoading(true)
      fetchRidersByQuery(query)
        .then((results) => {
          setRiders(results)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setRiders([])
          setLoading(false)
        })
    }, 500)

    return () => clearTimeout(delay)
  }, [query, top100])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Riders</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search riders..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="men">
        <TabsContent value="men" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <p className="col-span-full">Searching...</p>}
          {!loading && riders?.length === 0 && (
            <p className="col-span-full text-muted-foreground">No riders found.</p>
          )}
          {!loading &&
            riders.map((rider, i) => (
              <RiderCard
                key={rider.riderId}
                id={rider.riderId}
                name={`${rider.firstName} ${rider.lastName}`}
                team={rider.team}
                points={rider.points}
                rank={i + 1}
                lastRaces={rider.lastRaces}
              />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

type RiderCardProps = {
  id: number
  name: string
  team: string
  points: number
  rank: number
  lastRaces: { raceName: string; position: string }[]
}

function RiderCard({
  id,
  name,
  team,
  points,
  rank,
  lastRaces = [],
}: RiderCardProps) {
  return (
    <div className="border-2 border-black rounded-lg">
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{team}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{points} pts</p>
            <p className="text-sm text-muted-foreground">Rank: #{rank}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-1">Recent results:</h4>
          <ul className="text-sm space-y-1">
            {lastRaces.map((r, i) => (
              <li key={`${r.raceName}-${r.position}-${i}`}>
                {r.raceName}: {r.position}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <Link href={`/riders/${id}`}>
            <Button variant="outline" size="sm" className="w-full">
              View profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
