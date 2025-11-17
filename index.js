const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação das tabelas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Aluno(
            al_id INTEGER PRIMARY KEY AUTOINCREMENT,
            al_email TEXT UNIQUE NOT NULL,
            al_nome TEXT NOT NULL,
            al_senha TEXT NOT NULL,
            al_bio VARCHAR(200),
            al_nivel INTEGER
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Prof(
            pr_id INTEGER PRIMARY KEY AUTOINCREMENT,
            pr_email TEXT UNIQUE NOT NULL,
            pr_nome TEXT NOT NULL,
            pr_senha TEXT NOT NULL,
            pr_bio VARCHAR(200),
            pr_nivel INTEGER
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Turma(
            tu_id INTEGER PRIMARY KEY AUTOINCREMENT,
            tu_nome VARCHAR(40) NOT NULL,
            tu_desc VARCHAR(120),
            tu_pr_id VARCHAR(12),
            FOREIGN KEY (tu_pr_id) REFERENCES Prof (pr_id)
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Quiz(
            qz_id INTEGER PRIMARY KEY AUTOINCREMENT,
            qz_valor INTEGER NOT NULL,
            qz_prazo DATE NOT NULL,
            qz_pr_id VARCHAR(12),
            FOREIGN KEY (qz_pr_id) REFERENCES Prof (pr_id)
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Pergunta(
            pe_numero INTEGER PRIMARY KEY AUTOINCREMENT,
            pe_enunciado VARCHAR(200) NOT NULL,
            pe_qz_id VARCHAR(12),
            FOREIGN KEY (pe_qz_id) REFERENCES Quiz (qz_id)
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Alternativa(
            av_numero INTEGER PRIMARY KEY AUTOINCREMENT,
            av_texto VARCHAR(120) NOT NULL,
            av_correta BIT,
            av_pe_numero INTEGER,
            FOREIGN KEY (av_pe_numero) REFERENCES Pergunta (pe_numero)
        )
    `);

    console.log('Tabelas criadas com sucesso.');
});

///////////////////////////// Rotas para Aluno /////////////////////////////
///////////////////////////// Rotas para Aluno /////////////////////////////
///////////////////////////// Rotas para Aluno /////////////////////////////

// Cadastrar aluno
app.post('/aluno', (req, res) => {
    const { email, nome, senha } = req.body;

    if (!email || !nome || !senha) {
        return res.status(400).send('todos os campos são obrigatórios.');
    }

    const query = `INSERT INTO Aluno (al_email, al_nome, al_senha) VALUES (?, ?, ?)`;
    db.run(query, [email, nome, senha], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar.');
        }
        res.status(201).send({ id: this.lastID, message: 'cadastrado com sucesso.' });
    });
});

// Listar alunos
// Endpoint para listar todos alunos, oq é referente a busca ta comentado
app.get('/aluno', (req, res) => {
    /*
    const email = req.query.email || '';  // Recebe o email da query string (se houver)

    if (email) {
        // Se email foi passado, busca cadastros que possuam esse email ou parte dele
        const query = `SELECT * FROM cadastro WHERE email LIKE ?`;

        db.all(query, [`%${email}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar cadastros.' });
            }
            res.json(rows);  // Retorna os cadastros encontrados ou um array vazio
        });
    } else {
    */
        // Se email não foi passado, retorna todos os cadastros
        const query = `SELECT * FROM Aluno`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar cadastros.' });
            }
            res.json(rows);  // Retorna todos os cadastros
        });
});

// Atualizar aluno
app.put('/aluno/email/:email', (req, res) => {
    const { email } = req.params;
    const { nome, senha} = req.body;

    const query = `UPDATE aluno SET al_nome = ?, al_senha = ? WHERE al_email = ?`;
    db.run(query, [nome, senha, email], function (err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar aluno.');
        }
        if (this.changes === 0) {
            return res.status(404).send('Aluno não encontrado.');
        }
        res.send('Aluno atualizado com sucesso.');
    });
});

///////////////////////////// Rotas para Prof /////////////////////////////
///////////////////////////// Rotas para Prof /////////////////////////////
///////////////////////////// Rotas para Prof /////////////////////////////

// Cadastrar prof
app.post('/prof', (req, res) => {
    const { email, nome, senha } = req.body;

    if (!email || !nome || !senha) {
        return res.status(400).send('todos os campos são obrigatórios.');
    }

    const query = `INSERT INTO Prof (pr_email, pr_nome, pr_senha) VALUES (?, ?, ?)`;
    db.run(query, [email, nome, senha], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar.');
        }
        res.status(201).send({ id: this.lastID, message: 'cadastrado com sucesso.' });
    });

});

// Listar professores
// Endpoint para listar todos professores, oq é referente a busca ta comentado
app.get('/prof', (req, res) => {
    /*
    const email = req.query.email || '';  // Recebe o email da query string (se houver)

    if (email) {
        // Se email foi passado, busca cadastros que possuam esse email ou parte dele
        const query = `SELECT * FROM cadastro WHERE email LIKE ?`;

        db.all(query, [`%${email}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar cadastros.' });
            }
            res.json(rows);  // Retorna os cadastros encontrados ou um array vazio
        });
    } else {
    */
        // Se email não foi passado, retorna todos os cadastros
        const query = `SELECT * FROM Prof`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar cadastros.' });
            }
            res.json(rows);  // Retorna todos os cadastros
        });
});

// Atualizar professores
app.put('/prof/email/:email', (req, res) => {
    const { email } = req.params;
    const { nome, senha} = req.body;

    const query = `UPDATE prof SET pr_nome = ?, pr_senha = ? WHERE pr_email = ?`;
    db.run(query, [nome, senha, email], function (err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar professores.');
        }
        if (this.changes === 0) {
            return res.status(404).send('Professores não encontrado.');
        }
        res.send('Professores atualizado com sucesso.');
    });
});

///////////////////////////// Rotas para Turma /////////////////////////////
///////////////////////////// Rotas para Turma /////////////////////////////
///////////////////////////// Rotas para Turma /////////////////////////////

// Cadastrar turma
app.post('/turma', (req, res) => {
    const { tu_nome, tu_desc, tu_pr_id} = req.body;

    if (!tu_nome) {
        return res.status(400).send('nome e id do professor são obrigatórios.');
    }

    /*
    // Verifica se o professor existe
    const checkProf = `SELECT * FROM Prof WHERE pr_id = ?`;
    db.get(checkProf, [tu_pr_id], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao verificar professor.');
        }

        if (!row) {
            // Se não encontrou o professor
            return res.status(400).send('ID do professor não encontrado.');
        }

        // Se encontrou o professor, insere a turma
    */
        const query = `INSERT INTO turma (tu_nome, tu_desc, tu_pr_id) VALUES (?, ?, ?)`;
        db.run(query, [tu_nome, tu_desc, tu_pr_id], function (err) {
            if (err) {
                return res.status(500).send('Erro ao cadastrar.');
            }
            res.status(201).send({ id: this.lastID, message: 'cadastrado com sucesso.' });
        });
    });
//});


// Listar turmas
// Endpoint para listar todas as turmas ou buscar por email
app.get('/turma', (req, res) => {
    const tu_nome = req.query.nome || '';  // Recebe o nome da query string (se houver)

    if (tu_nome) {
        // Se nome foi passado, busca turmas que possuam esse nome ou parte dele
        const query = `SELECT * FROM turma WHERE tu_nome LIKE ?`;

        db.all(query, [`%${tu_nome}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar turmas.' });
            }
            res.json(rows);  // Retorna as turmas encontradas ou um array vazio
        });
    } else {
        // Se nome não foi passado, retorna todas as turmas
        const query = `SELECT * FROM turma`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar turmas.' });
            }
            res.json(rows);  // Retorna todas as turmas
        });
    }
});

// Atualizar turma
app.put('/turma/tu_id/:tu_id', (req, res) => {
    const { tu_id } = req.params;
    const { tu_nome, tu_desc} = req.body;

    const query = `UPDATE turma SET tu_nome = ?, tu_desc = ? WHERE tu_id = ?`;
    db.run(query, [tu_nome, tu_desc, tu_id], function (err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar turma.');
        }
        if (this.changes === 0) {
            return res.status(404).send('Turma não encontrada.');
        }
        res.send('Turma atualizada com sucesso.');
    });
});

///////////////////////////// Rotas para Quiz /////////////////////////////
///////////////////////////// Rotas para Quiz /////////////////////////////
///////////////////////////// Rotas para Quiz /////////////////////////////

// Cadastrar quiz
app.post('/quiz', (req, res) => {
    const {qz_nome, qz_valor, qz_prazo} = req.body;

    if (!qz_nome || !qz_valor || !qz_prazo) {
        return res.status(400).send('todos os campos são obrigatórios.');
    }

    const query = `INSERT INTO Quiz (qz_nome, qz_valor, qz_prazo VALUES (?, ?, ?)`;
    db.run(query, [qz_nome, qz_valor, qz_prazo], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar.');
        }
        res.status(201).send({ id: this.lastID, message: 'cadastrado com sucesso.' });
    });
});

// Teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor está rodando e tabelas criadas!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
