export type WidgetType = 'table' | 'barLineChart';

export interface DashboardSnapshot {
  type: 'DASHBOARD_SNAPSHOT';
  timestamp: number;
  widgets: Widget[];
}

export type Widget = TableWidget | BarLineChartWidget;

export interface BaseWidget {
  id: string;
  type: WidgetType;
  title: string;
}

export interface TableWidget extends BaseWidget {
  type: 'table';
  columns: {
    key: string;
    label: string;
  }[];
  rows: Record<string, string | number>[];
}

export interface BarLineChartWidget extends BaseWidget {
  type: 'barLineChart';
  labels: string[];
  datasets: {
    type: 'bar' | 'line';
    label: string;
    data: number[];
  }[];
}
