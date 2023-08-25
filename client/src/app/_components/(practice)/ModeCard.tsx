import { FC } from "react";
import styles from '@/app/practice.module.scss';

interface IModeCardProp{
    title: string;
    description?: string;
    isDisabled: boolean;
    onClick?: () => void;
}
const ModeCard: FC<IModeCardProp> = ({title, description,isDisabled, onClick}) => {
    return (
        <div 
            className={`border rounded cursor-pointer p-3 w-80 h-80 flex items-center justify-center m-10 hover:scale-110 
                        transition-transform ${styles.card} ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}  
            onClick={onClick}
        >
            <div>
                <h3 className="text-slate-50 text-2xl mb-3 text-center">{title}</h3>
                {description && (<p className="text-slate-50 text-center">{description}</p>)}
            </div>
        </div>
    )

}

export default ModeCard;