export interface DashboardKpi {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  note: string;
}

export interface SalesHistory {
  labels: string[];
  values: number[];
}

export interface SalesByPeriod {
  labels: string[];
  values: number[];
  amount: string;
}

export interface ReferralStat {
  label: string;
  value: number;
  percentage: number;
  color: 'success' | 'info';
}

export interface DashboardData {
  kpis: DashboardKpi[];
  salesHistory: SalesHistory;
  salesByPeriod: SalesByPeriod;
  referrals: ReferralStat[];
}
