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
      menu_icon: "zmdi zmdi-graduation-cap",
      new_item: false,
      type_multi: null,
      base_path: "/education-program",
      child_routes: [
        {
          menu_icon: "zmdi zmdi-collection-text",
          isActive: false,
          menu_title: "Học phần",
          menu_description: "Đào tạo/Học phần",
          new_item: false,
          path: "/app/education/subjects",
        },
        {
          menu_icon: "zmdi zmdi-collection-text",
          isActive: false,
          menu_title: "C.Trình Đào Tạo",
          menu_description: "Đào tạo/Chương trình đào tạo",
          new_item: false,
          path: "/app/education/education-programs",
        },
        {
          menu_icon: "zmdi zmdi-group",
          isActive: false,
          menu_title: "Lớp Niên Khoá",
          menu_description: "Đào tạo/Lớp niên khoá",
          new_item: false,
          path: "/app/education/yearclasses",
        },
        {
          menu_icon: "zmdi zmdi-accounts",
          isActive: false,
          menu_title: "Hồ Sơ Sinh Viên",
          menu_description: "Đào tạo/Hồ sơ sinh viên",
          new_item: false,
          path: "/app/education/students",
        },
        {
          menu_icon: "zmdi zmdi-accounts-list",
          isActive: false,
          menu_title: "Hồ Sơ Giảng Viên",
          menu_description: "Đào tạo/Hồ sơ giảng viên",
          new_item: false,
          path: "/app/education/teachers",
        },
        {
          menu_icon: "zmdi zmdi-graduation-cap",
          isActive: false,
          menu_title: "Học Tập",
          menu_description: "Đào tạo/Học tập",
          new_item: false,
          path: "/app/education/schedule",
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
    {
      menu_title: "Hành Chính",
      menu_icon: "zmdi zmdi-receipt",
      new_item: false,
      type_multi: null,
      child_routes: [
        {
          menu_icon: "zmdi zmdi-group",
          menu_title: "Thu chi sinh viên",
          new_item: false,
          path: "/app/finance/tuitionfee",
          isActive: false,
          menu_description: "Tài chính/Thu chi sinh viên",
        },
        {
          menu_icon: "zmdi zmdi-group",
          menu_title: "Hồ sơ nhân sự",
          new_item: false,
          path: "/dashboard/home",
          isActive: false,
        },
        {
          menu_icon: "zmdi zmdi-group",
          menu_title: "Danh mục thu chi",
          new_item: false,
          path: "/app/finance/feecategories",
          menu_description: "Tài chính/Danh mục thu chi",
          isActive: false,
        },
      ],
    },
  ],
  SupAdmincategory4: [
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
  ],
};
