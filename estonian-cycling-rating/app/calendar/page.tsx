import Link from "next/link"
import { ChevronLeft, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Race Calendar</h1>
      </div>

      <div className="grid gap-6">
        {[6, 7, 8, 9, 10].map((month) => (
          <MonthCard key={month} month={month} />
        ))}
      </div>
    </div>
  )
}

function MonthCard({ month }: { month: number }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const races = [
    { date: new Date(2025, month - 1, 5), name: "Johvika Laada rattarralli", category: "CAT B" },
    { date: new Date(2025, month - 1, 12), name: "Tartu GP", category: "CAT A" },
    { date: new Date(2025, month - 1, 19), name: "Tallinna Kriteerium", category: "CAT B" },
    { date: new Date(2025, month - 1, 26), name: "Pärnu Rannarada", category: "CAT C" },
  ]

  return (
    <Card className="border-2 border-black rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          {monthNames[month - 1]} 2025
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {races.map((race, i) => (
            <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{race.name}</h3>
                  <p className="text-sm text-muted-foreground">Category: {race.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{race.date.toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {race.date.toLocaleDateString(undefined, { weekday: "long" })}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <Link href={`/races/${i + 1}`}>
                  <Button variant="outline" size="sm">
                    View details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
