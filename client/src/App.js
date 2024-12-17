import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StyleProvider } from './/components/VisualModal/StyleContext.jsx';
import VisualModal from './/components/VisualModal/VisualModal.jsx';
import './App.css';
import AdminRoute from './auth/AdminRoute.jsx';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import CreateCoursePage from './pages/adminCourse/creation/CreateCourse';
import EditCatalog from './pages/adminCourse/editCatalog/EditCatalog';
import UserStats from "./pages/adminCourse/editCatalog/stats-page/user-stats";
import AdminPage_Main from './pages/AdminPage_v2/main/index.jsx';
import AmlExpert from './pages/aml-games/aml-expert/index.jsx';
import music from './pages/aml-games/assets/aml-game1.mp3';
import BackgroundMusic from './pages/aml-games/components/background-music/index.jsx';
import ChangeEvent from './pages/CreateEvent/change-event/index.jsx';
import CreateEvent from './pages/CreateEvent/index.jsx';
import ChangeNews from './pages/CreateNews/change-news/index.jsx';
import CreateNews from './pages/CreateNews/index.jsx';
import EventPage from './pages/event-page/index.jsx';
import EventsPage from './pages/events-page/index.jsx';
import Login from './pages/login/Login';
import PlanningInvestigationCourse from './pages/ReadCourses/PlanningInvestigationCourse/index.jsx';
import Registration from './pages/registration/Registration';
import './settings/i18n.js';
const AllNewsPage = lazy(() => import('./pages/all-news/index.jsx'))
const NewsPage = lazy(() => import('./pages/news-page'))
const Home = lazy(() => import ('./pages/home/Home'))
const Game1 = lazy(() => import('./pages/aml-games/game-1/index.jsx'))
const GameReader = lazy(() => import('./pages/aml-games/game-2/index.jsx'))
const GameMain = lazy(() => import ('./pages/aml-games/main/index.jsx'))
const ReadCourse = lazy(() => import ('./pages/ReadCourse'))
const AboutUs = lazy(()=> import('./pages/aboutPage/aboutUs/AboutUs'))
const Management = lazy(() => import('./pages/aboutPage/management/Management'))
const Contacts = lazy(() => import('./pages/aboutPage/contacts/Contacts.jsx'))
const DevelopmentOfIcps = lazy(() => import('./pages/sfm/ReadyMadeSolutionsCatalog/DevelopmentOfIcps/DevelopmentOfIcps.jsx'))
const PreparationAndSupport = lazy(() => import('./pages/sfm/ReadyMadeSolutionsCatalog/PreparationAndSupport/PreparationAndSupport.jsx'))
const OnlineConsultation = lazy(() => import('./pages/sfm/ReadyMadeSolutionsCatalog/OnlineConsultation/OnlineConsultation.jsx'))
const ReadMadeSolutionsCatalog = lazy(() => import('./pages/sfm/ReadyMadeSolutionsCatalog/ReadyMadeSolutionsCatalog.jsx'))
const AcademicCouncil = lazy(() => import('./pages/ric/academicCouncil'))
const MainTasksAndActivities = lazy(() => import('./pages/ric/mainTasksAndActivities'))
const PublicOfferAgreement = lazy(() => import('./pages/PublicOfferAgreement'))
const PlansAndReports = lazy(() => import('./pages/ric/plansAndReports'))
const PrivacyPolicy = lazy(() => import('./pages/aboutPage/privacyPolicy/privacyPolicy.jsx'))
const Structure = lazy(()=>import('./pages/aboutPage/structure/Structure'))
const DirectorPage = lazy(()=>import('./pages/aboutPage/director/DirectorPage'))
const Charter = lazy(()=>import('./pages/aboutPage/charter/Charter'))
const Subjects = lazy(()=>import('./pages/sfm/subjects/Subjects'))
const Rules = lazy(() => import('./pages/sfm/rules/Rules'));
const Operations = lazy(() => import('./pages/sfm/operations/Operations'));
const AntiLaundering = lazy(() => import('./pages/podft/antiLaundering/AntiLaundering'));
const Fatf = lazy(() => import('./pages/podft/fatf/Fatf'));
const Eag = lazy(() => import('./pages/podft/eag/Eag'));
const MutualEvaluation = lazy(() => import('./pages/podft/mutualEvaluation/MutualEvaluation'));
const CalendarPage = lazy(() => import('./pages/calendar/Calendar'));
const InfoPage = lazy(() => import('./pages/courseInfoPage/InfoPage'));
const BasicCourse = lazy(() => import('./pages/courses-basic/BasicCourse'));
const SurveysPage = lazy(() => import('./pages/surveys/Surveys'));
const DictionaryPage = lazy(() => import('./pages/DictionaryPage/Dictionary'));
const VebinarsPage = lazy(() => import('./pages/vebinar/VebinarsPage'));
const Catalog = lazy(() => import('./pages/courseCatalog/Catalog'));
const MyCourses = lazy(() => import('./pages/myCourses/MyCourses'));
const Profile = lazy(() => import('./pages/profilePage/Profile'));
const PaymentPage = lazy(() => import('./pages/paymentPage/PaymentPage'));
const Sandbox = lazy(() => import('./pages/Sandbox'));
const Basic_course = lazy(() => import('./pages/basic-course'));
const CryptoCourse = lazy(() => import('./pages/ReadCourses/CryptoCourse'));
const AmlGamesProfile = lazy(() => import('./pages/aml-games/profile'));
const RegulatoryPage = lazy(() => import('./pages/complains/RegulatoryPage.jsx'));

function App() {

    return (
        <div className="App">
            <StyleProvider>
                <VisualModal />
                <AuthProvider>
                    <BrowserRouter>
                        <BackgroundMusic music={music}/>
                        <Routes>
                            <Route path="/login" element={<PrivateRoute shouldBeLoggedIn={false} component={Login} redirect={'/profile'}/>} />
                            <Route path="/registration" element={<PrivateRoute shouldBeLoggedIn={false} component={Registration} redirect={'/profile'}/>} />

                            <Route path="/logout" element={<Login/>} />


                            <Route path="/" element={<Suspense ><Home /></Suspense>}></Route>
                            <Route path="/:scroll" element={<Suspense ><Home /></Suspense>}></Route>
                            <Route path="/about" element={<Suspense ><AboutUs /></Suspense>}></Route>
                            <Route path="courses/aml-games/*" element={
                                    <Routes>
                                        <Route path="game/survey/:id" element={<Suspense><Game1 /></Suspense>} />
                                        <Route path="game/main/:id" element={<Suspense><GameMain /></Suspense>} />
                                        <Route path="game/profile/:id" element={<AmlGamesProfile />} />
                                        <Route path="game/aml-expert/:id" element={<AmlExpert />} />
                                        <Route path="game/read/:id/:level/:subLevel" element={<Suspense><GameReader /></Suspense>} />
                                    </Routes>
                            } />

                            <Route path="/management" element={<Suspense ><Management /></Suspense>}></Route>
                            <Route path="/contacts" element={<Suspense ><Contacts /></Suspense>}></Route>
                            <Route path="/news-page/:id" element={<Suspense ><NewsPage /></Suspense>}></Route>
                            <Route path="/all-news" element={<Suspense ><AllNewsPage /></Suspense>}></Route>
                            <Route path="/privacy-policy" element={<Suspense ><PrivacyPolicy /></Suspense>}></Route>
                            <Route path="/academic-council" element={<Suspense ><AcademicCouncil /></Suspense>}></Route>
                            <Route path="/plans-and-reports" element={<Suspense ><PlansAndReports /></Suspense>}></Route>
                            <Route path="/main-tasks-and-activities" element={<Suspense ><MainTasksAndActivities /></Suspense>}></Route>
                            <Route path="/ready-made-solutions" element={<Suspense ><ReadMadeSolutionsCatalog /></Suspense>}></Route>
                            <Route path="/development-of-icps" element={<Suspense ><DevelopmentOfIcps /></Suspense>}></Route>
                            <Route path="/online-consultation" element={<Suspense ><OnlineConsultation /></Suspense>}></Route>
                            <Route path="/preparation-and-support" element={<Suspense ><PreparationAndSupport /></Suspense>}></Route>
                            <Route path="/offer-agreement" element={<Suspense ><PublicOfferAgreement /></Suspense>}></Route>
                            <Route path="/structure" element={<Suspense ><Structure /></Suspense>}></Route>
                            <Route path="/structure/:id" element={<Suspense ><DirectorPage /></Suspense>} />
                            <Route path="/charter" element={<Suspense ><Charter /></Suspense>}></Route>
                            <Route path="/complains/regulatory" element={<Suspense ><RegulatoryPage /></Suspense>}></Route>

                            <Route path="/profile" element={<Suspense><PrivateRoute shouldBeLoggedIn={true} component={Profile}/></Suspense>}></Route>
                            <Route path="/profile/:tabname" element={<Suspense><PrivateRoute shouldBeLoggedIn={true} component={Profile}/></Suspense>}></Route>

                            <Route path="/subjects" element={<Suspense ><Subjects /></Suspense>}></Route>
                            <Route path="/rules" element={<Suspense ><Rules /></Suspense>}></Route>
                            <Route path="/operations" element={<Suspense ><Operations /></Suspense>}></Route>

                            <Route path="/anti-laundering" element={<Suspense ><AntiLaundering /></Suspense>}></Route>
                            <Route path="/fatf" element={<Suspense ><Fatf /></Suspense>}></Route>
                            <Route path="/eag" element={<Suspense ><Eag /></Suspense>}></Route>
                            <Route path="/mutual-evaluation" element={<Suspense ><MutualEvaluation /></Suspense>}></Route>

                            <Route path="/vebinars" element={<Suspense ><VebinarsPage /></Suspense>}/>
                            <Route path="/vebinars/calendar" element={<Suspense ><CalendarPage /></Suspense>}/>
                            <Route path="/vebinars/surveys" element={<Suspense ><SurveysPage /></Suspense>} />
                            <Route path="/vebinars/dictionary" element={<Suspense ><DictionaryPage /></Suspense>} />
                            <Route path="/vebinars/:id" element={<></>} />
                            <Route path="/courses" element={<Suspense ><Catalog /></Suspense>}/>
                            <Route path="/courses/myCourses" element={<Suspense><PrivateRoute shouldBeLoggedIn={true} component={MyCourses} /></Suspense>} />
                            <Route path="/courses/myCourses/success" element={<Suspense><PrivateRoute shouldBeLoggedIn={true} component={MyCourses}/></Suspense>}/>
                            <Route path="/courses/info" element={<Suspense ><InfoPage /></Suspense>}/>
                            <Route path='/courses/:id/read' element={<Suspense ><ReadCourse/></Suspense>} />
                            <Route path='/courses/:id/' element={<Suspense ><BasicCourse /></Suspense>}/>
                            <Route path="/courses/8/read" element={<Suspense><AdminRoute shouldBeLoggedIn={true} shouldBeAdmin={false} component={Basic_course} redirect={'/login'}/></Suspense>} />
                            <Route path='/courses/100/read' element={<Suspense ><CryptoCourse /></Suspense>}/>
                            <Route path='/courses/101/read' element={<Suspense ><PlanningInvestigationCourse /></Suspense>}/>
                            <Route path='/payment/:id' element={<Suspense ><PaymentPage /></Suspense>} />
                            <Route path='/sandbox' element={<Suspense ><Sandbox /></Suspense>}/>'
                            <Route path='/manager' element={<AdminRoute component={EditCatalog} shouldBeLoggedIn={true} redirect={'/'} />} />
                            <Route path='/createcourse' element={<AdminRoute component={CreateCoursePage} shouldBeLoggedIn={true} redirect={'/'} />}/>
                            <Route path='/new-admin-page' element={<AdminRoute component={AdminPage_Main} shouldBeLoggedIn={true} redirect={'/'} />}/>
                            <Route path='/create-news' element={<AdminRoute component={CreateNews} shouldBeLoggedIn={true} />} />
                            <Route path='/change-news/:id' element={<AdminRoute component={ChangeNews} shouldBeLoggedIn={true} />} />
                            <Route path='/events' element={<Suspense ><EventsPage /></Suspense>} />
                            <Route path='/event/:id' element={<Suspense ><EventPage /></Suspense>} />
                            <Route path='/create-event' element={<Suspense ><CreateEvent /></Suspense>} />
                            <Route path='/user-stats/:id' element={<Suspense ><UserStats /></Suspense>} />
                            <Route path='/change-event/:id' element={<AdminRoute component={ChangeEvent} shouldBeLoggedIn={true} />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </StyleProvider>

        </div>
    );
}

export default App;
