'use client';

import { type FrameworkSection } from '@/lib/framework-data';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WhoFrameworkDiagramProps {
  sections: FrameworkSection[];
  activeSectionId: number | null;
  viewedSectionIds: Set<number>;
  onSectionSelect: (section: FrameworkSection) => void;
  size?: number;
}

const PinwheelSegment = ({
  section,
  index,
  total,
  radius,
  isActive,
  isViewed,
  onClick,
  wheelRotation,
  isMobile
}: {
  section: FrameworkSection;
  index: number;
  total: number;
  radius: number;
  isActive: boolean;
  isViewed: boolean;
  onClick: () => void;
  wheelRotation: number;
  isMobile: boolean;
}) => {
  const angle = 360 / total;
  const rotation = index * angle;

  const startAngle = -angle / 2;
  const endAngle = angle / 2;
  const x1 = radius * Math.cos((startAngle * Math.PI) / 180);
  const y1 = radius * Math.sin((startAngle * Math.PI) / 180);
  const x2 = radius * Math.cos((endAngle * Math.PI) / 180);
  const y2 = radius * Math.sin((endAngle * Math.PI) / 180);
  const largeArcFlag = angle > 180 ? 1 : 0;
  const pathData = `M0,0 L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

  const contentRadius = radius * 0.7;
  const contentAngle = 0;
  const iconX = contentRadius * Math.cos((contentAngle * Math.PI) / 180);
  const iconY = contentRadius * Math.sin((contentAngle * Math.PI) / 180);

  const checkRadius = radius * 0.9;
  const checkAngle = (angle / 2) * 0.75;
  const checkX = checkRadius * Math.cos((checkAngle * Math.PI) / 180);
  const checkY = checkRadius * Math.sin((checkAngle * Math.PI) / 180);

  const isPinkSegment = index % 2 !== 0;

  return (
    <g
      transform={`rotate(${rotation})`}
      className={cn(
        'cursor-pointer group transition-transform duration-300 ease-in-out',
        isActive ? 'scale-1.05' : 'scale-1'
      )}
      onClick={onClick}
    >
      <path
        d={pathData}
        className={cn(
          'stroke-background stroke-2 transition-all duration-300',
           isPinkSegment
            ? 'fill-accent group-hover:fill-accent-hover active:fill-accent-hover'
            : 'fill-card group-hover:fill-card-hover active:fill-card-hover',
           isActive && (isPinkSegment ? 'fill-accent-hover' : 'fill-card-hover')
        )}
      />
      <g transform={`translate(${iconX}, ${iconY}) rotate(${-rotation - wheelRotation})`}
         className="transition-transform duration-1000 ease-in-out"
      >
        <foreignObject
          x={isMobile ? "-40" : "-60"}
          y={isMobile ? "-35" : "-50"}
          width={isMobile ? "80" : "120"}
          height={isMobile ? "70" : "100"}
          className="pointer-events-none"
        >
          <div
            className={cn(
              'flex flex-col items-center justify-center text-center w-full h-full p-1 transition-colors duration-300',
               isPinkSegment ? 'text-accent-foreground' : 'text-card-foreground',
            )}
          >
            <p className={cn(
                "leading-tight font-semibold max-w-full break-words",
                isMobile ? "text-[10px]" : "text-sm"
            )}>
              {section.name}
            </p>
          </div>
        </foreignObject>
      </g>
       {isViewed && (
         <g transform={`translate(${checkX}, ${checkY}) rotate(${-rotation - wheelRotation})`}
            className="transition-transform duration-1000 ease-in-out"
         >
            <foreignObject
                x="-12"
                y="-12"
                width="24"
                height="24"
                className="pointer-events-none"
            >
                <CheckCircle2 className="h-6 w-6 text-green-500 bg-background rounded-full" />
            </foreignObject>
        </g>
      )}
    </g>
  );
};


export function WhoFrameworkDiagram({
  sections,
  activeSectionId,
  viewedSectionIds,
  onSectionSelect,
  size = 600,
}: WhoFrameworkDiagramProps) {
  const radius = size * 0.375; // 225 when size is 600
  const outerRingRadius = size * 0.45; // 270 when size is 600
  const [wheelRotation, setWheelRotation] = useState(0);
  
  const outerRingTextPathId = "outerRingTextPath";

  // Path for text (invisible) - semi-circle on top
  const textPathD = `M ${size / 2 - outerRingRadius}, ${size / 2} A ${outerRingRadius},${outerRingRadius} 0 0 1 ${size / 2 + outerRingRadius}, ${size / 2}`;
  
  useEffect(() => {
    if (activeSectionId !== null) {
      const activeIndex = sections.findIndex((s) => s.id === activeSectionId);
      if (activeIndex !== -1) {
        const anglePerSection = 360 / sections.length;
        const targetRotation = -activeIndex * anglePerSection;

        setWheelRotation((currentRotation) => {
          const diff = targetRotation - (currentRotation % 360);
          let newRotation = currentRotation + diff;

          if (Math.abs(diff) > 180) {
            if (diff > 0) {
              newRotation = currentRotation + diff - 360;
            } else {
              newRotation = currentRotation + diff + 360;
            }
          }
          return newRotation;
        });
      }
    }
  }, [activeSectionId, sections]);
  
  const isMobile = size < 400;
  const centerObjectSize = size * 0.3; // 180 when size is 600

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
            <path
                id={outerRingTextPathId}
                d={textPathD}
                fill="none"
            />
        </defs>

        {/* Visual outer ring */}
        <circle cx={size/2} cy={size/2} r={size * 0.483} fill="hsl(var(--outer-ring))" stroke="hsl(var(--border))" strokeWidth="1"></circle>

        <text className={cn("fill-background font-semibold", isMobile ? "text-[8px]" : "text-sm" )} dy={isMobile ? "-2" : "-4"} dominantBaseline="middle">
            <textPath href={`#${outerRingTextPathId}`} startOffset="50%" textAnchor="middle" letterSpacing={isMobile ? "0.2" : "0.5"}>
              Cultural & Social norms &nbsp; • &nbsp; Human rights &nbsp; • &nbsp; Gender & socioeconomic inequalities &nbsp; • &nbsp; Laws & policies
            </textPath>
        </text>
        <g 
          transform={`translate(${size / 2}, ${size / 2}) rotate(${wheelRotation})`}
          className="transition-transform duration-1000 ease-in-out"
        >
          {sections.map((section, index) => (
            <PinwheelSegment
              key={section.id}
              section={section}
              index={index}
              total={sections.length}
              radius={radius}
              isActive={section.id === activeSectionId}
              isViewed={viewedSectionIds.has(section.id)}
              onClick={() => onSectionSelect(section)}
              wheelRotation={wheelRotation}
              isMobile={isMobile}
            />
          ))}
        </g>
         <g transform={`translate(${size / 2}, ${size / 2})`} className="pointer-events-none">
          <foreignObject x={-centerObjectSize/2} y={-centerObjectSize/2} width={centerObjectSize} height={centerObjectSize}>
            <div 
              className="z-[1] flex h-full w-full flex-col items-center justify-center bg-primary p-4 text-center text-primary-foreground shadow-lg transition-all duration-300"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              }}
            >
              <h2 className={cn(
                  "font-headline font-bold leading-tight",
                  isMobile ? "text-[10px]" : "text-base"
              )}>
                Physical, emotional, mental & social well-being in relation to sexuality
              </h2>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}
