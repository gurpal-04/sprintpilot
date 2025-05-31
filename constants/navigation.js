export const navigationItems = [
  {
    href: "/epics",
    icon: "mdi:company",
    label: "Epics",
  },
  {
    href: "/tasks",
    icon: "garden:customize-26",
    label: "Tasks",
  },
  {
    href: "/users",
    icon: "carbon:email",
    label: "Users",
  },
  {
    href: "/stories",
    icon: "octicon:goal-24",
    label: "Stories",
  },
  {
    href: null, // No direct link for parent menu
    icon: "carbon:ibm-knowledge-catalog",
    label: "IQ Sync",
    submenu: [
      {
        href: "/knowledge-base",
        icon: "carbon:document",
        label: "Knowledge Base",
      },
      {
        href: "/sitemap",
        icon: "mdi:sitemap",
        label: "Sitemap",
      },
    ],
  },
];
