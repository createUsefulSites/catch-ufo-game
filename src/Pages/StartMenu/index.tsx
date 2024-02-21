import { FC } from 'react';
import Ufo from '../../Components/Ufo';
import ufoAlly from './../../assets/images/ufoGreen.svg';
import styles from './style.module.scss';

type startMenuProps = {
    setActiveScene: React.Dispatch<React.SetStateAction<number>>;
};

const StartMenu: FC<startMenuProps> = ({ setActiveScene }) => {
    return (
        <>
            <div className={styles.dark}></div>
            <div className={styles.upper_part}>
                <div id='ufo'>
                    <Ufo src={ufoAlly} bubbled={true} isAlly={false} isAnimating={true} />
                </div>

                <h1 className={styles.headText}>поймай пришельца!</h1>
            </div>
            <div className={styles.bottom_part}>
                <button onClick={() => setActiveScene(2)}>начать</button>
            </div>
        </>
    );
};

export default StartMenu;
