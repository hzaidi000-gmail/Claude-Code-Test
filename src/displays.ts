import { Observer, WeatherData } from "./observer";

/**
 * CurrentConditionsDisplay shows the latest weather readings.
 */
export class CurrentConditionsDisplay implements Observer {
  private data: WeatherData | null = null;

  update(data: WeatherData): void {
    this.data = data;
  }

  getDisplay(): string {
    if (!this.data) return "No data available.";
    return (
      `Current Conditions: ${this.data.temperature}°C, ` +
      `${this.data.humidity}% humidity`
    );
  }

  getData(): WeatherData | null {
    return this.data;
  }
}

/**
 * StatisticsDisplay tracks min/max/average temperature over time.
 */
export class StatisticsDisplay implements Observer {
  private temperatures: number[] = [];

  update(data: WeatherData): void {
    this.temperatures.push(data.temperature);
  }

  getDisplay(): string {
    if (this.temperatures.length === 0) return "No data available.";
    const min = Math.min(...this.temperatures);
    const max = Math.max(...this.temperatures);
    const avg =
      this.temperatures.reduce((sum, t) => sum + t, 0) /
      this.temperatures.length;
    return `Statistics: Avg/Max/Min temperature = ${avg.toFixed(1)}/${max}/${min}`;
  }

  getStats(): { min: number; max: number; avg: number } | null {
    if (this.temperatures.length === 0) return null;
    const min = Math.min(...this.temperatures);
    const max = Math.max(...this.temperatures);
    const avg =
      this.temperatures.reduce((sum, t) => sum + t, 0) /
      this.temperatures.length;
    return { min, max, avg };
  }
}

/**
 * ForecastDisplay provides a simple forecast based on pressure trends.
 */
export class ForecastDisplay implements Observer {
  private previousPressure: number | null = null;
  private currentPressure: number | null = null;

  update(data: WeatherData): void {
    this.previousPressure = this.currentPressure;
    this.currentPressure = data.pressure;
  }

  getDisplay(): string {
    if (this.currentPressure === null) return "No data available.";
    if (this.previousPressure === null) return "Forecast: Awaiting more data...";

    if (this.currentPressure > this.previousPressure) {
      return "Forecast: Improving weather on the way!";
    } else if (this.currentPressure < this.previousPressure) {
      return "Forecast: Watch out for cooler, rainy weather.";
    }
    return "Forecast: More of the same.";
  }

  getPressures(): { previous: number | null; current: number | null } {
    return { previous: this.previousPressure, current: this.currentPressure };
  }
}
