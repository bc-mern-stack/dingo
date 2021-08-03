import close from "../../assets/close.png";

export default function SearchModal({ modalIsOpen, setIsOpen }) {
  return (
    <div className="bothDropDowns">
      <div className="dropDownlocation">
        <img
          onClick={() => setIsOpen(false)}
          className="close"
          src={close}
          alt="close"
        />

        <div>
          <p className="textLocation">New Location Search</p>

          <form>
            <input
              className="newLocationSearchInputHome"
              placeholder="New Search"
              type="text"
              name="name"
            />
            <button
              className="newLocationSearchButtonHome"
              type="submit"
            ></button>
          </form>
        </div>
      </div>

      <div className="dropDown">
        <img
          onClick={() => setIsOpen(false)}
          className="closeRight"
          src={close}
          alt="close"
        />
        <div className="contentHome">
          <p>Dog Walkers In Your Area</p>
          <p>Milwaukee Wisconsin</p>
          <div className="list">
            <ul className="dogWalkers scroll">
              <li>Jane Doe</li>
              <li>John Smith</li>
              <li>Steve Smith</li>
              <li>Jack White</li>
              <li>Jane Smith</li>
              <li>John White</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
