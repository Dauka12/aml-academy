import { ChatProps, UserProps } from '../MessagePage/types.tsx';
import WhiteMan from './../../assets/white-man.png';

export const users: UserProps[] = [
    {
        name: 'Дархан',
        username: '',
        avatar: WhiteMan,
        online: true,
    }
];

export const chats1: ChatProps[] = [
    {
        id: '1',
        sender: users[0],
        messages: [
            {
                id: '1',
                content: 'Добрый день! Чем могу помочь?',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '2',
                content: 'Добрый день! Я заинтересован в приобретении кольца.',
                timestamp: '',
                sender: users[0],
            },
            {
                id: '3',
                content: 'Отлично! У нас есть большой выбор красивых изделий. Скажите, какой стиль или материал вас интересует?',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '4',
                content: 'Я думаю, что золото с драгоценным камнем будет отличным выбором. У вас есть что-то подходящее?',
                timestamp: '',
                sender: users[0],
            },
            {
                id: '5',
                content: 'Конечно, у нас есть несколько вариантов. Позвольте мне показать вам несколько моделей.',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '6',
                content: 'Какая стоимость?',
                timestamp: '',
                sender: users[0],
            },
            {
                id: '7',
                content: '1.Модель – на сумму 2 500 000 тенге\n2.Модель – на сумму 4 500 000 тенге\n3.Модель – на сумму 6 000 000 тенге',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '8',
                content: 'Мне понравилось кольцо за 2 500 000 тенге.',
                timestamp: '',
                sender: users[0],
            },
            {
                id: '9',
                content: 'Отличный вариант. Можно оформить покупку?',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '10',
                content: 'Да, конечно.',
                timestamp: '',
                sender: users[0],
            },
            {
                id: '11',
                content: 'Вы не могли бы предоставить свои данные для оформления покупки? Нам необходимо соблюдать процедуру финансового мониторинга.',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '12',
                content: 'Конечно.',
                timestamp: '',
                sender: users[0],
            },
            {
                id: '13',
                content: 'Можете показать удостоверение личности?',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '14',
                content: 'Да, вот документ.',
                timestamp: '',
                sender: users[0],
            },
            {
                id: '15',
                content: 'Спасибо за предоставленные данные.',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '16',
                content: 'ФИО: Сергей Андреев Иванович\nИИН: 950120456789',
                timestamp: '',
                sender: 'You (читает информацию)',
            },
            {
                id: '17',
                content: 'Адрес?',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '18',
                content: 'г. Астана, ул. Шоссейная д.45.',
                timestamp: '',
                sender: users[0],
            },
            {
                id: '19',
                content: 'Дайте мне обработать информацию, можете подождать несколько минут?',
                timestamp: '',
                sender: 'You',
            },
            {
                id: '20',
                content: 'Да, конечно.',
                timestamp: '',
                sender: users[0],
            }
        ]
    }
];
