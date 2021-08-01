import { hConvert } from "../../utils/helpers";
import { Link } from "react-router-dom";

export default function WalkerAppointments({
  user,
  userParam,
  calendarValue,
}: any) {
  const { _id: userId, availability, appointments } = user;

  const appointmentCards = appointments.map(
    (appointment: any, index: number) => {
      const {
        _id: appointmentId,
        date,
        hour,
        doggos,
        owner,
        walker,
      } = appointment;

      let doggoCards = doggos.map((doggo: any) => {
        const { _id: doggoId, name, picture } = doggo;
        return (
          <article className="little-doggo-card" key={doggoId}>
            <img
              className="doggo-card-picture"
              alt={"a doggo named " + name}
              src={picture}
            ></img>
            <div className="doggo-card-name">{name}</div>
          </article>
        );
      });

      return (
        <div className="appointment-card" key={appointmentId}>
          <div className="appointment-date">
            <span>Date: </span>
            <span>
              {new Date(parseInt(date)).toLocaleDateString("en-en", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                weekday: "long",
              })}
            </span>
          </div>
          <div className="appointment-hour">
            <span>Appointment Time: </span>
            <span>{hConvert(hour)}</span>
          </div>
          {/* <div className="appointment-walker">
            <span>Walker Name: </span>
            <span>{walker.username}</span>
          </div> */}
          <div className="appointment-owner">
            <span>Owner Name: </span>
            <Link to={"/User/" + owner.username}>{owner.username}</Link>
          </div>
          <div className="appointment-doggos">
            <span>Dogs: </span>
            <div className="appointment-doggos-container">{doggoCards}</div>
          </div>
        </div>
      );
    }
  );

  const appointmentsElement = (
    <div className="appointments">
      <label className="appointments-label">Your Appointments:</label>
      <div className="appointment-card-container">
        {appointments?.length ? appointmentCards : "no appointments to show!"}
      </div>
    </div>
  );

  return appointmentsElement;
}
