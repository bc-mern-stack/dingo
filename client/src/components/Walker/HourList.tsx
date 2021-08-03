import { hConvert } from "../../utils/helpers";

export default function HourList({
  selectedHour,
  setSelectedHour,
  selectedDayHours,
}: any) {
  const hourOptions = selectedDayHours.map((hour: number) => {
    const hourName = hour.toString();
    return (
      <option value={hour} className="selected">
        {hConvert(hourName)}
      </option>
    );
  });

  const handleHourChange = (event: any) => {
    setSelectedHour(parseInt(event.target.value));
  };
  return (
    <select value={selectedHour} onChange={handleHourChange}>
      {hourOptions}
    </select>
  );
}
