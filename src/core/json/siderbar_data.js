import { all_routes } from "../../routes/all_routes";

const route = all_routes;

export const SidebarData = [
  {
    label: "main",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "main",
    submenuItems: [
      {
        label: "dashboard",
        icon: "layout-grid",
        submenu: true,
        showSubRoute: false,

        submenuItems: [
          { label: "super_admin_dashboard", link: "/dashboard" },
          // { label: "admin_dashboard_1", link: "/index" },
          // { label: "admin_dashboard_2", link: "/admin-dashboard" },
          // { label: "admin_dashboard_3", link: "/sales-dashboard" },
        ],
      },
    ],
  },
 
  {
    label: "hrm",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "hrm",
    submenuItems: [
      {
        label: "users",
        link: "/users",
        icon: "shield-up",
        showSubRoute: false,
      },
      {
        label: "roles_permissions",
        link: "/roles-permissions",
        icon: "jump-rope",
        showSubRoute: false,
      },
      {
        label: "vendors",
        link: route.vendors,
        icon: "users-group",
        showSubRoute: false,
        submenu: false,
      },
      
      {
        label: "shifts",
        link: "/shift",
        icon: "arrows-shuffle",
        showSubRoute: false,
      },
     
    ],
  },
  {
    label: "sector_management",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "sector",

    submenuItems: [
      {
        label: "sectors",
        link: route.sectors,
        icon: "box",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "circles",
        link: route.circles,
        icon: "circle",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "asset_type_management",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "assettype",

    submenuItems: [
      {
        label: "asset_type",
        link: route.assettypes,
        icon: "archive",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "sanitation_asset",
        link: route.sanitationasset,
        icon: "trash",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "sanitation_asset_allocation",
        link: route.sanitationassetallocation,
        icon: "clipboard",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "sanitation_asset_tagging",
        link: route.sanitationassettagging,
        icon: "tag",
        showSubRoute: false,
        submenu: false,
      },
  
    ],
  },
  {
    label: "inspection_management",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "question",

    submenuItems: [
      {
        label: "questions",
        link: route.questions,
        icon: "help-circle",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "incidents",
        link: route.incidents,
        icon: "alert-triangle",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "inspections",
        link: route.inspections,
        icon: "search",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "vehicle_management",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "vehicle",

    submenuItems: [
      {
        label: "vehicles",
        link: route.vehicles,
        icon: "truck",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_routes",
        link: route.vehicleroutes,
        icon: "map-pin",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_route_assignments",
        link: route.vehiclerouteassignments,
        icon: "users",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_route_points",
        link: route.vehicleroutepoints,
        icon: "map",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_collection_points",
        link: route.vehiclecollectionpoints,
        icon: "map-pin",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_daily_trip_summaries",
        link: route.vehicledailytripsummaries,
        icon: "file-text",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_gps_tracking",
        link: route.vehiclegpstracking,
        icon: "navigation",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_geofences",
        link: route.vehiclegeofences,
        icon: "globe",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_maintenance_logs",
        link: route.vehiclemaintenancelogs,
        icon: "tool",
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "vehicle_performance_metrics",
        link: route.vehicleperformancemetrics,
        icon: "activity",
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "reports",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Reports",
    submenuItems: [
      {
        label: "sanitation_registration",
        icon: "chart-bar",
        showSubRoute: false,
        submenu: true,
        submenuItems: [
          { label: "gsd_wise_registration", link: "/gsdregistration" },
          { label: "vendor_wise_registration", link: "/vendorregistartion" },
          { label: "sector_wise_registration", link: "/sectorregistration" },
          { label: "circle_wise_registration", link: "/circleregistartion" },
        ],
      },
      {
        label: "sanitation_inspection",
        link: "/purchase-report",
        icon: "report-analytics",
        showSubRoute: false,
      },
      {
        label: "inspection_summary",
        link: "/purchase-report",
        icon: "file-vector",
        showSubRoute: false,
      },
      {
        label: "",
        link: "",
        icon: "chart-pie-2",
        showSubRoute: false,
      },
      // {
      //   label: "Sales Report",
      //   icon: "chart-bar",
      //   showSubRoute: false,
      //   submenu: true,
      //   submenuItems: [
      //     { label: "Sales Report", link: "/sales-report" },
      //     { label: "Best Seller", link: "/best-seller" },
      //   ],
      // },
      // {
      //   label: "Purchase Report",
      //   link: "/purchase-report",
      //   icon: "chart-pie-2",
      //   showSubRoute: false,
      // },
      // {
      //   label: "Inventory Report",
      //   icon: "triangle-inverted",
      //   showSubRoute: false,
      //   submenu: true,
      //   submenuItems: [
      //     { label: "Inventory Report", link: "/inventory-report" },
      //     { label: "Stock History", link: "/stock-history" },
      //     { label: "Sold Stock", link: "/sold-stock" },
      //   ],
      // },
      // {
      //   label: "Invoice Report",
      //   link: route.invoicereportnew,
      //   icon: "businessplan",
      //   showSubRoute: false,
      // },
      // {
      //   label: "Supplier Report",
      //   icon: "user-star",
      //   showSubRoute: false,
      //   submenu: true,
      //   submenuItems: [
      //     { label: "Supplier Report", link: "/supplier-report" },
      //     { label: "Supplier Due Report", link: "/supplier-due-report" },
      //   ],
      // },
      // {
      //   label: "Customer Report",

      //   icon: "report",
      //   showSubRoute: false,
      //   submenu: true,
      //   submenuItems: [
      //     { label: "Customer Report", link: "/customer-report" },
      //     { label: "Customer Due Report", link: "/customer-due-report" },
      //   ],
      // },
      // {
      //   label: "Product Report",
      //   icon: "report-analytics",
      //   showSubRoute: false,
      //   submenu: true,
      //   submenuItems: [
      //     { label: "Product Report", link: "/product-report" },
      //     { label: "Product Expiry Report", link: "/product-expiry-report" },
      //     {
      //       label: "Product Quantity Alert",
      //       link: route.productquantityreport,
      //     },
      //   ],
      // },
      // {
      //   label: "Expense Report",
      //   link: "/expense-report",
      //   icon: "file-vector",
      //   showSubRoute: false,
      // },
      // {
      //   label: "Income Report",
      //   link: "/income-report",
      //   icon: "chart-ppf",
      //   showSubRoute: false,
      // },
      // {
      //   label: "Tax Report",
      //   link: "/tax-report",
      //   icon: "chart-dots-2",
      //   showSubRoute: false,
      // },
      // {
      //   label: "Profit & Loss",
      //   link: "/profit-loss-report",
      //   icon: "chart-donut",
      //   showSubRoute: false,
      // },
      // {
      //   label: "Annual Report",
      //   link: "/annual-report",
      //   icon: "report-search",
      //   showSubRoute: false,
      // },
    ],
  },
];
