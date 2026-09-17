import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardKpi } from '../../core/models/dashboard';
import { DashboardService } from '../../core/services/dashboard';
import { Tag, TagVariant } from '../../shared/components/tag/tag';

@Component({
  imports: [BaseChartDirective, Tag],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly dashboardService = inject(DashboardService);

  protected readonly data = toSignal(this.dashboardService.getDashboardData());

  protected readonly areaChartData = computed<ChartConfiguration<'line'>['data'] | undefined>(() => {
    const history = this.data()?.salesHistory;
    if (!history) return undefined;

    return {
      labels: history.labels,
      datasets: [
        {
          data: history.values,
          label: 'Total libre (GB)',
          fill: true,
          borderColor: '#3BE4AD',
          backgroundColor: (context) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return 'rgba(59, 228, 173, 0.4)';

            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0.2, 'rgba(59, 228, 173, 0.66)');
            gradient.addColorStop(0.81, 'rgba(174, 246, 201, 0)');
            return gradient;
          },
          tension: 0,
          pointRadius: 0,
          yAxisID: 'y',
        },
      ],
    };
  });

  protected readonly areaChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#545A6D' },
      },
      y: {
        type: 'linear',
        position: 'left',
        min: 0,
        max: 100,
        ticks: { stepSize: 100, color: '#545A6D' },
        grid: { display: false },
        border: { display: false },
      },
      y1: {
        type: 'linear',
        position: 'right',
        min: 10,
        max: 15,
        ticks: { stepSize: 5, color: '#545A6D', callback: (value) => `${value}%` },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  protected readonly donutChartData = computed<ChartConfiguration<'doughnut'>['data'] | undefined>(() => {
    const byPeriod = this.data()?.salesByPeriod;
    if (!byPeriod) return undefined;

    return {
      labels: byPeriod.labels,
      datasets: [
        {
          data: byPeriod.values,
          backgroundColor: ['#092083', '#2AB57D', '#0f172a', '#5589CD'],
          borderWidth: 0,
        },
      ],
    };
  });

  protected readonly donutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: { legend: { display: false } },
  };

  protected readonly donutLegend = computed(() => {
    const byPeriod = this.data()?.salesByPeriod;
    if (!byPeriod) return [];

    const colors = ['#092083', '#2AB57D', '#0f172a', '#5589CD'];
    return byPeriod.labels.map((label, index) => ({
      label,
      value: byPeriod.values[index],
      color: colors[index],
      amount: byPeriod.amount,
    }));
  });

  protected variantFor(kpi: DashboardKpi): TagVariant {
    return kpi.changeType === 'positive' ? 'success' : 'danger';
  }
}
