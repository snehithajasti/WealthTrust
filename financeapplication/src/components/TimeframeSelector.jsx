import { TIMEFRAMES } from "../utils/chartUtils";

const TimeframeSelector = ({selected,onChange,disabled}) => {
    
    return(
        <div>
            {Object.keys(TIMEFRAMES).map(tf=>(
                <button key={tf} disabled={disabled} onClick={()=>onChange(tf)} className={`px-3 py-1 rounded ${selected===tf? "bg-black text-white":"bg-gray-200"}`}>{tf}</button>
            )
            )}
        </div>
    )
}

export default TimeframeSelector