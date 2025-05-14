export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent"></div>
        <p className="text-lg text-foreground">Loading Urban Armor...</p>
      </div>
    </div>
  );
}
