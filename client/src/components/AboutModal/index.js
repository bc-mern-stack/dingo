import styles from "./css/AboutModal.module.css";
export default function AboutModal({ aboutModalOpen, setAboutModal }) {
  return (
    <section
      className={styles.modalBg}
      onClick={(e) => {
        if (e.target.classList.contains(styles.modalBg))
          setAboutModal(!aboutModalOpen);
      }}
    >
      <div className={styles.modal}>
        <div className={styles.bluePatternBanner}>About Dingo</div>
        <div className={styles.modalContent}>
          <span>
            Dingo is a web application for dog owners to find talented
            individuals to take their dogs on a walk. Sign up and add your dogs
            to start finding walkers. Then, you can start making some
            appointments!!
          </span>
          <span>
            This app is also great for people who love to walk dogs! Users can
            add their availability to walk dogs and accept appointments from dog
            owners.
          </span>
          <span className={styles.catLine}>
            If you only like cats, that's okay too! No one can stop you!!
            Overcome your hatred and walk a dog today!!!
          </span>
        </div>
        <nav className={styles.nav}>
          <div className={styles.navItem}>
            <a href="https://github.com/Jbartlettdesign">John</a>
          </div>
          <div className={styles.navItem}>
            <a href="https://github.com/bc-mern-stack/dingo">GitHub</a>
          </div>
          <div className={styles.navItem}>
            <a href="https://github.com/japankid-code">Jake</a>
          </div>
        </nav>
      </div>
    </section>
  );
}
