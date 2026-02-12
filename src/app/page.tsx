'use client';

import { useState, useMemo, useCallback } from 'react';
import { WhoFrameworkDiagram } from '@/components/who-framework-diagram';
import { SectionDetails } from '@/components/section-details';
import { frameworkSections, type FrameworkSection, foundationalPrinciples } from '@/lib/framework-data';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';


const Legend = () => (
    <Card className="w-full mt-4 bg-card/80 text-sm">
        <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
                <div className="legend-key legend-key--sexual border" />
                <p>Sexual health intervention areas</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="legend-key legend-key--reproductive border" />
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
             <h2 className="text-2xl font-bold text-center mb-2 text-primary-foreground">
                Foundational Guiding Principles
            </h2>
             <p className="text-center text-sm text-primary-foreground/80 mb-6">
                Explore each principle below. They are displayed together for quick comparison.
            </p>
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {principlesWithColors.map((principle) => (
                    <div
                        key={principle.id}
                        className={cn(
                            "rounded-2xl border border-primary/15 p-6 text-center shadow-lg transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            principle.colorClass
                        )}
                        style={{ alignContent: 'center' }}
                    >
                        <p className="text-xl font-extrabold leading-snug text-primary-foreground sm:text-2xl">
                            {principle.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default function Home() {
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [viewedSectionIds, setViewedSectionIds] = useState<Set<number>>(new Set());
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
          </div>
          <aside className="w-full lg:w-1/2 lg:mt-8 lg:ml-8">
            <SectionDetails
              section={activeSectionInfo?.section ?? null}
              isPink={activeSectionInfo?.isPink ?? false}
            />
            {isMobile && (
              <div className="mt-6 w-full">
                {PrinciplesComponent}
              </div>
            )}
            <Legend />
          </aside>
        </div>
        {!isMobile && PrinciplesComponent}
      </main>
    </div>
  );
}
