import { configureStore } from '@reduxjs/toolkit';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';
import { Provider } from 'react-redux';

import type { RootState } from '../config/store.ts';
import tablesReducer from '../modules/tables/tables.reducer';

function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      tables: tablesReducer,
    },
    preloadedState: preloadedState as RootState,
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof createTestStore>;
}

function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';

export { renderWithProviders as render };
