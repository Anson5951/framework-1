type Task = {
  interval: number;
  lastRun: number;
  render: () => void;
};

/**
 * centralized scheduler for chart rendering to avoid interval drifting
 */
class ChartScheduler {
  private tasks = new Map<string, Task>();
  private rafId: number | null = null;

  register(chartId: string, interval: number, render: () => void) {
    this.tasks.set(chartId, { interval, lastRun: 0, render });
  }

  start() {
    if (this.rafId !== null) return;

    const loop = (now: number) => {
      this.tasks.forEach((task) => {
        if (now - task.lastRun >= task.interval) {
          task.lastRun = now;
          task.render();
        }
      });
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }
}

export const scheduler = new ChartScheduler();
