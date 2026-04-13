import { Observer, Subject, WeatherData } from "./observer";

/**
 * WeatherStation is the concrete Subject.
 *
 * It maintains a list of observers and notifies them whenever
 * new weather measurements are recorded.
 */
export class WeatherStation implements Subject {
  private observers: Set<Observer> = new Set();
  private data: WeatherData = { temperature: 0, humidity: 0, pressure: 0 };

  subscribe(observer: Observer): void {
    this.observers.add(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers.delete(observer);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.data);
    }
  }

  /**
   * Called when new weather measurements are available.
   * Stores the data and notifies all observers.
   */
  setMeasurements(temperature: number, humidity: number, pressure: number): void {
    this.data = { temperature, humidity, pressure };
    this.notify();
  }

  getObserverCount(): number {
    return this.observers.size;
  }
}
