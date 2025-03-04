import { ReactNode } from "react";

export type SubsectionId = "developer" | "designer" | "dj" | "breakdancer" | "backpacker";

export interface SubsectionCardProps {
  icon: string;
  title: string;
  description: string;
  onCardClick: () => void;
}

export interface DetailPopupProps {
  icon: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export interface SubsectionData {
  icon: string;
  title: string;
  shortDescription: string;
  detailContent: ReactNode;
}

export type SubsectionsDataMap = Record<SubsectionId, SubsectionData>;
