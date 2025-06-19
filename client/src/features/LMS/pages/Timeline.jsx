import React, { useState } from "react";

const initialTasks = [
  { id: 1, name: "Task 1", file: null, grade: null },
  { id: 2, name: "Task 2", file: null, grade: null },
  { id: 3, name: "Task 3", file: null, grade: null },
];

const Timeline = ({ user }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleFileChange = (taskId, file) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, file } : task))
    );
  };

  const handleGrade = (taskId, grade) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, grade } : task))
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Таймлайн заданий</h2>
      <ol className="relative border-l border-gray-200">
        {tasks.map((task) => (
          <li key={task.id} className="mb-10 ml-6">
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white">
              {task.id}
            </span>
            <div className="flex flex-col gap-2">
              <div className="font-semibold">{task.name}</div>
              {user?.role === "student" && (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(task.id, e.target.files[0])}
                />
              )}
              {task.file && <div>Загружен файл: {task.file.name}</div>}
              {user?.role === "teacher" && (
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Оценка"
                  onBlur={(e) => handleGrade(task.id, e.target.value)}
                />
              )}
              {task.grade && <div>Оценка: {task.grade}</div>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
