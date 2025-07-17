import useCourseStore from '../../../stores/courseStore';

const DebugPanel = () => {
  const {
    course,
    courseModules,
    isLoading,
    error,
    activeSessionId,
    activeModuleId,
    isModuleQuiz
  } = useCourseStore();

  if (!window.location.search.includes('debug=true')) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 w-80 h-screen bg-black bg-opacity-80 text-white p-4 overflow-y-auto z-50 text-xs">
      <h3 className="font-bold mb-4">🐛 Debug Panel</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold text-yellow-400">Loading State:</h4>
        <p>isLoading: {isLoading ? 'true' : 'false'}</p>
        <p>error: {error ? error.message : 'null'}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-yellow-400">Course Data:</h4>
        <p>course: {course ? course.course_name : 'null'}</p>
        <p>courseModules: {courseModules?.length || 0} modules</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-yellow-400">Active State:</h4>
        <p>activeModuleId: {activeModuleId || 'null'}</p>
        <p>activeSessionId: {activeSessionId || 'null'}</p>
        <p>isModuleQuiz: {isModuleQuiz ? 'true' : 'false'}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-yellow-400">Modules:</h4>
        {courseModules?.map((module, index) => (
          <div key={module.module_id} className="mb-2 p-2 bg-gray-800 rounded">
            <p>#{index + 1}: {module.module_title}</p>
            <p>Lessons: {module.lessons?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugPanel;
