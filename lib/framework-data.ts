import type { LucideIcon } from "lucide-react";

export interface FrameworkSection {
  id: number;
  name: string;
  details: string;
  Icon?: LucideIcon;
}

export const frameworkSections: FrameworkSection[] = [
  {
    id: 8,
    name: "Sexual function & psychosexual counselling",
    details: "Addresses sexual concerns and dysfunctions through counseling and clinical support. It aims to improve sexual well-being and satisfaction by addressing psychological, emotional, and physical factors affecting sexual function.",
  },
  {
    id: 1,
    name: "Antenatal, intrapartum & postnatal care",
    details: "Covers the continuum of care for mothers and newborns, from pre-pregnancy, through pregnancy, childbirth, and the postnatal period. Key interventions include quality antenatal care, skilled birth attendance, and postnatal care for both mother and baby.",
  },
  {
    id: 2,
    name: "Safe abortion care",
    details: "Advocates for the availability, accessibility, acceptability, and quality of safe abortion care to the full extent of the law. This includes providing information, post-abortion care, and access to a full range of contraceptive methods.",
  },
  {
    id: 3,
    name: "Prevention & control of HIV & other sexually transmissible infections",
    details: "Focuses on the prevention, diagnosis, treatment, and care of HIV and other sexually transmitted infections. Strategies include promoting safer sex, testing and counseling, access to antiretroviral therapy, and linking HIV services with other sexual and reproductive health services.",
  },
  {
    id: 4,
    name: "Fertility care",
    details: "Addresses the prevention, diagnosis, and treatment of infertility within a supportive legal and policy framework. It advocates for access to quality and equitable fertility care as a core component of reproductive health.",
  },
  {
    id: 5,
    name: "Comprehensive education & information",
    details: "Focuses on providing curricula-based education about the cognitive, emotional, physical, and social aspects of sexuality. It aims to equip young people with the knowledge, skills, attitudes, and values to make informed decisions about their health, well-being, and relationships.",
  },
  {
    id: 6,
    name: "Contraception counselling & provision",
    details: "Ensures that individuals and couples have access to information and a range of contraceptive methods to make voluntary and informed decisions about their reproductive lives. This includes counseling on effectiveness, side effects, and correct use.",
  },
  {
    id: 7,
    name: "Gender-based violence prevention, support & care",
    details: "Focuses on preventing and responding to gender-based violence through health, education, and social support systems. It includes clinical care for survivors, counseling, and programs to challenge harmful gender norms.",
  },
];

export const foundationalPrinciples = [
    { id: 1, name: "Holistic approach to sexual health" },
    { id: 2, name: "Linked nature of sexual health and reproductive health" },
    { id: 3, name: "Respect, protection and fulfilment of human rights" },
    { id: 4, name: "Multilevel influences on sexual health" },
    { id: 5, name: "Diversity of needs across life course and populations" },
    { id: 6, name: "Evidence-based, respectful and positive approach" },
];
