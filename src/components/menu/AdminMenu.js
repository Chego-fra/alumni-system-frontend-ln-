import Link from 'next/link';
import styles from './Menu.module.css'
import Image from 'next/image';

const AdminmenuItems = [
    {
        title: "MENU",
        items:[
            {
                icon: "/home1.png",
                label: "Home",
                href: "/dashboard/admin"
            },
            {
                icon: "/profile.png",
                label: "users",
                href: "/dashboard/admin/list/user",
              },
            
            {
                icon: "/user.png",
                label: "Alumni",
                href: "/dashboard/admin/list/alumni"
            },
            {
                icon: "/career.png",
                label: "Career",
                href: "/dashboard/admin/list/career"
            },
            {
                icon: "/event.png",
                label: "Event",
                href: "/dashboard/admin/list/event"
            },
            {
                icon: "/gallery.png",
                label: "Gallery",
                href: "/dashboard/admin/list/gallery"
            },
            {
                icon: "/resources.png",
                label: "Resources",
                href: "/dashboard/admin/list/resource"
            },

            {
                icon: "/rsvp.jpg",
                label: "RSVP",
                href: "/dashboard/admin/list/rsvp"
            },
        ]
    },
    {
        title: "OTHER",
        items: [
          {
            icon: "/profile.png",
            label: "Profile",
            href: "/dashboard/admin/profile",
          },
          {
            icon: "/setting.png",
            label: "Settings",
            href: "/dashboard/admin/settings",
          },
          {
            icon: "/logout.png",
            label: "Logout",
            href: "/dashboard/admin/logout",
          },
        ],
      },
];

const AdminMenu = () =>{
    return(
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                {AdminmenuItems.map((section, index) =>(
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
export default AdminMenu