import { type FrameworkSection } from '@/lib/framework-data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionDetailsProps {
  section: FrameworkSection | null;
  isPink: boolean;
}

export function SectionDetails({ section, isPink }: SectionDetailsProps) {
  if (!section) {
    return (
      <Card className="flex h-full min-h-[400px] w-full items-center justify-center rounded-xl border-dashed bg-card">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium">Select a section</p>
          <p>Click on a segment in the diagram to learn more.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "w-full min-h-[400px] transition-all duration-300 rounded-xl shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0",
      isPink ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground"
    )}>
      <CardHeader>
        <CardTitle className={cn(
            "flex items-center gap-3 font-headline text-2xl md:text-3xl",
            isPink ? "text-accent-foreground" : "text-primary"
        )}>
          {section.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Framework Details</h3>
          <p className={cn(isPink ? "text-accent-foreground/80" : "text-muted-foreground")}>{section.details}</p>
        </div>
      </CardContent>
    </Card>
  );
}
