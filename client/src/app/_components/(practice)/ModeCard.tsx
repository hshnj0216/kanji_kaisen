import { FC } from "react";
import styles from '@/app/styles/practice.module.scss';

interface IModeCardProp {
    title: string;
    description?: string;
    isDisabled: boolean;
    onClick?: () => void;
}
const ModeCard: FC<IModeCardProp> = ({ title, description, isDisabled, onClick }) => {
    return (
        <button
            type="button"
            className={`border rounded cursor-pointer p-3 w-80 h-80 flex items-center justify-center m-10 
                        transition-transform ${isDisabled ? "opacity-60" : `${styles.card} hover:scale-110`}`}

            onClick={onClick}
            disabled={isDisabled}
        >
            <div>
                <h3 className="text-slate-50 text-2xl mb-3 text-center">{title}</h3>
                {description && (<p className="text-slate-50 text-center">{description}</p>)}
            </div>
        </button>
    )

}

export default ModeCard;