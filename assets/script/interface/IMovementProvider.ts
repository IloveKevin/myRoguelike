import { IDirectionProvider } from "./IDirectionProvider";
import { ISpeedProvider } from "./ISpeedProvider";

export interface IMovementProvider extends ISpeedProvider, IDirectionProvider { }
