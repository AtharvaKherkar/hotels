const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// POST request to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Person data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET request to fetch all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Persons data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET request to fetch persons by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        const response = await Person.find({ work: workType });

        if (response.length === 0) {
            return res.status(404).json({ error: 'No persons found for this work type' });
        }

        console.log(`Persons with work type ${workType} fetched`);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id //Extract the id from the URL parameter 
        const updatedPersonData = req.body //Updated data for the person 
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, // Return the updated document 
            runValidators:true //Run Mongoose Validation
        })
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('data updated')
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    })


router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id //Extract the person's ID from the URL parameter 

        //Assuming you have a Person Model 
        const response = await Person.findByIdAndUpdate(personId)
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('data deleted')
        res.status(200).json({message :'person deleted successfully'})
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;

