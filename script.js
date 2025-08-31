// Projektek betöltése
fetch('/api/projects')
  .then(res=>res.json())
  .then(data=>{
    const container=document.getElementById('projects-container');
    data.forEach(project=>{
      const card=document.createElement('div');
      card.classList.add('card');
      card.innerHTML=`<h3>${project.name}</h3><p>${project.description}</p>`;
      card.addEventListener('click',()=>{
        document.getElementById('modal-title').innerText=project.name;
        document.getElementById('modal-description').innerText=project.description;
        document.getElementById('modal-link').href=project.link;
        document.getElementById('project-modal').style.display='flex';
      });
      container.appendChild(card);
    });
  });

// Modal
const modal=document.getElementById('project-modal');
modal.querySelector('.close').addEventListener('click',()=>modal.style.display='none');
window.addEventListener('click',e=>{ if(e.target==modal) modal.style.display='none'; });

// Kapcsolat
document.getElementById('contact-form').addEventListener('submit',e=>{
  e.preventDefault();
  alert('Üzeneted elküldve!');
  e.target.reset();
});

// Regisztráció
const regForm = document.getElementById('register-form');
const regMsg = document.getElementById('register-msg');
regForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const data={name:regForm.name.value,email:regForm.email.value,password:regForm.password.value};
  const res=await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const result=await res.json();
  regMsg.innerText=result.message;
  if(result.success) regForm.reset();
});

// Login
const loginForm = document.getElementById('login-form');
const loginMsg = document.getElementById('login-msg');
loginForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const data={email:loginForm.email.value,password:loginForm.password.value};
  const res=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const result=await res.json();
  loginMsg.innerText=result.message;
  if(result.success) loginForm.reset();
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('header nav ul');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
