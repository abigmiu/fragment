SET FOREIGN_KEY_CHECKS = 0;

truncate table auth;
insert into auth (`name`, `summary`)
values ('admin 登录权限', 'admin 登录权限');

truncate table role;
insert into role (`name`, `summary`)
values ('admin', 'admin Role');

truncate table auth_roles_role;
insert into auth_roles_role (`authId`, `roleId`)
values (1, 1);