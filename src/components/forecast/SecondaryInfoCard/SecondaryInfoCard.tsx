import style from "./SecondaryInfoCard.module.css"
import SicElement from "./SicElement/SicElement";

interface ISecondaryInfoCardProps {
    sicObjects: {
        title: string;
        value: string;
    }[];
}

const SecondaryInfoCard = ({sicObjects}: ISecondaryInfoCardProps) => {
    return (<>
        <div className={style.secondaryInfoCard}>
            {sicObjects.map(so => <SicElement title={so.title} value={so.value} />)}
        </div>
    </>);
}

export default SecondaryInfoCard;