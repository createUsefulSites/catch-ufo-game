import styles from './style.module.scss';
import ProgressWrapper from '../../Components/ProgressWrapper';
import { FC, useEffect, useRef, useState } from 'react';
import { Root, createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';

import ufoGreen from './../../assets/images/ufoGreen.svg';
import ufoYellow from './../../assets/images/ufoYellow.svg';
import ufoBeige from './../../assets/images/ufoBeige.svg';
import ufoBlue from './../../assets/images/ufoBlue.svg';
import ufoPink from './../../assets/images/ufoPink.svg';
import timerImg from './../../assets/images/timer.svg';

import people1 from './../../assets/images/cosmonaut.svg';
import people2 from './../../assets/images/builder.svg';
import people3 from './../../assets/images/dancer.svg';
import people4 from './../../assets/images/police.svg';
import Ufo from '../../Components/Ufo';

type gameProps = {
    setActiveScene: React.Dispatch<React.SetStateAction<number>>;
    setProgressCounter: React.Dispatch<React.SetStateAction<number>>;
};

const Game: FC<gameProps> = ({ setActiveScene, setProgressCounter }) => {
    const [timerValue, setTimerValue] = useState<number>(30);
    const [progressValue, setProgressValue] = useState<number>(0);
    const [borderColor, setBorderColor] = useState<string>('black');
    const [intervals, setIntervals] = useState<Array<number>>([]);
    const [arrUfo, setArrUfo] = useState<Array<boolean>>([
        true,
        true,
        false,
        true,
        false,
        true,
        true,
        false,
        true,
        false,
        true,
        true,
        true,
        true,
        false,
    ]);
    let currentUfoNumber = 0;
    const peopleField = useRef<HTMLDivElement | null>(null);
    const ufoField = useRef<HTMLDivElement | null>(null);
    const arrPeopleImages: Array<string> = [people1, people2, people3, people4];
    const arrUfoImages: Array<string> = [ufoBeige, ufoBlue, ufoGreen, ufoPink, ufoYellow];
    let ufoRoot: Root | null = null;

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        if (ufoField.current && !ufoRoot) {
            const root: Root = ReactDOM.createRoot(document.getElementById('1')!);
            ufoRoot = root;
        }
    }, [ufoField.current, ufoRoot]);

    function randomPeopleSpawner(): void {
        const { height } = peopleField.current!.getBoundingClientRect() as DOMRect;
        const randomPeople: string = arrPeopleImages[Math.floor(Math.random() * 4)];

        const element: HTMLImageElement = document.createElement('img');
        element.src = randomPeople;
        element.alt = 'человек';
        element.style.position = 'absolute';
        element.style.height = '25vh';

        const randomSide: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';
        const randomDir: number = randomSide === 'left' ? -1 : 1;
        element.style[randomSide] = '-50px';
        element.style.transform = `scaleX(${randomDir})`;

        const randomTopValue: number = getRandomInt(height - 100, height);
        element.style.top = `calc(${randomTopValue}px - 25vh)`;
        element.style.zIndex = String(randomTopValue);

        peopleField.current!.appendChild(element);

        setTimeout(() => {
            peopleField.current!.removeChild(element);
        }, 5000);
    }

    function randomUfoSpawner(): void {
        if (ufoRoot) {
            const domNode: HTMLDivElement = document.createElement('div');
            const root: Root = createRoot(domNode);
            ++currentUfoNumber;

            const newUfo = (
                <Ufo
                    imageWidth='110px'
                    isTexting={true}
                    bubbleWidth='150px'
                    activeBubbling={true}
                    setProgressValue={setProgressValue}
                    position='absolute'
                    src={arrUfoImages[getRandomInt(0, 4)]}
                    isAlly={!arrUfo[currentUfoNumber]}
                    top='-100px'
                    left={
                        String(
                            getRandomInt(
                                window.innerWidth / 2 -
                                    document.getElementById('container')!.clientWidth / 2,
                                window.innerWidth / 2 +
                                    document.getElementById('container')!.clientWidth / 2 -
                                    110,
                            ),
                        ) + 'px'
                    }
                />
            );
            root.render(newUfo);
            ufoField.current?.appendChild(domNode);

            setTimeout(() => {
                ufoField.current?.removeChild(domNode);
            }, 6000);
        }
    }

    useEffect(() => {
        if (!timerValue) {
            ufoField.current!.innerHTML = '';
            peopleField.current!.innerHTML = '';
            intervals.forEach((item) => clearInterval(item));
            document.getElementById('dark')!.style.display = 'block';
            document.getElementById('dark')!.style.top = '0';
            document.getElementById('end_wrapper')!.style.display = 'block';
            setProgressCounter(progressValue);

            setTimeout(() => setActiveScene(5), 2000);
        }
    }, [timerValue]);

    useEffect(() => {
        const spawnUfoInterval = setInterval(() => {
            randomUfoSpawner();
        }, 1800);

        const moveUfoInterval = setInterval(() => {
            moveUfo();
        }, 15);

        setIntervals((prev) => [...prev, spawnUfoInterval, moveUfoInterval]);

        setArrUfo((array): Array<boolean> => {
            for (let i = array.length - 1; i > 0; i--) {
                const j: number = Math.floor(Math.random() * (i + 1));

                const temp: boolean = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        });

        return () => {
            clearInterval(spawnUfoInterval);
            clearInterval(moveUfoInterval);
        };
    }, []);

    useEffect(() => {
        const spawnPeopleInterval = setInterval(() => {
            randomPeopleSpawner();
        }, 1000);

        const movePeopleInterval = setInterval(() => {
            moveChildrenRight();
        }, 10);

        setIntervals((prev) => [...prev, spawnPeopleInterval, movePeopleInterval]);

        return () => {
            clearInterval(spawnPeopleInterval);
            clearInterval(movePeopleInterval);
        };
    }, []);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimerValue((prev) => {
                if (prev <= 10) setBorderColor('#F14338');
                if (prev >= 1) return --prev;

                return prev;
            });
        }, 1000);

        return () => clearTimeout(timerInterval);
    }, []);

    function moveChildrenRight(): void {
        const children = peopleField.current?.children;

        if (children) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLImageElement;
                const direction: 'left' | 'right' =
                    child.style.transform === 'scaleX(1)' ? 'right' : 'left';
                const currentPosition: number = parseFloat(child.style[direction]);
                child.style[direction] = `${currentPosition + 2}px`;
            }
        }
    }

    function moveUfo(): void {
        const ufo = document.getElementById('1')?.children;

        if (ufo) {
            for (let i = 0; i < ufo.length; i++) {
                const child = ufo[i].firstChild as HTMLDivElement;
                const currentPosition: number = parseFloat(child.style.top);

                if (currentPosition > window.innerHeight / 2.2)
                    child.style.left = `${parseFloat(child.style.left) - 8}px`;
                else child.style.top = `${currentPosition + 2}px`;
            }
        }
    }

    function returnStringValue(value: number) {
        return value < 10 ? '0' + value : value;
    }

    return (
        <>
            <div className={styles.head_info}>
                <ProgressWrapper
                    image={ufoGreen}
                    value={`${returnStringValue(progressValue)}/10`}
                />
                <ProgressWrapper
                    borderColor={borderColor}
                    image={timerImg}
                    value={`00:${returnStringValue(timerValue)}`}
                />
            </div>
            <div id='1' ref={ufoField} className={styles.ufo_wrapper}></div>

            <div ref={peopleField} className={styles.people_field}></div>

            <div id='dark' className={styles.dark}></div>
            <div id='end_wrapper' className={styles.end_wrapper}>
                <div className={styles.end_header}>КОНЕЦ!</div>
                <div className={styles.end_text}>ПОРА УЗНАТЬ РЕЗУЛЬТАТ...</div>
            </div>
        </>
    );
};

export default Game;
