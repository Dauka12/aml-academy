import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import base_url from '../../settings/base_url';

function CertificateVerify() {
  const { userId, courseId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${base_url}/api/checkQR/${userId}/${courseId}/json`);
        if (!res.ok) {
          setError('Сертификат не найден');
        } else {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        setError('Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl text-center">
          <div className="text-red-600 font-semibold mb-4">{error}</div>
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Назад</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">Подлинность сертификата</div>
        <h1 className="text-3xl font-bold mt-4 mb-2 text-slate-800">Сертификат курса</h1>
        <p className="text-slate-600 mb-6">{data?.course_name}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <div className="text-blue-700 text-xl font-bold">{data?.lastname} {data?.firstname}</div>
            <div className="text-slate-500 text-sm mt-1">Участник</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <div className="text-blue-700 text-xl font-bold">№{data?.certificate_int ?? '-'}</div>
            <div className="text-slate-500 text-sm mt-1">Номер сертификата</div>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-6 mt-6">
          <div className="flex items-center justify-between text-slate-700">
            <span>Статус</span>
            <span className={data?.valid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {data?.valid ? 'Сертификат действителен' : 'Сертификат недействителен'}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-700 mt-2">
            <span>Дата выдачи</span>
            <span>{data?.date_certificate ?? '-'}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700 mt-2">
            <span>Курс</span>
            <span>{data?.course_name}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Назад</button>
        </div>
      </div>
    </div>
  );
}

export default CertificateVerify;
