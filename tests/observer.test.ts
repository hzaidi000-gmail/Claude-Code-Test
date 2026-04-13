import { WeatherStation } from "../src/weather-station";
import {
  CurrentConditionsDisplay,
  StatisticsDisplay,
  ForecastDisplay,
} from "../src/displays";

describe("WeatherStation (Subject)", () => {
  let station: WeatherStation;

  beforeEach(() => {
    station = new WeatherStation();
  });

  test("starts with zero observers", () => {
    expect(station.getObserverCount()).toBe(0);
  });

  test("tracks subscribed observers", () => {
    const display = new CurrentConditionsDisplay();
    station.subscribe(display);
    expect(station.getObserverCount()).toBe(1);
  });

  test("removes unsubscribed observers", () => {
    const display = new CurrentConditionsDisplay();
    station.subscribe(display);
    station.unsubscribe(display);
    expect(station.getObserverCount()).toBe(0);
  });

  test("does not duplicate the same observer", () => {
    const display = new CurrentConditionsDisplay();
    station.subscribe(display);
    station.subscribe(display);
    expect(station.getObserverCount()).toBe(1);
  });

  test("notifies all subscribed observers on measurement change", () => {
    const d1 = new CurrentConditionsDisplay();
    const d2 = new StatisticsDisplay();
    station.subscribe(d1);
    station.subscribe(d2);
    station.setMeasurements(25, 60, 1013);

    expect(d1.getData()).toEqual({ temperature: 25, humidity: 60, pressure: 1013 });
    expect(d2.getStats()).toEqual({ min: 25, max: 25, avg: 25 });
  });

  test("does not notify unsubscribed observers", () => {
    const display = new CurrentConditionsDisplay();
    station.subscribe(display);
    station.setMeasurements(20, 50, 1010);
    station.unsubscribe(display);
    station.setMeasurements(30, 80, 1020);

    // display should still hold the old data
    expect(display.getData()).toEqual({ temperature: 20, humidity: 50, pressure: 1010 });
  });
});

describe("CurrentConditionsDisplay", () => {
  test("shows 'No data available.' before any update", () => {
    const display = new CurrentConditionsDisplay();
    expect(display.getDisplay()).toBe("No data available.");
  });

  test("shows latest conditions after update", () => {
    const display = new CurrentConditionsDisplay();
    display.update({ temperature: 22, humidity: 55, pressure: 1012 });
    expect(display.getDisplay()).toBe("Current Conditions: 22°C, 55% humidity");
  });
});

describe("StatisticsDisplay", () => {
  test("shows 'No data available.' before any update", () => {
    const display = new StatisticsDisplay();
    expect(display.getDisplay()).toBe("No data available.");
  });

  test("computes correct min/max/avg over multiple updates", () => {
    const display = new StatisticsDisplay();
    display.update({ temperature: 20, humidity: 0, pressure: 0 });
    display.update({ temperature: 30, humidity: 0, pressure: 0 });
    display.update({ temperature: 25, humidity: 0, pressure: 0 });

    const stats = display.getStats()!;
    expect(stats.min).toBe(20);
    expect(stats.max).toBe(30);
    expect(stats.avg).toBe(25);
    expect(display.getDisplay()).toBe("Statistics: Avg/Max/Min temperature = 25.0/30/20");
  });
});

describe("ForecastDisplay", () => {
  test("shows 'No data available.' before any update", () => {
    const display = new ForecastDisplay();
    expect(display.getDisplay()).toBe("No data available.");
  });

  test("awaits more data after first update", () => {
    const display = new ForecastDisplay();
    display.update({ temperature: 0, humidity: 0, pressure: 1013 });
    expect(display.getDisplay()).toBe("Forecast: Awaiting more data...");
  });

  test("predicts improving weather when pressure rises", () => {
    const display = new ForecastDisplay();
    display.update({ temperature: 0, humidity: 0, pressure: 1010 });
    display.update({ temperature: 0, humidity: 0, pressure: 1015 });
    expect(display.getDisplay()).toBe("Forecast: Improving weather on the way!");
  });

  test("predicts rainy weather when pressure drops", () => {
    const display = new ForecastDisplay();
    display.update({ temperature: 0, humidity: 0, pressure: 1015 });
    display.update({ temperature: 0, humidity: 0, pressure: 1010 });
    expect(display.getDisplay()).toBe("Forecast: Watch out for cooler, rainy weather.");
  });

  test("predicts same weather when pressure is unchanged", () => {
    const display = new ForecastDisplay();
    display.update({ temperature: 0, humidity: 0, pressure: 1013 });
    display.update({ temperature: 0, humidity: 0, pressure: 1013 });
    expect(display.getDisplay()).toBe("Forecast: More of the same.");
  });
});
