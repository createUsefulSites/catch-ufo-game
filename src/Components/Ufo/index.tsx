import { FC, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

import bubbleEnemy from './../../assets/images/bubbleEnemy.svg';
import bubbleAlly from './../../assets/images/bubbleAlly.svg';

import dialogue1 from './../../assets/images/dialogue_1.svg';
import dialogue2 from './../../assets/images/dialogue_2.svg';
import dialogue3 from './../../assets/images/dialogue_3.png';
import dialogue4 from './../../assets/images/dialogue_4.png';

type UfoProps = {
    position?: 'relative' | 'absolute';
    src: string;
    bubbled?: boolean;
    isAlly?: boolean;
    activeBubbling?: boolean;
    imageWidth?: string;
    bubbleWidth?: string;
    isAnimating?: boolean;
    isTexting?: boolean;
    top?: string;
    left?: string;
    setProgressValue?: React.Dispatch<React.SetStateAction<number>>;
};

type dialoguesType = {
    right: Array<string>;
    left: Array<string>;
};

const Ufo: FC<UfoProps> = ({
    position = 'relative',
    src,
    bubbled = false,
    isAlly = false,
    activeBubbling = false,
    isAnimating = false,
    imageWidth,
    bubbleWidth,
    isTexting = false,
    top,
    left,
    setProgressValue,
}) => {
    const dialogues: dialoguesType = {
        right: [dialogue1, dialogue3],
        left: [dialogue2, dialogue4],
    };
    const arrAllyPhrases: Array<string> = [
        'ХОЧУ ДОМОй...',
        'ГОВОРИЛА МНЕ МАМА ДАЛЕКО НЕ УЛЕТАТЬ...',
        'КУДА Я ЛЕЧУ? ЗАЧЕМ? ДЛЯ ЧЕГО?',
        'У ВАС ЕСТЬ МАКАРОНЫ ПО СКИДКЕ?',
        'НА ПОСЛЕДНИЙ АВТОБУС НЕ УСПЕВАЮ...',
    ];
    const arrEnemyPhrases: Array<string> = [
        'Я ПРИШЕЛ с миром!!! или нет...',
        'Я ЗАХВАЧУ ПИЦЦУ!',
        'ААААААА!!!!',
        'ЗА ПЛУТОН!!',
        'УКРАДУ ГАРАЖ!',
    ];

    const [chooseDialugueWrapper, setChooseDialugueWrapper] = useState<string>('');
    const [isBubble, setIsBubble] = useState<boolean>(bubbled);
    const [dialogueClass, setDialogueClass] = useState<string>('');
    const [animationPhase, setAnimationPhase] = useState<string>('');
    const imageRef = useRef<HTMLImageElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const fullWrapperRef = useRef<HTMLDivElement | null>(null);
    const phrase = isAlly
        ? arrAllyPhrases[getRandomInt(0, arrAllyPhrases.length - 1)]
        : arrEnemyPhrases[getRandomInt(0, arrEnemyPhrases.length - 1)];

    useEffect(() => {
        setAnimationPhase((_) =>
            !isAnimating ? 'inside_bubble 3s ease-in-out infinite alternate' : '',
        );
    }, []);

    useEffect(() => {
        if (phrase.length && left) {
            setChooseDialugueWrapper((_) => {
                const dialogueVariant =
                    +left.replace('px', '') > window.innerWidth / 2 - 75
                        ? phrase.length > 20
                            ? dialogues.right[1]
                            : dialogues.right[0]
                        : phrase.length > 20
                        ? dialogues.left[1]
                        : dialogues.left[0];

                return dialogueVariant;
            });

            setChooseDialugueWrapper((prev) => {
                switch (prev) {
                    case dialogues.right[1]:
                        {
                            setDialogueClass('dialogue_big_left');
                        }
                        break;
                    case dialogues.right[0]:
                        {
                            setDialogueClass('dialogue_small_left');
                        }
                        break;
                    case dialogues.left[1]:
                        {
                            setDialogueClass('dialogue_big_right');
                        }
                        break;
                    case dialogues.left[0]:
                        {
                            setDialogueClass('dialogue_small_right');
                        }
                        break;
                }
                return prev;
            });
        }
    }, [phrase, left]);

    useEffect(() => {
        function handleClick() {
            setIsBubble(true);
            if (setProgressValue)
                setProgressValue((prev) => {
                    return isAlly ? (prev - 1 >= 0 ? --prev : prev) : ++prev;
                });
            textRef.current!.style.display = 'none';
            imageRef.current!.removeEventListener('click', handleClick);
        }

        if (imageRef.current && activeBubbling) {
            imageRef.current.addEventListener('click', handleClick);
        }

        return () => {
            if (imageRef.current && activeBubbling) {
                imageRef.current.removeEventListener('click', handleClick);
            }
        };
    }, [imageRef, activeBubbling]);

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        if (isBubble && activeBubbling) {
            fullWrapperRef.current!.style.opacity = '0';
        }
    }, [isBubble]);

    useEffect(() => {
        setIsBubble(bubbled);
    }, [bubbled]);

    return (
        <div
            ref={fullWrapperRef}
            className={styles.wrapper}
            style={{ position: position, top: top, left: left }}
        >
            <img
                ref={imageRef}
                style={{
                    width: imageWidth,
                    animation: animationPhase,
                }}
                className={styles.image}
                src={src}
                alt='ufo'
            />
            {isBubble && isAlly && (
                <img
                    style={{ width: bubbleWidth }}
                    className={styles.bubble}
                    src={bubbleAlly}
                    alt='bubbled ally'
                />
            )}
            {isBubble && !isAlly && (
                <img
                    style={{ width: bubbleWidth }}
                    className={styles.bubble}
                    src={bubbleEnemy}
                    alt='bubbled enemy'
                />
            )}
            {isTexting && (
                <div ref={textRef} className={styles[dialogueClass]}>
                    <img src={chooseDialugueWrapper} alt='dialogue' />
                    <div>{phrase}</div>
                </div>
            )}
        </div>
    );
};

export default Ufo;
