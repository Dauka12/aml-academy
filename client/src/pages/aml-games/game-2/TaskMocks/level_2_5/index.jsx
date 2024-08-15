import Sizebox from "../../../../../components/courseTemplates/common/Sizebox";
import clientImg from '../../../assets/asian-woman.png';
import ClientReview from "../../../components/client-review";
import screeningSystem from './image.png';
import './style.css';

function Level_2_5() {
    const clients = [
        {
            description: <p className='client-review-description'>
                <p className="haha"><span className="bold">Описание проводимой операции:</span> Покупка кольца с бриллиантом стоимостью 5 000 000 тенге. </p>
                <p className="haha"><span className="bold">Тип клиента:</span> Публичное должностное лицо Географический фактор: Гражданин Казахстана </p>
                <p className="haha"><span className="bold">Описание услуги или продукта:</span> Стандартная сумма операции</p>
                <p className="haha"><span className="bold">По способу представления услуг или продуктов:</span> Оффлайн</p>
                <p className="haha"><span className="bold">Дополнительная информация:</span> Алексей является заместителем министра и регулярно делает крупные покупки.</p>
            </p>,
            img: clientImg,
            fullName: 'Алексей Иванов',
        },
        {
            description: 'Описание третьего клиента...',
            img: clientImg,
            fullName: 'ФИО третьего клиента',
        },
        {
            description: 'Описание четвертого клиента...',
            img: clientImg,
            fullName: 'ФИО четвертого клиента',
        },
        {
            description: 'Описание пятого клиента...',
            img: clientImg,
            fullName: 'ФИО пятого клиента',
        },
        {
            description: 'Описание шестого клиента...',
            img: clientImg,
            fullName: 'ФИО шестого клиента',
        },
    ];
    const clients1 = [
        {
            description: <p className='client-review-description'>
                <p className="haha"><span className="bold">Клиент:</span> Александр Иванов</p>
                <p className="haha"><span className="bold">Операция:</span> Покупка ювелирного изделия на сумму 6 000 000 тенге.</p>
                <p className="haha"><span className="bold">Тип клиента:</span> Представляет некоммерческую организацию.</p>
                <p className="haha"><span className="bold">Географический фактор:</span> Из страны с высоким уровнем коррупции.</p>
                <p className="haha"><span className="bold">Услуга/продукт:</span> Покупка 2 однотипных ювелирных изделий в течение месяца.</p>
                <p className="haha"><span className="bold">Способ предоставления услуги:</span> Оффлайн.</p>
                <p className="haha"><span className="bold">Дополнительная информация:</span> Отсутствует.</p>
            </p>,
            img: clientImg,
            fullName: 'Александр Иванов',
        },
        {
            description: 'Описание третьего клиента...',
            img: clientImg,
            fullName: 'ФИО третьего клиента',
        },
        {
            description: 'Описание четвертого клиента...',
            img: clientImg,
            fullName: 'ФИО четвертого клиента',
        },
        {
            description: 'Описание пятого клиента...',
            img: clientImg,
            fullName: 'ФИО пятого клиента',
        },
        {
            description: 'Описание шестого клиента...',
            img: clientImg,
            fullName: 'ФИО шестого клиента',
        },
    ];

    return (
        <>
            <h2>Задача 1</h2>
            <p>Задание: Задание: Теперь вам предстоит применить все знания, полученные ранее, для комплексной оценки клиентов. Вам будут предоставлены 10 профилей клиентов с подробной информацией о каждом из них. Ваша задача — определить уровень риска для каждого клиента, исходя из совокупности следующих факторов:</p>
            <ul>
                <li>Тип клиента</li>
                <li>Географический фактор (страна происхождения или пребывания клиента)</li>
                <li>Риск услуг или продуктов</li>
                <li>Способ предоставления услуг или продуктов</li>
            </ul>
            <Sizebox height={40} />
            <ClientReview clients={clients} />
            <Sizebox height={40} />
            <h2>Задача 2</h2>
            <p>Задание: Вам представлен шаблон скоринговой системы для оценки рисков клиентов. Ваша задача — внимательно изучить данный шаблон, так как в следующих уровнях игры вам предстоит применять эти знания на практике.
                Помните, что данный шаблон не является окончательным и может быть изменен или дополнен в зависимости от деятельности субъекта и множества других факторов.</p>
            <Sizebox height={40} />
            <img src={screeningSystem} alt="screeningSystem" />
            <Sizebox />
            <h2>Задача 3</h2>
            <p>Задание: Вам необходимо проанализировать десять профилей клиентов и определить, кто из них имеет риски. Для каждой ситуации будет дано краткое описание, включающее информацию о способе предоставления услуг или продуктов, и дополнительных условиях.</p>
            <Sizebox height={40} />
            <ClientReview clients={clients1} namelist={false} />
        </>
    );
}

export default Level_2_5;