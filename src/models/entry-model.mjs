/**
 * list all entries in the diary table
 * @returns {object[]} an array of objects representing each entry
 */
const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/**
 * list all entries for a specific user
 * @param {number} id the user id
 * @returns {object[]} an array of objects representing each entry
 */
const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/**
 * find an entry by id and user id
 * @param {number} id the entry id
 * @param {number} userId the user id
 * @returns {object} an object representing the entry
 */
const findEntryById = async (id, userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id =? AND user_id =?',
      [id, userId]
    );
    // console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/**
 * add a new entry to the diary table
 * @param {object} entry the entry data
 * @param {number} userId the user id
 * @returns {object} an object with the new entry id
 */
const addEntry = async (entry, userId) => {
  const sql = `INSERT INTO DiaryEntries
               (user_id, mood, sleep_hours, notes)
               VALUES (?,?,?,?)`;
  const params = [userId, entry.mood, entry.sleep_hours, entry.notes];
  try {
    const rows = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/**
 * update an entry in the diary table
 * @param {number} entryId the entry id
 * @param {number} userId the user id
 * @param {object} entryData the updated entry data
 * @returns {object} an object with a message and the updated entry id
 */
const updateEntryById = async (entryId, userId, entryData) => {
  try {
    const params = [entryData, entryId, userId];
    // format() function is used to include only the fields that exists
    // in the entryData object to the SQL query
    const sql = promisePool.format(
      `UPDATE DiaryEntries SET?
       WHERE entry_id=? AND user_id=?`,
      params
    );
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Entry not found'};
    }
    return {message: 'Entry data updated', entry_id: entryId};
  } catch (error) {
    // fix error handling
    // now duplicate entry error is generic 500 error, should be fixed to 400?
    console.error('updateEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

/**
 * delete an entry from the diary table
 * @param {number} id the entry id
 * @param {number} userId the user id
 * @returns {object} an object with a message and the deleted entry id
 */
const deleteEntryById = async (id, userId) => {
  try {
    const sql = 'DELETE FROM DiaryEntries WHERE entry_id=? AND user_id=?';
    const params = [id, userId];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Entry not found'};
    }
    return {message: 'Entry deleted', entry_id: id};
  } catch (error) {
    console.error('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllEntries,
  listAllEntriesByUserId,
  findEntryById,
  addEntry,
  updateEntryById,
  deleteEntryById,
};
