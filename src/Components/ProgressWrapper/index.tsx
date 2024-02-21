import { FC } from 'react';
import styles from './style.module.scss';

type ProgressWrapperProps = {
    image: string;
    value: string;
    borderColor?: string;
};

const ProgressWrapper: FC<ProgressWrapperProps> = ({ image, value, borderColor }) => {
    return (
        <div className={styles.wrapper} style={{ borderColor: borderColor }}>
            <img src={image} alt='ufo counter image' />
            <p style={{ color: borderColor }}>{value}</p>
        </div>
    );
};

export default ProgressWrapper;
