import styles from "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Component props={pageProps} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
