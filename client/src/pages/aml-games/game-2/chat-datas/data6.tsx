import { ChatProps, UserProps } from "../MessagePage/types.tsx";

export const users: UserProps[] = [
  {
    name: "Покупатель",
    username: "",
    avatar: "",
    online: true,
  },
];
export const chats6: ChatProps[] = [
  {
    id: "1",
    sender: users[0],
    messages: [
      {
        id: "1",
        content: "Благодарим за ожидание. Оплата картой или наличными?",
        timestamp: "",
        sender: "You",
      },
      {
        id: "2",
        content: "Картой, вот моя карта. (Процедура оформления покупки)",
        timestamp: "",
        sender: users[0],
      },
      {
        id: "3",
        content: "Вот ваще кольцо. Благодарим за покупку!",
        timestamp: "",
        sender: "You",
      },
      {
        id: "4",
        content: "Спасибо большое за помощь.",
        timestamp: "",
        sender: users[0],
      },
    ],
  },
];
