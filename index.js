const express = require('express');
const hbs=require('express-hbs')
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const moment=require('moment')

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.set('view engine', 'hbs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cms',
  waitForConnections: true,
  connectionLimit: 10,
});
console.log("databse connecteds")


// Get Routes
app.get('/', (req, res) => {
  res.render('homepage');
})

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res,next) => {
  res.render('login')
});

app.get('/dashboard', (req, res) => {
  if (!req.session.authenticated) {
    // User is not authenticated, redirect to the login page or any other appropriate action
    res.redirect('/login');
    return;
  }

  const fetchPosts = 'SELECT * FROM blogs';
  pool.query(fetchPosts, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    const posts = results;

    // Fetch comments for all posts
    const fetchComments = 'SELECT * FROM comments';
    pool.query(fetchComments, (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      const comments = results;
      // Format the date for each post
      const formattedPosts = posts.map((post) => ({
        ...post,
        time: moment(post.time).format('YYYY-MM-DD'),
      }));

      // Render the dashboard view template with posts and comments data
      res.render('dashboard', { data: formattedPosts, comments });
    });
  });
});



app.post('/dashboard/delete/:id', (req, res) => {
  const postId = req.params.id;
  const deletePost = 'DELETE FROM blogs WHERE id = ?';
  pool.query(deletePost, postId, (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.redirect('/dashboard');
    }
  });
});

// Dashboard Edit Post Route
app.get('/dashboard/edit/:id', (req, res) => {
  const postId = req.params.id;
  
  // Fetch the post data for editing from the database based on the postId
  const fetchPost = `SELECT * FROM blogs WHERE id = ${postId}`;
  pool.query(fetchPost, [postId], (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      const post = result[0];
      res.render('edit', { postId, post });
    }
  });
});


// Dashboard Edit Get Route
app.get('/dashboard/edit/:id', (req, res) => {
  const postId = req.params.id;
  const fetchPost = `SELECT * FROM blogs WHERE id = ${postId}`;
  pool.query(fetchPost, postId, (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.render('dashboard', { post: result[0] });
    }
  });
});

// Dashboard Edit Routes
app.post('/dashboard/edit/:id', (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  // Update the post data in the database
  const updatePost = `UPDATE blogs SET title = '${title}', description = '${description}' WHERE id = '${postId}'`;
  pool.query(updatePost, [title, description, postId], (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.redirect('/dashboard');
    }
  });
});


// SIGNUP Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const sql=`INSERT INTO login (username,password) VALUES ('${username}','${password}')`;
  pool.query(sql,(result,error)=>{
    if (error){
      console.log(error)
    }
    res.render('login');
  })
});

// Authentication Route
app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  try {
    const sql = `SELECT * FROM login WHERE username = '${username}' AND password = '${password}'`;
    pool.query(sql, (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length === 0) {
          console.log('User Not Found');
          res.sendStatus(404);
        } else {
          // Set the user's authentication state using session management
          req.session.authenticated = true;
          req.session.username = username;
          res.redirect('/dashboard');
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Adding Blogs to Database 
app.post('/addBlog',(req,res)=>{
  const {title,description}=req.body;
  const sql=`INSERT INTO blogs (title,description) VALUES ('${title}','${description}')`
  pool.query(sql,(result,error)=>{
    if (error){
      console.log(error)
    }
    res.redirect('dashboard');
  })
})

app.post('/comment', (req, res) => {
  const { postId, comment } = req.body;
  const author = req.session.username;

  const sql = `INSERT INTO comments (postid, author, comment) VALUES ('${postId}', '${author}', '${comment}')`;
  pool.query(sql, [postId, author, comment], (error, result) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
    res.redirect('/dashboard');
  });
});

// app.get('/comments/:postId', (req, res) => {
//   const postId = req.params.postId;

//   // Fetch the comments for the specified post from the database
//   const sql = `SELECT * FROM comments WHERE postid = ${postId}`;
//   pool.query(sql, [postId], (error, results) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(500);
//       return;
//     }
//     const comments = results;

//     // Render the comments view template and pass the comments data
//     res.render('dashboard', { comments });
//   });
// });


// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    }
    res.redirect('/');
  });
});
   
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});