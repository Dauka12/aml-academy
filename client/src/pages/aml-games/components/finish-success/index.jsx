import { LuCheckCircle } from "react-icons/lu";

import './style.scss';

function FinishSuccess({
    children
}) {
    return ( 
        <div className="finish-success">
            <LuCheckCircle />
            <div>{children}</div>
        </div>
    );
}

export default FinishSuccess;