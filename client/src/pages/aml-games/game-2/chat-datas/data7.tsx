import { ChatProps, UserProps } from "../MessagePage/types.tsx";

export const users: UserProps[] = [
  {
    name: "Покупатель",
    username: "",
    avatar: "",
    online: true,
  },
];
export const chats7: ChatProps[] = [
  {
    id: "1",
    sender: users[0],
    messages: [
      {
        id: "1",
        content:
          "Благодарим за ожидание. К сожалению, мы не можем провести операцию в виду требований законадательства о ПОД/ФТ.",
        timestamp: "",
        sender: "You",
      },
      {
        id: "2",
        content: "Могу узнать причины?",
        timestamp: "",
        sender: users[0],
      },
      {
        id: "1",
        content: "Сгл",
        timestamp: "",
        sender: "You",
      },
    ],
  },
];
