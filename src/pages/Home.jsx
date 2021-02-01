import styles from "./Home.module.css"; // Import css modules stylesheet as styles
import { Button } from "../components/Button";

/**
 * Checks the device screen density to
 * render the correct background image
 */
function isRetina() {
    const { PUBLIC_URL } = process.env;

    return window.devicePixelRatio >= 2
        ? `${PUBLIC_URL}/home-bg-2x.jpg`
        : `${PUBLIC_URL}/home-bg-1x.jpg`;
}

export function Home() {
    return (
        <div className={styles.homeContainer}>
            <img
                className={styles.background}
                alt="home-page-background"
                src={isRetina()}
            />

            <div style={{ paddingTop: "20%", color: "white" }}>
                <h1>Welcome to GiftTree</h1>
                <h2>
                    Buy a tree, choose a location to plant it and gift the
                    certificate to your dearest one.
                </h2>
                <Button />
            </div>
        </div>
    );
}
