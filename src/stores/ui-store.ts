import { create } from "zustand";

import { SECTIONS, type SectionId } from "@/config/sections";

/**
 * DOM-layer UI state.
 *
 * Deliberately small. Anything that changes every frame belongs in the
 * non-reactive frame buffer instead (`stores/frame-state`) — a store write per
 * frame would re-render the overlay during scroll and cost the canvas its budget.
 */
interface UIState {
  activeSection: SectionId;
  /** Toggles the performance HUD. Bound to a keyboard shortcut. */
  debugOpen: boolean;
}

interface UIActions {
  setActiveSection: (section: SectionId) => void;
  toggleDebug: (open?: boolean) => void;
}

export const useUIStore = create<UIState & UIActions>()((set) => ({
  activeSection: SECTIONS[0].id,
  debugOpen: false,

  setActiveSection: (activeSection) => {
    set({ activeSection });
  },

  toggleDebug: (open) => {
    set((state) => ({ debugOpen: open ?? !state.debugOpen }));
  },
}));
