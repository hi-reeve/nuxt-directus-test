-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `directus_migrations` (
	`version` numeric PRIMARY KEY NOT NULL,
	`name` numeric NOT NULL,
	`timestamp` numeric DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `directus_folders` (
	`id` numeric PRIMARY KEY NOT NULL,
	`name` numeric NOT NULL,
	`parent` numeric,
	FOREIGN KEY (`parent`) REFERENCES `directus_folders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directus_relations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`many_collection` numeric NOT NULL,
	`many_field` numeric NOT NULL,
	`one_collection` numeric,
	`one_field` numeric,
	`one_collection_field` numeric,
	`one_allowed_collections` text,
	`junction_field` numeric,
	`sort_field` numeric,
	`one_deselect_action` numeric DEFAULT 'nullify' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `directus_dashboards` (
	`id` numeric PRIMARY KEY NOT NULL,
	`name` numeric NOT NULL,
	`icon` numeric DEFAULT 'dashboard' NOT NULL,
	`note` text,
	`date_created` numeric DEFAULT (CURRENT_TIMESTAMP),
	`user_created` numeric,
	`color` numeric,
	FOREIGN KEY (`user_created`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `directus_files` (
	`id` numeric PRIMARY KEY NOT NULL,
	`storage` numeric NOT NULL,
	`filename_disk` numeric,
	`filename_download` numeric NOT NULL,
	`title` numeric,
	`type` numeric,
	`folder` numeric,
	`uploaded_by` numeric,
	`uploaded_on` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`modified_by` numeric,
	`modified_on` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`charset` numeric,
	`filesize` integer DEFAULT (null),
	`width` integer,
	`height` integer,
	`duration` integer,
	`embed` numeric,
	`description` text,
	`location` text,
	`tags` text,
	`metadata` numeric,
	FOREIGN KEY (`folder`) REFERENCES `directus_folders`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`modified_by`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`uploaded_by`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directus_permissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`role` numeric,
	`collection` numeric NOT NULL,
	`action` numeric NOT NULL,
	`permissions` numeric,
	`validation` numeric,
	`presets` numeric,
	`fields` text,
	FOREIGN KEY (`role`) REFERENCES `directus_roles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `directus_webhooks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` numeric NOT NULL,
	`method` numeric DEFAULT 'POST' NOT NULL,
	`url` numeric NOT NULL,
	`status` numeric DEFAULT 'active' NOT NULL,
	`data` numeric DEFAULT '1' NOT NULL,
	`actions` numeric NOT NULL,
	`collections` numeric NOT NULL,
	`headers` numeric
);
--> statement-breakpoint
CREATE TABLE `directus_collections` (
	`collection` numeric PRIMARY KEY NOT NULL,
	`icon` numeric,
	`note` text,
	`display_template` numeric,
	`hidden` numeric DEFAULT '0' NOT NULL,
	`singleton` numeric DEFAULT '0' NOT NULL,
	`translations` numeric,
	`archive_field` numeric,
	`archive_app_filter` numeric DEFAULT '1' NOT NULL,
	`archive_value` numeric,
	`unarchive_value` numeric,
	`sort_field` numeric,
	`accountability` numeric DEFAULT 'all',
	`color` numeric,
	`item_duplication_fields` numeric,
	`sort` integer,
	`group` numeric,
	`collapse` numeric DEFAULT 'open' NOT NULL,
	`preview_url` numeric,
	`versioning` numeric DEFAULT '0' NOT NULL,
	FOREIGN KEY (`group`) REFERENCES `directus_collections`(`collection`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directus_fields` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`collection` numeric NOT NULL,
	`field` numeric NOT NULL,
	`special` numeric,
	`interface` numeric,
	`options` numeric,
	`display` numeric,
	`display_options` numeric,
	`readonly` numeric DEFAULT '0' NOT NULL,
	`hidden` numeric DEFAULT '0' NOT NULL,
	`sort` integer,
	`width` numeric DEFAULT 'full',
	`translations` numeric,
	`note` text,
	`conditions` numeric,
	`required` numeric DEFAULT '0',
	`group` numeric,
	`validation` numeric,
	`validation_message` text
);
--> statement-breakpoint
CREATE TABLE `directus_roles` (
	`id` numeric PRIMARY KEY NOT NULL,
	`name` numeric NOT NULL,
	`icon` numeric DEFAULT 'supervised_user_circle' NOT NULL,
	`description` text,
	`ip_access` text,
	`enforce_tfa` numeric DEFAULT '0' NOT NULL,
	`admin_access` numeric DEFAULT '0' NOT NULL,
	`app_access` numeric DEFAULT '1' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `directus_sessions` (
	`token` numeric PRIMARY KEY NOT NULL,
	`user` numeric,
	`expires` numeric NOT NULL,
	`ip` numeric,
	`user_agent` numeric,
	`share` numeric,
	`origin` numeric,
	FOREIGN KEY (`share`) REFERENCES `directus_shares`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `directus_panels` (
	`id` numeric PRIMARY KEY NOT NULL,
	`dashboard` numeric NOT NULL,
	`name` numeric,
	`icon` numeric DEFAULT (null),
	`color` numeric,
	`show_header` numeric DEFAULT '0' NOT NULL,
	`note` text,
	`type` numeric NOT NULL,
	`position_x` integer NOT NULL,
	`position_y` integer NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	`options` numeric,
	`date_created` numeric DEFAULT (CURRENT_TIMESTAMP),
	`user_created` numeric,
	FOREIGN KEY (`user_created`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`dashboard`) REFERENCES `directus_dashboards`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `directus_flows` (
	`id` numeric PRIMARY KEY NOT NULL,
	`name` numeric NOT NULL,
	`icon` numeric,
	`color` numeric,
	`description` text,
	`status` numeric DEFAULT 'active' NOT NULL,
	`trigger` numeric,
	`accountability` numeric DEFAULT 'all',
	`options` numeric,
	`operation` numeric,
	`date_created` numeric DEFAULT (CURRENT_TIMESTAMP),
	`user_created` numeric,
	FOREIGN KEY (`user_created`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `directus_operations` (
	`id` numeric PRIMARY KEY NOT NULL,
	`name` numeric,
	`key` numeric NOT NULL,
	`type` numeric NOT NULL,
	`position_x` integer NOT NULL,
	`position_y` integer NOT NULL,
	`options` numeric,
	`resolve` numeric,
	`reject` numeric,
	`flow` numeric NOT NULL,
	`date_created` numeric DEFAULT (CURRENT_TIMESTAMP),
	`user_created` numeric,
	FOREIGN KEY (`user_created`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`flow`) REFERENCES `directus_flows`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reject`) REFERENCES `directus_operations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`resolve`) REFERENCES `directus_operations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directus_activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`action` numeric NOT NULL,
	`user` numeric,
	`timestamp` numeric DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`ip` numeric,
	`user_agent` numeric,
	`collection` numeric NOT NULL,
	`item` numeric NOT NULL,
	`comment` text,
	`origin` numeric
);
--> statement-breakpoint
CREATE TABLE `directus_notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` numeric DEFAULT (CURRENT_TIMESTAMP),
	`status` numeric DEFAULT 'inbox',
	`recipient` numeric NOT NULL,
	`sender` numeric,
	`subject` numeric NOT NULL,
	`message` text,
	`collection` numeric,
	`item` numeric,
	FOREIGN KEY (`sender`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipient`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `directus_presets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bookmark` numeric,
	`user` numeric,
	`role` numeric,
	`collection` numeric,
	`search` numeric,
	`layout` numeric DEFAULT 'tabular',
	`layout_query` numeric,
	`layout_options` numeric,
	`refresh_interval` integer,
	`filter` numeric,
	`icon` numeric DEFAULT 'bookmark',
	`color` numeric,
	FOREIGN KEY (`role`) REFERENCES `directus_roles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `directus_translations` (
	`id` numeric PRIMARY KEY NOT NULL,
	`language` numeric NOT NULL,
	`key` numeric NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `directus_shares` (
	`id` numeric PRIMARY KEY NOT NULL,
	`name` numeric,
	`collection` numeric NOT NULL,
	`item` numeric NOT NULL,
	`role` numeric,
	`password` numeric,
	`user_created` numeric,
	`date_created` numeric DEFAULT (CURRENT_TIMESTAMP),
	`date_start` numeric DEFAULT (null),
	`date_end` numeric DEFAULT (null),
	`times_used` integer DEFAULT '0',
	`max_uses` integer,
	FOREIGN KEY (`user_created`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`role`) REFERENCES `directus_roles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`collection`) REFERENCES `directus_collections`(`collection`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `directus_versions` (
	`id` numeric PRIMARY KEY NOT NULL,
	`key` numeric NOT NULL,
	`name` numeric,
	`collection` numeric NOT NULL,
	`item` numeric NOT NULL,
	`hash` numeric,
	`date_created` numeric DEFAULT (CURRENT_TIMESTAMP),
	`date_updated` numeric DEFAULT (CURRENT_TIMESTAMP),
	`user_created` numeric,
	`user_updated` numeric,
	FOREIGN KEY (`user_updated`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_created`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`collection`) REFERENCES `directus_collections`(`collection`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `directus_revisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`activity` integer NOT NULL,
	`collection` numeric NOT NULL,
	`item` numeric NOT NULL,
	`data` numeric,
	`delta` numeric,
	`parent` integer,
	`version` numeric,
	FOREIGN KEY (`version`) REFERENCES `directus_versions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`activity`) REFERENCES `directus_activity`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parent`) REFERENCES `directus_revisions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directus_users` (
	`id` numeric PRIMARY KEY NOT NULL,
	`first_name` numeric,
	`last_name` numeric,
	`email` numeric,
	`password` numeric,
	`location` numeric,
	`title` numeric,
	`description` text,
	`tags` numeric,
	`avatar` numeric,
	`language` numeric DEFAULT (null),
	`tfa_secret` numeric,
	`status` numeric DEFAULT 'active' NOT NULL,
	`role` numeric,
	`token` numeric,
	`last_access` numeric,
	`last_page` numeric,
	`provider` numeric DEFAULT 'default' NOT NULL,
	`external_identifier` numeric,
	`auth_data` numeric,
	`email_notifications` numeric DEFAULT '1',
	`appearance` numeric,
	`theme_dark` numeric,
	`theme_light` numeric,
	`theme_light_overrides` numeric,
	`theme_dark_overrides` numeric,
	FOREIGN KEY (`role`) REFERENCES `directus_roles`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `directus_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_name` numeric DEFAULT 'Directus' NOT NULL,
	`project_url` numeric,
	`project_color` numeric DEFAULT '#6644FF' NOT NULL,
	`project_logo` numeric,
	`public_foreground` numeric,
	`public_background` numeric,
	`public_note` text,
	`auth_login_attempts` integer DEFAULT '25',
	`auth_password_policy` numeric,
	`storage_asset_transform` numeric DEFAULT 'all',
	`storage_asset_presets` numeric,
	`custom_css` text,
	`storage_default_folder` numeric,
	`basemaps` numeric,
	`mapbox_key` numeric,
	`module_bar` numeric,
	`project_descriptor` numeric,
	`default_language` numeric DEFAULT 'en-US' NOT NULL,
	`custom_aspect_ratios` numeric,
	`public_favicon` numeric,
	`default_appearance` numeric DEFAULT 'auto' NOT NULL,
	`default_theme_light` numeric,
	`theme_light_overrides` numeric,
	`default_theme_dark` numeric,
	`theme_dark_overrides` numeric,
	FOREIGN KEY (`public_favicon`) REFERENCES `directus_files`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`storage_default_folder`) REFERENCES `directus_folders`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`public_background`) REFERENCES `directus_files`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`public_foreground`) REFERENCES `directus_files`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`project_logo`) REFERENCES `directus_files`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directus_extensions` (
	`name` numeric PRIMARY KEY NOT NULL,
	`enabled` numeric DEFAULT '1' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`code` numeric PRIMARY KEY NOT NULL,
	`name` numeric,
	`direction` numeric DEFAULT 'ltr'
);
--> statement-breakpoint
CREATE TABLE `blog_category` (
	`id` numeric PRIMARY KEY NOT NULL,
	`date_created` numeric,
	`slug` numeric
);
--> statement-breakpoint
CREATE TABLE `blog_category_translations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blog_category_id` numeric,
	`languages_code` numeric,
	`name` numeric,
	FOREIGN KEY (`blog_category_id`) REFERENCES `blog_category`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`languages_code`) REFERENCES `languages`(`code`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `blog_translations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blog_id` numeric,
	`languages_code` numeric,
	`title` numeric,
	`content` text,
	FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`languages_code`) REFERENCES `languages`(`code`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `blog` (
	`id` numeric PRIMARY KEY NOT NULL,
	`status` numeric DEFAULT 'draft' NOT NULL,
	`user_created` numeric,
	`date_created` numeric,
	`user_updated` numeric,
	`date_updated` numeric,
	`slug` numeric NOT NULL,
	`cover` numeric NOT NULL,
	FOREIGN KEY (`cover`) REFERENCES `directus_files`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_updated`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_created`) REFERENCES `directus_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `blog_blog_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blog_id` numeric,
	`blog_category_id` numeric,
	FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`blog_category_id`) REFERENCES `blog_category`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `directus_flows_operation_unique` ON `directus_flows` (`operation`);--> statement-breakpoint
CREATE UNIQUE INDEX `directus_operations_reject_unique` ON `directus_operations` (`reject`);--> statement-breakpoint
CREATE UNIQUE INDEX `directus_operations_resolve_unique` ON `directus_operations` (`resolve`);--> statement-breakpoint
CREATE UNIQUE INDEX `directus_users_token_unique` ON `directus_users` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `directus_users_email_unique` ON `directus_users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `directus_users_external_identifier_unique` ON `directus_users` (`external_identifier`);--> statement-breakpoint
CREATE UNIQUE INDEX `blog_slug_unique` ON `blog` (`slug`);
*/