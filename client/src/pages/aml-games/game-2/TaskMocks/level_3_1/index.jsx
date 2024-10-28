import React, { useState } from "react";
import Sizebox from "../../../../../components/courseTemplates/common/Sizebox";
import image from "../../../assets/image.png";
import AnswerHandler from "../../../components/answer-handler/index.jsx";
import Divider from "../../../components/divider/index.jsx";
import DossierComponent from "../../../components/dossier/index";
import MessagesComponent from "../../MessagePage/MessagesPage.tsx";
import { chats1 } from "../../chat-datas/data2.tsx";
import { chats5 } from "../../chat-datas/data5.tsx";
import { chats6 } from "../../chat-datas/data6.tsx";
import { chats7 } from "../../chat-datas/data7.tsx";

const DossierWithHandler = AnswerHandler(DossierComponent);

function Level_3_1() {
  const [isHighRisk, setIsHighRisk] = useState(false);

  const handleRiskChange = (riskLevel) => {
    setIsHighRisk(riskLevel === "high");
  };

  const riskChats = isHighRisk ? [...chats6, ...chats7] : chats5;

  return (
    <>
      <div className="message-page">
        <div className="message-page-container">
          {}
          <MessagesComponent image={image} chats={chats1} />
        </div>
      </div>

      <Sizebox />

      <Divider />

      <h2>Задача 1</h2>

      <Sizebox height={40} />

      {}
      <DossierWithHandler
        levelId={3}
        subLevelId={1}
        taskId={1}
        onRiskChange={handleRiskChange}
      />

      <>
        {}
        {riskChats.map((chat, index) => (
          <MessagesComponent key={index} chats={[chat]} />
        ))}
      </>
    </>
  );
}

export default Level_3_1;
