import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<AppDispatch> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;
