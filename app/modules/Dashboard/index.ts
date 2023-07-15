import { meta } from "./_meta";
import { View } from "./_view";

import { actionController, loaderController } from "./_controllers";

export const DashboardClient = { meta, View };
export const DashboardServer = { actionController, loaderController };
