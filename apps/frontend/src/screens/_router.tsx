import { Navigate, createBrowserRouter } from 'react-router-dom';
import { RouteObject } from 'react-router';

import { RootLayout } from '~/screens/_layout';
import { GameScreen } from '~/screens/game';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      { path: 'game', Component: GameScreen },
      { path: '/', element: <Navigate to="/game" /> },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
