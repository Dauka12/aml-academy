import React from "react";

const ProfileStudent = ({ user }) => (
  <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 className="text-2xl font-bold mb-4">Профиль студента</h2>
    <div>
      <b>Email:</b> {user?.email}
    </div>
    <div>
      <b>Роль:</b> {user?.role}
    </div>
    {/* Можно добавить больше информации */}
  </div>
);

export default ProfileStudent;
