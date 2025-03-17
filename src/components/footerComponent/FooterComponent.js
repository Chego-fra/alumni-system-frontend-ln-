"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./FooterComponent.module.css";

const Footer = () => {
  return (
    <motion.div
      className={styles.footerContainer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* TOP SECTION */}
      <div className={styles.topSection}>
        {/* LEFT */}
        <motion.div
          className={styles.leftSection}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link href="/">
            <div className={styles.logo}>ISTALUMNI</div>
          </Link>
          <p className={styles.para}>
            Westpoint Building, Mpaka Road, Westlands, Nairobi
          </p>
          <span className={styles.boldText}>info@isteducation.com</span>
          <span className={styles.boldText}>+254 739 944 882</span>
          <div className={styles.socialIcons}>
            {[ 
              { name: "facebook1", link: "https://www.facebook.com/yourpage" },
              { name: "instagram1", link: "https://www.instagram.com/yourprofile" },
              { name: "pinterest1", link: "https://www.pinterest.com/yourprofile" },
              { name: "x1", link: "https://twitter.com/yourprofile" } // "X" (formerly Twitter)
            ].map((social, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <a href={social.link} target="_blank" rel="noopener noreferrer">
                  <Image src={`/${social.name}.png`} alt={social.name} width={16} height={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CENTER */}
        <motion.div
          className={styles.centerSection}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            {
              section: "ABOUT",
              links: [
                { name: "Our Mission", url: "/about/mission" },
                { name: "History", url: "/about/history" },
                { name: "Leadership", url: "/about/leadership" },
                { name: "Alumni Stories", url: "/about/stories" },
                { name: "Contact Us", url: "/contact" },
              ],
            },
            {
              section: "RESOURCES",
              links: [
                { name: "Events", url: "/events" },
                { name: "Mentorship Program", url: "/resources/mentorship" },
                { name: "Career Services", url: "/resources/career" },
                { name: "Scholarships", url: "/resources/scholarships" },
                { name: "Alumni Directory", url: "/directory" },
              ],
            },
            {
              section: "SUPPORT",
              links: [
                { name: "Events", url: "/events" },
                { name: "Mentorship Program", url: "/support/mentorship" },
                { name: "Career Services", url: "/support/career" },
                { name: "Scholarships", url: "/support/scholarships" },
                { name: "Alumni Directory", url: "/directory" },
              ],
            },
          ].map((item, i) => (
            <div key={i}>
              <h1 className={styles.sectionTitle}>{item.section}</h1>
              <div className={styles.linkList}>
                {item.links.map((link, j) => (
                  <Link key={j} href={link.url} className={styles.link}>{link.name}</Link>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className={styles.rightSection}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className={styles.sectionTitle}>STAY CONNECTED</h1>
          <p className={styles.parag}>
            Get updates on alumni news, upcoming events, and opportunities to stay involved!
          </p>
          <div className={styles.subscribeContainer}>
            <input type="text" placeholder="Email address" className={styles.emailInput} />
            <motion.button
              className={styles.subscribeButton}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              SUBSCRIBE
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM */}
      <motion.div
        className={styles.bottomSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.copyright}>© 2024 ISTALUMNI</div>
        <div className={styles.bottomLinks}>
          <span className={styles.grayText}>Language</span>
          <span className={styles.boldTexts}>Kenya | English</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
