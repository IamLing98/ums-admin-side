// sidebar nav links
export default {
   Admincategory1: [
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

   Admincategory2: [
      {
         "menu_title": "sidebar.tasks",
         "menu_icon": "zmdi zmdi-comment-text-alt",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.approved",
               "new_item": false,
               "path": "/app/tasks/approved",
            },
            {
               "menu_title": "sidebar.pending",
               "new_item": false,
               "path": "/app/tasks/pending",
            }
         ]
      },
      {
         "menu_title": "sidebar.assignTasks",
         "new_item": false,
         "menu_icon": "zmdi zmdi-assignment",
         "path": "/app/tasks/assign-task",
         "child_routes": null
      },
      {
         "menu_title": "sidebar.createTasks",
         "new_item": false,
         "menu_icon": "zmdi zmdi-assignment",
         "path": "/app/tasks/create-task",
         "child_routes": null
      },

   ],
   Admincategory3: [
      {
         "menu_title": "sidebar.userManagement",
         "new_item": false,
         "menu_icon": "zmdi zmdi-accounts-add",
         "child_routes":[
            {
               "menu_title": "sidebar.createUser",
               "new_item": false,
               "path": "/app/users/user-management/create-user",
            },
            {
               "menu_title": "sidebar.userList",
               "new_item": false,
               "path": "/app/users/user-list",
            }
         ]
      },

   ],
   Admincategory4: [
      {
         "menu_title": "sidebar.formbuilder",
         "menu_icon": "zmdi zmdi-plus-circle",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.createform",
               "new_item": false,
               "path": "/app/tasks/pending",
            }
         ]
      }
   ]
}
