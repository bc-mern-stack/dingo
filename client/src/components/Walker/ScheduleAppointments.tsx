import { useState } from "react";
import { Link } from "react-router-dom";

import { ADD_APPOINTMENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import HourList from "./HourList";

import closeImg from "../../assets/close.png";

export default function ScheduleAppointments({
  user: walker,
  userParam,
  calendarValue,
}: any) {
  interface doggoList {
    doggos: string[];
  }

  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedDoggos, setSelectedDoggos] = useState<doggoList>({
    doggos: [],
  });

  const {
    loading: meLoading,
    data: meData,
    error: meError,
  } = useQuery(QUERY_ME);

  const me = meData?.me || {};

  const appointmentObject = {
    owner: me?._id,
    walker: walker._id,
    date: calendarValue.toString(),
    hour: selectedHour,
    doggos: selectedDoggos.doggos,
  };

  const [addAppointment, { error }] = useMutation(ADD_APPOINTMENT, {});

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await addAppointment({
        variables: appointmentObject,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoggoSelect = (event: any) => {
    setSelectedDoggos(event.target.value);
    const { name, value, checked } = event.target;

    if (checked === true) {
      // if the target is checked, add it
      setSelectedDoggos({ doggos: [...selectedDoggos.doggos, value] });
    } else {
      // if the target is not checked, remove it
      setSelectedDoggos({
        doggos: [...selectedDoggos.doggos.filter((doggo) => doggo !== value)],
      });
    }
  };

  const doggoCards = me?.doggos.map((doggo: any) => {
    const { _id: doggoId, name, picture } = doggo;
    return (
      <article className="schedule-doggo-card" key={doggoId}>
        <img
          className="schedule-doggo-card-picture"
          alt={"a doggo named " + name}
          src={picture}
        ></img>
        <div className="schedule-doggo-card-name">{name}</div>
        <input
          type="checkbox"
          className="schedule-doggo-card-checkbox"
          value={doggoId}
          onChange={handleDoggoSelect}
        ></input>
      </article>
    );
  });

  const scheduleAppointmentForm = (
    <form
      className="schedule-appointment-form"
      name="schedule-appointment-form"
    >
      <button
        className="schedule-form-hide-btn"
        type="submit"
        onClick={() => setShowScheduleForm(showScheduleForm ? false : true)}
      >
        <img
          src={closeImg}
          alt="close"
          className="schedule-form-hide-btn-img"
        />
      </button>
      <label
        htmlFor="schedule-appointment-form"
        className="schedule-form-label"
      >
        <Link to={"/User/" + me?.username}>{me?.username}</Link>, schedule an
        appointment!
      </label>
      <div className="schedule-date">
        <span>Date (use calendar above): </span>
        <span>
          {new Date(calendarValue).toLocaleDateString("en-en", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "long",
          })}
        </span>
      </div>
      <div className="schedule-hour">
        <span>Appointment Time: </span>
        <span>
          <HourList
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />
        </span>
      </div>
      <div className="schedule-doggos">
        <span>Select Dogs for this Appointment: </span>
        <span className="schedule-doggos-card-container">{doggoCards}</span>
      </div>
      <div className="schedule-appointment-form-buttons">
        <button
          className="schedule-submit-btn"
          type="submit"
          onClick={(e) => handleFormSubmit(e)}
        >
          schedule
        </button>
        {error && <div className="error">{error.message}</div>}
      </div>
    </form>
  );

  const scheduleFormShowBtn = (
    <button
      className="schedule-form-show-btn"
      type="submit"
      onClick={() => setShowScheduleForm(showScheduleForm ? false : true)}
    >
      schedule an appointment
    </button>
  );

  if (meError) return <div>{meError.toString()}</div>;
  if (meLoading) return <div>{meLoading.toString()}</div>;
  return showScheduleForm ? scheduleAppointmentForm : scheduleFormShowBtn;
}
