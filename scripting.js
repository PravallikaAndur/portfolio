 // Typing effect
 const words = ['Designer', 'Learner', 'Web Developer'];
 let i = 0, j = 0, current = '', isDeleting = false;
 const typedEl = document.getElementById('typed');
 function type(){
 const full = words[i];
 if(isDeleting){
 current = full.substring(0, j--);
 } else {
 current = full.substring(0, j++);
 }
 typedEl.textContent = current;
 if(!isDeleting && j === full.length + 1){
 isDeleting = true;
 setTimeout(type, 900);
 return;
 }
 if(isDeleting && j === 0){
 isDeleting = false;
 i = (i + 1) % words.length;
 }
 setTimeout(type, isDeleting ? 90 : 150);
 }
 document.addEventListener('DOMContentLoaded', ()=>{
 type();
 document.getElementById('year').textContent = new Date().getFullYear();
 // mobile nav toggle
 const toggle = document.querySelector('.nav-toggle');
 const navLinks = document.querySelector('.nav-links');
 toggle.addEventListener('click', ()=>{
 navLinks.style.display = navLinks.style.display === 'flex' ? 'none' :'flex';
 });
 // contact form submission
 const form = document.getElementById('contactForm');
 const status = document.getElementById('formStatus');
 form.addEventListener('submit', async (e)=>{
 e.preventDefault();
 const data = { name: form.name.value, email: form.email.value, message:
 form.message.value };
 status.textContent = 'Sending...';
 try{
 const res = await fetch('/api/contact', {
 method:'POST', headers:{'Content-Type':'application/json'}, body:
 JSON.stringify(data)
 });
 const json = await res.json();
 if(json.ok){
 status.textContent = 'Message sent! Thank you.';
 form.reset();
 } else {
 status.textContent = 'Failed to send — try again.';
 }
 }catch(err){
 console.error(err);
 status.textContent = 'Error sending message.';
 }
 setTimeout(()=> status.textContent = '', 4000);
 });
 });