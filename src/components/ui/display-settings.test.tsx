import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useSceneStore } from "@/stores/scene-store";

import { DisplaySettings } from "./display-settings";

/** Opens the popover and resolves once Radix has mounted its portal content. */
async function openPanel() {
  render(<DisplaySettings />);
  fireEvent.click(screen.getByRole("button", { name: "Display settings" }));
  return screen.findByTestId("display-settings");
}

describe("<DisplaySettings />", () => {
  beforeEach(() => {
    useSceneStore.setState({ qualityTier: "medium", qualityLocked: false });
  });

  it("starts on Auto and reports the tier the controller settled on", async () => {
    useSceneStore.setState({ qualityTier: "high" });
    await openPanel();

    expect(screen.getByRole("radio", { name: /auto/i })).toBeChecked();
    expect(screen.getByText(/currently high/i)).toBeInTheDocument();
  });

  it("pins the tier and locks the adaptive controller on selection", async () => {
    await openPanel();

    fireEvent.click(screen.getByRole("radio", { name: /^ultra/i }));

    expect(useSceneStore.getState().qualityTier).toBe("ultra");
    expect(useSceneStore.getState().qualityLocked).toBe(true);
  });

  it("releases the lock when Auto is chosen again", async () => {
    useSceneStore.setState({ qualityTier: "low", qualityLocked: true });
    await openPanel();

    expect(screen.getByRole("radio", { name: /^low/i })).toBeChecked();

    fireEvent.click(screen.getByRole("radio", { name: /auto/i }));

    expect(useSceneStore.getState().qualityLocked).toBe(false);
  });
});
