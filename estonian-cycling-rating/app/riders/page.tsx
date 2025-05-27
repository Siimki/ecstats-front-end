import Link from "next/link"
import { ChevronLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RidersPage() {
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
        <Input placeholder="Search riders..." className="pl-10" />
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

        <TabsContent value="men" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(12)].map((_, i) => (
            <RiderCard key={i} id={i + 1} category="men" />
          ))}
        </TabsContent>

        <TabsContent value="women" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(12)].map((_, i) => (
            <RiderCard key={i} id={i + 1} category="women" />
          ))}
        </TabsContent>

        <TabsContent value="juniors" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(12)].map((_, i) => (
            <RiderCard key={i} id={i + 1} category="juniors" />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RiderCard({ id, category }: { id: number; category: string }) {
  const teams = [
    "Hawaii Express",
    "SpordiklubI Velo",
    "CFC",
    "Veloline",
    "Madista Team",
    "Rakke Rattaklubi",
    "Team Jõhvis",
    "Sillamäe Team",
  ]
  const team = teams[id % teams.length]
  const points = 156 - id * 5

  return (
    <Card className="border-2 border-black rounded-lg">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold">Rider {id}</h3>
            <p className="text-sm text-muted-foreground">{team}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{points} pts</p>
            <p className="text-sm text-muted-foreground">Rank: #{id}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-1">Recent results:</h4>
          <ul className="text-sm space-y-1">
            <li>Race 3: {id <= 3 ? id : Math.floor(Math.random() * 10) + 4}th place</li>
            <li>Race 2: {id <= 3 ? id : Math.floor(Math.random() * 10) + 4}th place</li>
            <li>Race 1: {id <= 3 ? id : Math.floor(Math.random() * 10) + 4}th place</li>
          </ul>
        </div>

        <div className="mt-4">
          <Link href={`/riders/${id}`}>
            <Button variant="outline" size="sm" className="w-full">
              View profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
