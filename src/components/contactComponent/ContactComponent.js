import Image from 'next/image';
import styles from './ContactComponent.module.css';

const ContactComponent = () => {
  return (
    <div className={styles.container}>
      {/* TOP */}
      <div className={styles.top}>
        <div className={styles.left}>
          <iframe
             className={styles.iframe}
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8502894541475!2d36.804387774762965!3d-1.262160135599783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17140770e9c5%3A0x5419c21a12dda63!2sWest%20point%20building%20Mpaka%20road!5e0!3m2!1sen!2ske!4v1728992482968!5m2!1sen!2ske"
            title="Google Maps Location"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerPolicy="strict-origin-when-cross-origin"
             allowFullScreen
           />
        </div>
        <div className={styles.right}>
            <form className={styles.fom}>
              <label htmlFor='name' className={styles.label}>Name</label>
              <div className={styles.fl}>
                <div className={styles.first}>
                    <input type='text' placeholder='First Name' className={styles.input}/>
                </div>
                <div className={styles.last}>
                  <input type='text' placeholder='Last Name' className={styles.input}/>
                  </div>
              </div>


              <label htmlFor='email' className={styles.label}>Email</label>
              <input type='email' placeholder='Enter Email' className={styles.input}/>

              <label htmlFor='phone' className={styles.label}>Phone</label>
              <input type='number' placeholder='Enter Phone' className={styles.input}/>

              <label htmlFor='graduation' className={styles.label}>Graduation</label>
              <input type='date' placeholder='Enter Date' className={styles.input}/>
            </form>
        </div>
      </div>
      {/* BOTTOM */}
      <div className={styles.bottom}>
          <div className={styles.info}>
             <Image src="/location.png" alt='location' width={50} height={50} className={styles.img}/>
            <p className={styles.para}>West Point Building </p>
            <p className={styles.para}> 6th Floor, Mpaka </p>
          </div>
          <div className={styles.info}>
             <Image src="/phone.png" alt='phone' width={50} height={50} className={styles.img}/>
             <p className={styles.para}>+254 709 609 000</p>
             <p className={styles.para}>+254 722 207 450</p>
          </div>
          <div className={styles.info}>
             <Image src="/email.png" alt='emai' width={50} height={50} className={styles.img}/>
             <p className={styles.para}>istalumni@gmail.com</p>
             <p className={styles.para}>P.O Box 17797 – 00500</p>
          </div>
      </div>
    </div>
  );
};

export default ContactComponent;