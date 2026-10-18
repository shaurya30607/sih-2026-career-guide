import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { ROUTES } from './routes';
import { HomeScreen } from './HomeScreen';
import { PlaceholderSection } from './PlaceholderSection';
import { OnboardingFlow } from '../features/onboarding';
import { CourseExplorer } from '../features/courses';
import { AssessmentScreen } from '../features/counselling';
import { Course } from '../types/course';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(ROUTES.HOME);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [counsellingCourse, setCounsellingCourse] = useState<{ id: string; title: string } | null>(null);

  const handleNavigate = (route: string) => {
    // If navigating to courses from elsewhere, ensure we don't get stuck on an old detail view
    if (route !== ROUTES.COURSES && route !== ROUTES.COURSE_DETAIL) {
      setSelectedCourseId(null);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOnboardingComplete = () => {
    handleNavigate(ROUTES.COURSES);
  };

  const handleOnboardingSkip = () => {
    handleNavigate(ROUTES.COURSES);
  };

  const handleConsultCounsellor = (course: Course) => {
    setCounsellingCourse({ id: course.id, title: course.title });
    handleNavigate(ROUTES.COUNSELLING);
  };

  const renderCurrentView = () => {
    switch (currentRoute) {
      case ROUTES.HOME:
        return <HomeScreen onNavigate={handleNavigate} />;

      case ROUTES.ONBOARDING:
        return (
          <OnboardingFlow
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
        );

      case ROUTES.COURSES:
      case ROUTES.COURSE_DETAIL:
        return (
          <CourseExplorer
            selectedCourseId={selectedCourseId}
            onSelectCourse={setSelectedCourseId}
            onConsultCounsellor={handleConsultCounsellor}
            onNavigateToOnboarding={() => handleNavigate(ROUTES.ONBOARDING)}
          />
        );

      case ROUTES.COUNSELLING:
        return (
          <AssessmentScreen
            courseId={counsellingCourse?.id}
            onNavigate={handleNavigate}
            onClearCourseContext={() => setCounsellingCourse(null)}
            onViewCourseDetails={(courseId) => {
              setSelectedCourseId(courseId);
              handleNavigate(ROUTES.COURSE_DETAIL);
            }}
          />
        );

      default:
        return (
          <PlaceholderSection
            route={currentRoute}
            onNavigate={handleNavigate}
            contextCourse={undefined}
            onClearContextCourse={() => setCounsellingCourse(null)}
          />
        );
    }
  };

  return (
    <AppShell currentRoute={currentRoute} onRouteChange={handleNavigate}>
      {renderCurrentView()}
    </AppShell>
  );
};

export default App;
