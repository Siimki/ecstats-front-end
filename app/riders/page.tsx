import RidersClient from "./client"
import { fetchTop100Riders } from "@/lib/api-client"

export default async function RidersPage() {
  const top100 = await fetchTop100Riders()
  console.log(top100)
  return <RidersClient top100={top100} />
}
