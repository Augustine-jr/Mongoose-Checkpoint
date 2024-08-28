import dotenv from "dotenv"
import connectdb from "./utils/db.js"
import express from "express"
import User from "./models/userModel.js";

dotenv.config();
connectdb ();

const app = express();
app.get("/", (req,res)=>{
  res.end("Server is Working");
})

// Question 1
app.get('/saverecord', async(req,res)=>{
  const addPerson = new User({
    name: 'Racheal',
    age: 23,
    favouriteFoods: ['Noodles', 'egg', 'rice']
  },)
  const addedPerson=await addPerson.save()
  res.json(addedPerson)
  console.log(addedPerson)
  })

  // Question 2
app.get('/multiplerecord', async(req,res)=>{
  const addRecord =await User.create([{
    name: 'John',
    age: 25,
    favouriteFoods: ['Pizza', 'Chicken', 'Burger']
  },
  {
    name: 'Jane',
    age: 30,
    favouriteFoods: ['Sushi', 'Salmon', 'Steak']
  },
  {
    name: 'David',
    age: 28,
    favouriteFoods: ['Tacos', 'Shrimp', 'Fried Chicken']
  },])
   
  console.log(addRecord)
    res.json(addRecord)
})

// Question 3
app.get('/findrecord', async(req,res)=>{
  const findPerson = await User.find({name: 'Racheal'})
  console.log(findPerson)
  res.json(findPerson)
})

// Question 4
const food = 'Pizza';
app.get('/Findfood', async(req,res)=>{
  const Findfood = await User.findOne({ favouriteFoods: food})
  console.log(Findfood)
  res.json(Findfood)
});

// Question 5
app.get('/FindById', async(req,res)=>{
  const findById = await User.findById('66cddccd25482e7bf7e0c396')
  console.log(findById)
  res.json(findById)
})

// Question 6 update by running find,nedit, then save
app.get('/findUpdateById', async (req, res) => {
    const findUpdateById = await User.findById(personId);
    console.log(findUpdateById);
    const updateFood = "hamburger"
    findUpdateById.favouriteFoods.push(updateFood);
    await findUpdateById.save();
    console.log (findUpdateById)
    res.json(findUpdateById);
});

// Question 7
app.get('/findOneAndUpdate',async (req, res) => {
    const findOneAndUpdate = await User.findOneAndUpdate({name: 'Alice'}, {age: 30}, {new: true});
    console.log(findOneAndUpdate);
    res.json(findOneAndUpdate);
});

// question 8
app.get('/findByIdAndRemove', async (req, res) => {
    const findByIdAndRemove = await User.findByIdAndDelete(personId);
    console.log(findByIdAndRemove);
    res.json(findByIdAndRemove);
});

//Question 9

app.get('/deleteMany', async (req, res) => {
    const deleteMany = await User.deleteMany({name: "Alice"});
    console.log(deleteMany);
    res.json(deleteMany);

})

// Question 10
app.get('/chainSearch', async (req, res, done) => {
    const chainSearch = await User.find({ favouriteFoods: 'Chicken' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec()
    .then((data) => {
            console.log(data);
            res.json(data);
        })

    .catch((err) => {
        console.error(err);
    })
});

app.listen(4003, () => {
  console.log("Server running on port 4003");
})

// Connect to the database