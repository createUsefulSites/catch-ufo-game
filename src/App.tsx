import { useState } from 'react';
import './App.scss';
import Game from './Pages/Game';
import StartMenu from './Pages/StartMenu';
import Tutorial from './Pages/Tutorial';
import FinalPage from './Pages/FinalPage';

export default function App() {
    const [activeScene, setActiveScene] = useState<number>(1);
    const [progressCounter, setProgressCounter] = useState<number>(0);

    return (
        <>
            <div id='container' className='container'>
                {activeScene < 4 && (
                    <div className='main-wrapper'>
                        {activeScene === 1 && <StartMenu setActiveScene={setActiveScene} />}
                        {activeScene === 2 && (
                            <Tutorial setActiveScene={setActiveScene} isAlly={false} />
                        )}
                        {activeScene === 3 && (
                            <Tutorial setActiveScene={setActiveScene} isAlly={true} />
                        )}
                    </div>
                )}
                {activeScene === 4 && (
                    <Game setProgressCounter={setProgressCounter} setActiveScene={setActiveScene} />
                )}
                {activeScene === 5 && (
                    <div className='main-wrapper'>
                        <FinalPage
                            progressCounter={progressCounter}
                            setActiveScene={setActiveScene}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
