import React from "react"
import Link from "next/link"
import { ChevronLeft, Trophy, Calendar, TrendingUp, MapPin, User, Filter, Bike, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RiderResultsTable from "@/components/ui/rider-results-table";
import Image from "next/image"
import { fetchRiderProfile } from "@/lib/api-client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { FullRiderProfile, RiderResult } from '@/lib/types';

interface RiderProfilePageProps {
  params: { id: string }
}

export default async function RiderProfilePage({ params }: RiderProfilePageProps) {
  const riderProfile: FullRiderProfile = await fetchRiderProfile(params.id, 2024);
  const uniqueYears = Array.from(
    new Set(riderProfile.seasonStats.map(s => s.year))
  );
  
  const uniqueSeasonStats = uniqueYears.map(year => 
    riderProfile.seasonStats.find(s => s.year === year)!
  );
  
  console.log(riderProfile)
  return (
    <div className="min-h-screen">
      {/* Decorative elements */}
      <div className="cycling-wheel w-[600px] h-[600px] -top-[300px] -right-[300px]" />
      <div className="cycling-wheel w-[400px] h-[400px] -bottom-[200px] -left-[200px]" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 hover:bg-white">
              <ChevronLeft className="h-4 w-4" />
              Back to home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Card
              className={`cycling-card sticky top-8 ${
                riderProfile.profile.rankingPlaceRoad === 1
                  ? "border-t-4 border-t-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                  : riderProfile.profile.rankingPlaceRoad === 2
                  ? "border-t-4 border-t-gray-300 shadow-[0_0_15px_rgba(192,192,192,0.3)]"
                  : riderProfile.profile.rankingPlaceRoad === 3
                  ? "border-t-4 border-t-amber-700 shadow-[0_0_15px_rgba(176,141,87,0.3)]"
                  : ""
              }`}
            >
              <div className="h-32 mono-gradient-dark relative">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-36 h-36 rounded-full bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                      <Image
                        src="/default_profile_picture2.jpg"
                        alt={riderProfile.profile.name}
                        width={120}
                        height={120}
                        className="rounded-full border border-gray-300 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="pt-28 p-6">
              <div className="text-center mb-6 mt-16">
              <h2 className="text-2xl font-bold dark:text-white text-center">{riderProfile.profile.name}</h2>

                {/* Medals */}
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {/* Road Ranking Medal */}
                  {[1, 2, 3].includes(riderProfile.profile.rankingPlaceRoad) && (
                    <div
                      className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${
                        riderProfile.profile.rankingPlaceRoad === 1
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-400"
                          : riderProfile.profile.rankingPlaceRoad === 2
                          ? "bg-gray-100 text-gray-800 border border-gray-300"
                          : "bg-amber-100 text-amber-800 border border-amber-700"
                      }`}
                    >
                      Road:{" "}
                      {riderProfile.profile.rankingPlaceRoad === 1
                        ? "🥇 1st Place"
                        : riderProfile.profile.rankingPlaceRoad === 2
                        ? "🥈 2nd Place"
                        : "🥉 3rd Place"}
                    </div>
                  )}

                  {/* MTB Ranking Medal */}
                  {[1, 2, 3].includes(riderProfile.profile.rankingPlaceMTB) && (
                    <div
                      className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${
                        riderProfile.profile.rankingPlaceMTB === 1
                          ? "bg-green-100 text-green-800 border border-green-400"
                          : riderProfile.profile.rankingPlaceMTB === 2
                          ? "bg-gray-100 text-gray-800 border border-gray-300"
                          : "bg-lime-100 text-lime-800 border border-lime-700"
                      }`}
                    >
                      MTB:{" "}
                      {riderProfile.profile.rankingPlaceMTB === 1
                        ? "🥇 1st Place"
                        : riderProfile.profile.rankingPlaceMTB === 2
                        ? "🥈 2nd Place"
                        : "🥉 3rd Place"}
                    </div>
                  )}

                  {/* Years Active Badges */}
                  {(() => {
                    const startYear = riderProfile.profile.activeSince;
                    const thisYear = new Date().getFullYear();
                    const years = thisYear - startYear + 1;
                    if (years >= 10) {
                      return (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-400">
                          <span className="mr-1">📅</span> {years} Years Active
                        </div>
                      );
                    } else if (years >= 5) {
                      return (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 border border-sky-400">
                          <span className="mr-1">📆</span> {years} Years Active
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* Participation Badges */}
                  {riderProfile.totals.participations >= 100 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-400">
                      <span className="mr-1">🔢</span> 100+ Participations
                    </div>
                  )}
                  {riderProfile.totals.participations >= 50 && riderProfile.totals.participations < 100 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 border border-pink-400">
                      <span className="mr-1">🔢</span> 50+ Participations
                    </div>
                  )}
                  {riderProfile.totals.participations >= 30 && riderProfile.totals.participations < 50 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-400">
                      <span className="mr-1">🔢</span> 30+ Participations
                    </div>
                  )}

                  {/* Wins Badges */}
                  {riderProfile.totals.wins >= 20 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-200 text-yellow-900 border border-yellow-500">
                      <span className="mr-1">🏆</span> 20+ Wins
                    </div>
                  )}
                  {riderProfile.totals.wins >= 10 && riderProfile.totals.wins < 20 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-400">
                      <span className="mr-1">🏅</span> 10+ Wins
                    </div>
                  )}
                  {riderProfile.totals.wins >= 5 && riderProfile.totals.wins < 10 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-400">
                      <span className="mr-1">🎖️</span> 5+ Wins
                    </div>
                  )}

                  {/* Podiums Badges */}
                  {riderProfile.totals.podiums >= 50 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-200 text-green-900 border border-green-500">
                      <span className="mr-1">🥉</span> 50+ Podiums
                    </div>
                  )}
                  {riderProfile.totals.podiums >= 30 && riderProfile.totals.podiums < 50 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-lime-100 text-lime-800 border border-lime-400">
                      <span className="mr-1">🥈</span> 30+ Podiums
                    </div>
                  )}
                  {riderProfile.totals.podiums >= 10 && riderProfile.totals.podiums < 30 && (
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 border border-cyan-400">
                      <span className="mr-1">🥇</span> 10+ Podiums
                    </div>
                  )}
                </div>

                    </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <User className="h-5 w-5 text-black" />
                    <div>
                      <div className="text-sm text-gray-500">Full Name</div>
                      <div className="font-medium">{riderProfile.profile.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <Trophy className="h-5 w-5 text-black" />
                    <div>
                      <div className="text-sm text-gray-500">Ranking</div>
                      <div className="font-medium">
                        {riderProfile.profile.rankingPointsRoad} Road points (Rank #{riderProfile.profile.rankingPlaceRoad})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Trophy className="h-5 w-5 text-black" />
                    <div>
                      <div className="text-sm text-gray-500">Ranking</div>
                      <div className="font-medium">
                        {riderProfile.profile.rankingPointsMTB} MTB points (Rank #{riderProfile.profile.rankingPlaceMTB})
                      </div>
                  </div>
                  </div>


                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <TrendingUp className="h-5 w-5 text-black" />
                    <div>
                      <div className="text-sm text-gray-500">Team</div>
                      <div className="font-medium">{riderProfile.profile.team}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <MapPin className="h-5 w-5 text-black" />
                    <div>
                      <div className="text-sm text-gray-500">Birthplace</div>
                      {riderProfile.profile.birthplace === "EST" ? "🇪🇪 EST" : riderProfile.profile.birthplace}                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <Calendar className="h-5 w-5 text-black" />
                    <div>
                      <div className="text-sm text-gray-500">First race</div>
                      <div className="font-medium">{riderProfile.profile.activeSince}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-bold mb-4 text-lg">Partnerships</h3>
                  <div className="space-y-3">
                    <PartnershipItem label="Bike Frame Partner" value={riderProfile.partnerships.frame} />
                    <PartnershipItem label="Clothing Partner" value={riderProfile.partnerships.clothing} />
                    <PartnershipItem label="Partner" value={riderProfile.partnerships.sponsor} />
                    <PartnershipItem label="Bike Shop Partner" value={riderProfile.partnerships.bikeShop} />
                    <PartnershipItem label="Tyre Partner" value={riderProfile.partnerships.tyres} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Races" value={riderProfile.totals.participations} icon={<Bike className="h-5 w-5 text-black" />} />
              <StatCard title="Wins" value={riderProfile.totals.wins} icon={<Trophy className="h-5 w-5 text-black" />} />
              <StatCard title="Podiums" value={riderProfile.totals.podiums} icon={<TrendingUp className="h-5 w-5 text-black" />} />
              <StatCard title="Points" value={riderProfile.totals.careerPoints} icon={<Activity className="h-5 w-5 text-black" />} />
            </div>

            {/* Results table */}
            <Card className="cycling-card">
              <RiderResultsTable results={riderProfile.results} />
            </Card>


            {/* Race History Tabs & Stats */}
            <Card className="cycling-card">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-black" />
                  Race History
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <Tabs defaultValue="2024">
                  <TabsList className="mb-6 bg-gray-100 p-1 rounded-full">
                    {uniqueSeasonStats.map((season) => (
                      <TabsTrigger
                        key={season.year}
                        value={season.year.toString()}
                        className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow"
                      >
                        {season.year}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {uniqueSeasonStats.map((season) => (
                    <TabsContent key={season.year} value={season.year.toString()} className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <Bike className="h-6 w-6 text-black" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Total races</div>
                              <div className="text-2xl font-bold">{season.races}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <Trophy className="h-6 w-6 text-black" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Wins</div>
                              <div className="text-2xl font-bold">{season.wins}</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <TrendingUp className="h-6 w-6 text-black" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Podiums</div>
                              <div className="text-2xl font-bold">{season.podiums}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <Activity className="h-6 w-6 text-black" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Points</div>
                              <div className="text-2xl font-bold">{season.points}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="mt-6 text-center">
                  <Button className="rounded-full bg-black hover:bg-gray-800">View complete history</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="cycling-stat-card group hover:shadow-lg transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-black" />
      <div className="flex items-center justify-center mb-2">{icon}</div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

function PartnershipItem({ label, value }: { label: string; value: string }) {
  // Default styles
  let textColor = "text-gray-800";
  let bgColor = "bg-white";
  let borderColor = "border-gray-300";

  if (label === "Clothing Partner") {
    if (value.toLowerCase().includes("moomoo")) {
      textColor = "text-red-600";
      bgColor = "bg-white";
      borderColor = "border-red-600";
    }
  }

  if (label === "Bike Shop Partner") {
    if (value.toLowerCase().includes("redbike")) {
      textColor = "text-black";
      bgColor = "bg-red-400";
      borderColor = "border-red-400";
    } else if (value.toLowerCase().includes("fixus")) {
      textColor = "text-black";
      bgColor = "bg-yellow-400";
      borderColor = "border-yellow-400";
    } else if (value.toLowerCase().includes("veloplus")) {
      textColor = "text-white";
      bgColor = "bg-red-900";
      borderColor = "border-red-900";
    }
  }

  if (label === "Tyre Partner") {
    if (value.toLowerCase().includes("schwalbe")) {
      // Schwalbe colors: typically blue background and white text
      textColor = "text-white";
      bgColor = "bg-blue-600";
      borderColor = "border-blue-600";
    } else if (value.toLowerCase().includes("vredenstein")) {
      textColor = "text-white";
      bgColor = "bg-gray-800";
      borderColor = "border-gray-800";
    }
  }

  if (label === "Bike Frame Partner") {
    if (value.toLowerCase().includes("bianchi")) {
      // Bianchi signature color: Celeste (turquoise/light blue)
      textColor = "text-white";
      bgColor = "bg-cyan-400"; // Tailwind cyan close to Celeste
      borderColor = "border-cyan-400";
    } else if (value.toLowerCase().includes("ktm")) {
      textColor = "text-orange-600";
      bgColor = "bg-white";
      borderColor = "border-orange-600";
    }
  }

  if (label === "Partner") {
    if (value.toLowerCase().includes("vap ventilatsioon")) {
      textColor = "text-black";
      bgColor = "bg-green-400";
      borderColor = "border-green-400";
    }
  }

  return (
    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
      <span className="text-sm text-gray-500">{label}:</span>
      <span
        className={`text-sm font-medium px-2 py-0.5 rounded-full border ${bgColor} ${textColor} ${borderColor}`}
      >
        {value || "N/A"}
      </span>
    </div>
  );
}


function YearSelector() {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Year:</span>
      <Select defaultValue="2025">
        <SelectTrigger className="w-[100px] h-8 text-xs rounded-full bg-white">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <SelectItem value="earlier" className="text-black">
                2014 and earlier
              </SelectItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Year</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003].map((year) => (
                  <Button key={year} variant="outline" size="sm" className="text-xs rounded-full">
                    {year}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </SelectContent>
      </Select>
    </div>
  )
}

