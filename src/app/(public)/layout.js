import Footer from "@/components/footerComponent/FooterComponent";
import Navbar from "@/components/navbarComponent/NavbarComponent";


export default function PublicLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer/>
        </div>
    );
}
