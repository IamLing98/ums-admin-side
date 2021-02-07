// sidebar nav links
export default {
  SupAdmincategory1: [
    {
      menu_title: "Dashboard",
      menu_icon: "zmdi zmdi-view-dashboard",
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: "Thống Kê",
          new_item: false,
          path: "/dashboard/home",
          isActive: false,
        },
      ],
    },
  ],

  SupAdmincategory2: [
    {
      menu_title: "Đào Tạo",
      menu_icon: "zmdi zmdi-account-box-mail",
      new_item: false,
      type_multi: null,
      base_path: "/education-program",
      child_routes: [  
        {
          menu_icon: "zmdi zmdi-collection-text",
          isActive: false,
          menu_title: "Học phần",
          menu_description: "Đào Tạo/Học Phần",
          new_item: false,
          path: "/app/education/subjects",
        },
        {
          menu_icon: "zmdi zmdi-collection-text",
          isActive: false,
          menu_title: "C.Trình Đào Tạo",
          menu_description: "Đào Tạo/Chương Trình Đào Tạo",
          new_item: false,
          path: "/app/education/education-programs",
        },
        {
          menu_icon: "zmdi zmdi-group",
          isActive: false,
          menu_title: "Lớp Niên Khoá",
          menu_description: "Đào Tạo/Lớp Niên Khoá",
          new_item: false,
          path: "/app/education/yearclasses",
        },
        {
          menu_icon: "zmdi zmdi-accounts",
          isActive: false,
          menu_title: "Hồ Sơ Sinh Viên",
          menu_description: "Đào Tạo/Hồ Sơ Sinh Viên",
          new_item: false,
          path: "/app/education/students",
        },  
        {
          menu_icon: "zmdi zmdi-accounts-list",
          isActive: false,
          menu_title: "Hồ Sơ Giảng Viên",
          menu_description: "Đào Tạo/Hồ Sơ Giảng Viên",
          new_item: false,
          path: "/app/education/teachers",
        }, 
        {
          menu_icon: "zmdi zmdi-graduation-cap",
          isActive: false,
          menu_title: "Học Tập",
          menu_description: "Đào Tạo/Thời Khoá Biểu",
          new_item: false,
          path: "/app/education/schedule",
        }, 
      ],
    },
    {
      menu_title: "Tài Chính",
      menu_icon: "zmdi zmdi-assignment-account",
      new_item: false,
      type_multi: null,
      child_routes: [],
    },
    {
      menu_title: "Cài Đặt",
      menu_icon: "zmdi zmdi-settings",
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_icon: "zmdi zmdi-device-hub",
          isActive: false,
          menu_title: "Tài Khoản",
          menu_description: "Cài Đặt/Tài Khoản",
          new_item: false,
          path: "/app/config/accounts",
        },
        {
          menu_icon: "zmdi zmdi-device-hub",
          isActive: false,
          menu_title: "Ngành",
          menu_description: "Cài Đặt/Ngành",
          new_item: false,
          path: "/app/config/branchs",
        },
        {
          menu_icon: "zmdi zmdi-time",
          isActive: false,
          menu_title: "Thời Gian",
          menu_description: "Cài Đặt/Thời Gian",
          new_item: false,
          path: "/app/config/time",
        },
        {
          menu_icon: "zmdi zmdi-time",
          isActive: false,
          menu_title: "Giảng Đường",
          menu_description: "Cài Đặt/Giảng Đường",
          new_item: false,
          path: "/app/config/rooms",
        },
      ],
    },
    // {
    //   menu_title: "Công Tác Sinh Viên",
    //   menu_icon: "zmdi zmdi-assignment-account",
    //   new_item: false,
    //   type_multi: null,
    //   child_routes: [],
    // },
    // {
    //   menu_title: "Tài Khoản",
    //   menu_icon: "zmdi zmdi-plus-circle",
    //   new_item: false,
    //   type_multi: null,
    //   child_routes: [
    //     {
    //       menu_title: "sidebar.createForm",
    //       new_item: false,
    //       path: "/form-builder/create-form",
    //     },
    //   ],
    // },
  ],
  SupAdmincategory3: [
   //  {
   //    menu_title: "Cơ Sở Vật Chất",
   //    new_item: false,
   //    menu_icon: "zmdi zmdi-accounts-add",
   //    child_routes: [],
   //  },
  ],
  SupAdmincategory4: [
    {
      menu_title: "Tài Khoản",
      menu_icon: "zmdi zmdi-plus-circle",
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_title: "sidebar.createForm",
          new_item: false,
          path: "/form-builder/create-form",
        },
      ],
    },
  ],
};
