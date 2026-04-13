# Observer Pattern Sample App

A TypeScript application demonstrating the **Observer Design Pattern** using a Weather Station example.

## What is the Observer Pattern?

The Observer pattern defines a **one-to-many** dependency between objects. When one object (the **Subject**) changes state, all its dependents (the **Observers**) are notified and updated automatically.

### Key Components

| Role | Interface | Implementation |
|------|-----------|----------------|
| **Subject** | `Subject` | `WeatherStation` — holds weather data and notifies observers on changes |
| **Observer** | `Observer` | `CurrentConditionsDisplay` — shows the latest temperature and humidity |
| | | `StatisticsDisplay` — tracks min/max/avg temperature over time |
| | | `ForecastDisplay` — predicts weather based on barometric pressure trends |

### How It Works

```
WeatherStation (Subject)
  │
  │── subscribe/unsubscribe observers
  │── setMeasurements() triggers notify()
  │
  ├── CurrentConditionsDisplay (Observer)
  ├── StatisticsDisplay (Observer)
  └── ForecastDisplay (Observer)
```

1. Observers **subscribe** to the `WeatherStation`.
2. When `setMeasurements()` is called, the station calls `notify()`.
3. `notify()` iterates over all subscribers and calls their `update()` method.
4. Each observer processes the data independently.
5. An observer can **unsubscribe** at any time to stop receiving updates.

## Getting Started

```bash
# Install dependencies
npm install

# Run the demo
npm start

# Run the tests
npm test
```

## Project Structure

```
src/
  observer.ts          # Core interfaces (Subject, Observer, WeatherData)
  weather-station.ts   # Concrete Subject implementation
  displays.ts          # Concrete Observer implementations
  main.ts              # Demo entry point
tests/
  observer.test.ts     # Unit tests (15 tests)
```
