import Ufo from '../../Components/Ufo';
import enemyUfo from './../../assets/images/ufoGreen.svg';
import allyUfo from './../../assets/images/ufoYellow.svg';
import styles from './style.module.scss';
import { useEffect, useState, FC } from 'react';

type TutorialProps = {
    isAlly: boolean;
    setActiveScene: React.Dispatch<React.SetStateAction<number>>;
};

const Tutorial: FC<TutorialProps> = ({ isAlly, setActiveScene }) => {
    const imageSrc: string = isAlly ? allyUfo : enemyUfo;
    const buttonText: string = isAlly ? 'погнали' : 'ясно';
    const descrText: string = isAlly
        ? 'НО НЕ ВСЕ ИНОПЛАНЕТЯНЕ ЗЛЫЕ. КТО-то ПРОСТО УСТАЛ ИЛИ ЗАБОЛЕЛ. ДАЙ ИМ ПРОСТО УЛЕТЕТЬ И ВСЁ БУДЕТ ХОРОШО!'
        : 'Нажимай на НЛО и отправляй их В ДАЛЕКИЙ КОСМОС!';
    const [isBubbled, setIsBubbled] = useState<boolean>(false);

    useEffect(() => {
        const toggleBubbling: number = setTimeout(() => {
            setIsBubbled(true);
            const intervalId: number = setInterval(() => {
                setIsBubbled((prev) => {
                    return !prev;
                });
            }, 3000);
            return () => clearInterval(intervalId);
        }, 1500);

        return () => clearTimeout(toggleBubbling);
    }, []);

    return (
        <div className={styles.wood}>
            <div className={styles.upper_part}>
                <Ufo isAlly={isAlly} src={imageSrc} bubbled={isBubbled} />
                <div className={styles.hand}></div>
            </div>
            <div className={styles.bottom_part}>
                <p className={styles.descrText}>{descrText}</p>
                <button
                    onClick={() => {
                        !isAlly ? setActiveScene(3) : setActiveScene(4);
                    }}
                    className={isAlly ? '' : styles.wider}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Tutorial;
