import"./style-S5nVlci7.js";document.getElementById("signupButton").addEventListener("click",()=>{document.getElementById("signupForm").style.display="block",document.getElementById("loginForm").style.display="none"});document.getElementById("loginButton").addEventListener("click",()=>{document.getElementById("loginForm").style.display="block",document.getElementById("signupForm").style.display="none"});const m=document.querySelector(".createuser");m.addEventListener("click",async a=>{a.preventDefault(),console.log("Creating user");const s="hyte-server.northeurope.cloudapp.azure.com/api/users",e=document.querySelector(".create_user_form"),r=e.querySelector("input[name=username]").value,n=e.querySelector("input[name=password]").value,o=e.querySelector("input[name=email]").value,i={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,password:n,email:o})};try{const t=await fetch(s,i),u=await t.json();if(t.ok){localStorage.setItem("token",u.token),alert("User created successfully!");const d={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,password:n})},c=await fetch("hyte-server.northeurope.cloudapp.azure.com/api/auth/login",d),p=await c.json();if(c.ok)localStorage.setItem("token",p.token),window.location.href="tracking.html";else throw new Error(`HTTP error! status: ${c.status}`)}else throw new Error(`HTTP error! status: ${t.status}`)}catch(t){console.error("Error creating user:",t),alert("Failed to create user. Check your user information and please try again.")}});const g=document.querySelector(".loginuser");g.addEventListener("click",async a=>{a.preventDefault(),console.log("Logging in user");const s="hyte-server.northeurope.cloudapp.azure.com/api/auth/login",e=document.querySelector(".login_form"),r={username:e.querySelector("input[name=username]").value,password:e.querySelector("input[name=password]").value},n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};try{const o=await fetch(s,n),l=await o.json();o.ok?(localStorage.setItem("token",l.token),window.location.href="tracking.html"):(console.error("Login failed:",l.error),alert("Unauthorized: username or password incorrect!"))}catch(o){console.error("Error logging in:",o),alert("Error logging in. Please try again later.")}});
