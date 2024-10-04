import { Divider } from "@mui/material";
import React from "react";
import Sizebox from "../../../../../components/courseTemplates/common/Sizebox/index.jsx";
import image from "../../../assets/image.png";
import Customer from "../../../components/customer/index.jsx";
import MessagesComponent from "../../MessagePage/MessagesPage.tsx";
import img from "./image.png";
import {chats4} from "../../chat-datas/data4.tsx";

const customers = [
  {
    name: "Иван Иванов",
    avatar: img, // Replace with actual image URLs if available
  },
  {
    name: "Анна Смирнова",
    avatar: img,
  },
  {
    name: "Петр Петров",
    avatar: img,
  },
  {
    name: "Елена Кузнецова",
    avatar: img,
  },
  {
    name: "Дмитрий Васильев",
    avatar: img,
  },
];

function Level_4_1() {
  return (
    <>
      <div className="message-page">
        <div className="message-page-container">
          <MessagesComponent image={image} chats={chats4} />
        </div>
      </div>
      <Sizebox />
      <Divider />

      <h2>Задача 1</h2>
      <Customer customer={customers} />
    </>
  );
}

export default Level_4_1;
