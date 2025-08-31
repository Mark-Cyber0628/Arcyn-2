const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

// Projektek API
const projects = require('./data/projects.json');
app.get('/api/projects',(req,res)=>res.json(projects));

// Felhasználók fájl
const usersPath = path.join(__dirname,'data','users.json');

// Regisztráció
app.post('/api/register', async (req,res)=>{
  const {name,email,password} = req.body;
  if(!name||!email||!password) return res.json({success:false,message:'Minden mezőt ki kell tölteni!'});
  let users = JSON.parse(fs.readFileSync(usersPath));
  if(users.find(u=>u.email===email)) return res.json({success:false,message:'Ez az email már regisztrált!'});
  const hashedPassword = await bcrypt.hash(password,10);
  users.push({name,email,password:hashedPassword});
  fs.writeFileSync(usersPath,JSON.stringify(users,null,2));
  res.json({success:true,message:'Sikeres regisztráció!'});
});

// Login
app.post('/api/login', async (req,res)=>{
  const {email,password} = req.body;
  if(!email||!password) return res.json({success:false,message:'Minden mezőt ki kell tölteni!'});
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u=>u.email===email);
  if(!user) return res.json({success:false,message:'Felhasználó nem található!'});
  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.json({success:false,message:'Hibás jelszó!'});
  res.json({success:true,message:`Sikeres bejelentkezés, üdv ${user.name}!`});
});

// Indítás
app.listen(PORT,()=>console.log(`Server running at http://localhost:${PORT}`));
