import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => (
  <nav className="bg-blue-700 text-white px-6 py-3 flex items-center justify-between shadow">
    <div className="font-bold text-xl">LMS Academy</div>
    <div className="flex gap-4">
      <Link to="/lms/programs" className="hover:underline">
        Программы
      </Link>
      {user?.role === "student" && (
        <Link to="/lms/profile/student" className="hover:underline">
          Профиль студента
        </Link>
      )}
      {user?.role === "teacher" && (
        <Link to="/lms/profile/teacher" className="hover:underline">
          Профиль учителя
        </Link>
      )}
      <Link to="/lms/timeline" className="hover:underline">
        Таймлайн
      </Link>
      <Link to="/lms/final-test" className="hover:underline">
        Финальный тест
      </Link>
    </div>
    <div>{user ? user.email : <Link to="/lms/login">Войти</Link>}</div>
  </nav>
);

export default Navbar;
