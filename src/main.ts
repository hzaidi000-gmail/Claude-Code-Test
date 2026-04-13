import { WeatherStation } from "./weather-station";
import {
  CurrentConditionsDisplay,
  StatisticsDisplay,
  ForecastDisplay,
} from "./displays";

function main(): void {
  // Create the Subject (the thing being observed)
  const station = new WeatherStation();

  // Create Observers (the things that react to changes)
  const currentDisplay = new CurrentConditionsDisplay();
  const statsDisplay = new StatisticsDisplay();
  const forecastDisplay = new ForecastDisplay();

  // Subscribe observers to the subject
  station.subscribe(currentDisplay);
  station.subscribe(statsDisplay);
  station.subscribe(forecastDisplay);

  console.log("=== Weather Station: Observer Pattern Demo ===\n");

  // Simulate weather changes — each call notifies all observers automatically
  console.log("--- Measurement Update 1 ---");
  station.setMeasurements(26.5, 65, 1013.1);
  console.log(currentDisplay.getDisplay());
  console.log(statsDisplay.getDisplay());
  console.log(forecastDisplay.getDisplay());

  console.log("\n--- Measurement Update 2 ---");
  station.setMeasurements(28.2, 70, 1015.2);
  console.log(currentDisplay.getDisplay());
  console.log(statsDisplay.getDisplay());
  console.log(forecastDisplay.getDisplay());

  console.log("\n--- Measurement Update 3 ---");
  station.setMeasurements(22.1, 90, 1009.4);
  console.log(currentDisplay.getDisplay());
  console.log(statsDisplay.getDisplay());
  console.log(forecastDisplay.getDisplay());

  // Demonstrate unsubscribing — forecastDisplay stops receiving updates
  console.log("\n--- Unsubscribing Forecast Display ---");
  station.unsubscribe(forecastDisplay);

  console.log("\n--- Measurement Update 4 (Forecast unsubscribed) ---");
  station.setMeasurements(30.0, 55, 1020.0);
  console.log(currentDisplay.getDisplay());
  console.log(statsDisplay.getDisplay());
  console.log(forecastDisplay.getDisplay()); // Still shows stale data
  console.log("  ^ Forecast display was not updated (unsubscribed).");
}

main();
