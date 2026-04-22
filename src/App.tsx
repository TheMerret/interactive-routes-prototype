import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import WelcomeScreen from './screens/WelcomeScreen';
import CityPickScreen from './screens/CityPickScreen';
import RecommendationQuizScreen from './screens/RecommendationQuizScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';
import RoutesListScreen from './screens/RoutesListScreen';
import RouteDetailScreen from './screens/RouteDetailScreen';
import NavigationScreen from './screens/NavigationScreen';
import TaskScreen from './screens/TaskScreen';
import TaskResultScreen from './screens/TaskResultScreen';
import ForkScreen from './screens/ForkScreen';
import RouteCompleteScreen from './screens/RouteCompleteScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  return (
    <HashRouter>
      <GameProvider>
        <div style={{ width: '100%', minHeight: '100vh', background: '#f5f5f5' }}>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/city" element={<CityPickScreen />} />
            <Route path="/quiz" element={<RecommendationQuizScreen />} />
            <Route path="/recommendations" element={<RecommendationsScreen />} />
            <Route path="/routes" element={<RoutesListScreen />} />
            <Route path="/routes/:id" element={<RouteDetailScreen />} />
            <Route path="/routes/:id/nav/:wp" element={<NavigationScreen />} />
            <Route path="/routes/:id/task/:wp" element={<TaskScreen />} />
            <Route path="/routes/:id/result/:wp" element={<TaskResultScreen />} />
            <Route path="/routes/:id/fork/:wp" element={<ForkScreen />} />
            <Route path="/routes/:id/complete" element={<RouteCompleteScreen />} />
            <Route path="/favorites" element={<FavoritesScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </GameProvider>
    </HashRouter>
  );
}
