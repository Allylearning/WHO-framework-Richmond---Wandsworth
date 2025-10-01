'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { WhoFrameworkDiagram } from '@/components/who-framework-diagram';
import { SectionDetails } from '@/components/section-details';
import { frameworkSections, type FrameworkSection, foundationalPrinciples } from '@/lib/framework-data';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';


const Legend = () => (
    <Card className="w-full mt-4 bg-card/80 text-sm">
        <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
                <div className="legend-key legend-key--sexual" />
                <p>Sexual health intervention areas</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="legend-key legend-key--reproductive" />
                <p>Reproductive health intervention areas</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: 'hsl(var(--outer-ring))' }} />
                <p>Climate of social-structural factors</p>
            </div>
        </CardContent>
    </Card>
);

const FoundationalPrinciples = () => {
    const plugin = useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    const principlesWithColors = useMemo(() => {
        const principleColors = [
            'bg-principle-1', 'bg-principle-2', 'bg-principle-3',
            'bg-principle-4', 'bg-principle-5', 'bg-principle-6'
        ];
        return foundationalPrinciples.map((principle, index) => ({
            ...principle,
            colorClass: principleColors[index % principleColors.length]
        }));
    }, []);

    return (
        <div className="w-full mt-8">
             <h2 className="text-xl font-bold text-center mb-4 text-primary-foreground">Foundational Guiding Principles</h2>
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="-ml-2">
                    {principlesWithColors.map((principle) => (
                        <CarouselItem key={principle.id} className="pl-2 basis-auto">
                            <div className="p-1">
                                <div
                                    className={cn(
                                        "flex-shrink-0 p-2 px-3 rounded-lg shadow-md text-primary",
                                        principle.colorClass
                                    )}
                                >
                                    <p className="text-xs font-semibold">{principle.name}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};


export default function Home() {
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [viewedSectionIds, setViewedSectionIds] = useState<Set<number>>(new Set());
  const [completionMessageSent, setCompletionMessageSent] = useState(false);
  const isMobile = useIsMobile();

  const activeSectionInfo = useMemo(() => {
    if (activeSectionId === null) return null;
    const section = frameworkSections.find(s => s.id === activeSectionId) ?? null;
    if (!section) return null;
    
    const activeIndex = frameworkSections.findIndex(s => s.id === activeSectionId);
    const isPink = activeIndex % 2 !== 0;

    return { section, isPink };
  }, [activeSectionId]);

  const handleSectionSelect = useCallback((section: FrameworkSection) => {
    setActiveSectionId(section.id);
    setViewedSectionIds(prev => new Set(prev).add(section.id));
  }, []);

  useEffect(() => {
    if (!completionMessageSent && viewedSectionIds.size === frameworkSections.length) {
      window.parent.postMessage('complete', '*');
      setCompletionMessageSent(true);
    }
  }, [viewedSectionIds, completionMessageSent]);

  const PrinciplesComponent = <FoundationalPrinciples />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
       <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4">
        <div className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
          <div className="flex w-full max-w-lg flex-col items-center justify-center lg:sticky lg:top-8 lg:w-1/2">
            <WhoFrameworkDiagram
              sections={frameworkSections}
              activeSectionId={activeSectionId}
              viewedSectionIds={viewedSectionIds}
              onSectionSelect={handleSectionSelect}
              size={isMobile ? 380 : 600}
            />
            {isMobile && PrinciplesComponent}
          </div>
          <aside className="w-full lg:w-1/2 lg:mt-8 lg:ml-8">
            <SectionDetails
              section={activeSectionInfo?.section ?? null}
              isPink={activeSectionInfo?.isPink ?? false}
            />
            <Legend />
          </aside>
        </div>
        {!isMobile && PrinciplesComponent}
      </main>
    </div>
  );
}
