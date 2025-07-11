import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm" className="rounded-full dark:text-white dark:border-gray-600">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold dark:text-white">News</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  )
}

function NewsCard({ news }: { news: any }) {
  return (
    <Card className="cycling-card overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-0">
        <Link href={`/news/${news.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="p-6 relative">
            {news.featured && (
              <div className="absolute top-0 right-0 bg-black text-white text-xs px-2 py-1 m-2 rounded-full">
                Featured
              </div>
            )}
            <h3 className="text-lg font-bold mb-2 dark:text-white">{news.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{news.excerpt}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">{news.date}</span>
              <Button variant="ghost" size="sm" className="text-black dark:text-white">
                Read more
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

// Mock news data
const newsItems = [
  {
    id: 1,
    title: "Estonian Cycling Progress",
    excerpt:
      "How has Estonian timetrail progressed the last 10 years. 2010 we had 2 riders passing the 45km/h barrier, 2025 we have 20 different riders passing the barrier.",
    date: "May 15, 2025",
    featured: true,
  },
  {
    id: 2,
    title: "New National Team Selection Criteria",
    excerpt:
      "The Estonian Cycling Federation has announced new selection criteria for the national team. The new system will be based on a combination of UCI points and national ranking points.",
    date: "May 10, 2025",
    featured: false,
  },
  {
    id: 3,
    title: "Upcoming Training Camps",
    excerpt:
      "The national team will hold training camps in Spain and Italy this winter. The camps will focus on preparing for the 2026 season.",
    date: "May 5, 2025",
    featured: false,
  },
  {
    id: 4,
    title: "New Sponsors for the National Team",
    excerpt:
      "The Estonian Cycling Federation has announced new sponsors for the national team. The new sponsors will provide equipment and financial support for the next three years.",
    date: "April 28, 2025",
    featured: false,
  },
  {
    id: 5,
    title: "Junior Development Program",
    excerpt:
      "The Estonian Cycling Federation has launched a new junior development program. The program will focus on identifying and developing young talent.",
    date: "April 20, 2025",
    featured: false,
  },
  {
    id: 6,
    title: "New Race Added to the Calendar",
    excerpt:
      "A new race has been added to the Estonian cycling calendar. The Tallinn Grand Prix will be held in August and will be a UCI 1.2 category race.",
    date: "April 15, 2025",
    featured: true,
  },
]
