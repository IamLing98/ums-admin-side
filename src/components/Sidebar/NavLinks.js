// sidebar nav links
export default {
   SupAdmincategory1: [
      {
         "menu_title": "Dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "Thống Kê",
               "new_item": false,
               "path": "/dashboard/home",
            },
            {
               "menu_title": "sidebar.settings",
               "new_item": false,
               "path": "/app/dashboard/settings",
            }
         ]
      }
   ],

   SupAdmincategory2: [
      {
         "menu_title": "Sinh Viên",
         "menu_icon": "zmdi zmdi-assignment-account",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "Tuyển Sinh",
               "new_item": false,
               "path": "/studens/admission",
            },
            {
               "menu_title": "Danh Sách",
               "new_item": false,
               "path": "/students/student-list",
            },
            {
               "menu_title": "sidebar.rejected",
               "new_item": false,
               "path": "/app/tasks/rejected",
            },
            {
               "menu_title": "sidebar.completed",
               "new_item": false,
               "path": "/app/tasks/completed",
            },
            {
               "menu_title": "sidebar.inProgress",
               "new_item": false,
               "path": "/app/tasks/in-progress",
            }

         ]
      },
      {
         "menu_title": "Chương Trình Đào Tạo",
         "menu_icon": "zmdi zmdi-label-heart",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "Học Phần",
               "new_item": false,
               "path": "/app/tasks/approved",
            },
            {
               "menu_title": "Danh Sách",
               "new_item": false,
               "path": "/app/tasks/pending",
            },
            {
               "menu_title": "sidebar.rejected",
               "new_item": false,
               "path": "/app/tasks/rejected",
            },
            {
               "menu_title": "sidebar.completed",
               "new_item": false,
               "path": "/app/tasks/completed",
            },
            {
               "menu_title": "sidebar.inProgress",
               "new_item": false,
               "path": "/app/tasks/in-progress",
            }

         ]
      },

   ],
   SupAdmincategory3: [
      {
         "menu_title": "Chương Trình Đào Tạo",
         "new_item": false,
         "menu_icon": "zmdi zmdi-accounts-add",
         "child_routes":[
            {
               "menu_title": "sidebar.createUser",
               "new_item": false,
               "path": "/app/users/user-management/create-user",
            },
            {
               "menu_title": "sidebar.clientList",
               "new_item": false,
               "path": "/app/users/client-list",
            },
            {
               "menu_title": "sidebar.surveyorList",
               "new_item": false,
               "path": "/app/users/surveyor-list",
            }

         ]
      },

   ],
   SupAdmincategory4: [
      {
         "menu_title": "sidebar.formBuilder",
         "menu_icon": "zmdi zmdi-plus-circle",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.createForm",
               "new_item": false,
               "path": "/app/form-builder/create-form",
            }
         ]
      }
   ],
   SupAdmincategory5: [
      {
         "menu_title": "sidebar.invoices",
         "menu_icon": "zmdi zmdi-file-text",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.createInvoices",
               "new_item": false,
               "path": "/app/invoices/create-invoices",
            }
         ]
      }
   ],
   SupAdmincategory6: [
      {
         "menu_title": "sidebar.location",
         "menu_icon": "zmdi zmdi-gps-dot",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.maps",
               "new_item": false,
               "path": "/app/location/map",
            }
         ]
      }
   ]
}
