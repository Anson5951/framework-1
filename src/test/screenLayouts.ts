export const SCREEN_LAYOUTS: Array<Array<string | null>> = [
  ["cpu", "memory", "disk", "net_in", "net_out", "requests"],
  ["requests", "cpu", "memory", "disk", "net_in", "net_out"],
  ["net_out", "disk", "cpu", "memory", "requests", "net_in"]
];
