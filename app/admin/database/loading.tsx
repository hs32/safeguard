import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DatabaseLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-64 bg-white/10" />
          <Skeleton className="h-4 w-96 mt-2 bg-white/10" />
        </div>
        <Skeleton className="h-6 w-20 bg-white/10" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-white/10" />
            <Skeleton className="h-4 w-64 bg-white/10" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full bg-white/10" />
            <Skeleton className="h-10 w-full bg-white/10" />
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-white/10" />
            <Skeleton className="h-4 w-64 bg-white/10" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full bg-white/10" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
