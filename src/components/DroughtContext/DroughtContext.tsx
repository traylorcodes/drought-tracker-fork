import React, { FC, useEffect, useState, useRef, Fragment } from 'react';
import styles from './DroughtContext.module.css';
import config from './DroughtContextConfig.json';

interface DroughtContextProps {
    activeArc: 'd0' | 'd1' | 'd2' | 'd3' | 'd4' | null
}

const DroughtContext: FC<DroughtContextProps> = (props: DroughtContextProps) => {

    const primaryText = useRef<string>('');
    const primaryTextGlowColor = useRef<string>('');
    const [listItems, setListItems] = useState<any>(<div></div>);
    const [showContext, setShowContext] = useState<boolean>(false);

    const createListItems: () => void = () => {
        let liElements: Array<any> = [];
        const contextConfig = config.levelConfig.find((level) => level.key === props.activeArc);
        if (contextConfig) {
            primaryText.current = contextConfig.primaryText;
            primaryTextGlowColor.current = contextConfig.color;
            contextConfig.listItems.forEach((item: string) => {
                liElements.push(<li key={`${item}`}>{item}</li>)
            });
        }

        if (liElements.length > 0)
            setListItems(<ul key="contextlist">{liElements}</ul>)
    }

    useEffect(() => {
        if (props.activeArc === null) {
            setShowContext(false);
        }
        else {
            createListItems();
            setShowContext(true);
        }
    }, [props.activeArc])

    useEffect(() => { }, [showContext])

    return (
        <div hidden={!showContext}>
            <div className={styles.content}>
                <span className={styles.primaryText} style={{ textShadow: `3px 3px 10px ${primaryTextGlowColor.current}, -3px -3px 10px ${primaryTextGlowColor.current}` }}>{primaryText.current}</span>
                {listItems}
            </div>
            <div className={styles.backdrop}></div>
        </div>
    );
}

export default DroughtContext;