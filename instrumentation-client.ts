import type { Metric } from "web-vitals";

function logMetric(metric: Metric) {
  if (metric.name === "LCP" || metric.name === "CLS" || metric.name === "INP") {
    console.log(`[web-vitals] ${metric.name}:`, metric.value);
  }
}

export function onLCP(metric: Metric) {
  logMetric(metric);
}

export function onCLS(metric: Metric) {
  logMetric(metric);
}

export function onINP(metric: Metric) {
  logMetric(metric);
}
