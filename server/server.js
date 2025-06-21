import express from "express";
import dotenv from ("dotenv");
import users from ("./user-data");
//allow access env
dotenv.config();

const PORT= 3001;

// to read json from request body
app.use(express.json()); 

// Get all users 
app.get("/users", (req, res)=>{
    // send back all list of users
    res.json(users);
    }
);

// Post (to add new user)
app.post("/users",(req, res)=>{
    if(!req.body.name){
        return res.status(403).json({message:"User name not provided"})
    }
    const newUser = 
    {
        id: users.length + 1, name: req.body.name
    }
    // add to users list 
    users.push(newUser);
    res.status(201).json(newUser);
}
);

// Put updating user by ID
app.put("/users/:id", (req, res)=>{
    // get user Id from the requested parameter 
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user=> user.id === userId);
    if(userIndex === -1 ){
        return res.status(404).send("User not found");
    }
    // assign the new name from body  
    users[userIndex].name = req.body.name;
    res.json(users[userIndex]);

});
// Delete remove user by id

app.delete(("/users/:id"), (req, res)=>{
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId );
    res.send(`user with ${userId} deleted`);
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
}
);






