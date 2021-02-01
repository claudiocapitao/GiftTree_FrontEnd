import PageNavBar from "./PageNavBar";
import styles from "./styles/MarketplacePage.module.css";

export default function AboutPage() {
    return (
        <div className={`${styles.page}`}>
            <PageNavBar />
            <h2 className={`${styles.header}`}>A bit about us</h2>
            <p>
                We are an e-commerce company that plants trees that which you
                can dedicate to your dearest ones.
            </p>
            <img src={`${process.env.PUBLIC_URL}/team.png`} alt="team" />
        </div>
    );
}
