// assets
import {
  IconDashboard,
  IconDeviceAnalytics,
  IconFileInvoice,
  IconArticle,
  IconLifebuoy,
} from "@tabler/icons-react";

const icons = {
  IconDashboard: IconDashboard,
  IconDeviceAnalytics: IconDeviceAnalytics,
  IconFileInvoice: IconFileInvoice,
  IconArticle: IconArticle,
  IconLifebuoy: IconLifebuoy,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Начало",
  icon: icons.IconDashboard,
  type: "group",
  url: '/sample-page',
};

export default dashboard;
