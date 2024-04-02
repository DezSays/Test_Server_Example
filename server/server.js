const express = require(`express`);
const pgp = require(`pg-promise`)();
const db = pgp(`postgres://qonnxkqn:yAamuth4AZ0bhZEGuoBLeR6tfHO-wXYC@raja.db.elephantsql.com/qonnxkqn`);
const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/students/graduated', async (req, res) => {
    const graduated_students = await db.any('SELECT * FROM STUDENTS WHERE graduated = true');
    res.json(graduated_students);
});

app.post('/student', async (req, res) => {
    await db.none('INSERT INTO students (id, name, website, github_user_name, points, gender, cohort_start_date, graduated) VALUES (${id}, ${name}, ${website}, ${github_user_name}, ${points}, ${gender}, ${cohort_start_date}, ${graduated})', req.body);

    res.send(`Added new Student`);
});

app.put('/students/:id', async (req, res) => {
    await db.none('UPDATE students SET points = points + 5 WHERE id = $1', [req.params.id]);
    res.send('Points updated boi')
})

app.delete('/students/:id', async (req, res) => {
    await db.none('DELETE FROM students WHERE id = $1', [req.params.id])
    res.send(`Deleted student with id ${req.params.id}`)
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`);
});