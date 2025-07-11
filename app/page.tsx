import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Trophy,
  Calendar,
  MapPin,
  ChevronRight,
  TrendingUp,
  Users,
  Activity,
  ChevronDown,
  BarChart3,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { fetchHomepageRaceStats, fetchStats } from "@/lib/api-client";
import { HomePageRace, HomePageRankingRider } from "@/lib/types"
import Image from "next/image"



export default async function Home() {
const homepageStats = await fetchHomepageRaceStats();
  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Decorative elements */}
      <div className="cycling-wheel w-[600px] h-[600px] -top-[300px] -right-[300px]"></div>
      <div className="cycling-wheel w-[400px] h-[400px] -bottom-[200px] -left-[200px]"></div>

      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white inline-block mb-2">
                Eesti ratta reiting
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Estonian Cycling Rating System</p>
            </div>

            <div className="flex items-center gap-4">
              <nav className="flex flex-wrap gap-3">
                <Link
                  href="/races"
                  className="cycling-nav-item bg-white dark:bg-gray-800 shadow flex items-center gap-2 hover:text-black dark:hover:text-white dark:text-gray-200"
                >
                  <Activity className="h-4 w-4" />
                  <span>Races</span>
                </Link>
                <Link
                  href="/riders"
                  className="cycling-nav-item bg-white dark:bg-gray-800 shadow flex items-center gap-2 hover:text-black dark:hover:text-white dark:text-gray-200"
                >
                  <Users className="h-4 w-4" />
                  <span>Riders</span>
                </Link>
                <Link
                  href="/rankings"
                  className="cycling-nav-item bg-white dark:bg-gray-800 shadow flex items-center gap-2 hover:text-black dark:hover:text-white dark:text-gray-200"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Rankings</span>
                </Link>
                <Link
                  href="/calendar"
                  className="cycling-nav-item bg-white dark:bg-gray-800 shadow flex items-center gap-2 hover:text-black dark:hover:text-white dark:text-gray-200"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Link>
                <Link
                  href="/statistics"
                  className="cycling-nav-item bg-white dark:bg-gray-800 shadow flex items-center gap-2 hover:text-black dark:hover:text-white dark:text-gray-200"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Statistics</span>
                </Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="cycling-card dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2 border-b dark:border-gray-700">
              <CardTitle className="text-xl flex items-center gap-2 dark:text-white">
                <Trophy className="h-5 w-5 text-black dark:text-white" />
                Last Races
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y dark:divide-gray-700">
              {homepageStats.last_races.map((race: HomePageRace) => (
              <RaceResultItem
                key={race.race_id}
                raceId={race.race_id}
                raceName={race.race_name}
                date={race.date}
                winnerId={race.first_place}
                winnerName={race.first_place_name}
                winnerTeam="" // add later if needed
                secondId={race.second_place}
                secondName={race.second_place_name}
                secondTeam=""
                thirdId={race.third_place}
                thirdName={race.third_place_name}
                thirdTeam=""
              />
            ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="cycling-card dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-2 border-b dark:border-gray-700">
                <CardTitle className="text-xl flex items-center gap-2 dark:text-white">
                  <Calendar className="h-5 w-5 text-black dark:text-white" />
                  Upcoming Races
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-gray-700">
                  <UpcomingRaceItem
                    raceId={4}
                    raceName="Tartu Rattaralli"
                    date="June 1, 2025"
                    location="Tartu"
                    category="CAT A"
                    temperature={18}
                  />
                  <UpcomingRaceItem
                    raceId={5}
                    raceName="Filter Temposari"
                    date="June 4, 2025"
                    location="Tallinn"
                    category="CAT C"
                    temperature={20}
                  />
                  <UpcomingRaceItem
                    raceId={6}
                    raceName=" Alutaguse Rattamaraton"
                    date="June 7, 2025"
                    location="Alutaguse"
                    category="CAT B"
                    temperature={22}
                  />
                </div>
              </CardContent>
            </Card>

            <NewsSection />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Top Rankings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RankingCard title="Top 5 men" category="men" data={homepageStats.top_men} />
        <RankingCard title="Top 5 women" category="women" data={homepageStats.top_women} />
        <RankingCard title="Top 5 juniors" category="juniors" data={homepageStats.top_juniors} />
        </div>
        <DBstats/>
      </div>
    </div>
  )
}

function NewsSection() {
  return (
    <div className="space-y-4">
      <Card className="cycling-card overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="pb-2 mono-gradient-dark">
          <CardTitle className="text-xl text-white">NEWS</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Link href="/news/1" className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="p-6 relative">
              <div className="cycling-wheel w-[150px] h-[150px] -bottom-[75px] -right-[75px] border-white/10"></div>
              <h3 className="text-lg font-bold mb-2 dark:text-white">Estonian Cycling Progress</h3>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                How has Estonian timetrail progressed the last 10 years. 2010 we had 2 riders passing the 45km/h
                barrier, 2025 we have 20 different riders passing the barrier
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">May 15, 2025</span>
                <Button variant="ghost" size="sm" className="text-black dark:text-white">
                  Read more <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      <Card className="cycling-card overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-0">
          <Link href="/news/2" className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="p-6 relative">
              <h3 className="text-lg font-bold mb-2 dark:text-white">New National Team Selection Criteria</h3>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                The Estonian Cycling Federation has announced new selection criteria for the national team. The new
                system will be based on a combination of UCI points and national ranking points.
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">May 10, 2025</span>
                <Button variant="ghost" size="sm" className="text-black dark:text-white">
                  Read more <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link href="/news">
          <Button variant="outline" className="rounded-full dark:text-white dark:border-gray-600">
            View all news <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

function RaceResultItem({
  raceId,
  raceName,
  date,
  winnerId,
  winnerName,
  winnerTeam,
  secondId,
  secondName,
  secondTeam,
  thirdId,
  thirdName,
  thirdTeam,
}: {
  raceId: number
  raceName: string
  date: string
  winnerId: number
  winnerName: string
  winnerTeam: string
  secondId: number
  secondName: string
  secondTeam: string
  thirdId: number
  thirdName: string
  thirdTeam: string
}) {
  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center mb-6">
              <Link
            href={`/races/${raceId}`}
            className="font-bold text-lg hover:text-black dark:text-white dark:hover:text-gray-300 transition-colors"
          >
            {raceName}
          </Link>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
            <Calendar className="h-3 w-3" /> {date}
          </div>
        </div>
        <div className="flex justify-between items-start mb-2">
        <div className="space-y-3">
          {/* 1st - Gold */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-yellow-300/70 text-yellow-900 flex items-center justify-center font-semibold text-base shadow-sm border border-yellow-300">
              1
            </div>
            <Link
              href={`/riders/${winnerId}`}
              className="font-medium hover:text-black dark:text-white dark:hover:text-gray-300 transition-colors"
            >
              {winnerName}
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">{winnerTeam}</span>
          </div>

          {/* 2nd - Silver */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-semibold text-base shadow-sm border border-gray-400">
              2
            </div>
            <Link
              href={`/riders/${secondId}`}
              className="font-medium hover:text-black dark:text-white dark:hover:text-gray-300 transition-colors"
            >
              {secondName}
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">{secondTeam}</span>
          </div>

          {/* 3rd - Bronze */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-500/70 text-amber-900 flex items-center justify-center font-semibold text-base shadow-sm border border-amber-600">
              3
            </div>
            <Link
              href={`/riders/${thirdId}`}
              className="font-medium hover:text-black dark:text-white dark:hover:text-gray-300 transition-colors"
            >
              {thirdName}
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">{thirdTeam}</span>
          </div>
          </div>

      <Link href={`/riders/${winnerId}`} className="flex-shrink-0">
          <Image
            src="/default_profile_picture2.jpg"
            alt={winnerName}
            width={120}
            height={120}
            className="rounded-full border border-gray-300 dark:border-gray-600"
          />
        </Link>
      </div>
      <div className="mt-4 text-right">
        <Link
          href={`/races/${raceId}`}
          className="text-sm font-medium text-black dark:text-white hover:underline inline-flex items-center gap-1"
        >
          View full results <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
  
}

function UpcomingRaceItem({
  raceId,
  raceName,
  date,
  location,
  category,
  temperature,
}: {
  raceId: number
  raceName: string
  date: string
  location: string
  category: string
  temperature?: number
}) {
  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <Link
        href={`/races/${raceId}`}
        className="font-bold text-lg hover:text-black dark:text-white dark:hover:text-gray-300 transition-colors"
      >
        {raceName}
      </Link>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {date}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {location}
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="h-3 w-3" /> {category}
        </div>
        {temperature !== undefined && (
          <div className="flex items-center gap-1">
            <span>🌡️</span> {temperature}°C
          </div>
        )}
      </div>

      <div className="mt-3 text-right">
        <Link
          href={`/races/${raceId}`}
          className="text-sm font-medium text-black dark:text-white hover:underline inline-flex items-center gap-1"
        >
          Race details <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

function RankingCard({ title, category, data }: { title: string; category: string; data: HomePageRankingRider[] }) {
  return (
    <Card className="cycling-card dark:bg-gray-800 dark:border-gray-700">
      <CardHeader
        className={`pb-2 border-b dark:border-gray-700 ${
          category === "men"
            ? "mono-gradient-dark"
            : category === "women"
              ? "mono-gradient-gray"
              : "mono-gradient-light"
        }`}
      >
        <CardTitle className={`text-xl ${category === "men" || category === "women" ? "text-white" : "text-gray-700"}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y dark:divide-gray-700">
        {data.map((rider, i) => (
          <RankingItem
            key={rider.rider_id}
            rank={i + 1}
            riderId={rider.rider_id}
            name={rider.name}
            team={rider.team || ""}
            points={rider.points}
            category={category}
          />
        ))}

        </div>

        <div className="p-4 text-center">
          <Link
            href="/rankings"
            className="inline-flex items-center gap-1 font-medium text-black dark:text-white hover:underline"
          >
            See all rankings <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function RankingItem({
  rank,
  riderId,
  name,
  team,
  points,
  category,
}: {
  rank: number
  riderId: number
  name: string
  team: string
  points: number
  category: string
}) {
  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={
            "w-7 h-7 rounded-full flex items-center justify-center font-semibold text-base shadow-sm " +
            (rank === 1
              ? "bg-yellow-300/70 text-yellow-900 border border-yellow-300"
              : rank === 2
              ? "bg-gray-300 text-gray-800 border border-gray-400"
              : rank === 3
              ? "bg-amber-500/70 text-amber-900 border border-amber-600"
              : "bg-gray-100 text-gray-500 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600")
          }
        >
          {rank}
        </div>

        <div className="flex-1">
          <div className="flex items-center">
            <Link
              href={`/riders/${riderId}`}
              className="font-medium hover:text-black dark:text-white dark:hover:text-gray-300 transition-colors"
            >
              {name}
            </Link>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {team}
            </span>
          </div>
        </div>

        <div className="font-semibold text-lg text-gray-900 dark:text-white">{points}</div>
      </div>
    </div>
  )
}



async function DBstats() {
  const stats = await fetchStats();
  return(
    <div className="p-4">
      <h1 className="text-2xl font-bold">Estonian Cycling DB Overview</h1>
      <ul className="mt-4">
        <li>🏁 Races: {stats.race_count}</li>
        <li>📊 Results: {stats.result_count}</li>
        <li>🚴 Riders: {stats.rider_count}</li>
      </ul>
    </div>
  )
}