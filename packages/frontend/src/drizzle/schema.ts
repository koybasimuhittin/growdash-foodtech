import {
	mysqlTable,
	serial,
	int,
	double,
	index,
	uniqueIndex,
	varchar,
	mediumint,
} from "drizzle-orm/mysql-core"

export const discount = mysqlTable("discount", {
	id: serial("id").primaryKey(),
	percentage: double("percentage").notNull(),
	startDate: int("start_date").notNull(),
	endDate: int("end_date").notNull(),
})
