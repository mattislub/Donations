import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

const seedData = {
  budgetItems: [
    {
      name: 'ספסל תפילה',
      cost: '$500',
      units: 120,
      donated: 62,
    },
    {
      name: 'לבני קיר',
      cost: '$80',
      units: 18000,
      donated: 10250,
    },
    {
      name: 'חלון זכוכית',
      cost: '$3,000',
      units: 48,
      donated: 19,
    },
    {
      name: 'חדר לימוד',
      cost: '$50,000',
      units: 6,
      donated: 2,
    },
    {
      name: 'ספרייה מרכזית',
      cost: '$120,000',
      units: 1,
      donated: 0,
    },
  ],
  levels: [
    {
      name: 'זהב',
      subtitle: 'תרומות גדולות ומשמעותיות',
      items: ['חדר תפילה', 'אגף לימוד', 'ספרייה מרכזית'],
      benefits: ['שלט קבוע בכניסה', 'אזכור בולט באתר', 'דוא"ל עם תמונת הפריט שנתרם'],
    },
    {
      name: 'כסף',
      subtitle: 'תרומות בינוניות לפריטים מרכזיים',
      items: ['חלון מעוטר', 'ספסל מיוחד', 'ארון קודש'],
      benefits: ['אזכור באתר', 'דוא"ל עם תמונת הפריט שנתרם'],
    },
    {
      name: 'ארד',
      subtitle: 'תרומות קטנות ונגישות לכל אחד',
      items: ['לבנה', 'כיסא', 'פריט עיצוב'],
      benefits: ['אזכור ברשימת התורמים', 'דוא"ל עם תמונת הפריט שנתרם'],
    },
  ],
  statusMarkers: [
    {
      name: 'ספרייה מרכזית',
      dedication: 'מוקדש לזכר הרב שלמה',
      status: 'זמין לתרומה',
      top: '22%',
      left: '18%',
    },
    {
      name: 'אגף לימוד',
      dedication: 'נחנך ע"י משפחת כהן',
      status: 'נתרם',
      top: '38%',
      left: '48%',
    },
    {
      name: 'חלון דרומי',
      dedication: 'לע"נ לאה בת רחל',
      status: 'נתרם',
      top: '58%',
      left: '32%',
    },
    {
      name: 'ספסל צפוני',
      dedication: 'לרפואת דוד בן רבקה',
      status: 'זמין לתרומה',
      top: '68%',
      left: '65%',
    },
  ],
  personalPages: [
    {
      name: 'משפחת לוי',
      goal: 150000,
      progress: 68000,
    },
    {
      name: 'נוער גבעת זאב',
      goal: 45000,
      progress: 31500,
    },
    {
      name: 'קבוצת המתנדבים',
      goal: 80000,
      progress: 52300,
    },
  ],
  progressStats: {
    progress: 865000,
    target: 2000000,
  },
};

const createTablesSql = `
  CREATE TABLE IF NOT EXISTS budget_items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    cost TEXT NOT NULL,
    units INTEGER NOT NULL,
    donated INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS donation_levels (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS donation_level_items (
    id SERIAL PRIMARY KEY,
    level_id INTEGER NOT NULL REFERENCES donation_levels(id) ON DELETE CASCADE,
    item TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS donation_level_benefits (
    id SERIAL PRIMARY KEY,
    level_id INTEGER NOT NULL REFERENCES donation_levels(id) ON DELETE CASCADE,
    benefit TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS status_markers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    dedication TEXT NOT NULL,
    status TEXT NOT NULL,
    position_top TEXT NOT NULL,
    position_left TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS personal_pages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    goal INTEGER NOT NULL,
    progress INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS progress_stats (
    id SERIAL PRIMARY KEY,
    progress INTEGER NOT NULL,
    target INTEGER NOT NULL
  );
`;

async function tableHasRows(tableName) {
  const { rows } = await pool.query(`SELECT COUNT(*)::int AS count FROM ${tableName}`);
  return rows[0]?.count > 0;
}

async function seedBudgetItems() {
  if (await tableHasRows('budget_items')) {
    return;
  }

  const insertSql =
    'INSERT INTO budget_items (name, cost, units, donated) VALUES ($1, $2, $3, $4)';

  await Promise.all(
    seedData.budgetItems.map((item) =>
      pool.query(insertSql, [item.name, item.cost, item.units, item.donated])
    )
  );
}

async function seedLevels() {
  if (await tableHasRows('donation_levels')) {
    return;
  }

  for (const level of seedData.levels) {
    const { rows } = await pool.query(
      'INSERT INTO donation_levels (name, subtitle) VALUES ($1, $2) RETURNING id',
      [level.name, level.subtitle]
    );
    const levelId = rows[0].id;

    const itemInsertSql =
      'INSERT INTO donation_level_items (level_id, item) VALUES ($1, $2)';
    const benefitInsertSql =
      'INSERT INTO donation_level_benefits (level_id, benefit) VALUES ($1, $2)';

    await Promise.all([
      ...level.items.map((item) => pool.query(itemInsertSql, [levelId, item])),
      ...level.benefits.map((benefit) => pool.query(benefitInsertSql, [levelId, benefit])),
    ]);
  }
}

async function seedStatusMarkers() {
  if (await tableHasRows('status_markers')) {
    return;
  }

  const insertSql =
    'INSERT INTO status_markers (name, dedication, status, position_top, position_left) VALUES ($1, $2, $3, $4, $5)';

  await Promise.all(
    seedData.statusMarkers.map((marker) =>
      pool.query(insertSql, [
        marker.name,
        marker.dedication,
        marker.status,
        marker.top,
        marker.left,
      ])
    )
  );
}

async function seedPersonalPages() {
  if (await tableHasRows('personal_pages')) {
    return;
  }

  const insertSql =
    'INSERT INTO personal_pages (name, goal, progress) VALUES ($1, $2, $3)';

  await Promise.all(
    seedData.personalPages.map((page) =>
      pool.query(insertSql, [page.name, page.goal, page.progress])
    )
  );
}

async function seedProgressStats() {
  if (await tableHasRows('progress_stats')) {
    return;
  }

  const insertSql = 'INSERT INTO progress_stats (progress, target) VALUES ($1, $2)';

  await pool.query(insertSql, [seedData.progressStats.progress, seedData.progressStats.target]);
}

export async function initializeDatabase() {
  await pool.query(createTablesSql);
  await seedBudgetItems();
  await seedLevels();
  await seedStatusMarkers();
  await seedPersonalPages();
  await seedProgressStats();
}

export async function fetchInitialData() {
  const budgetItemsPromise = pool.query(
    'SELECT name, cost, units, donated FROM budget_items ORDER BY id'
  );
  const levelsPromise = pool.query(
    'SELECT id, name, subtitle FROM donation_levels ORDER BY id'
  );
  const levelItemsPromise = pool.query(
    'SELECT level_id, item FROM donation_level_items ORDER BY id'
  );
  const levelBenefitsPromise = pool.query(
    'SELECT level_id, benefit FROM donation_level_benefits ORDER BY id'
  );
  const statusMarkersPromise = pool.query(
    'SELECT name, dedication, status, position_top, position_left FROM status_markers ORDER BY id'
  );
  const progressPromise = pool.query(
    'SELECT progress, target FROM progress_stats ORDER BY id LIMIT 1'
  );
  const personalPagesPromise = pool.query(
    'SELECT name, goal, progress FROM personal_pages ORDER BY id'
  );

  const [
    budgetItemsResult,
    levelsResult,
    levelItemsResult,
    levelBenefitsResult,
    statusMarkersResult,
    progressResult,
    personalPagesResult,
  ] = await Promise.all([
    budgetItemsPromise,
    levelsPromise,
    levelItemsPromise,
    levelBenefitsPromise,
    statusMarkersPromise,
    progressPromise,
    personalPagesPromise,
  ]);

  const itemsByLevel = levelItemsResult.rows.reduce((accumulator, row) => {
    const list = accumulator.get(row.level_id) ?? [];
    list.push(row.item);
    accumulator.set(row.level_id, list);
    return accumulator;
  }, new Map());

  const benefitsByLevel = levelBenefitsResult.rows.reduce((accumulator, row) => {
    const list = accumulator.get(row.level_id) ?? [];
    list.push(row.benefit);
    accumulator.set(row.level_id, list);
    return accumulator;
  }, new Map());

  const levels = levelsResult.rows.map((level) => ({
    name: level.name,
    subtitle: level.subtitle,
    items: itemsByLevel.get(level.id) ?? [],
    benefits: benefitsByLevel.get(level.id) ?? [],
  }));

  const statusMarkers = statusMarkersResult.rows.map((marker) => ({
    name: marker.name,
    dedication: marker.dedication,
    status: marker.status,
    top: marker.position_top,
    left: marker.position_left,
  }));

  const progressStats = progressResult.rows[0] ?? seedData.progressStats;

  return {
    budgetItems: budgetItemsResult.rows,
    levels,
    statusMarkers,
    progress: progressStats.progress,
    target: progressStats.target,
    personalPages: personalPagesResult.rows,
  };
}

export default pool;
