import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import base_url from '../settings/base_url';

const useCourseStore = create(
  devtools(
    (set, get) => ({
      // State
      course: null,
      courseModules: [],
      courseProgress: 0,
      sessionStatuses: {},
      isLoading: true,
      error: null,
      
      // Navigation state
      isNavOpen: true,
      activeSessionId: null,
      activeModuleId: null,
      activeQuizId: null,
      isModuleQuiz: false,
      currentModule: -1,
      
      // Modal state
      openQuizModal: false,
      quizStatus: '',
      
      // Actions
      setIsNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
      
      setActiveSession: (moduleId, sessionId) => set({
        activeModuleId: moduleId,
        activeSessionId: sessionId,
        isModuleQuiz: false
      }),
      
      setActiveQuiz: (moduleId, quizId) => set({
        activeModuleId: moduleId,
        activeQuizId: quizId,
        isModuleQuiz: true,
        activeSessionId: null
      }),
      
      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),
      
      setQuizModal: (isOpen, status = '') => set({
        openQuizModal: isOpen,
        quizStatus: status
      }),
      
      closeQuizModal: () => set({
        openQuizModal: false,
        quizStatus: ''
      }),
      
      markLessonAsViewed: async (lessonId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        
        try {
          await axios.post(
            `${base_url}/api/aml/chapter/checked/${lessonId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          
          // Update session status in state
          set(state => ({
            sessionStatuses: {
              ...state.sessionStatuses,
              [lessonId]: true
            }
          }));
          
        } catch (error) {
          console.error('Error marking lesson as viewed:', error);
        }
      },
      
      getSessionStatus: (sessionId) => {
        const { sessionStatuses } = get();
        return sessionStatuses[sessionId];
      },
      
      // API Actions
      fetchCourse: async (courseId) => {
        set({ isLoading: true, error: null });
        const jwtToken = localStorage.getItem('jwtToken');
        
        console.log('🔄 Fetching course with ID:', courseId);
        
        try {
          const response = await axios.get(
            `${base_url}/api/aml/course/getCourseById/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          
          console.log('✅ Course data received:', response.data);
          
          const courseData = response.data.course;
          
          set({
            course: courseData,
            courseModules: courseData.modules || [],
            courseProgress: response.data.progress_percentage || 0,
            isLoading: false
          });
          
          console.log('📚 Course state updated:', {
            course: courseData?.course_name,
            modulesCount: courseData?.modules?.length,
            firstModule: courseData?.modules?.[0]
          });
          
          // Set initial active session
          if (courseData.modules?.length > 0 && courseData.modules[0].lessons?.length > 0) {
            const firstModule = courseData.modules[0];
            const firstLesson = firstModule.lessons[0];
            
            set({
              activeModuleId: firstModule.module_id,
              activeSessionId: firstLesson.lesson_id,
              currentModule: firstModule.module_id
            });
            
            console.log('🎯 Initial session set:', {
              moduleId: firstModule.module_id,
              sessionId: firstLesson.lesson_id
            });
          }
          
        } catch (error) {
          console.error('❌ Error fetching course:', error);
          set({ error, isLoading: false });
        }
      },
      
      fetchSessionStatuses: async (courseId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        
        try {
          const response = await axios.get(
            `${base_url}/api/aml/chapter/getChecked/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          
          if (response.status === 200) {
            const statusMap = {};
            response.data.forEach(session => {
              statusMap[session.id] = session.checked;
            });
            set({ sessionStatuses: statusMap });
          }
        } catch (error) {
          console.error('Error fetching session statuses:', error);
        }
      },
      
      markLessonCompleted: async (lessonId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        
        try {
          await axios.post(
            `${base_url}/api/aml/chapter/checked/${lessonId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          
          // Update session status in state
          set(state => ({
            sessionStatuses: {
              ...state.sessionStatuses,
              [lessonId]: true
            }
          }));
          
        } catch (error) {
          console.error('Error marking lesson as completed:', error);
          set({ error });
        }
      },
      
      // Utility functions
      getActiveModule: () => {
        const { courseModules, activeModuleId } = get();
        return courseModules.find(module => module.module_id === activeModuleId);
      },
      
      getActiveLesson: () => {
        const activeModule = get().getActiveModule();
        const { activeSessionId } = get();
        return activeModule?.lessons.find(lesson => lesson.lesson_id === activeSessionId);
      },
      
      // Reset store
      reset: () => set({
        course: null,
        courseModules: [],
        courseProgress: 0,
        sessionStatuses: {},
        isLoading: true,
        error: null,
        isNavOpen: true,
        activeSessionId: null,
        activeModuleId: null,
        activeQuizId: null,
        isModuleQuiz: false,
        currentModule: -1,
        openQuizModal: false,
        quizStatus: ''
      })
    }),
    { name: 'course-store' }
  )
);

export default useCourseStore;
