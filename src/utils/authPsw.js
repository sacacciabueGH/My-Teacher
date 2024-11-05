import bcrypt from 'bcrypt';


export const authPassword = (passwordIngresada,passwordDB) =>{
    return new Promise ((resolve,reject)=>{
        bcrypt.compare(passwordIngresada,passwordDB,(err,result)=>{
            if(err){
                console.error("Error comparando contraseñas",err);
                reject(err);
            }
            if(result){
                console.log("Contraseña autenticada!");
                resolve(result);
            }else{
                console.log("Contraseña incorrecta");
                reject("Contraseña incorrecta");
            }
        })
    })
}