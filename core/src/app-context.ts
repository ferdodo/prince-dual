import { createContext } from 'preact';
import type { Context } from 'core';

export const appContext = createContext<Context>(null);