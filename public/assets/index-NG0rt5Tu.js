import"./style-S5nVlci7.js";document.getElementById("signupButton").addEventListener("click",()=>{document.getElementById("signupForm").style.display="block",document.getElementById("loginForm").style.display="none"});document.getElementById("loginButton").addEventListener("click",()=>{document.getElementById("loginForm").style.display="block",document.getElementById("signupForm").style.display="none"});const g=document.querySelector(".createuser");g.addEventListener("click",async s=>{s.preventDefault(),console.log("Creating user");const a="/api/users",e=document.querySelector(".create_user_form"),n=e.querySelector("input[name=username]").value,r=e.querySelector("input[name=password]").value,t=e.querySelector("input[name=email]").value,c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:r,email:t})};try{const o=await fetch(a,c),u=await o.json();if(o.ok){localStorage.setItem("token",u.token),alert("User created successfully!");const d={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:r})},i=await fetch("/api/auth/login",d),m=await i.json();if(i.ok)localStorage.setItem("token",m.token),window.location.href="tracking.html";else throw new Error(`HTTP error! status: ${i.status}`)}else throw new Error(`HTTP error! status: ${o.status}`)}catch(o){console.error("Error creating user:",o),alert("Failed to create user. Check your user information and please try again.")}});const p=document.querySelector(".loginuser");p.addEventListener("click",async s=>{s.preventDefault(),console.log("Logging in user");const a="/api/auth/login",e=document.querySelector(".login_form"),n={username:e.querySelector("input[name=username]").value,password:e.querySelector("input[name=password]").value},r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)};try{const t=await fetch(a,r),l=await t.json();t.ok?(localStorage.setItem("token",l.token),window.location.href="tracking.html"):(console.error("Login failed:",l.error),alert("Unauthorized: username or password incorrect!"))}catch(t){console.error("Error logging in:",t),alert("Error logging in. Please try again later.")}});
