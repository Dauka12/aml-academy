import React from "react";
import { useParams } from "react-router-dom";

const StudentProgram = () => {
  const { id } = useParams();
  // TODO: получить данные программы по id
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Программа №{id}</h2>
      {/* Здесь будет информация о программе */}
    </div>
  );
};

export default StudentProgram;
