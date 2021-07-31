export const hConvert = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];
  if (time.length > 0) {
    // If time format correct
    time = time.slice(0); // Remove full string match value
    time[time.length] = +time[0] < 12 ? "a" : "p"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
};
