import Link from 'next/link';
import styles from './Menu.module.css'
import Image from 'next/image';

const FacultymenuItems = [
    {
        title: "MENU",
        items:[
            {
                icon: "/home1.png",
                label: "Home",
                href: "/dashboard/faculty"
            },
            {
                icon: "/user.png",
                label: "Alumni",
                href: "/dashboard/faculty/list/alumni"
            },
            {
                icon: "/event.png",
                label: "Event",
                href: "/dashboard/faculty/list/event"
            },
        ]
    },
    {
        title: "OTHER",
        items: [
          {
            icon: "/profile.png",
            label: "Profile",
            href: "/dashboard/faculty/profile",
          },
          {
            icon: "/setting.png",
            label: "Settings",
            href: "/dashboard/faculty/settings",
          },
          {
            icon: "/logout.png",
            label: "Logout",
            href: "/dashboard/faculty/logout",
          },
        ],
      },
];

const FacultyMenu = () =>{
    return(
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                {FacultymenuItems.map((section, index) =>(
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
export default FacultyMenu