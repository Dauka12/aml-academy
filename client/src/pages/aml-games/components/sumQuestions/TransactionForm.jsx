import React, { useState } from "react";

// Updated questions array with id, minThreshold, and maxThreshold
const questions = [
  {
    id: 1,
    question: "Получение выигрыша в наличной форме по результатам проведения пари, азартной игры в игорных заведениях и лотереи",
    minThreshold: 1000,
    maxThreshold: 5000,
  },
  {
    id: 2,
    question: "Совершенно ломбардом операций с деньгами, ценными бумагами, драгоценными металлами и драгоценными камнями, ювелирными изделиями из них и иными ценностями",
    minThreshold: 5000,
    maxThreshold: 20000,
  },
  {
    id: 3,
    question: "Переводы денег за границу на счета (во вклады), открытые на анонимного владельца, поступление денег из-за границы со счета (вклада), открытого на анонимного владельца",
    minThreshold: 10000,
    maxThreshold: 30000,
  },
  {
    id: 4,
    question: "Купля-продажа драгоценных металлов и драгоценных камней, ювелирных изделий из них",
    minThreshold: 1500,
    maxThreshold: 10000,
  },
  {
    id: 5,
    question: "Платежи и переводы денег, осуществляемые клиентом в пользу другого лица на безвозмездной основе",
    minThreshold: 500,
    maxThreshold: 5000,
  },
  {
    id: 6,
    question: "Снятие с банковского счета или зачисление на банковский счет клиента денег, а равно прием от клиента либо выдача клиенту наличных денег",
    minThreshold: 2000,
    maxThreshold: 15000,
  },
  {
    id: 7,
    question: "Сделке с недвижимым имуществом, результатом совершения которой является переход права собственности на такое имущество",
    minThreshold: 100000,
    maxThreshold: 500000,
  },
];

const TransactionForm = ({handleSubmit}) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      const answer = parseFloat(answers[index]);
      if (answer >= question.minThreshold && answer <= question.maxThreshold) {
        correctAnswers += 1;
      }
    });

    const score = correctAnswers / questions.length;
    handleSubmit('tagged', score);
    console.log("Score:", score); // Logs the result as a value between 0 and 1
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "20px", borderRadius: "10px" }}>
      <div style={{ backgroundColor: "#1A2751", height: "50px", borderRadius: "10px 10px 0 0" }}></div> 
      <div style={{ backgroundColor: "#F7F7F7", padding: "20px", borderRadius: "0 0 10px 10px" }}>
        {questions.map((question, index) => (
          <div key={question.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label htmlFor={`amount-${index}`} style={{ flex: 1, marginRight: "10px", fontSize: "1.125rem" }}>
              {question.question}
            </label>
            <input
              id={`amount-${index}`}
              type="number"
              placeholder="Введите сумму"
              value={answers[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{ flex: "0 0 200px", padding: "5px", border: "none", borderRadius: "10px", backgroundColor: "#FFF" }}
            />
          </div>
        ))}
      </div>
      <div className="actions" style={{textAlign:'right', marginRight:'50px', marginTop:'30px'}}>
                <button 
                    className='blue'
                    onClick={()=>calculateScore()}  // Вызываем handleConfirm на кнопку
                >
                    Подтвердить
                </button>
            </div>
    </div>
  );
};

export default TransactionForm;
