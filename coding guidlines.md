## CODING GUIDELINES & PRACTICES
### Branch naming convention:
> **\<type\>:\<ticket number\>**
* Types:
    * *Feat* -> new feature
    * *Fix* -> bug fix
    * *Chore* -> minor change/ maintenance
    * *Refactor* -> changing existing code to fit a diff functionality
    * *Docs* -> Updating/Adding documentation

*Example: refactor/TUP-15*

### Commit message naming:
> **\<type\>:\<commit message\>**
* Use same types as above
* Files to not commit:
    * .env files with the secrets & node_modules (this should be automatically enforced through .gitignore, but always ensure it has somehow not been included)
    * package-lock.json file

*Example: Feat: add button styles*

### PR Request Rules
> Naming of PR: **\[<type\>] \<ticket number\>: \<ticket name\>**
* 2 approvals required to merge (to main)
* **NO DIRECT PUSHES to dev or main branch!**

*Example: [Feat] TUP-2: [BE] DB models setup with Sequelize*