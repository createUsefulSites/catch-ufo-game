import { FC } from 'react';
import star from './../../assets/images/star.svg';
import vk from './../../assets/images/vk.svg';
import ok from './../../assets/images/ok.svg';
import tg from './../../assets/images/tg.svg';
import styles from './style.module.scss';

type finalPageProps = {
    progressCounter: number;
    setActiveScene: React.Dispatch<React.SetStateAction<number>>;
};

const FinalPage: FC<finalPageProps> = ({ progressCounter, setActiveScene }) => {
    let starsCounter = 1;
    let phrase = 'теперь понятно, почему тебя не зовут спасать мир. попробуешь еще раз?';
    let sharePhrase = 'Мне не удалось победить всех нло :( помоги мне!';
    if (progressCounter >= 4 && progressCounter < 8) {
        starsCounter = 2;
        phrase =
            'ты, конечно, не супергерой, но своё дело знаешь. город еще не спасен. попробуешь еще раз?';
        sharePhrase = 'Я неплохо справился с поимкой НЛО, но ты должен мне помочь!';
    }
    if (progressCounter >= 8) {
        starsCounter = 3;
        phrase = 'ЛУЧШИЙ ИЗ ЛУЧШИХ. НАстоящий спаситель человечества.';
        sharePhrase = 'Я поймал всех злодеев! Приходи и становись героем вместе со мной!';
    }

    return (
        <>
            <div className={styles.wrapper}></div>

            <div className={styles.wood}>
                <div className={styles.stars}>
                    {[...new Array(starsCounter)].map((_, index) => {
                        return <img key={index} className={styles.star} src={star} alt='звезда' />;
                    })}
                </div>
                <div className={styles.text_wrapper}>
                    <div className={styles.header}>поймано {progressCounter}/10!</div>
                    <div className={styles.text}>{phrase}</div>
                </div>
                <button onClick={() => setActiveScene(1)}>еще раз!</button>
                <div className={styles.share}>
                    <div className={styles.share_text}>поделиться</div>
                    <div className={styles.images}>
                        <a
                            href={`https://t.me/share/url?url=https://catch-ufo-game.netlify.app/&text=${sharePhrase}`}
                            target='_blank'
                        >
                            <img className={styles.image} src={tg} alt='telegram' />
                        </a>
                        <a
                            href={`https://connect.ok.ru/offer?url=https://catch-ufo-game.netlify.app/&title=${sharePhrase}`}
                            target='_blank'
                        >
                            <img className={styles.image} src={ok} alt='одноклассники' />
                        </a>
                        <a
                            href={`https://vk.com/share.php?url=https://catch-ufo-game.netlify.app/&title=${sharePhrase}`}
                            target='_blank'
                        >
                            <img className={styles.image} src={vk} alt='вконтакте' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinalPage;
