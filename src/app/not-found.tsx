import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4 py-16">
      <AlertTriangle className="h-24 w-24 text-destructive mb-8" />
      <h1 className="text-5xl font-extrabold text-foreground mb-4">404 - Page Lost in Action</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        It seems the page you're looking for has gone MIA. Don't worry, we'll get you back on track.
      </p>
      <div className="space-x-4">
        <Link href="/">
          <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Return to Home Base
          </Button>
        </Link>
        <Link href="/products">
          <Button size="lg" variant="outline">
            Browse All Gear
          </Button>
        </Link>
      </div>
    </div>
  )
}
