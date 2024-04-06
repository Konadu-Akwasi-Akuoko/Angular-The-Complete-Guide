import { PhoneDisplay } from "./implementations/phoneDisplay";
import { TvDisplay } from "./implementations/tvDisplay";
import { WatchDisplay } from "./implementations/watchDisplay";
import { WeatherStation } from "./implementations/weatherStation";

const weatherStation: WeatherStation = new WeatherStation();

const phoneDisplay: PhoneDisplay = new PhoneDisplay();
const tvDisplay: TvDisplay = new TvDisplay();
const watchDisplay: WatchDisplay = new WatchDisplay();

weatherStation.addObserver(phoneDisplay);
weatherStation.addObserver(tvDisplay);
weatherStation.addObserver(watchDisplay);

// Using error here so that the console color can change when logging happens
console.error("Waiting for 1 second before continuing");
await new Promise((resolve) => setTimeout(resolve, 1000));

weatherStation.listObservers();

console.error("Waiting for 1 second before continuing");
await new Promise((resolve) => setTimeout(resolve, 1000));

// Simulating weather change
weatherStation.setWeather("sunny");
weatherStation.setWeather("rainy");
weatherStation.setWeather("snowy");

console.error("Waiting for 1 second before continuing");
await new Promise((resolve) => setTimeout(resolve, 1000));

weatherStation.setWeather("rainy");

console.error("Waiting for 1 second before continuing");
await new Promise((resolve) => setTimeout(resolve, 1000));

weatherStation.setWeather("snowy");

console.error("Waiting for 1 second before continuing");
await new Promise((resolve) => setTimeout(resolve, 1000));

weatherStation.removeObserver(phoneDisplay);
weatherStation.listObservers();
weatherStation.removeObserver(tvDisplay);
weatherStation.listObservers();
weatherStation.removeObserver(watchDisplay);

console.error("Waiting for 1 second before continuing");
await new Promise((resolve) => setTimeout(resolve, 1000));

weatherStation.listObservers();

/**
 * Output:
 * Waiting for 1 second before continuing
 * Observer added:{
 *  "weather": "",
 * "name": "Phone Display"
 */
