# Game Review Api 

<p>
  <img src="https://img.shields.io/badge/JavaScript-3C005A?style=for-the-badge&logo=javascript&logoColor=white" height=30>
  <img src="https://img.shields.io/badge/Node.js-3C005A?style=for-the-badge&logo=nodedotjs&logoColor=white" height=30>
  <img src="https://img.shields.io/badge/Express.js-3C005A?style=for-the-badge&logo=express&logoColor=white" height=30>
</p>

\* - <i>marks admin specific requests</i>

<strong>GET [ /reviews ]</strong> : <i>retrieve a list of all review ids</i>  
\* <strong>POST [ /reviews ]</strong> : <i>create new post</i>  

<strong>GET [ /reviews/:id ]</strong> : <i>retrieve id specified review info</i>  
<strong>PUT [ /reviews/:id ]</strong> : <i>update id specified review</i>  
<strong>DELETE [ /reviews/:id ]</strong> : <i>delete id specified review</i>  

\* <strong>PUT [ /reviews/published/:id ]</strong> : <i>update review published status</i>  

\* <strong>GET [ /login ]</strong> : <i>get login token</i>  
\* <strong>POST [ /login ]</strong> : <i>send login info</i>  
\* <strong>POST [ /signup ]</strong> : <i>create new admin account</i>  
\* <strong>GET [ /logout ]</strong> : <i>self explanatory</i>
