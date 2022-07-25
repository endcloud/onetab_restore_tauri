import {TypedUseSelectorHook, useSelector as useSelectorOri} from "react-redux";
import {StoreType} from "./store";

export const useSelector: TypedUseSelectorHook<StoreType> = useSelectorOri