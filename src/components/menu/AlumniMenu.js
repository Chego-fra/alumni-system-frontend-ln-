import Link from 'next/link';
import styles from './Menu.module.css'
import Image from 'next/image';

const AlumnimenuItems = [
    {
        title: "MENU",
        items:[
            {
                icon: "/home1.png",
                label: "Home",
                href: "/dashboard/faculty"
            },
            {
                icon: "/career.png",
                label: "Career",
                href: "/dashboard/alumni/list/career"
            },
            {
                icon: "/event.png",
                label: "Event",
                href: "/dashboard/alumni/list/event"
            },
            {
                icon: "/gallery.png",
                label: "Gallery",
                href: "/dashboard/alumni/list/gallery"
            },
            {
                icon: "/resources.png",
                label: "Resources",
                href: "/dashboard/alumni/list/resource"
            },
        ]
    },
    {
        title: "OTHER",
        items: [
          {
            icon: "/profile.png",
            label: "Profile",
            href: "/dashboard/alumni/profile",
          },
          {
            icon: "/setting.png",
            label: "Settings",
            href: "/dashboard/alumni/settings",
          },
          {
            icon: "/logout.png",
            label: "Logout",
            href: "/dashboard/alumni/logout",
          },
        ],
      },
];

const AlumniMenu = () =>{
    return(
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                {AlumnimenuItems.map((section, index) =>(
                    <li key={index} className={styles.li}>
                        <h3 className={styles.h3}>{section.title}</h3>
                        <ul className={styles.ul}>
                          {section.items.map((item, idx) =>(
                            <li key={idx} className={styles.li}>
                                <Link href={item.href} className={styles.lis}>
                                <Image src={item.icon} alt={item.label} width={20} height={20}/>
                                <span className={styles.span}>{item.label}</span>
                                </Link>
                            </li>
                          ))}  
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default AlumniMenu