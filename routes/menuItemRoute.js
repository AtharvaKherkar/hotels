const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/MenuItem'); // Fixed import

// POST request to add a menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Create a new menu item document
        const newMenuItem = new MenuItem(data);

        // Save the menu item to the database
        const response = await newMenuItem.save();
        console.log('Menu item saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET method to fetch all menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Menu data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET request to get menu items by taste
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType; // Fix: Correctly extract tasteType
        const response = await MenuItem.find({ taste: tasteType });

        if (response.length === 0) {
            return res.status(404).json({ error: 'No items found for this taste type' }); // Fix: Updated error message
        }

        console.log(`Items with taste ${tasteType} fetched`);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router