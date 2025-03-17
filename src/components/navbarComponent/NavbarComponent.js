"use client"
import { useEffect, useState } from 'react';
import styles from './NavbarComponent.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar = () => {


    const[isOpen, setIsOpen] = useState(false);
    const[isScrolled, setIsScrolled] = useState(false);

    useEffect(()=>{
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    },[]);


  return (
    <motion.nav
    initial={{y:-50, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration:0.2}}
    className={`${styles.navbar} ${isScrolled  ? styles.scroll : ""}`}
    >
    <div className={styles.container}>
        {/* START */}
        {/* logo */}
        <Link href="/" className={styles.logo}>
         <div className={styles.logoimg}>
         <Image src="/istlogo.png" alt="" width={70} height={70}/>
         </div>
         <div className={styles.logotxt}>
            <h1>ISTALUMNI</h1>
         </div>
        </Link>


        {/* MIDDLE */}
        <div className={styles.navLinks}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/directory" className={styles.link}>Directory</Link>
            <Link href="/event" className={styles.link}>Events</Link>
            <Link href="/career" className={styles.link}>Careers</Link>
            <Link href="/gallery" className={styles.link}>Gallery</Link>
            <div className={styles.dropDown}>
                <button className={styles.dropDownBtn}>More</button>
                <div className={styles.dropDownContent}>
                <Link href="/donate" className={styles.dropdownItem}>Donate</Link>
                <Link href="/resources" className={styles.dropdownItem}>Resources</Link>
                <Link href="/contact" className={styles.dropdownItem}>Contact</Link>
                </div>
            </div>
        </div>


        {/* END */}
        {/* AuthLinks */}
        <div className={styles.authLinks}>
            <Link href="/login"> <div className={styles.authLogin}>Login</div></Link>
            <Link href="/register"><div><button className={styles.authBtn}>SignUp</button></div></Link>
       </div>
        <button onClick={()=>setIsOpen(!isOpen)} className={styles.menuBtn}>
            {isOpen ? <X  size={18}/> : <Menu size={18}/>}
        </button>
    </div>
    <AnimatePresence>
            {isOpen &&(
                <motion.div
                initial={{y:-20, opacity:0}}
                animate={{y:0, opacity:1}}
                exit={{y:-20, opacity:0}}
                transition={{duration:0.2}}
                className={styles.menuConponent}
                >
                                <Link href="/" className={styles.mobileLink}>Home</Link>
            <Link href="/directory" className={styles.mobileLink}>Directory</Link>
            <Link href="/events" className={styles.mobileLink}>Events</Link>
            <Link href="/jobs" className={styles.mobileLink}>Careers</Link>
            <Link href="/news" className={styles.mobileLink}>News</Link>
            <Link href="/donate" className={styles.mobileLink}>Donate</Link>
            <Link href="/resources" className={styles.mobileLink}>Resources</Link>
            <Link href="/contact" className={styles.mobileLink}>Contact</Link>
            <div className={styles.mobileAuth}>
              <Link href="/login" className={styles.mobileLogin}>Login</Link>
              <Link href="/register" className={styles.mobileSignup}>Sign Up</Link>
            </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;