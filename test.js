const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "Dashboard",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "CREATE-ADMIN",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CREATE-FACULTY",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "CREATE-ADMIN",
      },
    ],
  },
];

const newArray = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
    console.log(item);
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }

  return acc;
}, []);

// console.log(newArray);

const adminRoutes = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }

  return acc;
}, []);

// console.log(adminRoutes);

// const adminRoutes = adminPaths.reduce((acc, item) => {
//   if (item.path && item.name) {
//     acc.push({
//       key: item.name,
//       label: "NAVLINK",
//     });
//   }

//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: "NAVLINK",
//       })),
//     });
//   }

//   return acc;
// }, []);

// console.log(JSON.stringify(adminRoutes));
