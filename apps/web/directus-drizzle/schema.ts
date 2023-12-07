import { pgTable, serial, varchar, uuid, timestamp, text, boolean, json, integer, foreignKey, bigint, unique } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const directusActivity = pgTable("directus_activity", {
	id: serial("id").primaryKey().notNull(),
	action: varchar("action", { length: 45 }).notNull(),
	user: uuid("user"),
	timestamp: timestamp("timestamp", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	ip: varchar("ip", { length: 50 }),
	userAgent: varchar("user_agent", { length: 255 }),
	collection: varchar("collection", { length: 64 }).notNull(),
	item: varchar("item", { length: 255 }).notNull(),
	comment: text("comment"),
	origin: varchar("origin", { length: 255 }),
});

export const directusRoles = pgTable("directus_roles", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	icon: varchar("icon", { length: 30 }).notNull(),
	description: text("description"),
	ipAccess: text("ip_access"),
	enforceTfa: boolean("enforce_tfa").notNull(),
	adminAccess: boolean("admin_access").notNull(),
	appAccess: boolean("app_access").notNull(),
});

export const directusFields = pgTable("directus_fields", {
	id: serial("id").primaryKey().notNull(),
	collection: varchar("collection", { length: 64 }).notNull(),
	field: varchar("field", { length: 64 }).notNull(),
	special: varchar("special", { length: 64 }),
	interface: varchar("interface", { length: 64 }),
	options: json("options"),
	display: varchar("display", { length: 64 }),
	displayOptions: json("display_options"),
	readonly: boolean("readonly").notNull(),
	hidden: boolean("hidden").notNull(),
	sort: integer("sort"),
	width: varchar("width", { length: 30 }),
	translations: json("translations"),
	note: text("note"),
	conditions: json("conditions"),
	required: boolean("required"),
	group: varchar("group", { length: 64 }),
	validation: json("validation"),
	validationMessage: text("validation_message"),
});

export const directusFiles = pgTable("directus_files", {
	id: uuid("id").primaryKey().notNull(),
	storage: varchar("storage", { length: 255 }).notNull(),
	filenameDisk: varchar("filename_disk", { length: 255 }),
	filenameDownload: varchar("filename_download", { length: 255 }).notNull(),
	title: varchar("title", { length: 255 }),
	type: varchar("type", { length: 255 }),
	folder: uuid("folder").references(() => directusFolders.id, { onDelete: "set null" } ),
	uploadedBy: uuid("uploaded_by").references(() => directusUsers.id),
	uploadedOn: timestamp("uploaded_on", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	modifiedBy: uuid("modified_by").references(() => directusUsers.id),
	modifiedOn: timestamp("modified_on", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	charset: varchar("charset", { length: 50 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	filesize: bigint("filesize", { mode: "number" }),
	width: integer("width"),
	height: integer("height"),
	duration: integer("duration"),
	embed: varchar("embed", { length: 200 }),
	description: text("description"),
	location: text("location"),
	tags: text("tags"),
	metadata: json("metadata"),
});

export const directusCollections = pgTable("directus_collections", {
	collection: varchar("collection", { length: 64 }).primaryKey().notNull(),
	icon: varchar("icon", { length: 30 }),
	note: text("note"),
	displayTemplate: varchar("display_template", { length: 255 }),
	hidden: boolean("hidden").notNull(),
	singleton: boolean("singleton").notNull(),
	translations: json("translations"),
	archiveField: varchar("archive_field", { length: 64 }),
	archiveAppFilter: boolean("archive_app_filter").notNull(),
	archiveValue: varchar("archive_value", { length: 255 }),
	unarchiveValue: varchar("unarchive_value", { length: 255 }),
	sortField: varchar("sort_field", { length: 64 }),
	accountability: varchar("accountability", { length: 255 }),
	color: varchar("color", { length: 255 }),
	itemDuplicationFields: json("item_duplication_fields"),
	sort: integer("sort"),
	group: varchar("group", { length: 64 }),
	collapse: varchar("collapse", { length: 255 }).notNull(),
	previewUrl: varchar("preview_url", { length: 255 }),
	versioning: boolean("versioning").notNull(),
},
(table) => {
	return {
		directusCollectionsGroupForeign: foreignKey({
			columns: [table.group],
			foreignColumns: [table.collection],
			name: "directus_collections_group_foreign"
		}),
	}
});

export const directusFolders = pgTable("directus_folders", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	parent: uuid("parent"),
},
(table) => {
	return {
		directusFoldersParentForeign: foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "directus_folders_parent_foreign"
		}),
	}
});

export const directusPermissions = pgTable("directus_permissions", {
	id: serial("id").primaryKey().notNull(),
	role: uuid("role").references(() => directusRoles.id, { onDelete: "cascade" } ),
	collection: varchar("collection", { length: 64 }).notNull(),
	action: varchar("action", { length: 10 }).notNull(),
	permissions: json("permissions"),
	validation: json("validation"),
	presets: json("presets"),
	fields: text("fields"),
});

export const directusPresets = pgTable("directus_presets", {
	id: serial("id").primaryKey().notNull(),
	bookmark: varchar("bookmark", { length: 255 }),
	user: uuid("user").references(() => directusUsers.id, { onDelete: "cascade" } ),
	role: uuid("role").references(() => directusRoles.id, { onDelete: "cascade" } ),
	collection: varchar("collection", { length: 64 }),
	search: varchar("search", { length: 100 }),
	layout: varchar("layout", { length: 100 }),
	layoutQuery: json("layout_query"),
	layoutOptions: json("layout_options"),
	refreshInterval: integer("refresh_interval"),
	filter: json("filter"),
	icon: varchar("icon", { length: 30 }),
	color: varchar("color", { length: 255 }),
});

export const directusUsers = pgTable("directus_users", {
	id: uuid("id").primaryKey().notNull(),
	firstName: varchar("first_name", { length: 50 }),
	lastName: varchar("last_name", { length: 50 }),
	email: varchar("email", { length: 128 }),
	password: varchar("password", { length: 255 }),
	location: varchar("location", { length: 255 }),
	title: varchar("title", { length: 50 }),
	description: text("description"),
	tags: json("tags"),
	avatar: uuid("avatar"),
	language: varchar("language", { length: 255 }),
	tfaSecret: varchar("tfa_secret", { length: 255 }),
	status: varchar("status", { length: 16 }).notNull(),
	role: uuid("role").references(() => directusRoles.id, { onDelete: "set null" } ),
	token: varchar("token", { length: 255 }),
	lastAccess: timestamp("last_access", { withTimezone: true, mode: 'string' }),
	lastPage: varchar("last_page", { length: 255 }),
	provider: varchar("provider", { length: 128 }).notNull(),
	externalIdentifier: varchar("external_identifier", { length: 255 }),
	authData: json("auth_data"),
	emailNotifications: boolean("email_notifications"),
	appearance: varchar("appearance", { length: 255 }),
	themeDark: varchar("theme_dark", { length: 255 }),
	themeLight: varchar("theme_light", { length: 255 }),
	themeLightOverrides: json("theme_light_overrides"),
	themeDarkOverrides: json("theme_dark_overrides"),
},
(table) => {
	return {
		directusUsersEmailUnique: unique("directus_users_email_unique").on(table.email),
		directusUsersTokenUnique: unique("directus_users_token_unique").on(table.token),
		directusUsersExternalIdentifierUnique: unique("directus_users_external_identifier_unique").on(table.externalIdentifier),
	}
});

export const directusRevisions = pgTable("directus_revisions", {
	id: serial("id").primaryKey().notNull(),
	activity: integer("activity").notNull().references(() => directusActivity.id, { onDelete: "cascade" } ),
	collection: varchar("collection", { length: 64 }).notNull(),
	item: varchar("item", { length: 255 }).notNull(),
	data: json("data"),
	delta: json("delta"),
	parent: integer("parent"),
	version: uuid("version").references(() => directusVersions.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		directusRevisionsParentForeign: foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "directus_revisions_parent_foreign"
		}),
	}
});

export const directusSessions = pgTable("directus_sessions", {
	token: varchar("token", { length: 64 }).primaryKey().notNull(),
	user: uuid("user").references(() => directusUsers.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { withTimezone: true, mode: 'string' }).notNull(),
	ip: varchar("ip", { length: 255 }),
	userAgent: varchar("user_agent", { length: 255 }),
	share: uuid("share").references(() => directusShares.id, { onDelete: "cascade" } ),
	origin: varchar("origin", { length: 255 }),
});

export const directusMigrations = pgTable("directus_migrations", {
	version: varchar("version", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	timestamp: timestamp("timestamp", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const directusRelations = pgTable("directus_relations", {
	id: serial("id").primaryKey().notNull(),
	manyCollection: varchar("many_collection", { length: 64 }).notNull(),
	manyField: varchar("many_field", { length: 64 }).notNull(),
	oneCollection: varchar("one_collection", { length: 64 }),
	oneField: varchar("one_field", { length: 64 }),
	oneCollectionField: varchar("one_collection_field", { length: 64 }),
	oneAllowedCollections: text("one_allowed_collections"),
	junctionField: varchar("junction_field", { length: 64 }),
	sortField: varchar("sort_field", { length: 64 }),
	oneDeselectAction: varchar("one_deselect_action", { length: 255 }).notNull(),
});

export const directusWebhooks = pgTable("directus_webhooks", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	method: varchar("method", { length: 10 }).notNull(),
	url: varchar("url", { length: 255 }).notNull(),
	status: varchar("status", { length: 10 }).notNull(),
	data: boolean("data").notNull(),
	actions: varchar("actions", { length: 100 }).notNull(),
	collections: varchar("collections", { length: 255 }).notNull(),
	headers: json("headers"),
});

export const directusSettings = pgTable("directus_settings", {
	id: serial("id").primaryKey().notNull(),
	projectName: varchar("project_name", { length: 100 }).notNull(),
	projectUrl: varchar("project_url", { length: 255 }),
	projectColor: varchar("project_color", { length: 255 }).notNull(),
	projectLogo: uuid("project_logo").references(() => directusFiles.id),
	publicForeground: uuid("public_foreground").references(() => directusFiles.id),
	publicBackground: uuid("public_background").references(() => directusFiles.id),
	publicNote: text("public_note"),
	authLoginAttempts: integer("auth_login_attempts"),
	authPasswordPolicy: varchar("auth_password_policy", { length: 100 }),
	storageAssetTransform: varchar("storage_asset_transform", { length: 7 }),
	storageAssetPresets: json("storage_asset_presets"),
	customCss: text("custom_css"),
	storageDefaultFolder: uuid("storage_default_folder").references(() => directusFolders.id, { onDelete: "set null" } ),
	basemaps: json("basemaps"),
	mapboxKey: varchar("mapbox_key", { length: 255 }),
	moduleBar: json("module_bar"),
	projectDescriptor: varchar("project_descriptor", { length: 100 }),
	defaultLanguage: varchar("default_language", { length: 255 }).notNull(),
	customAspectRatios: json("custom_aspect_ratios"),
	publicFavicon: uuid("public_favicon").references(() => directusFiles.id),
	defaultAppearance: varchar("default_appearance", { length: 255 }).notNull(),
	defaultThemeLight: varchar("default_theme_light", { length: 255 }),
	themeLightOverrides: json("theme_light_overrides"),
	defaultThemeDark: varchar("default_theme_dark", { length: 255 }),
	themeDarkOverrides: json("theme_dark_overrides"),
});

export const directusNotifications = pgTable("directus_notifications", {
	id: serial("id").primaryKey().notNull(),
	timestamp: timestamp("timestamp", { withTimezone: true, mode: 'string' }).defaultNow(),
	status: varchar("status", { length: 255 }),
	recipient: uuid("recipient").notNull().references(() => directusUsers.id, { onDelete: "cascade" } ),
	sender: uuid("sender").references(() => directusUsers.id),
	subject: varchar("subject", { length: 255 }).notNull(),
	message: text("message"),
	collection: varchar("collection", { length: 64 }),
	item: varchar("item", { length: 255 }),
});

export const directusPanels = pgTable("directus_panels", {
	id: uuid("id").primaryKey().notNull(),
	dashboard: uuid("dashboard").notNull().references(() => directusDashboards.id, { onDelete: "cascade" } ),
	name: varchar("name", { length: 255 }),
	icon: varchar("icon", { length: 30 }),
	color: varchar("color", { length: 10 }),
	showHeader: boolean("show_header").notNull(),
	note: text("note"),
	type: varchar("type", { length: 255 }).notNull(),
	positionX: integer("position_x").notNull(),
	positionY: integer("position_y").notNull(),
	width: integer("width").notNull(),
	height: integer("height").notNull(),
	options: json("options"),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).defaultNow(),
	userCreated: uuid("user_created").references(() => directusUsers.id, { onDelete: "set null" } ),
});

export const directusShares = pgTable("directus_shares", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	collection: varchar("collection", { length: 64 }).notNull().references(() => directusCollections.collection, { onDelete: "cascade" } ),
	item: varchar("item", { length: 255 }).notNull(),
	role: uuid("role").references(() => directusRoles.id, { onDelete: "cascade" } ),
	password: varchar("password", { length: 255 }),
	userCreated: uuid("user_created").references(() => directusUsers.id, { onDelete: "set null" } ),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).defaultNow(),
	dateStart: timestamp("date_start", { withTimezone: true, mode: 'string' }),
	dateEnd: timestamp("date_end", { withTimezone: true, mode: 'string' }),
	timesUsed: integer("times_used"),
	maxUses: integer("max_uses"),
});

export const directusFlows = pgTable("directus_flows", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	icon: varchar("icon", { length: 30 }),
	color: varchar("color", { length: 255 }),
	description: text("description"),
	status: varchar("status", { length: 255 }).notNull(),
	trigger: varchar("trigger", { length: 255 }),
	accountability: varchar("accountability", { length: 255 }),
	options: json("options"),
	operation: uuid("operation"),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).defaultNow(),
	userCreated: uuid("user_created").references(() => directusUsers.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		directusFlowsOperationUnique: unique("directus_flows_operation_unique").on(table.operation),
	}
});

export const directusOperations = pgTable("directus_operations", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	key: varchar("key", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	positionX: integer("position_x").notNull(),
	positionY: integer("position_y").notNull(),
	options: json("options"),
	resolve: uuid("resolve"),
	reject: uuid("reject"),
	flow: uuid("flow").notNull().references(() => directusFlows.id, { onDelete: "cascade" } ),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).defaultNow(),
	userCreated: uuid("user_created").references(() => directusUsers.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		directusOperationsResolveForeign: foreignKey({
			columns: [table.resolve],
			foreignColumns: [table.id],
			name: "directus_operations_resolve_foreign"
		}),
		directusOperationsRejectForeign: foreignKey({
			columns: [table.reject],
			foreignColumns: [table.id],
			name: "directus_operations_reject_foreign"
		}),
		directusOperationsResolveUnique: unique("directus_operations_resolve_unique").on(table.resolve),
		directusOperationsRejectUnique: unique("directus_operations_reject_unique").on(table.reject),
	}
});

export const directusDashboards = pgTable("directus_dashboards", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	icon: varchar("icon", { length: 30 }).notNull(),
	note: text("note"),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).defaultNow(),
	userCreated: uuid("user_created").references(() => directusUsers.id, { onDelete: "set null" } ),
	color: varchar("color", { length: 255 }),
});

export const directusTranslations = pgTable("directus_translations", {
	id: uuid("id").primaryKey().notNull(),
	language: varchar("language", { length: 255 }).notNull(),
	key: varchar("key", { length: 255 }).notNull(),
	value: text("value").notNull(),
});

export const directusExtensions = pgTable("directus_extensions", {
	name: varchar("name", { length: 255 }).primaryKey().notNull(),
	enabled: boolean("enabled").notNull(),
});

export const directusVersions = pgTable("directus_versions", {
	id: uuid("id").primaryKey().notNull(),
	key: varchar("key", { length: 64 }).notNull(),
	name: varchar("name", { length: 255 }),
	collection: varchar("collection", { length: 64 }).notNull().references(() => directusCollections.collection, { onDelete: "cascade" } ),
	item: varchar("item", { length: 255 }).notNull(),
	hash: varchar("hash", { length: 255 }),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).defaultNow(),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }).defaultNow(),
	userCreated: uuid("user_created").references(() => directusUsers.id, { onDelete: "set null" } ),
	userUpdated: uuid("user_updated").references(() => directusUsers.id),
});

export const languages = pgTable("languages", {
	code: varchar("code", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	direction: varchar("direction", { length: 255 }),
});

export const blogCategory = pgTable("blog_category", {
	id: uuid("id").primaryKey().notNull(),
	userCreated: uuid("user_created").references(() => directusUsers.id),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }),
	slug: varchar("slug", { length: 255 }).notNull(),
},
(table) => {
	return {
		blogCategorySlugUnique: unique("blog_category_slug_unique").on(table.slug),
	}
});

export const blogCategoryTranslations = pgTable("blog_category_translations", {
	id: serial("id").primaryKey().notNull(),
	blogCategoryId: uuid("blog_category_id").references(() => blogCategory.id, { onDelete: "set null" } ),
	languagesId: varchar("languages_id", { length: 255 }).references(() => languages.code, { onDelete: "set null" } ),
	name: varchar("name", { length: 255 }),
});

export const blog = pgTable("blog", {
	id: uuid("id").primaryKey().notNull(),
	status: varchar("status", { length: 255 }).notNull(),
	userCreated: uuid("user_created").references(() => directusUsers.id),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }),
	userUpdated: uuid("user_updated").references(() => directusUsers.id),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }),
	slug: varchar("slug", { length: 255 }).notNull(),
	cover: uuid("cover").references(() => directusFiles.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		blogSlugUnique: unique("blog_slug_unique").on(table.slug),
	}
});

export const blogBlogCategory = pgTable("blog_blog_category", {
	id: serial("id").primaryKey().notNull(),
	blogId: uuid("blog_id").references(() => blog.id, { onDelete: "set null" } ),
	blogCategoryId: uuid("blog_category_id").references(() => blogCategory.id, { onDelete: "set null" } ),
});

export const blogTranslations = pgTable("blog_translations", {
	id: serial("id").primaryKey().notNull(),
	blogId: uuid("blog_id").references(() => blog.id, { onDelete: "set null" } ),
	languagesCode: varchar("languages_code", { length: 255 }).references(() => languages.code, { onDelete: "set null" } ),
	title: varchar("title", { length: 255 }),
	content: text("content"),
});