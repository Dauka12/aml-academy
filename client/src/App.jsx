import { Suspense, lazy, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import AdminRoute from './auth/AdminRoute.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';
import PrivateRoute from './auth/PrivateRoute.jsx';
import { StyleProvider } from './components/VisualModal/StyleContext.jsx';
import VisualModal from './components/VisualModal/VisualModal.jsx';
import EditCatalog from './pages/adminCourse/editCatalog/EditCatalog.jsx';
import UserStats from "./pages/adminCourse/editCatalog/stats-page/user-stats/index.jsx";
import AdminPage_Main from './pages/AdminPage_v2/main/index.jsx';
import AKSPage from './pages/complains/AKSPage.jsx';
import ChangeEvent from './pages/CreateEvent/change-event/index.jsx';
import CreateEvent from './pages/CreateEvent/index.jsx';
import ChangeNews from './pages/CreateNews/change-news/index.jsx';
import CreateNews from './pages/CreateNews/index.jsx';
import EventPage from './pages/event-page/index.jsx';
import EventsPage from './pages/events-page/index.jsx';
import Login from './pages/login/Login.jsx';
import PlanningInvestigationCourse from './pages/ReadCourses/PlanningInvestigationCourse/index.jsx';
import Registration from './pages/registration/Registration.jsx';
import './settings/i18n.js';
const AllNewsPage = lazy(() => import('./pages/all-news/index.jsx'))
const NewsPage = lazy(() => import('./pages/news-page/index.jsx'))
const Home = lazy(() => import ('./pages/home/Home.jsx'))
const ReadCourse = lazy(() => import ('./pages/ReadCourse/index.jsx'))
const ComponentTest = lazy(() => import('./ComponentTest.jsx'))
const ComponentTestUser = lazy(() => import('./ComponentTestUser.jsx'))
const StageDropdownTest = lazy(() => import('./StageDropdownTest.jsx'))
const AboutUs = lazy(()=> import('./pages/aboutPage/aboutUs/AboutUs.jsx'))
const Management = lazy(() => import('./pages/aboutPage/management/Management.jsx'))
const Contacts = lazy(() => import('./pages/aboutPage/contacts/Contacts.jsx'))
const DevelopmentOfIcps = lazy(() => import('./pages/sfm/ReadyMadeSolutionsCatalog/DevelopmentOfIcps/DevelopmentOfIcps.jsx'))
const PreparationAndSupport = lazy(() => import('./pages/sfm/ReadyMadeSolutionsCatalog/PreparationAndSupport/PreparationAndSupport.jsx'))
const OnlineConsultation = lazy(() => import('./pages/sfm/ReadyMadeSolutionsCatalog/OnlineConsultation/OnlineConsultation.jsx'))
const ReadMadeSolutionsCatalog = lazy(() => import('./pages/sfm/ReadyMadeSolutionsCatalog/ReadyMadeSolutionsCatalog.jsx'))
const AcademicCouncil = lazy(() => import('./pages/ric/academicCouncil/index.jsx'))
const MainTasksAndActivities = lazy(() => import('./pages/ric/mainTasksAndActivities/index.jsx'))
const PublicOfferAgreement = lazy(() => import('./pages/PublicOfferAgreement/index.jsx'))
const PlansAndReports = lazy(() => import('./pages/ric/plansAndReports/index.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/aboutPage/privacyPolicy/privacyPolicy.jsx'))
const Structure = lazy(()=>import('./pages/aboutPage/structure/Structure.jsx'))
const DirectorPage = lazy(()=>import('./pages/aboutPage/director/DirectorPage.jsx'))
const Charter = lazy(()=>import('./pages/aboutPage/charter/Charter.jsx'))
const Subjects = lazy(()=>import('./pages/sfm/subjects/Subjects.jsx'))
const Rules = lazy(() => import('./pages/sfm/rules/Rules.jsx'));
const Operations = lazy(() => import('./pages/sfm/operations/Operations.jsx'));
const AntiLaundering = lazy(() => import('./pages/podft/antiLaundering/AntiLaundering.jsx'));
const Fatf = lazy(() => import('./pages/podft/fatf/Fatf.jsx'));
const Eag = lazy(() => import('./pages/podft/eag/Eag.jsx'));
const MutualEvaluation = lazy(() => import('./pages/podft/mutualEvaluation/MutualEvaluation.jsx'));
const CalendarPage = lazy(() => import('./pages/calendar/Calendar.jsx'));
const InfoPage = lazy(() => import('./pages/courseInfoPage/InfoPage.jsx'));
const BasicCourse = lazy(() => import('./pages/courses-basic/BasicCourse.jsx'));
const DictionaryPage = lazy(() => import('./pages/DictionaryPage/Dictionary.jsx'));
const VebinarsPage = lazy(() => import('./pages/vebinar/VebinarsPage.jsx'));
const Catalog = lazy(() => import('./pages/courseCatalog/Catalog.jsx'));
const MyCourses = lazy(() => import('./pages/myCourses/MyCourses.jsx'));
const Profile = lazy(() => import('./pages/profilePage/Profile.jsx'));
const PaymentPage = lazy(() => import('./pages/paymentPage/PaymentPage.jsx'));
const Basic_course = lazy(() => import('./pages/basic-course/index.jsx'));
const CryptoCourse = lazy(() => import('./pages/ReadCourses/CryptoCourse/index.jsx'));
const RegulatoryPage = lazy(() => import('./pages/complains/RegulatoryPage.jsx'));
const PVKPage = lazy(() => import('./pages/complains/PVKPage.jsx'));
const CCPage = lazy(() => import('./pages/complains/CCPage.jsx'));

// Add this with the other lazy imports
const OlympiadRoutes = lazy(() => import('./features/olympiad/OlympiadRoutes.tsx'));

// PageTracking component to handle route changes
const PageTracking = () => {
    const location = useLocation();
    
    useEffect(() => {
        // Send pageview with updated location
        ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }, [location]);
    
    return null;
};

function App() {

    return (
        <div className="App">
            <StyleProvider>
                <VisualModal />
                <AuthProvider>
                    <BrowserRouter>
                        {/* Add the PageTracking component */}
                        <PageTracking />
                        <Routes>
                            <Route path="/login" element={<PrivateRoute shouldBeLoggedIn={false} component={Login} redirect={'/profile'}/>} />
                            <Route path="/registration" element={<PrivateRoute shouldBeLoggedIn={false} component={Registration} redirect={'/profile'}/>} />                            <Route path="/olympiad/*" element={<Suspense><OlympiadRoutes /></Suspense>} />
                            <Route path="/test-components" element={<Suspense><ComponentTest /></Suspense>} />
                            <Route path="/test-user-components" element={<Suspense><ComponentTestUser /></Suspense>} />
                            <Route path="/test-stage-dropdown" element={<Suspense><StageDropdownTest /></Suspense>} />
                            <Route path="/" element={<Suspense ><Home /></Suspense>}></Route>
                            <Route path="/news-page/:id" element={<Suspense ><NewsPage /></Suspense>}></Route>
                            <Route path="/all-news" element={<Suspense ><AllNewsPage /></Suspense>}></Route>
                            

                            <Route path="/profile" element={<Suspense><PrivateRoute shouldBeLoggedIn={true} component={Profile}/></Suspense>}></Route>
                            <Route path="/profile/:tabname" element={<Suspense><PrivateRoute shouldBeLoggedIn={true} component={Profile}/></Suspense>}></Route>

                            <Route path="/vebinars" element={<Suspense ><VebinarsPage /></Suspense>}/>
                            <Route path="/vebinars/calendar" element={<Suspense ><CalendarPage /></Suspense>}/>
                            <Route path="/vebinars/dictionary" element={<Suspense ><DictionaryPage /></Suspense>} />
                            <Route path="/vebinars/:id" element={<></>} />
                            <Route path="/courses" element={<Suspense ><Catalog /></Suspense>}/>
                            <Route path="/courses/myCourses" element={<Suspense><PrivateRoute shouldBeLoggedIn={true} component={MyCourses} /></Suspense>} />
                            <Route path="/courses/info" element={<Suspense ><InfoPage /></Suspense>}/>
                            <Route path='/courses/:id/read' element={<Suspense ><ReadCourse/></Suspense>} />
                            <Route path='/courses/:id/' element={<Suspense ><BasicCourse /></Suspense>}/>
                            <Route path="/courses/8/read" element={<Suspense><AdminRoute shouldBeLoggedIn={true} shouldBeAdmin={false} component={Basic_course} redirect={'/login'}/></Suspense>} />
                            <Route path='/courses/100/read' element={<Suspense ><CryptoCourse /></Suspense>}/>
                            <Route path='/courses/101/read' element={<Suspense ><PlanningInvestigationCourse /></Suspense>}/>
                            <Route path='/payment/:id' element={<Suspense ><PaymentPage /></Suspense>} />
                            <Route path='/manager' element={<AdminRoute component={EditCatalog} shouldBeLoggedIn={true} redirect={'/'} />} />
                            <Route path='/new-admin-page' element={<AdminRoute component={AdminPage_Main} shouldBeLoggedIn={true} redirect={'/'} />}/>
                            <Route path='/create-news' element={<AdminRoute component={CreateNews} shouldBeLoggedIn={true} />} />
                            <Route path='/change-news/:id' element={<AdminRoute component={ChangeNews} shouldBeLoggedIn={true} />} />
                            <Route path='/events' element={<Suspense ><EventsPage /></Suspense>} />
                            <Route path='/event/:id' element={<Suspense ><EventPage /></Suspense>} />
                            <Route path='/create-event' element={<Suspense ><CreateEvent /></Suspense>} />
                            <Route path='/user-stats/:id' element={<Suspense ><UserStats /></Suspense>} />
                            <Route path='/change-event/:id' element={<AdminRoute component={ChangeEvent} shouldBeLoggedIn={true} />} />







                            {/* Static pages without any backend requests */} 
                            <Route path="/about" element={<Suspense ><AboutUs /></Suspense>}></Route>
                            <Route path="/subjects" element={<Suspense ><Subjects /></Suspense>}></Route>
                            <Route path="/rules" element={<Suspense ><Rules /></Suspense>}></Route>
                            <Route path="/operations" element={<Suspense ><Operations /></Suspense>}></Route>
                            <Route path="/anti-laundering" element={<Suspense ><AntiLaundering /></Suspense>}></Route>
                            <Route path="/fatf" element={<Suspense ><Fatf /></Suspense>}></Route>
                            <Route path="/eag" element={<Suspense ><Eag /></Suspense>}></Route>
                            <Route path="/mutual-evaluation" element={<Suspense ><MutualEvaluation /></Suspense>}></Route>
                            <Route path="/management" element={<Suspense ><Management /></Suspense>}></Route>
                            <Route path="/contacts" element={<Suspense ><Contacts /></Suspense>}></Route>
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
                            <Route path="/complains/pvk" element={<Suspense ><PVKPage /></Suspense>}></Route>
                            <Route path="/complains/aks" element={<Suspense ><AKSPage /></Suspense>}></Route>
                            <Route path="/complains/cc" element={<Suspense ><CCPage /></Suspense>}></Route>
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </StyleProvider>

        </div>
    );
}

export default App;
