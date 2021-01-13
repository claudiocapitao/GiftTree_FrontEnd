import styles from "./Button.module.css"; // Import css modules stylesheet as styles

export function Button() {
    return (
        <a href="./marketplace" className={`${styles.button} ${styles.shadow}`}>
            <span>Gift Tree</span>
        </a>
    );
}
