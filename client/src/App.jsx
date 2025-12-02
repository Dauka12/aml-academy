import { Suspense, lazy, useEffect } from "react";
import ReactGA from "react-ga4";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/index.jsx";
import Registration from "./pages/registration/index.jsx";
import Reset from "./pages/reset-password/index.jsx";
import "./settings/i18n.js";
import LoadingSplash from "./components/LoadingSplash.jsx";
const CertificateVerify = lazy(() => import("./pages/certificate/CertificateVerify.jsx"));

const AdminRoute = lazy(() => import("./auth/AdminRoute.jsx"));
const AuthProvider = lazy(() => import("./auth/AuthContext.jsx").then(module => ({ default: module.AuthProvider })));
const PrivateRoute = lazy(() => import("./auth/PrivateRoute.jsx"));
const StyleProvider = lazy(() => import("./components/VisualModal/StyleContext.jsx").then(module => ({ default: module.StyleProvider })));
const WhatsAppWidget = lazy(() => import("./components/whatsapp-widget/index.jsx"));
const EditCatalog = lazy(() => import("./pages/adminCourse/editCatalog/EditCatalog.jsx"));
const UserStats = lazy(() => import("./pages/adminCourse/editCatalog/stats-page/user-stats/index.jsx"));
const AdminPage_Main = lazy(() => import("./pages/AdminPage_v2/main/index.jsx"));
const AKSPage = lazy(() => import("./pages/complains/AKSPage.jsx"));
const CreateEvent = lazy(() => import("./pages/create-event/index.jsx"));
const ChangeNews = lazy(() => import("./pages/create-news/change-news/index.jsx"));
const CreateNews = lazy(() => import("./pages/create-news/index.jsx"));
const EventPage = lazy(() => import("./pages/event-page/index.jsx"));
const EventsPage = lazy(() => import("./pages/events-page/index.jsx"));
const PlanningInvestigationCourse = lazy(() => import("./pages/read-courses/planning-investigationcourse/index.jsx"));
const LMSRoutes = lazy(() => import("./features/LMS/LMSRoutes.tsx"));

const AllNewsPage = lazy(() => import("./pages/all-news/index.jsx"));
const NewsPage = lazy(() => import("./pages/news-page/index.jsx"));
const Home = lazy(() => import("./pages/home/index-optimized.jsx")); // Используем оптимизированную версию
const ReadCourse = lazy(() => import("./pages/read-course/index.jsx"));
const AboutUs = lazy(() => import("./pages/about-page/about-us/index.jsx"));
const ChangeEvent = lazy(() => import("./pages/create-event/change-event/index.jsx"));
const Management = lazy(() => import("./pages/about-page/management/index.jsx"));
const Contacts = lazy(() => import("./pages/about-page/contacts/index.jsx"));
const DevelopmentOfIcps = lazy(() => import("./pages/sfm/readymadesolutionscatalog/developmentofIcps/index.jsx"));
const PreparationAndSupport = lazy(() => import("./pages/sfm/readymadesolutionscatalog/preparationandsupport/index.jsx"));
const OnlineConsultation = lazy(() => import("./pages/sfm/readymadesolutionscatalog/onlineconsultation/index.jsx"));
const ReadMadeSolutionsCatalog = lazy(() => import("./pages/sfm/readymadesolutionscatalog/index.jsx"));
const AcademicCouncil = lazy(() => import("./pages/ric/academic-council/index.jsx"));
const MainTasksAndActivities = lazy(() => import("./pages/ric/main-tasksandactivities/index.jsx"));
const PublicOfferAgreement = lazy(() => import("./pages/public-offer-agreement/index.jsx"));
const PlansAndReports = lazy(() => import("./pages/ric/plans-andreports/index.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/about-page/privacy-policy/index.jsx"));
const Structure = lazy(() => import("./pages/about-page/structure/index.jsx"));
const DirectorPage = lazy(() => import("./pages/about-page/director/index.jsx"));
const Charter = lazy(() => import("./pages/about-page/charter/index.jsx"));
const Subjects = lazy(() => import("./pages/sfm/subjects/index.jsx"));
const Rules = lazy(() => import("./pages/sfm/rules/index.jsx"));
const Operations = lazy(() => import("./pages/sfm/operations/index.jsx"));
const Nra = lazy(() => import("./pages/sfm/nra/index.jsx"));
const AntiLaundering = lazy(() => import("./pages/podft/antilaundering/index.jsx"));
const Fatf = lazy(() => import("./pages/podft/fatf/index.jsx"));
const Eag = lazy(() => import("./pages/podft/eag/index.jsx"));
const MutualEvaluation = lazy(() => import("./pages/podft/mutual-evaluation/index.jsx"));
const CalendarPage = lazy(() => import("./pages/calendar/index.jsx"));
const InfoPage = lazy(() => import("./pages/course-infopage/index.jsx"));
const BasicCourse = lazy(() => import("./pages/courses-basic/index.jsx"));
const DictionaryPage = lazy(() => import("./pages/dictionary-page/index.jsx"));
const VebinarsPage = lazy(() => import("./pages/vebinar/index.jsx"));
const Catalog = lazy(() => import("./pages/course-catalog/index.jsx"));
const MyCourses = lazy(() => import("./pages/mycourses/index.jsx"));
const Profile = lazy(() => import("./pages/profile-page/index.jsx"));
const PaymentPage = lazy(() => import("./pages/payment-page/index.jsx"));
const Basic_course = lazy(() => import("./pages/basic-course/index.jsx"));
const CryptoCourse = lazy(() => import("./pages/read-courses/crypto-course/index.jsx"));
const RegulatoryPage = lazy(() => import("./pages/complains/RegulatoryPage.jsx"));
const PVKPage = lazy(() => import("./pages/complains/PVKPage.jsx"));
const CCPage = lazy(() => import("./pages/complains/CCPage.jsx"));

const OlympiadRoutes = lazy(() =>
  import("./features/olympiad/OlympiadRoutes.tsx")
);
const WebinarRoutes = lazy(() =>
  import("./features/webinars/WebinarRoutes.tsx")
);
const FiniqRoutes = lazy(() =>
  import("./features/finiq/finiqRoutes.tsx")
);
const ItSolutions = lazy(() => import("./pages/it-solutions"));

const fullLoadingFallback = <LoadingSplash />;
const compactLoadingFallback = <LoadingSplash small />;

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

const AppContent = () => {
  const location = useLocation();

  const excludedPaths = ["/olympiad", "/finiq", "/reset", "/profile"];

  const shouldShowWidget = !excludedPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <Suspense fallback={fullLoadingFallback}>
      <AuthProvider>
        <PageTracking />
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PrivateRoute
                  shouldBeLoggedIn={false}
                  component={Login}
                  redirect={"/profile"}
                />
              </Suspense>
            }
          />
          <Route
            path="/registration"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PrivateRoute
                  shouldBeLoggedIn={false}
                  component={Registration}
                  redirect={"/profile"}
                />
              </Suspense>
            }
          />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/*"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <OlympiadRoutes />
              </Suspense>
            }
          />
          <Route
            path="/finiq/*"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <FiniqRoutes />
              </Suspense>
            }
          />
          <Route
            path="/webinars/*"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <WebinarRoutes />
              </Suspense>
            }
          />
          <Route
            path="/certificate/verify/:userId/:courseId"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <CertificateVerify />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="/news-page/:id"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <NewsPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/all-news"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <AllNewsPage />
              </Suspense>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PrivateRoute shouldBeLoggedIn={true} component={Profile} />
              </Suspense>
            }
          ></Route>
          <Route
            path="/profile/:tabname"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PrivateRoute shouldBeLoggedIn={true} component={Profile} />
              </Suspense>
            }
          ></Route>
          <Route
            path="/vebinars"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <VebinarsPage />
              </Suspense>
            }
          />
          <Route
            path="/vebinars/calendar"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <CalendarPage />
              </Suspense>
            }
          />
          <Route
            path="/vebinars/dictionary"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <DictionaryPage />
              </Suspense>
            }
          />
          <Route path="/vebinars/:id" element={<></>} />
          <Route
            path="/courses"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Catalog />
              </Suspense>
            }
          />
          <Route
            path="/courses/my-courses"
            element={
              <Suspense fallback={compactLoadingFallback}>
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
              <Suspense fallback={compactLoadingFallback}>
                <InfoPage />
              </Suspense>
            }
          />
          <Route
            path="/courses/:id/read"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <ReadCourse />
              </Suspense>
            }
          />
          <Route
            path="/courses/:id/"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <BasicCourse />
              </Suspense>
            }
          />
          <Route
            path="/courses/8/read"
            element={
              <Suspense fallback={compactLoadingFallback}>
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
              <Suspense fallback={compactLoadingFallback}>
                <CryptoCourse />
              </Suspense>
            }
          />
          <Route
            path="/courses/101/read"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PlanningInvestigationCourse />
              </Suspense>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <Suspense fallback={compactLoadingFallback}>
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
              <Suspense fallback={compactLoadingFallback}>
                <EventsPage />
              </Suspense>
            }
          />
          <Route
            path="/event/:id"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <EventPage />
              </Suspense>
            }
          />
          <Route
            path="/create-event"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <CreateEvent />
              </Suspense>
            }
          />
          <Route
            path="/user-stats/:id"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <UserStats />
              </Suspense>
            }
          />
          <Route
            path="/change-event/:id"
            element={
              <Suspense fallback={compactLoadingFallback}>
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
              <Suspense fallback={compactLoadingFallback}>
                <AboutUs />
              </Suspense>
            }
          ></Route>
          <Route
            path="/subjects"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Subjects />
              </Suspense>
            }
          ></Route>
          <Route
            path="/rules"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Rules />
              </Suspense>
            }
          ></Route>
          <Route
            path="/operations"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Operations />
              </Suspense>
            }
          ></Route>
          <Route
            path="/anti-laundering"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <AntiLaundering />
              </Suspense>
            }
          ></Route>
          <Route
            path="/fatf"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Fatf />
              </Suspense>
            }
          ></Route>
          <Route
            path="/eag"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Eag />
              </Suspense>
            }
          ></Route>
          <Route
            path="/mutual-evaluation"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <MutualEvaluation />
              </Suspense>
            }
          ></Route>
          <Route
            path="/management"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Management />
              </Suspense>
            }
          ></Route>
          <Route
            path="/contacts"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <Contacts />
              </Suspense>
            }
          ></Route>
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PrivacyPolicy />
              </Suspense>
            }
          ></Route>
          <Route
            path="/academic-council"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <AcademicCouncil />
              </Suspense>
            }
          ></Route>
          <Route
            path="/plans-and-reports"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PlansAndReports />
              </Suspense>
            }
          ></Route>
          <Route
            path="/main-tasks-and-activities"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <MainTasksAndActivities />
              </Suspense>
            }
          ></Route>
          <Route
            path="/ready-made-solutions"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <ReadMadeSolutionsCatalog />
              </Suspense>
            }
          ></Route>
          <Route
            path="/development-of-icps"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <DevelopmentOfIcps />
              </Suspense>
            }
          ></Route>
          <Route
            path="/online-consultation"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <OnlineConsultation />
              </Suspense>
            }
          ></Route>
          <Route
            path="/preparation-and-support"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PreparationAndSupport />
              </Suspense>
            }
          ></Route>
          <Route
            path="/offer-agreement"
            element={
              <Suspense fallback={compactLoadingFallback}>
                <PublicOfferAgreement />
              </Suspense>
            }
          ></Route>
          <Route
            path="/structure"
            element={
              <Suspense fallback={compactLoadingFallback}>
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
          <Route path="/lms/*" element={
            <Suspense fallback={compactLoadingFallback}>
              <LMSRoutes />
            </Suspense>
          } />
        </Routes>
        {shouldShowWidget && (
          <Suspense fallback={null}>
            <WhatsAppWidget />
          </Suspense>
        )}

    </AuthProvider>
    </Suspense >
  );
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={compactLoadingFallback}>
        <StyleProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </StyleProvider>
      </Suspense>
    </div>
  );
}

export default App;
