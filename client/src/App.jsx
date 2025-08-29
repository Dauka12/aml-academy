import { Suspense, lazy, useEffect } from "react";
import ReactGA from "react-ga4";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AdminRoute from "./auth/AdminRoute.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import { StyleProvider } from "./components/VisualModal/StyleContext.jsx";
import VisualModal from "./components/VisualModal/VisualModal.jsx";
import WhatsAppWidget from "./components/whatsapp-widget/index.jsx";
import EditCatalog from "./pages/adminCourse/editCatalog/EditCatalog.jsx";
import UserStats from "./pages/adminCourse/editCatalog/stats-page/user-stats/index.jsx";
import AdminPage_Main from "./pages/AdminPage_v2/main/index.jsx";
import AKSPage from "./pages/complains/AKSPage.jsx";
import CreateEvent from "./pages/create-event/index.jsx";
import ChangeNews from "./pages/create-news/change-news/index.jsx";
import CreateNews from "./pages/create-news/index.jsx";
import EventPage from "./pages/event-page/index.jsx";
import EventsPage from "./pages/events-page/index.jsx";
import Login from "./pages/login/index.jsx";
import PlanningInvestigationCourse from "./pages/read-courses/planning-investigationcourse/index.jsx";
import Registration from "./pages/registration/index.jsx";
import "./settings/i18n.js";
import LMSRoutes from "./features/LMS/LMSRoutes.tsx";
import Reset from "./pages/reset-password/index.jsx";

const AllNewsPage = lazy(() => import("./pages/all-news/index.jsx"));
const NewsPage = lazy(() => import("./pages/news-page/index.jsx"));
const Home = lazy(() => import("./pages/home/index-optimized.jsx")); // Используем оптимизированную версию
const ReadCourse = lazy(() => import("./pages/read-course/index.jsx"));
const AboutUs = lazy(() => import("./pages/about-page/about-us/index.jsx"));
const ChangeEvent = lazy(() => import("./pages/create-event/change-event/index.jsx"));
const Management = lazy(() => import("./pages/about-page/management/index.jsx"));
const Contacts = lazy(() => import("./pages/about-page/contacts/index.jsx"));
const DevelopmentOfIcps = lazy(() =>import("./pages/sfm/readymadesolutionscatalog/developmentofIcps/index.jsx"));
const PreparationAndSupport = lazy(() =>import("./pages/sfm/readymadesolutionscatalog/preparationandsupport/index.jsx"));
const OnlineConsultation = lazy(() =>import("./pages/sfm/readymadesolutionscatalog/onlineconsultation/index.jsx"));
const ReadMadeSolutionsCatalog = lazy(() =>import("./pages/sfm/readymadesolutionscatalog/index.jsx"));
const AcademicCouncil = lazy(() =>import("./pages/ric/academic-council/index.jsx"));
const MainTasksAndActivities = lazy(() =>import("./pages/ric/main-tasksandactivities/index.jsx"));
const PublicOfferAgreement = lazy(() =>import("./pages/public-offer-agreement/index.jsx"));
const PlansAndReports = lazy(() =>import("./pages/ric/plans-andreports/index.jsx"));
const PrivacyPolicy = lazy(() =>import("./pages/about-page/privacy-policy/index.jsx"));
const Structure = lazy(() =>import("./pages/about-page/structure/index.jsx"));
const DirectorPage = lazy(() =>import("./pages/about-page/director/index.jsx"));
const Charter = lazy(() => import("./pages/about-page/charter/index.jsx"));
const Subjects = lazy(() => import("./pages/sfm/subjects/index.jsx"));
const Rules = lazy(() => import("./pages/sfm/rules/index.jsx"));
const Operations = lazy(() => import("./pages/sfm/operations/index.jsx"));
const Nra = lazy(() => import("./pages/sfm/nra/index.jsx"));
const AntiLaundering = lazy(() =>import("./pages/podft/antilaundering/index.jsx"));
const Fatf = lazy(() => import("./pages/podft/fatf/index.jsx"));
const Eag = lazy(() => import("./pages/podft/eag/index.jsx"));
const MutualEvaluation = lazy(() =>import("./pages/podft/mutual-evaluation/index.jsx"));
const CalendarPage = lazy(() => import("./pages/calendar/index.jsx"));
const InfoPage = lazy(() => import("./pages/course-infopage/index.jsx"));
const BasicCourse = lazy(() => import("./pages/courses-basic/index.jsx"));
const DictionaryPage = lazy(() =>import("./pages/dictionary-page/index.jsx"));
const VebinarsPage = lazy(() => import("./pages/vebinar/index.jsx"));
const Catalog = lazy(() => import("./pages/course-catalog/index.jsx"));
const MyCourses = lazy(() => import("./pages/mycourses/index.jsx"));
const Profile = lazy(() => import("./pages/profile-page/index.jsx"));
const PaymentPage = lazy(() => import("./pages/payment-page/index.jsx"));
const Basic_course = lazy(() => import("./pages/basic-course/index.jsx"));
const CryptoCourse = lazy(() =>import("./pages/read-courses/crypto-course/index.jsx"));
const RegulatoryPage = lazy(() =>import("./pages/complains/RegulatoryPage.jsx"));
const PVKPage = lazy(() => import("./pages/complains/PVKPage.jsx"));
const CCPage = lazy(() => import("./pages/complains/CCPage.jsx"));

const OlympiadRoutes = lazy(() =>
  import("./features/olympiad/OlympiadRoutes.tsx")
);
const WebinarRoutes = lazy(() =>
  import("./features/webinars/WebinarRoutes.tsx")
);
const ItSolutions = lazy(() => import("./pages/it-solutions"));

const PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
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
              <Route
                path="/login"
                element={
                  <PrivateRoute
                    shouldBeLoggedIn={false}
                    component={Login}
                    redirect={"/profile"}
                  />
                }
              />
              <Route
                path="/registration"
                element={
                  <PrivateRoute
                    shouldBeLoggedIn={false}
                    component={Registration}
                    redirect={"/profile"}
                  />
                }
              />{" "}
              <Route
                path="/olympiad/*"
                element={
                  <Suspense>
                    <OlympiadRoutes />
                  </Suspense>
                }
              />
              <Route
                path="/webinars/*"
                element={
                  <Suspense>
                    <WebinarRoutes />
                  </Suspense>
                }
              />
              <Route
                path="/"
                element={
                  <Suspense>
                    <Home />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/news-page/:id"
                element={
                  <Suspense>
                    <NewsPage />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/all-news"
                element={
                  <Suspense>
                    <AllNewsPage />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <Suspense>
                    <PrivateRoute shouldBeLoggedIn={true} component={Profile} />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/profile/:tabname"
                element={
                  <Suspense>
                    <PrivateRoute shouldBeLoggedIn={true} component={Profile} />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/vebinars"
                element={
                  <Suspense>
                    <VebinarsPage />
                  </Suspense>
                }
              />
              <Route
                path="/vebinars/calendar"
                element={
                  <Suspense>
                    <CalendarPage />
                  </Suspense>
                }
              />
              <Route
                path="/vebinars/dictionary"
                element={
                  <Suspense>
                    <DictionaryPage />
                  </Suspense>
                }
              />
              <Route path="/vebinars/:id" element={<></>} />
              <Route
                path="/courses"
                element={
                  <Suspense>
                    <Catalog />
                  </Suspense>
                }
              />
              <Route
                path="/courses/my-courses"
                element={
                  <Suspense>
                    <PrivateRoute
                      shouldBeLoggedIn={true}
                      component={MyCourses}
                    />
                  </Suspense>
                }
              />
              <Route
                path="/courses/info"
                element={
                  <Suspense>
                    <InfoPage />
                  </Suspense>
                }
              />
              <Route
                path="/courses/:id/read"
                element={
                  <Suspense>
                    <ReadCourse />
                  </Suspense>
                }
              />
              <Route
                path="/courses/:id/"
                element={
                  <Suspense>
                    <BasicCourse />
                  </Suspense>
                }
              />
              <Route
                path="/courses/8/read"
                element={
                  <Suspense>
                    <AdminRoute
                      shouldBeLoggedIn={true}
                      shouldBeAdmin={false}
                      component={Basic_course}
                      redirect={"/login"}
                    />
                  </Suspense>
                }
              />
              <Route
                path="/courses/100/read"
                element={
                  <Suspense>
                    <CryptoCourse />
                  </Suspense>
                }
              />
              <Route
                path="/courses/101/read"
                element={
                  <Suspense>
                    <PlanningInvestigationCourse />
                  </Suspense>
                }
              />
              <Route
                path="/payment/:id"
                element={
                  <Suspense>
                    <PaymentPage />
                  </Suspense>
                }
              />
              <Route
                path="/manager"
                element={
                  <AdminRoute
                    component={EditCatalog}
                    shouldBeLoggedIn={true}
                    redirect={"/"}
                  />
                }
              />
              <Route
                path="/new-admin-page"
                element={
                  <AdminRoute
                    component={AdminPage_Main}
                    shouldBeLoggedIn={true}
                    redirect={"/"}
                  />
                }
              />
              <Route
                path="/create-news"
                element={
                  <AdminRoute component={CreateNews} shouldBeLoggedIn={true} />
                }
              />
              <Route
                path="/change-news/:id"
                element={
                  <AdminRoute component={ChangeNews} shouldBeLoggedIn={true} />
                }
              />
              <Route
                path="/events"
                element={
                  <Suspense>
                    <EventsPage />
                  </Suspense>
                }
              />
              <Route
                path="/event/:id"
                element={
                  <Suspense>
                    <EventPage />
                  </Suspense>
                }
              />
              <Route
                path="/create-event"
                element={
                  <Suspense>
                    <CreateEvent />
                  </Suspense>
                }
              />
              <Route
                path="/user-stats/:id"
                element={
                  <Suspense>
                    <UserStats />
                  </Suspense>
                }
              />
              <Route
                path="/change-event/:id"
                element={
                  <Suspense>
                    <AdminRoute
                      component={ChangeEvent}
                      shouldBeLoggedIn={true}
                    />
                  </Suspense>
                }
              />
              {/* Static pages without any backend requests */}
              <Route
                path="/about"
                element={
                  <Suspense>
                    <AboutUs />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/subjects"
                element={
                  <Suspense>
                    <Subjects />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/rules"
                element={
                  <Suspense>
                    <Rules />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/operations"
                element={
                  <Suspense>
                    <Operations />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/anti-laundering"
                element={
                  <Suspense>
                    <AntiLaundering />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/fatf"
                element={
                  <Suspense>
                    <Fatf />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/eag"
                element={
                  <Suspense>
                    <Eag />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/mutual-evaluation"
                element={
                  <Suspense>
                    <MutualEvaluation />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/management"
                element={
                  <Suspense>
                    <Management />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/contacts"
                element={
                  <Suspense>
                    <Contacts />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/privacy-policy"
                element={
                  <Suspense>
                    <PrivacyPolicy />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/academic-council"
                element={
                  <Suspense>
                    <AcademicCouncil />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/plans-and-reports"
                element={
                  <Suspense>
                    <PlansAndReports />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/main-tasks-and-activities"
                element={
                  <Suspense>
                    <MainTasksAndActivities />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/ready-made-solutions"
                element={
                  <Suspense>
                    <ReadMadeSolutionsCatalog />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/development-of-icps"
                element={
                  <Suspense>
                    <DevelopmentOfIcps />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/online-consultation"
                element={
                  <Suspense>
                    <OnlineConsultation />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/preparation-and-support"
                element={
                  <Suspense>
                    <PreparationAndSupport />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/offer-agreement"
                element={
                  <Suspense>
                    <PublicOfferAgreement />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/structure"
                element={
                  <Suspense>
                    <Structure />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/structure/:id"
                element={
                  <Suspense>
                    <DirectorPage />
                  </Suspense>
                }
              />
              <Route
                path="/charter"
                element={
                  <Suspense>
                    <Charter />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/complains/regulatory"
                element={
                  <Suspense>
                    <RegulatoryPage />
                  </Suspense>
                }
              ></Route>{" "}
              <Route
                path="/nra"
                element={
                  <Suspense>
                    <Nra />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/complains/pvk"
                element={
                  <Suspense>
                    <PVKPage />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/complains/aks"
                element={
                  <Suspense>
                    <AKSPage />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/complains/cc"
                element={
                  <Suspense>
                    <CCPage />
                  </Suspense>
                }
              ></Route>
              <Route
                path="/it-solutions"
                element={
                  <Suspense>
                    <ItSolutions />
                  </Suspense>
                }
              ></Route>
              <Route path="/lms/*" element={<LMSRoutes />} />
              <Route path="/reset" element={<Reset />} />
            </Routes>
            <WhatsAppWidget />
          </BrowserRouter>
        </AuthProvider>
      </StyleProvider>
    </div>
  );
}

export default App;
