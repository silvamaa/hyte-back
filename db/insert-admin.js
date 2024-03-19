import bcrypt from 'bcryptjs';

// Function to generate hashed password
async function generateHashedPassword(password) {
    try {
        const saltRounds = 10; // Salt rounds for bcrypt hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error generating hashed password:', error);
        throw error;
    }
}

// Example usage: Generate hashed password for 'soninkarva'
generateHashedPassword('soninkarva')
    .then(hashedPassword => {
        // Insert user into the database with hashed password
        const username = 'soni';
        const email = 'soni@gmail.com';
        const userLevel = 'admin';

        // Example SQL query to insert user with hashed password
        const sqlQuery = `INSERT INTO Users (username, password, email, user_level) VALUES ('${username}', '${hashedPassword}', '${email}', '${userLevel}')`;

        console.log('SQL Query:', sqlQuery);
        // Execute the SQL query to insert the user into the database
        // Make sure to execute this query using your database client or library
    })
    .catch(error => {
        console.error('Error:', error);
    });
