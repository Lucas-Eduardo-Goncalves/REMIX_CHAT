import { meta } from "./_meta";
import { View } from "./_view";

import { actionController, loaderController } from "./_controllers";

export const ChatClient = { meta, View };
export const ChatServer = { actionController, loaderController };
