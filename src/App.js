import { useState } from 'react';
import { routes } from './data/routes';
import WelcomeScreen from './screens/WelcomeScreen';
import RoutesListScreen from './screens/RoutesListScreen';
import RouteDetailScreen from './screens/RouteDetailScreen';
import NavigationScreen from './screens/NavigationScreen';
import TaskScreen from './screens/TaskScreen';
import TaskResultScreen from './screens/TaskResultScreen';
import RouteCompleteScreen from './screens/RouteCompleteScreen';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [waypointIndex, setWaypointIndex] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [score, setScore] = useState(0);

  const currentWaypoint = selectedRoute?.waypoints[waypointIndex];
  const totalWaypoints = selectedRoute?.waypoints.length ?? 0;
  const isLastWaypoint = waypointIndex === totalWaypoints - 1;

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setWaypointIndex(0);
    setScore(0);
    setScreen('detail');
  };

  const handleStartRoute = () => {
    setWaypointIndex(0);
    setScreen('navigation');
  };

  const handleTaskSubmit = ({ isCorrect }) => {
    setLastResult(isCorrect);
    if (isCorrect) setScore(s => s + 1);
    setScreen('result');
  };

  const handleNextWaypoint = () => {
    if (isLastWaypoint) {
      setScreen('complete');
    } else {
      setWaypointIndex(i => i + 1);
      setScreen('navigation');
    }
  };

  const props = {
    screen, routes, selectedRoute, currentWaypoint,
    waypointIndex, totalWaypoints, isLastWaypoint, lastResult, score,
    onContinue: () => setScreen('routes'),
    onSelectRoute: handleSelectRoute,
    onBack: () => setScreen('routes'),
    onStart: handleStartRoute,
    onGetTask: () => setScreen('task'),
    onTaskSubmit: handleTaskSubmit,
    onNextWaypoint: handleNextWaypoint,
    onExit: () => setScreen('detail'),
    onBackToRoutes: () => setScreen('routes'),
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f5f5f5' }}>
      <ScreenRouter {...props} />
    </div>
  );
}

function ScreenRouter({ screen, routes, selectedRoute, currentWaypoint, waypointIndex, totalWaypoints, isLastWaypoint, lastResult, score, onContinue, onSelectRoute, onBack, onStart, onGetTask, onTaskSubmit, onNextWaypoint, onExit, onBackToRoutes }) {
  switch (screen) {
    case 'welcome':    return <WelcomeScreen onContinue={onContinue} />;
    case 'routes':     return <RoutesListScreen routes={routes} onSelectRoute={onSelectRoute} />;
    case 'detail':     return <RouteDetailScreen route={selectedRoute} onBack={onBack} onStart={onStart} />;
    case 'navigation': return <NavigationScreen waypoint={currentWaypoint} waypointIndex={waypointIndex + 1} totalWaypoints={totalWaypoints} onGetTask={onGetTask} onExit={onExit} />;
    case 'task':       return <TaskScreen waypoint={currentWaypoint} waypointIndex={waypointIndex + 1} onSubmit={onTaskSubmit} onExit={onExit} />;
    case 'result':     return <TaskResultScreen waypoint={currentWaypoint} isCorrect={lastResult} isLast={isLastWaypoint} onNext={onNextWaypoint} />;
    case 'complete':   return <RouteCompleteScreen route={selectedRoute} score={score} onBack={onBackToRoutes} />;
    default:           return null;
  }
}
