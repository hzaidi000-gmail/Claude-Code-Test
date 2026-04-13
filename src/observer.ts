/**
 * Observer Design Pattern - Core Interfaces
 *
 * The Observer pattern defines a one-to-many dependency between objects so that
 * when one object (the Subject) changes state, all its dependents (Observers)
 * are notified and updated automatically.
 */

/** Data payload sent from the WeatherStation to observers. */
export interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
}

/** Observer interface — implemented by any display that wants weather updates. */
export interface Observer {
  update(data: WeatherData): void;
}

/** Subject interface — implemented by the object being observed. */
export interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}
