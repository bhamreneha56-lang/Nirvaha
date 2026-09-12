import React, { useContext } from 'react';
import { SimulationContext, SimulationProvider, useSimulation } from './SimulationContext';

/**
 * AppContext: Backwards-compatible adapter layer over the unified SimulationContext.
 * Guarantees that components importing AppContext or AppProvider seamlessly interact
 * with the single source of truth without split state or dead localhost fetches.
 */

export const AppContext = SimulationContext;

export function dashboardFor(role) {
  if (role === 'citizen') return 'citizen-dashboard';
  if (role === 'university') return 'university-dashboard';
  if (role === 'industry') return 'industry-dashboard';
  if (role === 'government') return 'gov-dashboard';
  return 'landing';
}

export function AppProvider({ children }) {
  const existingSim = useContext(SimulationContext);
  if (!existingSim) {
    return <SimulationProvider>{children}</SimulationProvider>;
  }
  return <>{children}</>;
}

export const useAppContext = useSimulation;

export { SimulationContext, SimulationProvider, useSimulation };
export default AppContext;
