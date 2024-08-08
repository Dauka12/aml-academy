import HeaderWithLine from "../../common/HeaderWithLine";
import TextWithTitle from "../../common/TextWithTitle";

function HeaderWithTitleAndText({ header, title, text }) {
    return ( 
        <>
            <HeaderWithLine header={header}/>
            <TextWithTitle title={title} text={text} />
        </>
    );
}

export default HeaderWithTitleAndText;