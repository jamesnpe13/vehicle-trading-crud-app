import { useEffect, useState } from "react";
import "./Chip.scss";

export default function Chip({ children, chipsData }) {
    const [chipData, setChipData] = useState({});

    useEffect(() => {
        setChipData(chipsData.find((item) => item.label === children) || {});
    }, []);

    return (
        <div className="Chip">
            <span className="label">{`${children || "Label"}: ${
                chipData.default_value || "value"
            }`}</span>
        </div>
    );
}
