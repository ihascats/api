Game Review Api

\*marks admin specific requests

GET [ /reviews ] : retrieve a list of all review ids
\*POST [ /reviews ] : create new post

GET [ /reviews/:id ] : retrieve id specified review info
*PUT [ /reviews/:id ] : update id specified review
*DELETE [ /reviews/:id ] : delete id specified review

\*PUT [ /reviews/published/:id ]: update review published status

*GET [ /login ] : get login token
*POST [ /login ] : send login info
*POST [ /signup ] : create new admin account
*GET [ /logout ] : self explanatory
