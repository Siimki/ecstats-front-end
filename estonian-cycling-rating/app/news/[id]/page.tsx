import Link from "next/link"
import { ChevronLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsId = Number.parseInt(params.id)

  // In a real app, you would fetch the news item from an API
  const newsItem = {
    id: newsId,
    title: newsId === 1 ? "Estonian Cycling Progress" : "New National Team Selection Criteria",
    date: newsId === 1 ? "May 15, 2025" : "May 10, 2025",
    author: "Admin",
    content:
      newsId === 1
        ? `<p>How has Estonian timetrail progressed the last 10 years? 2010 we had 2 riders passing the 45km/h barrier, 2025 we have 20 different riders passing the barrier.</p>
         <p>This remarkable progress is a testament to the hard work of coaches, riders, and the Estonian Cycling Federation. The investment in training facilities, coaching staff, and youth development programs has paid off significantly.</p>
         <p>Analysis of the data shows that the average speed of the top 10 Estonian time trialists has increased by 15% over the past decade. This improvement can be attributed to better equipment, more scientific training methods, and increased competition within the country.</p>
         <p>The national time trial championships have become increasingly competitive, with the winning margin decreasing from over a minute in 2010 to just seconds in recent years. This level of competition pushes riders to continually improve their performance.</p>
         <p>Looking ahead, the federation has set ambitious goals for the next five years, aiming to have Estonian riders competing at the highest level of international time trialing.</p>`
        : `<p>The Estonian Cycling Federation has announced new selection criteria for the national team. The new system will be based on a combination of UCI points and national ranking points.</p>
         <p>Previously, selection was primarily based on coach recommendations and results in specific target races. The new approach aims to create a more transparent and objective selection process.</p>
         <p>Riders will need to accumulate points throughout the season, with UCI races carrying more weight than national events. This change encourages riders to compete internationally while still valuing domestic competition.</p>
         <p>The federation believes this new system will help identify the most consistent performers and create healthy competition among Estonian cyclists.</p>`,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/news" className="mr-4">
          <Button variant="outline" size="sm" className="rounded-full dark:text-white dark:border-gray-600">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to News
          </Button>
        </Link>
      </div>

      <Card className="cycling-card dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">{newsItem.title}</h1>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{newsItem.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{newsItem.author}</span>
            </div>
          </div>

          <div
            className="prose max-w-none dark:prose-invert prose-img:rounded-lg prose-headings:font-bold prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />

          <div className="mt-8 pt-6 border-t dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Related News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/news/${newsItem.id === 1 ? 2 : 1}`}
                className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <h4 className="font-bold dark:text-white">
                  {newsItem.id === 1 ? "New National Team Selection Criteria" : "Estonian Cycling Progress"}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                  {newsItem.id === 1
                    ? "The Estonian Cycling Federation has announced new selection criteria for the national team."
                    : "How has Estonian timetrail progressed the last 10 years? 2010 we had 2 riders passing the 45km/h barrier."}
                </p>
              </Link>
              <Link
                href="/news/3"
                className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <h4 className="font-bold dark:text-white">Upcoming Training Camps</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                  The national team will hold training camps in Spain and Italy this winter.
                </p>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
